// Verificación de policies RLS contra la base real (integración).
// Depende de red y de la base: si falla por entorno y no por código,
// documentarlo en docs/TEST-HISTORY.md sin bloquear el flujo.
import { describe, it, expect, beforeAll } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import { loadEnv } from 'vite'
import ws from 'ws'

const env = loadEnv('', process.cwd(), '')

function clienteNuevo() {
  return createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_CLAVE_ANON, {
    auth: { persistSession: false },
    // Node 20 no trae WebSocket nativo; el constructor del cliente lo exige.
    realtime: { transport: ws },
  })
}

describe('RLS sin sesión (anon)', () => {
  it('no lee canciones', async () => {
    const { data, error } = await clienteNuevo().from('canciones').select('id')
    expect(error).toBeNull()
    expect(data).toEqual([])
  })

  it('no lee perfiles', async () => {
    const { data, error } = await clienteNuevo().from('perfiles').select('id')
    expect(error).toBeNull()
    expect(data).toEqual([])
  })

  it('no puede insertar canciones', async () => {
    const { error } = await clienteNuevo()
      .from('canciones')
      .insert({ titulo: 'no debería entrar' })
    expect(error).not.toBeNull()
  })
})

describe('RLS con sesión (usuario de pruebas)', () => {
  let cliente

  beforeAll(async () => {
    cliente = clienteNuevo()
    const { error } = await cliente.auth.signInWithPassword({
      email: env.PRUEBAS_EMAIL,
      password: env.PRUEBAS_CONTRASENA,
    })
    if (error) throw new Error(`No se pudo loguear el usuario de pruebas: ${error.message}`)
  })

  it('lee canciones', async () => {
    const { data, error } = await cliente.from('canciones').select('id')
    expect(error).toBeNull()
    expect(data.length).toBeGreaterThan(0)
  })

  it('lee perfiles', async () => {
    const { data, error } = await cliente.from('perfiles').select('nombre, rol')
    expect(error).toBeNull()
    expect(data.length).toBeGreaterThan(0)
  })

  it('tampoco puede insertar canciones (sin policy de escritura todavía)', async () => {
    const { error } = await cliente
      .from('canciones')
      .insert({ titulo: 'tampoco debería entrar' })
    expect(error).not.toBeNull()
  })
})

import { useState } from 'react'
import { supabase } from './clienteSupabase.js'

export default function PantallaIngreso() {
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function ingresar(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    })
    if (error) {
      setError('Email o contraseña incorrectos.')
      setEnviando(false)
    }
    // Si sale bien, onAuthStateChange en Aplicacion cambia la pantalla solo.
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <form onSubmit={ingresar} className="w-full max-w-sm rounded-lg border border-stone-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-stone-800">Partituras</h1>
        <p className="mt-1 text-sm text-stone-500">Ingresá con tu email y contraseña.</p>

        <label className="mt-5 block text-sm font-medium text-stone-700">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-stone-700">
          Contraseña
          <input
            type="password"
            required
            value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)}
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 font-normal"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-5 w-full rounded bg-stone-800 px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>

        <p className="mt-4 text-xs text-stone-400">
          ¿No tenés cuenta? El acceso es por invitación: pedísela al profe.
        </p>
      </form>
    </main>
  )
}

import { useEffect, useState } from 'react'
import { supabase } from './clienteSupabase.js'

export default function Encabezado({ usuarioId }) {
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    supabase
      .from('perfiles')
      .select('nombre, rol')
      .eq('id', usuarioId)
      .single()
      .then(({ data }) => setPerfil(data))
  }, [usuarioId])

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-stone-800">Partituras</h1>
      <div className="flex items-center gap-3 text-sm">
        {perfil && (
          <span className="text-stone-600">
            {perfil.nombre} <span className="text-stone-400">({perfil.rol})</span>
          </span>
        )}
        <button
          onClick={() => supabase.auth.signOut()}
          className="rounded border border-stone-300 px-3 py-1 text-stone-600 hover:bg-stone-100"
        >
          Salir
        </button>
      </div>
    </header>
  )
}

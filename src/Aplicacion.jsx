import { useEffect, useState } from 'react'
import { supabase } from './clienteSupabase.js'

export default function Aplicacion() {
  const [canciones, setCanciones] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('canciones')
      .select('id, titulo, compositor, tonalidad')
      .order('fecha', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setCanciones(data)
      })
  }, [])

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-stone-800">Partituras</h1>
        <h2 className="mt-6 text-lg font-semibold text-stone-600">Canciones</h2>

        {error && (
          <p className="mt-4 text-red-700">No se pudieron cargar las canciones: {error}</p>
        )}
        {!error && canciones === null && <p className="mt-4 text-stone-500">Cargando…</p>}
        {canciones && canciones.length === 0 && (
          <p className="mt-4 text-stone-500">Todavía no hay canciones cargadas.</p>
        )}

        {canciones && canciones.length > 0 && (
          <ul className="mt-4 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
            {canciones.map((cancion) => (
              <li key={cancion.id} className="px-4 py-3">
                <p className="font-medium text-stone-800">{cancion.titulo}</p>
                <p className="text-sm text-stone-500">
                  {cancion.compositor ?? 'Compositor desconocido'}
                  {cancion.tonalidad && ` · ${cancion.tonalidad}`}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

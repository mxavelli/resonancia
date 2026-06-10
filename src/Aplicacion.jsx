import { useEffect, useState } from 'react'
import { supabase } from './clienteSupabase.js'
import PantallaIngreso from './PantallaIngreso.jsx'
import ListaCanciones from './ListaCanciones.jsx'
import Encabezado from './Encabezado.jsx'

export default function Aplicacion() {
  const [sesion, setSesion] = useState(null)
  const [cargandoSesion, setCargandoSesion] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSesion(data.session)
      setCargandoSesion(false)
    })
    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, nuevaSesion) => {
      setSesion(nuevaSesion)
    })
    return () => suscripcion.subscription.unsubscribe()
  }, [])

  if (cargandoSesion) return null
  if (!sesion) return <PantallaIngreso />

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Encabezado usuarioId={sesion.user.id} />
        <ListaCanciones />
      </div>
    </main>
  )
}

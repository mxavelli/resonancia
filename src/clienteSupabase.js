import { createClient } from '@supabase/supabase-js'

// Acá va SOLO la clave anon (pública). La service_role nunca toca el frontend:
// la protección real de los datos la hacen las policies de RLS.
const url = import.meta.env.VITE_SUPABASE_URL
const claveAnon = import.meta.env.VITE_SUPABASE_CLAVE_ANON

if (!url || !claveAnon) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_CLAVE_ANON. Copiá .env.example a .env y completá las claves.',
  )
}

export const supabase = createClient(url, claveAnon)

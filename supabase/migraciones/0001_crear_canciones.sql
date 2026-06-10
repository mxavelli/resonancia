-- Migración 0001: tabla canciones
-- Modelo según CLAUDE.md: canciones(id, titulo, compositor?, tonalidad?, creada_por, fecha)

create table public.canciones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  compositor text,
  tonalidad text,
  creada_por uuid references auth.users (id),
  fecha timestamptz not null default now()
);

alter table public.canciones enable row level security;

-- TEMPORAL T1: lectura abierta para poder listar canciones antes de que exista
-- auth (T2). Cuando T2 agregue login, esta policy se reemplaza por una de
-- usuarios autenticados, vía nueva migración.
create policy "lectura_publica_temporal_t1"
  on public.canciones
  for select
  to anon, authenticated
  using (true);

-- Sin policies de insert/update/delete: por ahora nadie escribe desde el
-- cliente. Las filas de ejemplo se cargan desde el panel de Supabase.

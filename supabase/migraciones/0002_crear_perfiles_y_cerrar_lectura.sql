-- Migración 0002: tabla perfiles + cierre de la lectura pública de canciones
-- Modelo según CLAUDE.md: perfiles(id, nombre, rol[profesor|alumno])

create type public.rol_perfil as enum ('profesor', 'alumno');

create table public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre text not null,
  rol public.rol_perfil not null default 'alumno'
);

alter table public.perfiles enable row level security;

-- Comunidad chica y cerrada: cualquier usuario logueado puede ver todos los
-- perfiles (hace falta para mostrar "subida por X" en partituras).
create policy "perfiles_lectura_autenticados"
  on public.perfiles
  for select
  to authenticated
  using (true);

-- Sin policies de escritura sobre perfiles: el alta es manual desde el panel
-- (crear usuario en Auth + insertar su fila acá). Nadie se cambia el rol ni
-- el nombre desde el cliente, por ahora.

-- Cierre de la policy temporal de T1: canciones deja de ser legible sin login.
drop policy "lectura_publica_temporal_t1" on public.canciones;

create policy "canciones_lectura_autenticados"
  on public.canciones
  for select
  to authenticated
  using (true);

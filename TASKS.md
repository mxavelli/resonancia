# TASKS — Partituras

> EN CURSO: migración 0002 (perfiles + cierre de lectura pública) escrita,
> pendiente de revisión del dueño. Próximo paso: aplicarla cuando se apruebe
> y crear al menos un usuario de prueba con su perfil.

## T1. Scaffold y primera pantalla con datos reales  [hito 1]
- [x] Vite + React + Tailwind corriendo en local
- [x] Cliente Supabase configurado (env vars fuera del repo)
- [x] Tabla `canciones` creada vía migración versionada (revisada por mí)
- [x] Pantalla que lista filas reales de `canciones` desde la base
- [x] Setup de testing listo, con un unitario corriendo

## T2. Auth por email + perfiles (rol profesor/alumno)
- [ ] Migración 0002: tabla `perfiles` + RLS, y cierre de la lectura pública
      de `canciones` (revisada por el dueño ANTES de aplicar)
- [ ] Pantalla de login solo email (sin registro abierto; alta manual en panel)
- [ ] Sesión: canciones solo para logueados, logout, nombre y rol en pantalla
- [ ] Tests: unitarios de lógica nueva + verificación RLS (anon no lee
      canciones, autenticado sí)

## T3. Núcleo del MVP: subir y buscar partituras
- [ ] (a detallar al llegar)

## T4. Flujo de invitación dentro de la app
- [ ] (definido, va DESPUÉS de T1–T3; hasta entonces, alta manual en Supabase)
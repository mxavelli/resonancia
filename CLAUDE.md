# Partituras (app colaborativa de partituras de clase de música)

## Qué es
App web donde un profesor de música y sus alumnos suben y encuentran las
partituras de las canciones vistas o sacadas en clase, para no perderlas ni
rehacerlas. Proyecto personal, escala chica (decenas de personas máximo),
usuarios no técnicos, público hispanohablante (Argentina). La UI va en español.

## Estado actual
Fase A (MVP), nada construido aún. El primer hito (T1) es ver datos reales de
la base en pantalla. No es "construir la app entera".

## Stack
- Frontend: React + Vite + Tailwind
- Backend / DB / Auth / Storage: Supabase (Postgres)
- Deploy: Vercel

## Principio rector
Modelar para C, construir A primero. El esquema contempla versiones, log de
clase y comentarios desde el día uno, pero el MVP solo expone subir y buscar
partituras. No construir features de fase 2 hasta que el MVP esté vivo y en
uso real. El MVP que se usa le gana al sistema completo que nunca sale.

## Reglas duras (no negociables)
- El esquema de datos y las policies de RLS las define y revisa el dueño del
  proyecto, línea por línea. Es la frontera de seguridad. No se aceptan
  policies generadas sin revisión humana.
- Cambios de esquema solo vía migraciones versionadas y revisadas. Nada de
  DDL suelto desde un cliente.
- En el upload, solo `titulo` y `archivo` son obligatorios. Todo el resto de
  la metadata es opcional. No agregar campos requeridos.
- Registro por invitación, no abierto. En el MVP el alta es manual desde el
  panel de Supabase (la T4 construye el flujo dentro de la app, después).

## Modelo de datos (fuente de verdad)
Identificadores en español (ver convenciones). MVP:
- perfiles(id, nombre, rol[profesor|alumno])      -- extiende auth de Supabase
- canciones(id, titulo, compositor?, tonalidad?, creada_por, fecha)
- partituras(id, cancion_id FK, archivo, etiqueta_version, instrumento?,
             subida_por, fecha, notas?)

Relación clave: una canción tiene muchas partituras. Es lo que hace que "la
versión original de Juan" y "la corregida" sean versiones de la misma pieza y
no dos archivos sueltos. Esa relación es lo que separa esto de "Drive con skin".

Fase 2 (esquema sí, UI después):
- clases(id, fecha, notas?, dada_por)
- clases_canciones(clase_id FK, cancion_id FK, tocada_por)
- comentarios(id, partitura_id FK, autor, texto, fecha)

## No-objetivos (lo que NO se hace, a propósito)
- Nada de orquestación multi-agente, swarms ni harnesses externos.
- Sin OCR ni conversión a notación musical. Se guardan imágenes/PDFs, no se
  transcriben.
- Sin login social (Google, etc.) en el MVP. Solo email.
- Sin features de fase 2 en la UI hasta que el MVP se use de verdad.
- Sin sobre-ingeniería de metadata: no inventar campos requeridos.

## Convenciones de código
- Idioma de identificadores (variables, funciones, tablas, columnas) y
  comentarios: ESPAÑOL, consistente. Nada de Spanglish.
  No `getCancion` ni `song_id`; sí `obtenerCancion` y `cancion_id`.
- ATENCIÓN CC: tu default es nombrar en inglés. En este repo NO. Ante la duda,
  español, también en tablas y columnas.
- Textos de UI: español.
- Estilos: solo Tailwind, sin CSS suelto salvo necesidad real.
- Commits: formato libre, en español, una línea clara por commit.

## Testing
- Hay tests desde el día uno, pero eso no frena el hito 1 por cobertura.
- Unitarios sobre lógica pura desde el arranque.
- Integración contra Supabase y verificación de policies RLS como capa
  temprana (no bloqueante del hito 1). La RLS es seguridad: esos tests pesan
  más que el coverage.
- No perseguir 100%.

## Flujo de trabajo (tareas, subtareas, continuidad de sesión)
### Fuente de verdad del progreso
- El plan vive en TASKS.md (versionado), NO en este archivo.
- Tareas padre con subtareas en checkboxes. La padre se cierra solo cuando
  TODAS sus subtareas están cerradas.

### Reglas de sesión (no negociables)
- Al iniciar cualquier sesión, antes de tocar código: leer TASKS.md y revisar
  el último estado con `git log -1` y `git status`.
- Trabajar de a UNA subtarea por vez.
- Al cerrar una subtarea: marcarla hecha en TASKS.md y commitear ese cambio.
  El commit es el punto de guardado.
- Si una subtarea queda a medias: dejar una línea "EN CURSO" al tope de
  TASKS.md con el próximo paso concreto, y commitear el WIP igual.

### Granularidad (esto ES el guardarrail)
- Subtareas chicas, que se completen y commiteen en una tanda corta. Si perder
  una a medias duele, estaba demasiado grande. Partila.

## Decisiones que define CC sobre la marcha (no fijar acá todavía)
- Estructura fina de carpetas.
- Convenciones de componentes.
- UX de estados de error y de carga.
Se deciden al construir, con revisión mía. CC: no las inventes ni las congeles
de entrada.

## Comandos
- dev: npm run dev
- build: npm run build
- test: npm test (vitest)
- (lint, deploy: completar cuando existan)
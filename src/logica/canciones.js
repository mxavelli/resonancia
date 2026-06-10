// Lógica pura sobre canciones, separada de la UI para poder testearla.

export function descripcionCancion({ compositor, tonalidad }) {
  const autor = compositor ?? 'Compositor desconocido'
  return tonalidad ? `${autor} · ${tonalidad}` : autor
}

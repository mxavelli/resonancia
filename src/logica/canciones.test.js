import { describe, it, expect } from 'vitest'
import { descripcionCancion } from './canciones.js'

describe('descripcionCancion', () => {
  it('muestra compositor y tonalidad cuando están', () => {
    expect(
      descripcionCancion({ compositor: 'Violeta Parra', tonalidad: 'La menor' }),
    ).toBe('Violeta Parra · La menor')
  })

  it('omite la tonalidad cuando falta', () => {
    expect(descripcionCancion({ compositor: 'Edmundo Zaldívar', tonalidad: null })).toBe(
      'Edmundo Zaldívar',
    )
  })

  it('usa "Compositor desconocido" cuando falta el compositor', () => {
    expect(descripcionCancion({ compositor: null, tonalidad: 'Re mayor' })).toBe(
      'Compositor desconocido · Re mayor',
    )
  })
})

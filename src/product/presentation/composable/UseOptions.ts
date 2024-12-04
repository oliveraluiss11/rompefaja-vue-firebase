export function useOptions() {
  const vegetableOptions = [
    { value: 'Lechuga', code: 'LETTUCE' },
    { value: 'Tomate', code: 'TOMATO' },
    { value: 'Pepinillo', code: 'PICKLE' },
  ]

  const sauceOptions = [
    { value: 'Mayonesa', code: 'MAYONNAISE' },
    { value: 'Mostaza', code: 'MUSTARD' },
    { value: 'Tartara', code: 'TARTAR' },
    { value: 'Ketchup', code: 'KETCHUP' },
    { value: 'Ají', code: 'AJI' },
    { value: 'Aceituna', code: 'OLIVE' },
  ]

  const friesOptions = [
    { value: 'Papas fritas', code: 'FRENCH_FRIES' },
    { value: 'Papas al hilo', code: 'SHOESTRING_FRIES' },
  ]

  return {
    vegetableOptions,
    sauceOptions,
    friesOptions,
  }
}

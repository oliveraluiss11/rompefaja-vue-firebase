export interface Customization {
  fries: string // Código de las papas (e.g., "FRENCH_FRIES")
  vegetables: Record<string, boolean> // Vegetales seleccionados
  sauces: Record<string, boolean> // Salsas seleccionadas
}

export interface CartItem {
  id: number
  name: string
  description: string
  price: string
  image: string
  customization: Customization // Tipo explícito para personalización
  quantity: number
}

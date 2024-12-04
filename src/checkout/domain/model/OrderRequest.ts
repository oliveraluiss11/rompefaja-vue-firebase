// Interfaces
export interface Customization {
  fries: string
  vegetables: Record<string, boolean>
  sauces: Record<string, boolean>
}

export interface OrderStatus {
  status: 'PENDING' | 'ACCEPTED' | 'DELIVERED' | 'CANCELLED'
  date: Date
}

export interface CheckoutItem {
  productId: string
  productName: string
  price: number
  quantity: number
  customizations: Customization
}

export interface OrderRequest {
  items: CheckoutItem[]
  dni: string
  cellphone: string
  address: string
  reference: string
  additionalDetails: string
  paymentMethod: string
  alternativeIngredients: boolean
  termsAccepted: boolean
  statusHistory?: OrderStatus[]
}

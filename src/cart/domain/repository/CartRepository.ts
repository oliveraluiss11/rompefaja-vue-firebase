import type { CartItem } from '../model/CartItem'

export interface CartRepository {
  updateCartItemQuantity: (item: CartItem, newQuantity: number) => Promise<void>
}

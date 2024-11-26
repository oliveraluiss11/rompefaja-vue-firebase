import { ref } from 'vue'
import type { CartItem } from '../domain/model/CartItem'
import type { CartRepository } from '../domain/repository/CartRepository'

// Estado reactivo para el carrito
const cartItems = ref<CartItem[]>([])

export const CartLocalRepositoryImpl: CartRepository = {
  updateCartItemQuantity: async (item: CartItem, newQuantity: number): Promise<void> => {
    const index = cartItems.value.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.customization) === JSON.stringify(item.customization), // Compara personalización
    )

    if (index !== -1) {
      if (newQuantity > 0) {
        cartItems.value[index].quantity = newQuantity
      } else {
        // Eliminar el producto del carrito si la cantidad es 0
        cartItems.value.splice(index, 1)
      }
    }
  },
}

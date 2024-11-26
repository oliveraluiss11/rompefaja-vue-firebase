import type { CartItem, Customization } from '@/cart/domain/model/CartItem'
import type { ProductDto } from '@/product/domain/model/ProductDto'
import { ref, computed } from 'vue'

export function useCart() {
  const cartItems = ref<CartItem[]>([])

  // Total de items en el carrito
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  // Agregar al carrito
  const addToCart = (product: ProductDto, customization: Customization) => {
    const newItem: CartItem = {
      ...product,
      customization: { ...customization },
      quantity: 1,
    }

    // Buscar si el producto ya está en el carrito con la misma personalización
    const existingItemIndex = cartItems.value.findIndex(
      (item) =>
        item.id === newItem.id &&
        JSON.stringify(item.customization) === JSON.stringify(newItem.customization),
    )

    if (existingItemIndex !== -1) {
      cartItems.value[existingItemIndex].quantity++
    } else {
      cartItems.value.push(newItem)
    }
  }

  // Actualizar cantidad de productos en el carrito
  const updateCartItemQuantity = (item: CartItem, newQuantity: number) => {
    const index = cartItems.value.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.customization) === JSON.stringify(item.customization),
    )

    if (index !== -1) {
      if (newQuantity > 0) {
        cartItems.value[index].quantity = newQuantity
      } else {
        // Eliminar el producto si la cantidad es 0
        cartItems.value.splice(index, 1)
      }
    }
  }

  // Eliminar un producto del carrito
  const removeFromCart = (item: CartItem) => {
    const index = cartItems.value.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.customization) === JSON.stringify(item.customization),
    )

    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  return {
    cartItems,
    cartItemCount,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
  }
}

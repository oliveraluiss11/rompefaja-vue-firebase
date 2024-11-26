import type { CartItem } from '../domain/model/CartItem'
import type { CartRepository } from '../domain/repository/CartRepository'

export interface UpdateCartItemQuantityUseCase {
  execute: (item: CartItem, newQuantity: number) => Promise<void>
}

export const createUpdateCartItemQuantity = (
  cartRepository: CartRepository,
): UpdateCartItemQuantityUseCase => ({
  execute: async (item: CartItem, newQuantity: number): Promise<void> => {
    await cartRepository.updateCartItemQuantity(item, newQuantity)
  },
})

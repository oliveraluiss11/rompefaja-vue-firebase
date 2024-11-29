import type { OrderRequest } from '../domain/model/OrderRequest'
import type { OrderRepository } from '../domain/repository/OrderRepository'

export interface CreateOrderUseCase {
  execute(request: OrderRequest): Promise<void>
}

export const createOrderUseCase = (orderRepository: OrderRepository): CreateOrderUseCase => ({
  async execute(request: OrderRequest): Promise<void> {
    await orderRepository.createOrder(request)
  },
})

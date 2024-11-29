import type { OrderRequest } from '../domain/model/OrderRequest'
import type { OrderRepository } from '../domain/repository/OrderRepository'

export interface CreateOrderUseCase {
  execute(request: OrderRequest): Promise<void>
}

export const createOrderUseCase = (orderRepository: OrderRepository): CreateOrderUseCase => ({
  async execute(request: OrderRequest): Promise<void> {
    // Calcular precios en paralelo
    let subtotal = 0.0 as number

    for (const item of request.items) {
      subtotal += item.quantity * item.price
    }
    // Costo de envío fijo
    const shippingCost = 3.0

    // Total
    const total = subtotal + shippingCost

    // Agregar los montos al request para guardarlo en Firestore
    const extendedRequest = {
      ...request,
      subtotal,
      shippingCost,
      total,
    }
    await orderRepository.createOrder(extendedRequest)
  },
})

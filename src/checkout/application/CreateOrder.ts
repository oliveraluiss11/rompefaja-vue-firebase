import type { BusinessRepository } from '@/business/domain/repository/ValidationBusinessRepository'
import type { OrderRequest, OrderStatus } from '../domain/model/OrderRequest'
import type { OrderRepository } from '../domain/repository/OrderRepository'

export interface CreateOrderUseCase {
  execute(request: OrderRequest): Promise<void>
}

export const createOrderUseCase = (
  orderRepository: OrderRepository,
  businessRepository: BusinessRepository,
): CreateOrderUseCase => ({
  async execute(request: OrderRequest): Promise<void> {
    if (businessRepository.isBusinessClosed()) {
      throw new Error('El negocio está cerrado. No se pueden realizar pedidos en este momento.')
    }
    // Calcular precios en paralelo
    let subtotal = 0.0 as number

    for (const item of request.items) {
      subtotal += item.quantity * item.price
    }
    // Costo de envío fijo
    const shippingCost = 3.0

    // Total
    const total = subtotal + shippingCost
    const statusHistory = [
      {
        status: 'PENDING',
        date: new Date(),
      },
    ] as OrderStatus[]
    // Agregar los montos al request para guardarlo en Firestore
    const extendedRequest = {
      ...request,
      statusHistory,
      subtotal,
      shippingCost,
      total,
    }
    await orderRepository.createOrder(extendedRequest)
  },
})

import type { OrderRequest } from '../model/OrderRequest'

export interface OrderRepository {
  createOrder(orderRequest: OrderRequest): Promise<void>
}

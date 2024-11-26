import type { PaymentMethod } from '../model/PaymentMethod'

export interface PaymentMethodRepository {
  getPaymentMethods(): PaymentMethod[]
}

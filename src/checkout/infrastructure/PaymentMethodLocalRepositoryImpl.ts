import type { PaymentMethod } from '../domain/model/PaymentMethod'

export const paymentMethodLocalRepositoryImpl = {
  getPaymentMethods(): PaymentMethod[] {
    return [
      { code: 'PLIN', value: 'Plin' },
      { code: 'YAPE', value: 'Yape' },
      { code: 'CASH', value: 'Efectivo' },
    ]
  },
}

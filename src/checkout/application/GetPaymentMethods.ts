import type { PaymentMethod } from '../domain/model/PaymentMethod'
import { paymentMethodLocalRepositoryImpl } from '../infrastructure/PaymentMethodLocalRepositoryImpl'

export const getPaymentMethodsUseCase = {
  execute(): PaymentMethod[] {
    return paymentMethodLocalRepositoryImpl.getPaymentMethods()
  },
}

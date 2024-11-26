import { ref } from 'vue'
import { getPaymentMethodsUseCase } from '@/checkout/application/GetPaymentMethods'
import type { PaymentMethod } from '@/checkout/domain/model/PaymentMethod'

export function useCheckout() {
  // Formulario reactivo
  const formData = ref({
    dni: '',
    phone: '',
    address: '',
    reference: '',
    additionalDetails: '',
    paymentMethod: '',
    alternativeIngredients: false,
    termsAccepted: false,
  })

  // Obtener los métodos de pago
  const paymentMethods = ref<PaymentMethod[]>(getPaymentMethodsUseCase.execute())

  const showTermsModal = ref(false)

  const submitOrder = async () => {
    console.log('Order submitted:', formData.value)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderAccepted = Math.random() > 0.2 // Simula un 80% de éxito

    if (orderAccepted) {
      alert('Su pedido ha sido aceptado. Recibirá un mensaje de texto con la confirmación.')
    } else {
      alert('Lo sentimos, su pedido ha sido rechazado. Por favor, inténtelo de nuevo más tarde.')
    }
  }

  return {
    formData,
    paymentMethods,
    showTermsModal,
    submitOrder,
  }
}

import { ref } from 'vue'
import { getPaymentMethodsUseCase } from '@/checkout/application/GetPaymentMethods'
import type { PaymentMethod } from '@/checkout/domain/model/PaymentMethod'
import { useRouter } from 'vue-router'
import { useCheckoutStore } from '@/store/CheckoutStore'
import { createOrderUseCase } from '@/checkout/application/CreateOrder'
import { orderFirebaseRepositoryImpl } from '@/checkout/infrastructure/OrderFirebaseRepositoryImpl'

export function useCheckout() {
  const router = useRouter()
  const checkoutStore = useCheckoutStore()

  // Formulario reactivo
  const formData = ref({
    dni: '',
    cellphone: '',
    address: '',
    reference: '',
    additionalDetails: '',
    paymentMethod: '',
    alternativeIngredients: false,
    termsAccepted: false,
  })

  // Estado del modal OTP
  const showOtpModal = ref(false)
  const otpError = ref('')

  // Obtener los métodos de pago
  const paymentMethods = ref<PaymentMethod[]>(getPaymentMethodsUseCase.execute())

  const showTermsModal = ref(false)

  // Verificar OTP y proceder con el pedido
  const verifyAndSubmitOrder = async () => {
    checkoutStore.setCheckoutData(formData.value)
    const createOrder = createOrderUseCase(orderFirebaseRepositoryImpl)
    console.info(checkoutStore.state)
    createOrder
      .execute(checkoutStore.state)
      .then(() => {
        alert('Su pedido ha sido aceptado. Recibirá un mensaje de texto con la confirmación.')
        resetCheckout() // Limpiar el estado
        router.push('/') // Redirigir al inicio
      })
      .catch((error: Error) => {
        alert(error.message)
      })
  }

  // Limpiar los campos del formulario y el estado del store
  const resetCheckout = () => {
    formData.value = {
      dni: '',
      cellphone: '',
      address: '',
      reference: '',
      additionalDetails: '',
      paymentMethod: '',
      alternativeIngredients: false,
      termsAccepted: false,
    }

    checkoutStore.clearState()
    otpError.value = ''
  }

  return {
    formData,
    paymentMethods,
    showTermsModal,
    showOtpModal,
    otpError,
    verifyAndSubmitOrder,
    resetCheckout,
  }
}

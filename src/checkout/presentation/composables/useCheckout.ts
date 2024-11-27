import { ref } from 'vue'
import { getPaymentMethodsUseCase } from '@/checkout/application/GetPaymentMethods'
import type { PaymentMethod } from '@/checkout/domain/model/PaymentMethod'
import { useRouter } from 'vue-router'
import { useCheckoutStore } from '@/store/CheckoutStore'
import { createGenerateOtpUseCase } from '@/checkout/application/GenerateOtp'
import { otpMockRepositoryImpl } from '@/checkout/infrastructure/OtpMockRepositoryImpl'

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

  // Abrir el modal OTP
  const submitOrder = async () => {
    try {
      // Guardar los datos en el store
      checkoutStore.setCheckoutData(formData.value)
      // Llamar al caso de uso para generar OTP
      const generateOtpUseCase = createGenerateOtpUseCase(otpMockRepositoryImpl)

      await generateOtpUseCase.execute({
        cellphone: checkoutStore.state.cellphone,
        purpose: 'ORDER_REQUEST',
      })
      // Si se genera exitosamente, abre el modal OTP
      showOtpModal.value = true
    } catch (error) {
      console.error('Error al generar OTP:', error)
      alert('No se pudo generar el OTP. Por favor, inténtalo nuevamente.')
    }
  }

  // Verificar OTP y proceder con el pedido
  const verifyAndSubmitOrder = async (otpCode: string) => {
    console.log('Verificando OTP:', otpCode)

    // Simular validación del OTP
    if (otpCode === '1234') {
      otpError.value = ''
      alert('OTP verificado correctamente. Procesando pedido...')

      // Simular envío del pedido
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderAccepted = Math.random() > 0.2 // Simula un 80% de éxito

      if (orderAccepted) {
        alert(
          'Su pedido ha sido aceptado. Recibirá un mensaje de texto con la confirmación.' +
            JSON.stringify(checkoutStore.state, null, 2),
        )

        resetCheckout() // Limpiar el estado
        router.push('/') // Redirigir al inicio
      } else {
        alert('Lo sentimos, su pedido ha sido rechazado. Por favor, inténtelo de nuevo más tarde.')
      }

      showOtpModal.value = false // Cierra el modal
    } else {
      otpError.value = 'El código OTP ingresado es incorrecto.'
    }
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
    submitOrder,
    verifyAndSubmitOrder,
    resetCheckout,
  }
}

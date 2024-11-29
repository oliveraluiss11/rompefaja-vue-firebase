import { ref } from 'vue'
import { getPaymentMethodsUseCase } from '@/checkout/application/GetPaymentMethods'
import type { PaymentMethod } from '@/checkout/domain/model/PaymentMethod'
import { useRouter } from 'vue-router'
import { useCheckoutStore } from '@/store/CheckoutStore'
import { createOrderUseCase } from '@/checkout/application/CreateOrder'
import { orderFirebaseRepositoryImpl } from '@/checkout/infrastructure/OrderFirebaseRepositoryImpl'

interface NotificationType {
  success: 'success'
  error: 'error'
}
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

  // Modal de notificación
  const showNotificationModal = ref<boolean>(false)
  const notificationMessage = ref<string>('')
  const notificationType = ref<keyof NotificationType>('success')

  // Verificar OTP y proceder con el pedido
  const verifyAndSubmitOrder = async () => {
    checkoutStore.setCheckoutData(formData.value)
    const createOrder = createOrderUseCase(orderFirebaseRepositoryImpl)
    console.info(checkoutStore.state)
    createOrder
      .execute(checkoutStore.state)
      .then(() => {
        notificationMessage.value =
          'Su pedido ha sido registrado. Revisaremos su solicitud lo más pronto posible. ¡Gracias por realizar su pedido en Rompe Faja Food!'
        notificationType.value = 'success'
        showNotificationModal.value = true
      })
      .catch((error: Error) => {
        notificationMessage.value =
          error instanceof Error ? error.message : 'Ha ocurrido un error al procesar su pedido.'
        notificationType.value = 'error'
        showNotificationModal.value = true
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

  const closeNotificationModal = () => {
    showNotificationModal.value = false
    if (notificationType.value === 'success') {
      resetCheckout() // Limpiar el estado
      router.push('/') // Redirigir al inicio
    }
  }

  return {
    formData,
    paymentMethods,
    showTermsModal,
    showOtpModal,
    otpError,
    verifyAndSubmitOrder,
    resetCheckout,
    showNotificationModal,
    notificationMessage,
    notificationType,
    closeNotificationModal,
  }
}

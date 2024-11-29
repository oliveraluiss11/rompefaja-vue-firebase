import type { CheckoutItem, OrderRequest } from '@/checkout/domain/model/OrderRequest'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define el store
export const useCheckoutStore = defineStore('checkout', () => {
  // Estado inicial
  const state = ref<OrderRequest>({
    items: [], // Inicialmente vacío
    dni: '',
    cellphone: '',
    address: '',
    reference: '',
    additionalDetails: '',
    paymentMethod: '',
    alternativeIngredients: false,
    termsAccepted: false,
    otp: '',
  })

  // Establecer productos desde CartModal
  const setItems = (newItems: CheckoutItem[]) => {
    state.value.items = newItems
  }
  // Establecer el valor de otp
  const setOtp = (otpCode: string) => {
    state.value.otp = otpCode
  }
  // Establecer los datos restantes del checkout (formData) desde /checkout
  const setCheckoutData = (data: Partial<Omit<OrderRequest, 'items'>>) => {
    state.value = { ...state.value, ...data }
  }

  const clearState = () => {
    state.value = {
      items: [], // Limpiar productos seleccionados
      dni: '',
      cellphone: '',
      address: '',
      reference: '',
      additionalDetails: '',
      paymentMethod: '',
      alternativeIngredients: false,
      termsAccepted: false,
      otp: '',
    }
  }

  return {
    state,
    setItems,
    setCheckoutData,
    clearState,
    setOtp,
  }
})

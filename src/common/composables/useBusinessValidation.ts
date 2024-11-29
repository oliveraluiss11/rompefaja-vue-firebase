import { validationBusinessLocalRepositoryImpl } from '@/business/infrastructure/ValidationBusinessLocalRepositoryImpl'
import { ref } from 'vue'

export function useBusinessValidation() {
  const isClosed = ref(false) // Estado reactivo para manejar el cierre del negocio

  // Validar el estado del negocio
  const validateBusinessState = () => {
    isClosed.value = validationBusinessLocalRepositoryImpl.isBusinessClosed()
    console.info('Esta cerrado?' + isClosed.value)
  }

  return {
    isClosed,
    validateBusinessState,
  }
}

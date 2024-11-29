// src/stores/businessValidationStore.ts
import { defineStore } from 'pinia'
import { validationBusinessLocalRepositoryImpl } from '@/business/infrastructure/ValidationBusinessLocalRepositoryImpl'

export const useBusinessValidationStore = defineStore('businessValidation', {
  state: () => ({
    isClosed: false, // Estado para manejar si el negocio está cerrado
  }),
  actions: {
    validateBusinessState() {
      this.isClosed = validationBusinessLocalRepositoryImpl.isBusinessClosed()
      console.info('¿Está cerrado?', this.isClosed)
    },
  },
})

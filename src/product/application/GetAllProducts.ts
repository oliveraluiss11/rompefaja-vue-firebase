import type { ProductDto } from '../domain/model/ProductDto'
import type { ProductRepository } from '../domain/repository/ProductRepository'

// Definición de la interfaz para el caso de uso
export interface GetAllProducts {
  execute: () => Promise<ProductDto[]>
}

// Implementación funcional del caso de uso
export const createGetAllProducts = (productRepository: ProductRepository): GetAllProducts => ({
  execute: async (): Promise<ProductDto[]> => {
    return await productRepository.getAllProducts()
  },
})

import type { ProductDto } from '../domain/model/ProductDto'
import type { ProductRepository } from '../domain/repository/ProductRepository'
import axiosInstance from '../../axiosInstance'
import type { ProductListResponse } from '../domain/model/ProductListResponse'
export const productMockRepositoryImpl: ProductRepository = {
  // Obtener todos los productos
  getAllProducts: async (): Promise<ProductDto[]> => {
    try {
      const response = await axiosInstance.get('/v3/7a113a8b-39cd-4805-a1b7-d48ac4ca3264')
      if (response.status !== 200) {
        throw new Error('Error al obtener los productos')
      }
      console.log(response.data)
      const dataResponse = response.data as ProductListResponse
      return dataResponse.products
    } catch (error) {
      console.error('Error en getAllProducts:', error)
      throw error
    }
  },
}

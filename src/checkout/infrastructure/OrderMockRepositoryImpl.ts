import axiosInstance from '@/axiosInstance'
import type { OrderRequest } from '../domain/model/OrderRequest'
import type { OrderRepository } from '../domain/repository/OrderRepository'

export const orderMockRepositoryImpl: OrderRepository = {
  createOrder: async function (orderRequest: OrderRequest): Promise<void> {
    // Envía el objeto `generateOtp` como cuerpo de la solicitud
    const response = await axiosInstance.post(
      '/v3/60c914aa-e7b6-44ff-9d6d-ff17e1baecc7',
      orderRequest, // Aquí va el body
    )

    if (response.status !== 200) {
      throw new Error('Error al crear orden')
    }

    alert('Se creó la orden')
  },
}

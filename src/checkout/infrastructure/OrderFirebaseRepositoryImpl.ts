import { addDoc, collection } from 'firebase/firestore'
import type { OrderRequest } from '../domain/model/OrderRequest'
import type { OrderRepository } from '../domain/repository/OrderRepository'
import { db } from '@/firebase'

export const orderFirebaseRepositoryImpl: OrderRepository = {
  createOrder: async function (orderRequest: OrderRequest): Promise<void> {
    try {
      // Agrega un nuevo documento en la colección "orders"
      const response = await addDoc(collection(db, 'orders'), {
        ...orderRequest, // Propiedades del objeto orderRequest
        createdAt: new Date(), // Puedes añadir campos adicionales si es necesario
        status: 'PENDING',
      })

      console.log('Orden creada con ID:', response.id) // El ID del documento creado
    } catch (error) {
      console.error('Error al crear la orden:', error)
      throw Error('No se pudo realizar la orden.') // Relanzar el error para que pueda ser manejado por los consumidores
    }
  },
}

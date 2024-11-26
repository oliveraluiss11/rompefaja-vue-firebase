import type { ProductDto } from '../domain/model/ProductDTO'
import type { ProductRepository } from '../domain/repository/ProductRepository'

export const productLocalRepositoryImpl: ProductRepository = {
  getAllProducts: async (): Promise<ProductDto[]> => {
    const products: ProductDto[] = [
      {
        id: 1,
        name: 'Royal Crispy',
        description: 'Pollo crispy + huevo + ensalada + papas fritas o al hilo',
        price: '11.50',
        image:
          'https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Fhamburguesa_crispy_royal.jpeg?alt=media&token=a4d8cba1-fe71-4558-8cf7-6e4c42c55926',
        category: 'BURGUER',
      },
      {
        id: 2,
        name: 'Alitas Crujientes',
        description: '6 piezas de alitas + ensalada + papas fritas',
        price: '18.00',
        image:
          'https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Falitas_crujientes.jpeg?alt=media&token=920a1ce7-1c95-4f7c-985b-de7c3ea71ffe',
        category: 'WINGS',
      },
      {
        id: 3,
        name: 'Alitas BBQ',
        description: '6 piezas de alitas + ensalada + papas fritas',
        price: '18.00',
        image:
          'https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Falitas_bbq.jpeg?alt=media&token=21e27985-1827-44be-8ab2-dd0c1f89df3a',
        category: 'WINGS',
      },
      {
        id: 4,
        name: 'Alitas Acevichadas',
        description: '6 piezas de alitas + ensalada + papas fritas',
        price: '18.00',
        image:
          'https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Falitas_acevichadas.jpeg?alt=media&token=286250a0-133a-4d74-ba26-aedeba5443d2',
        category: 'WINGS',
      },
      {
        id: 5,
        name: 'Pollo Broaster 1/4',
        description: 'Pollo broaster + ensalada + papas',
        price: '17.00',
        image:
          'https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Fbroaster_cuarto.jpeg?alt=media&token=265a7f66-8cf0-46d1-b8f6-4a0bdd7bd8ed',
        category: 'CHICKEN_FRIES',
      },
    ]

    return Promise.resolve(products)
  },
}

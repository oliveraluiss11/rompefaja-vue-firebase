import type { ProductDto } from '../model/ProductDto'

export type ProductRepository = {
  getAllProducts: () => Promise<ProductDto[]>
}

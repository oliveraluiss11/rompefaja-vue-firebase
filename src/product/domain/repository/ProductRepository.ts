import type { ProductDto } from '../model/ProductDTO'

export type ProductRepository = {
  getAllProducts: () => Promise<ProductDto[]>
}

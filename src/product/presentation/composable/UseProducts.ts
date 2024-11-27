import { ref, computed } from 'vue'
import { createGetAllProducts } from '@/product/application/GetAllProducts'
import type { ProductDto } from '@/product/domain/model/ProductDto'
import { productMockRepositoryImpl } from '@/product/infrastructure/ProductLocalRepositoryImpl'
export function useProducts() {
  const products = ref<ProductDto[]>([])
  const searchQuery = ref('')

  const getAllProductsUseCase = createGetAllProducts(productMockRepositoryImpl)

  const loadProducts = async () => {
    products.value = await getAllProductsUseCase.execute()
  }

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      if (searchQuery.value) {
        return product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      }
      return true
    })
  })

  return {
    products,
    searchQuery,
    filteredProducts,
    loadProducts,
  }
}

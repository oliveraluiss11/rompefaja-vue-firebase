import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductListView from '@/product/presentation/views/ProductListView.vue'
import CheckoutView from '@/checkout/presentation/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'product-list',
      component: ProductListView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
  ],
})

export default router

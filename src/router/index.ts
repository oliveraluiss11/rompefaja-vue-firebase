import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductListView from '@/views/ProductListView.vue'
import CheckoutPage from '@/components/CheckoutPage.vue'

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
      component: CheckoutPage,
    },
  ],
})

export default router

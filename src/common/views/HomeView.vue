<script setup lang="ts">
import { UtensilsCrossedIcon, MessageCircleIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <UtensilsCrossedIcon class="h-6 w-6" />
          <span class="font-bold">La Rompe Faja</span>
        </div>

        <div class="hidden md:flex space-x-6">
          <a @click.prevent="navigateTo('/products')" class="text-gray-600 cursor-pointer">Tienda</a>
          <a @click.prevent="navigateTo('/faq')" class="text-gray-600 cursor-pointer">FAQ</a>
          <a @click.prevent="navigateTo('/location')" class="text-gray-600 cursor-pointer">Local</a>
          <a @click.prevent="navigateTo('/about')" class="text-gray-600 cursor-pointer">Nosotros</a>
        </div>

        <div>
          <a @click.prevent="navigateTo('/products')" class="px-4 py-1.5 rounded-full bg-blue-500 text-white ">
            Ordenar ahora
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <div class="max-w-4xl mx-auto px-6 pt-8 pb-16 text-center">
      <h1 class="text-[80px] leading-none font-bold mb-6">
        tu comida favorita
        <br />
        a un click
      </h1>
      <p class="text-gray-600 text-xl mb-12">
        La app de delivery más sabrosa. Pide ahora y disfruta
        de nuestras deliciosas hamburguesas, pollo y alitas.
      </p>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <!-- Order Info -->
        <div class="bg-black text-white p-6 rounded-2xl">
          <div class="text-left">
            <p class="text-sm mb-4">Horario de atención</p>
            <div class="space-y-2 mb-4">
              <p class="text-sm">Lun, Mié, Jue: 6:00 PM - 12:00 AM</p>
              <p class="text-sm">Vie, Sáb, Dom: 6:00 PM - 1:00 AM</p>
              <p class="text-sm">Martes: Cerrado</p>
            </div>
            <p class="text-sm mb-2">Métodos de pago:</p>
            <div class="flex space-x-2">
              <span class="text-xs bg-gray-800 px-2 py-1 rounded">Yape</span>
              <span class="text-xs bg-gray-800 px-2 py-1 rounded">Plin</span>
              <span class="text-xs bg-gray-800 px-2 py-1 rounded">Efectivo</span>
            </div>
            <a href="https://wa.link/8mkk5w" target="_blank" rel="noopener noreferrer"
              class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <MessageCircleIcon class="h-5 w-5 mr-2" />
              Contáctanos por WhatsApp
            </a>
          </div>
        </div>

        <!-- Central Image -->
        <div class="relative">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2FWhatsApp%20Image%202024-11-08%20at%2011.55.41%20AM.jpeg?alt=media&token=97aefb6d-9ea0-405a-8674-4d1e13744a71"
            alt="Deliciosa hamburguesa" class="rounded-2xl w-full h-full object-cover" />
        </div>

        <!-- Status Card -->
        <div class="flex flex-col gap-4">
          <div class="bg-green-50 p-4 rounded-2xl">
            <p class="font-medium">Tiempo de entrega: 15-30 minutos</p>
          </div>

          <div class="bg-purple-100 p-4 rounded-2xl">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-full bg-purple-200"></div>
              <span class="font-medium">Último pedido</span>
              <span class="text-sm text-gray-500">hace 5m</span>
            </div>
            <div class="space-y-2">
              <p class="font-medium">Hamburguesa Rompe Faja</p>
              <p class="text-sm text-gray-600">Estado: En preparación</p>
            </div>
          </div>

          <div class="bg-gray-100 p-4 rounded-2xl">
            <h3 class="font-medium mb-2">Nuestra ubicación</h3>
            <p class="text-sm text-gray-600">
              Av. Bolivar Mz E1 Lt 3<br>
              Casma, Ancash, Perú<br>
              (Frente al BCP)
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 class="text-3xl font-bold mb-6">Conoce más sobre nosotros</h2>
      <p class="text-gray-600 mb-8">
        Descubre al equipo detrás de La Rompe Faja y las tecnologías que hacen posible nuestra deliciosa experiencia.
      </p>
      <a href="/about" class="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
        Conoce al equipo y nuestra tecnología
      </a>
    </div>
  </div>
</template>

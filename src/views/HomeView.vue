<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const linkToProducts = async () => {
  router.push("/products");
}
</script>

<template>
  <div class="min-h-screen bg-cover bg-center flex flex-col" style="background-image: url('/public/bg-burguer.png')">
    <!-- Navigation -->
    <nav class="p-12">
      <div class="flex items-center">
        <h1 class="text-white text-xl font-medium">
          Jayway <span class="text-orange-400">Partners</span>
        </h1>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="container mx-auto px-12 py-12 flex flex-col md:flex-row items-center justify-between flex-1">
      <!-- Text Content -->
      <div class="md:w-1/2 space-y-6">
        <h2 class="text-5xl md:text-6xl font-bold text-orange-400">
          La Rompe Faja
        </h2>
        <p class="text-white text-lg md:text-xl leading-relaxed max-w-md">
          Déjate llevar por el sabor y ven a saciar tus antojos con nuestras irresistibles hamburguesas. ¡Te esperamos!
        </p>
        <button @click="linkToProducts"
          class="bg-orange-400 hover:bg-orange-500 text-white font-medium px-8 py-3 rounded-md transition-colors duration-300">
          Realizar Pedido
        </button>
      </div>
    </main>
  </div>
</template>

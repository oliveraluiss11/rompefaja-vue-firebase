<template>
    <div class="min-h-screen bg-white">
        <nav class="px-6 py-4 border-b">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <UtensilsCrossedIcon class="h-6 w-6" />
                    <span class="font-bold">La Rompe Faja</span>
                </div>
                <a href="/" class="text-gray-600 hover:text-black">Volver al inicio</a>
            </div>
        </nav>

        <div class="max-w-3xl mx-auto px-6 py-12">
            <h1 class="text-4xl font-bold mb-8 text-center">Nuestro Local</h1>

            <div class="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 class="text-2xl font-semibold mb-4">Ubicación</h2>
                <p class="text-gray-600 mb-2">Av. Bolivar Mz E1 Lt 3</p>
                <p class="text-gray-600 mb-2">Casma, Ancash, Perú</p>
                <p class="text-gray-600 mb-4">Referencia: Frente al BCP</p>

                <h3 class="text-xl font-semibold mb-2">Horario de atención</h3>
                <ul class="text-gray-600 list-disc list-inside">
                    <li>Lunes, Miércoles, Jueves: 6:00 PM - 12:00 AM</li>
                    <li>Viernes, Sábado, Domingo: 6:00 PM - 1:00 AM</li>
                    <li>Martes: Cerrado</li>
                </ul>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg">
                <h2 class="text-2xl font-semibold mb-4">Contacto</h2>
                <p class="text-gray-600 mb-2">Teléfono: 907 100 438</p>
                <p class="text-green-600 mb-2"> <a href="https://wa.link/8mkk5w" target="_blank">Whatsapp</a></p>
            </div>
            <!-- Aquí se podría agregar un mapa de Google Maps si se desea -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { UtensilsCrossedIcon } from 'lucide-vue-next'
</script>
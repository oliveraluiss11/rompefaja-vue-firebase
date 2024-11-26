<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto overflow-hidden transform transition-transform scale-95 opacity-0"
            :class="{ 'scale-100 opacity-100': show }">
            <div class="p-6">
                <!-- Header -->
                <div class="flex justify-between items-center border-b pb-4">
                    <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
                    <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Cerrar">
                        <XIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Product Info -->
                <div class="flex items-center gap-4 my-6" v-if="product">
                    <img :src="product.image" :alt="product.name" class="w-24 h-24 object-cover rounded-lg border" />
                    <div>
                        <h3 class="font-semibold text-lg text-gray-800">{{ product.name }}</h3>
                        <p class="text-sm text-gray-600">{{ product.description }}</p>
                        <p class="text-blue-600 font-semibold mt-2">S/ {{ product.price }}</p>
                    </div>
                </div>

                <!-- Customization Options -->
                <div class="space-y-6">
                    <!-- Slot para contenido dinámico -->
                    <slot></slot>
                </div>

                <!-- Botón para agregar al carrito -->
                <button @click="$emit('add-to-cart')"
                    class="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 rounded-lg mt-6 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {{ buttonLabel }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { XIcon } from 'lucide-vue-next';

// Props para pasar datos
defineProps({
    show: { type: Boolean, required: true },
    title: { type: String, default: 'Modal' },
    product: {
        type: Object as () => { name: string; description: string; price: string; image: string } | null,
        default: null,
    },
    buttonLabel: { type: String, default: 'Confirmar' },
});

// Emitir eventos
defineEmits(['close', 'add-to-cart']);
</script>
<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Carrito de Compras</h2>
                    <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Cerrar">
                        <XIcon class="h-6 w-6" />
                    </button>
                </div>

                <div class="space-y-4 mb-6">
                    <div v-for="item in cartItems" :key="`${item.id}-${JSON.stringify(item.customization)}`"
                        class="flex justify-between items-center">
                        <div>
                            <h3 class="font-medium">{{ item.name }}</h3>
                            <p class="text-sm text-gray-600">
                                Papas: {{ item.customization.fries === 'fritas' ? 'Fritas' : 'Al hilo' }}
                            </p>
                            <p class="text-sm text-gray-600">
                                Vegetales: {{ getSelectedVegetables(item.customization.vegetables) }}
                            </p>
                            <p class="text-sm text-gray-600">
                                Salsas: {{ getSelectedSauces(item.customization.sauces) }}
                            </p>
                        </div>
                        <div class="text-right flex flex-col items-end">
                            <p class="font-medium">S/ {{ (parseFloat(item.price) * item.quantity).toFixed(2) }}</p>
                            <div class="flex items-center mt-1">
                                <button @click="decreaseQuantity(item)"
                                    class="bg-gray-200 text-gray-600 hover:bg-gray-300 h-6 w-6 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Decrease quantity">
                                    <MinusIcon class="h-4 w-4" />
                                </button>
                                <span class="mx-2 text-sm">{{ item.quantity }}</span>
                                <button @click="increaseQuantity(item)"
                                    class="bg-gray-200 text-gray-600 hover:bg-gray-300 h-6 w-6 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Increase quantity">
                                    <PlusIcon class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-t pt-4">
                    <div class="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>S/ {{ subtotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Costo de envío:</span>
                        <span>S/ 3.00</span>
                    </div>
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>S/ {{ (subtotal + 3).toFixed(2) }}</span>
                    </div>
                </div>

                <button @click="router.push('/checkout')"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Proceder al pago
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { XIcon, MinusIcon, PlusIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface Vegetables {
    lechuga: boolean;
    tomate: boolean;
    pepinillo: boolean;
    cebolla: boolean;
}

interface Sauces {
    mayonesa: boolean;
    mostaza: boolean;
    tartara: boolean;
    ketchup: boolean;
    aji: boolean;
    aceituna: boolean;
}

interface Customization {
    fries: 'fritas' | 'hilo';
    vegetables: Vegetables;
    sauces: Sauces;
}

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    customization: Customization;
    quantity: number;
}

const props = defineProps<{
    cartItems: CartItem[]
}>()

const subtotal = computed(() => {
    return props.cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
})

const getSelectedVegetables = (vegetables: Vegetables): string => {
    return Object.entries(vegetables)
        .filter(([, selected]) => selected)
        .map(([name]) => name)
        .join(', ')
}

const getSelectedSauces = (sauces: Sauces): string => {
    return Object.entries(sauces)
        .filter(([, selected]) => selected)
        .map(([name]) => name)
        .join(', ')
}

const emit = defineEmits(['close', 'updateQuantity'])

const increaseQuantity = (item: CartItem) => {
    emit('updateQuantity', item, item.quantity + 1)
}

const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
        emit('updateQuantity', item, item.quantity - 1)
    }
}

const router = useRouter()
</script>
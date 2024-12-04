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
                            <template :v-if="item.category === 'BURGER'">
                                <p class="text-sm text-gray-600">
                                    Papas: {{ getFriesLabel(item.customization.fries) }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    Vegetales: {{ getSelectedVegetables(item.customization.vegetables) }}
                                </p>
                            </template>
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

                <button @click="proceedToCheckout"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Proceder al pago
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { XIcon, MinusIcon, PlusIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useCheckoutStore } from '@/checkout/presentation/store/CheckoutStore';
const checkoutStore = useCheckoutStore();

const proceedToCheckout = () => {
    const items = props.cartItems.map((item) => ({
        productId: item.id.toString(),
        productName: item.name,
        quantity: item.quantity,
        price: Number(item.price),
        customizations: item.customization,
    }));

    // Establecer los productos directamente en el checkoutStore
    checkoutStore.setItems(items);

    // Redirigir a la página de checkout
    router.push('/checkout');
};

// Opciones de personalización
const vegetableOptions = [
    { value: 'Lechuga', code: 'LETTUCE' },
    { value: 'Tomate', code: 'TOMATO' },
    { value: 'Pepinillo', code: 'PICKLE' }
];

const sauceOptions = [
    { value: 'Mayonesa', code: 'MAYONNAISE' },
    { value: 'Mostaza', code: 'MUSTARD' },
    { value: 'Tartara', code: 'TARTAR' },
    { value: 'Ketchup', code: 'KETCHUP' },
    { value: 'Ají', code: 'AJI' },
    { value: 'Aceituna', code: 'OLIVE' }
];

const friesOptions = [
    { value: 'Papas fritas', code: 'FRENCH_FRIES' },
    { value: 'Papas al hilo', code: 'SHOESTRING_FRIES' }
];

// Interfaces
interface Customization {
    fries: string; // Código de las papas (e.g., "FRENCH_FRIES")
    vegetables: Record<string, boolean>;
    sauces: Record<string, boolean>;
}

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    customization: Customization;
    quantity: number;
}

// Props
const props = defineProps<{
    cartItems: CartItem[];
}>();

// Computed subtotal
const subtotal = computed(() => {
    return props.cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
});

// Utility functions
const getSelectedVegetables = (vegetables: Record<string, boolean>): string => {
    return Object.entries(vegetables)
        .filter(([, selected]) => selected)
        .map(([key]) => {
            const option = vegetableOptions.find(v => v.code === key);
            return option ? option.value : key;
        })
        .join(', ');
};

const getSelectedSauces = (sauces: Record<string, boolean>): string => {
    return Object.entries(sauces)
        .filter(([, selected]) => selected)
        .map(([key]) => {
            const option = sauceOptions.find(s => s.code === key);
            return option ? option.value : key;
        })
        .join(', ');
};

const getFriesLabel = (friesCode: string): string => {
    const fries = friesOptions.find(f => f.code === friesCode);
    return fries ? fries.value : friesCode;
};

// Emits
const emit = defineEmits(['close', 'updateQuantity']);

// Increment and decrement quantity
const increaseQuantity = (item: CartItem) => {
    emit('updateQuantity', item, item.quantity + 1);
};

const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 0) {
        emit('updateQuantity', item, item.quantity - 1);
    }
};

// Router
const router = useRouter();


</script>

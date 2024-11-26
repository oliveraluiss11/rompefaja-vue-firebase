<template>
    <div class="min-h-screen bg-gray-50 p-4">
        <!-- Navigation Bar -->
        <nav class="flex items-center justify-between mb-6">
            <button class="p-2">
                <MenuIcon class="h-6 w-6" />
            </button>

            <div class="flex-1 mx-4">
                <div class="relative">
                    <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input type="text" placeholder="Buscar"
                        class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        v-model="searchQuery" />
                </div>
            </div>

            <button class="p-2 relative" @click="showCartModal = true">
                <ShoppingCartIcon class="h-6 w-6" />
                <span v-if="cartItemCount > 0"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {{ cartItemCount }}
                </span>
            </button>
        </nav>

        <!-- Category Selector -->
        <div class="mb-6">
            <select v-model="selectedCategory" class="w-48 p-2 rounded-lg border border-gray-200 bg-white">
                <option value="">Elegir categoría</option>
                <option value="todos">Todos</option>
            </select>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div v-for="product in filteredProducts" :key="product.id"
                class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" @click="openModal(product)">
                <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
                <div class="p-4">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                        <LeafIcon class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
                    <p class="text-blue-600 font-semibold">S/ {{ product.price }}</p>
                </div>
            </div>
        </div>

        <!-- Customization Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
                <div class="p-6">
                    <!-- Header -->
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-semibold text-gray-800">Personaliza tu hamburguesa</h2>
                        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Cerrar">
                            <XIcon class="h-6 w-6" />
                        </button>
                    </div>

                    <!-- Product Info -->
                    <div class="flex items-start gap-4 mb-6">
                        <img :src="selectedProduct?.image" :alt="selectedProduct?.name"
                            class="w-24 h-24 object-cover rounded-lg" />
                        <div>
                            <h3 class="font-semibold text-lg text-gray-800">{{ selectedProduct?.name }}</h3>
                            <p class="text-sm text-gray-600">{{ selectedProduct?.description }}</p>
                            <p class="text-blue-600 font-semibold mt-2">S/ {{ selectedProduct?.price }}</p>
                        </div>
                    </div>

                    <!-- Customization Options -->
                    <div class="space-y-6">
                        <!-- Fries Selection -->
                        <fieldset>
                            <legend class="font-medium text-gray-700 mb-2">¿Qué papas prefieres?</legend>
                            <div class="space-y-2">
                                <label v-for="fries in friesOptions" :key="fries.code"
                                    class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" v-model="customization.fries" :value="fries.code" name="fries"
                                        class="text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700">{{ fries.value }}</span>
                                </label>
                            </div>
                        </fieldset>

                        <!-- Vegetables Selection -->
                        <fieldset>
                            <legend class="font-medium text-gray-700 mb-2">Vegetales a elección</legend>
                            <div class="grid grid-cols-2 gap-2">
                                <label v-for="vegetable in vegetableOptions" :key="vegetable.code"
                                    class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" v-model="customization.vegetables[vegetable.code]"
                                        class="rounded text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700">{{ vegetable.value }}</span>
                                </label>
                            </div>
                        </fieldset>

                        <!-- Sauces Selection -->
                        <fieldset>
                            <legend class="font-medium text-gray-700 mb-2">¿Cremas?</legend>
                            <div class="grid grid-cols-2 gap-2">
                                <label v-for="sauce in sauceOptions" :key="sauce.code"
                                    class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" v-model="customization.sauces[sauce.code]"
                                        class="rounded text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700">{{ sauce.value }}</span>
                                </label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Add to Cart Button -->
                    <button @click="handleAddToCart"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Agregar producto
                    </button>
                </div>
            </div>
        </div>

        <!-- Cart Modal -->
        <CartModal v-if="showCartModal" :cart-items="cartItems" @close="showCartModal = false"
            @update-quantity="updateCartItemQuantity" />
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { MenuIcon, SearchIcon, ShoppingCartIcon, LeafIcon, XIcon } from 'lucide-vue-next';
import CartModal from '@/cart/presentation/component/CartModal.vue';
import { useProducts } from '../composable/UseProducts';
import type { ProductDto } from '@/product/domain/model/ProductDto';
import { useCart } from '@/cart/presentation/composable/useCart';
import type { Customization } from '@/cart/domain/model/CartItem';
import { useOptions } from '../composable/UseOptions';


const { cartItems, cartItemCount, addToCart, updateCartItemQuantity } = useCart();
const { vegetableOptions, sauceOptions, friesOptions } = useOptions();
// Estado reactivo
const searchQuery = ref('');
const selectedCategory = ref('todos');
const showModal = ref(false);
const showCartModal = ref(false);
const selectedProduct = ref<ProductDto | null>(null);



// Estado inicial de personalización
const customization = ref<Customization>({
    fries: friesOptions[0].code,
    vegetables: {
        LETTUCE: false,
        TOMATO: false,
        PICKLE: false,
        ONION: false
    },
    sauces: {
        MAYONNAISE: false,
        MUSTARD: false,
        TARTAR: false,
        KETCHUP: false,
        AJI: false,
        OLIVE: false
    }
});

// Estado Reactivo
const { products, loadProducts } = useProducts();

// Llama a la función de carga al inicializar
loadProducts();

// Productos filtrados
const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        if (searchQuery.value) {
            return product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        }
        return true;
    });
});


// Abrir y cerrar modal
const openModal = (product: ProductDto) => {
    selectedProduct.value = product;
    showModal.value = true;

    // Reiniciar la personalización
    customization.value = {
        fries: friesOptions[0].code,
        vegetables: {
            LETTUCE: false,
            TOMATO: false,
            PICKLE: false,
            ONION: false
        },
        sauces: {
            MAYONNAISE: false,
            MUSTARD: false,
            TARTAR: false,
            KETCHUP: false,
            AJI: false,
            OLIVE: false
        }
    };
};

const closeModal = () => {
    showModal.value = false;
    selectedProduct.value = null;
};

const handleAddToCart = () => {
    if (selectedProduct.value) {
        addToCart(selectedProduct.value, customization.value);
    }
};

</script>

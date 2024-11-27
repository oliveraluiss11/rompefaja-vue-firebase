<template>
    <div class="min-h-screen bg-gray-50 pb-4">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Navigation Bar -->

            <nav class="flex items-center justify-between mb-6 py-4">
                <router-link to="/" class="flex items-center space-x-2">
                    <UtensilsCrossedIcon class="h-6 w-6" />
                    <span class="font-bold hidden sm:inline">La Rompe Faja</span>
                </router-link>
                <div class="flex-1 mx-4">
                    <div class="relative">
                        <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input type="text" placeholder="Buscar" id="searchProduct"
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

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                <div v-for="product in filteredProducts" :key="product.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex"
                    @click="openModal(product)">
                    <!-- Imagen del producto -->
                    <div class="relative flex-shrink-0">
                        <img :src="product.image" :alt="product.name" class="w-36 h-36 object-cover rounded-l-lg"
                            loading="lazy" />
                        <!-- Etiqueta opcional -->
                        <span v-if="product.category"
                            class="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {{ product.category }}
                        </span>
                    </div>

                    <!-- Contenido -->
                    <div class="flex flex-col justify-between p-4 flex-grow">
                        <!-- Título e ícono -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-lg font-semibold text-gray-800 truncate">{{ product.name }}</h3>
                                <LeafIcon class="h-5 w-5 text-green-500" />
                            </div>
                            <!-- Descripción -->
                            <p class="text-sm text-gray-600 line-clamp-3">{{ product.description }}</p>
                        </div>

                        <!-- Precio -->
                        <p class="text-blue-600 font-bold mt-3 self-start">S/ {{ product.price }}</p>
                    </div>
                </div>
            </div>


            <!-- Modal de Personalización -->
            <CustomizationModal :show="showModal" :title="'Personaliza tu hamburguesa 🍔'" :product="selectedProduct"
                :buttonLabel="'Agregar producto'" @close="closeModal" @add-to-cart="handleAddToCart">
                <!-- Mostrar solo si la categoría es BURGER -->
                <template v-if="selectedProduct?.category == 'BURGER'">
                    <!-- Fries Selection -->
                    <fieldset>
                        <legend class="font-medium text-gray-700 mb-2">¿Qué papas prefieres?</legend>
                        <div class="space-y-2">
                            <label v-for="fries in friesOptions" :key="fries.code" class="flex items-center gap-3">
                                <input :id="fries.code" type="radio" v-model="customization.fries" :value="fries.code"
                                    name="fries" class="text-blue-600 focus:ring-blue-500" />
                                <span class="text-gray-700">{{ fries.value }}</span>
                            </label>
                        </div>
                    </fieldset>

                    <!-- Vegetables Selection -->
                    <fieldset>
                        <legend class="font-medium text-gray-700 mb-2">Vegetales a elección</legend>
                        <div class="grid grid-cols-2 gap-2">
                            <label v-for="vegetable in vegetableOptions" :key="vegetable.code"
                                class="flex items-center gap-2">
                                <input :id="vegetable.code" type="checkbox"
                                    v-model="customization.vegetables[vegetable.code]"
                                    class="rounded text-blue-600 focus:ring-blue-500" />
                                <span class="text-gray-700">{{ vegetable.value }}</span>
                            </label>
                        </div>
                    </fieldset>
                </template>

                <!-- Sauces Selection -->
                <fieldset>
                    <legend class="font-medium text-gray-700 mb-2">¿Cremas?</legend>
                    <div class="grid grid-cols-2 gap-2">
                        <label v-for="sauce in sauceOptions" :key="sauce.code" class="flex items-center gap-2">
                            <input :id="sauce.code" type="checkbox" v-model="customization.sauces[sauce.code]"
                                class="rounded text-blue-600 focus:ring-blue-500">
                            <span class="text-gray-700">{{ sauce.value }}</span>
                        </label>
                    </div>
                </fieldset>
            </CustomizationModal>

            <!-- Cart Modal -->
            <CartModal v-if="showCartModal" :cart-items="cartItems" @close="showCartModal = false"
                @update-quantity="updateCartItemQuantity" />

        </div>

    </div>


</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { UtensilsCrossedIcon, SearchIcon, ShoppingCartIcon, LeafIcon } from 'lucide-vue-next';
import CartModal from '@/cart/presentation/component/CartModal.vue';
import { useProducts } from '../composable/UseProducts';
import type { ProductDto } from '@/product/domain/model/ProductDto';
import { useCart } from '@/cart/presentation/composable/useCart';
import type { Customization } from '@/cart/domain/model/CartItem';
import { useOptions } from '../composable/UseOptions';
import CustomizationModal from '../component/CustomizationModal.vue';

const { cartItems, cartItemCount, addToCart, updateCartItemQuantity } = useCart();
const { vegetableOptions, sauceOptions, friesOptions } = useOptions();
// Estado reactivo
const searchQuery = ref('');
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
        closeModal();
    }
};


</script>

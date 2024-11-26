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
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" v-model="customization.fries" value="fritas" name="fries"
                                        class="text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700">Papas fritas</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" v-model="customization.fries" value="hilo" name="fries"
                                        class="text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700">Papas al hilo</span>
                                </label>
                            </div>
                        </fieldset>

                        <!-- Vegetables Selection -->
                        <fieldset>
                            <legend class="font-medium text-gray-700 mb-2">Vegetales a elección</legend>
                            <div class="grid grid-cols-2 gap-2">
                                <label v-for="(value, key) in customization.vegetables" :key="key"
                                    class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" v-model="customization.vegetables[key as keyof Vegetables]"
                                        class="rounded text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700 capitalize">{{ key }}</span>
                                </label>
                            </div>
                        </fieldset>

                        <!-- Sauces Selection -->
                        <fieldset>
                            <legend class="font-medium text-gray-700 mb-2">¿Cremas?</legend>
                            <div class="grid grid-cols-2 gap-2">
                                <label v-for="(value, key) in customization.sauces" :key="key"
                                    class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" v-model="customization.sauces[key as keyof Sauces]"
                                        class="rounded text-blue-600 focus:ring-blue-500">
                                    <span class="text-gray-700 capitalize">{{ key }}</span>
                                </label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Add to Cart Button -->
                    <button @click="addToCart"
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
import { ref, computed } from 'vue'
import { MenuIcon, SearchIcon, ShoppingCartIcon, LeafIcon, XIcon } from 'lucide-vue-next'
import CartModal from '../components/CartModal.vue'

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

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

interface CartItem extends Product {
    customization: Customization;
    quantity: number;
}

const searchQuery = ref('')
const selectedCategory = ref('todos')
const showModal = ref(false)
const showCartModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const cartItems = ref<CartItem[]>([])

// Customization state
const customization = ref<Customization>({
    fries: 'fritas',
    vegetables: {
        lechuga: false,
        tomate: false,
        pepinillo: false,
        cebolla: false
    },
    sauces: {
        mayonesa: false,
        mostaza: false,
        tartara: false,
        ketchup: false,
        aji: false,
        aceituna: false
    }
})

// Sample products data
const products = ref<Product[]>([
    {
        "id": 1,
        "name": "Royal Crispy",
        "description": "Pollo crispy + huevo + ensalada + papas fritas o al hilo",
        "price": "11.50",
        "image": "https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Fhamburguesa_crispy_royal.jpeg?alt=media&token=a4d8cba1-fe71-4558-8cf7-6e4c42c55926",
        "category": "BURGUER"
    },
    {
        "id": 2,
        "name": "Alitas Crujientes",
        "description": "6 piezas de alitas + ensalada + papas fritas",
        "price": "18.00",
        "image": "https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Falitas_crujientes.jpeg?alt=media&token=920a1ce7-1c95-4f7c-985b-de7c3ea71ffe",
        "category": "WINGS"
    },
    {
        "id": 3,
        "name": "Alitas BBQ",
        "description": "6 piezas de alitas + ensalada + papas fritas",
        "price": "18.00",
        "image": "https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Falitas_bbq.jpeg?alt=media&token=21e27985-1827-44be-8ab2-dd0c1f89df3a",
        "category": "WINGS"
    },
    {
        "id": 4,
        "name": "Alitas Acevichadas",
        "description": "6 piezas de alitas + ensalada + papas fritas",
        "price": "18.00",
        "image": "https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Falitas_acevichadas.jpeg?alt=media&token=286250a0-133a-4d74-ba26-aedeba5443d2",
        "category": "WINGS"
    },
    {
        "id": 5,
        "name": "Pollo Broaster 1/4",
        "description": "Pollo broaster + ensalada + papas",
        "price": "17.00",
        "image": "https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/rompefaja%2Fbroaster_cuarto.jpeg?alt=media&token=265a7f66-8cf0-46d1-b8f6-4a0bdd7bd8ed",
        "category": "CHICKEN_FRIES"
    }
])

const filteredProducts = computed(() => {
    return products.value.filter(product => {
        if (searchQuery.value) {
            return product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        }
        return true
    })
})

const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const openModal = (product: Product) => {
    selectedProduct.value = product
    showModal.value = true
    // Reset customization
    customization.value = {
        fries: 'fritas',
        vegetables: {
            lechuga: false,
            tomate: false,
            pepinillo: false,
            cebolla: false
        },
        sauces: {
            mayonesa: false,
            mostaza: false,
            tartara: false,
            ketchup: false,
            aji: false,
            aceituna: false
        }
    }
}

const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
}

const addToCart = () => {
    if (selectedProduct.value) {
        const newItem: CartItem = {
            ...selectedProduct.value,
            customization: { ...customization.value },
            quantity: 1
        }

        const existingItemIndex = cartItems.value.findIndex(item =>
            item.id === newItem.id &&
            JSON.stringify(item.customization) === JSON.stringify(newItem.customization)
        )

        if (existingItemIndex !== -1) {
            cartItems.value[existingItemIndex].quantity++
        } else {
            cartItems.value.push(newItem)
        }

        closeModal()
    }
}

const updateCartItemQuantity = (item: CartItem, newQuantity: number) => {
    const index = cartItems.value.findIndex(
        cartItem => cartItem.id === item.id &&
            JSON.stringify(cartItem.customization) === JSON.stringify(item.customization)
    )
    if (index !== -1) {
        cartItems.value[index].quantity = newQuantity
    }
}
</script>
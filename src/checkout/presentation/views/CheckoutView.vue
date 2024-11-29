<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md mx-auto">
            <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-6">Finalizar Pedido</h2>
            <form @submit.prevent="verifyAndSubmitOrder" class="space-y-6">
                <div>
                    <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
                    <input id="dni" v-model="formData.dni" type="text" inputmode="numeric" pattern="\d{8}" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingrese su DNI (8 dígitos)" />
                </div>
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Celular</label>
                    <input id="phone" v-model="formData.cellphone" type="tel" pattern="9\d{8}" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingrese su número de celular (9 dígitos)" />
                </div>
                <div>
                    <label for="address" class="block text-sm font-medium text-gray-700">Dirección</label>
                    <input id="address" v-model="formData.address" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingrese su dirección" />
                </div>

                <div>
                    <label for="reference" class="block text-sm font-medium text-gray-700">Referencia</label>
                    <input id="reference" v-model="formData.reference" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingrese una referencia" />
                </div>
                <div>
                    <label for="additionalDetails" class="block text-sm font-medium text-gray-700">Detalles
                        adicionales</label>
                    <textarea id="additionalDetails" v-model="formData.additionalDetails" rows="3"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ingrese detalles adicionales si es necesario"></textarea>
                </div>
                <div>
                    <label for="paymentMethod" class="block text-sm font-medium text-gray-700">Método de Pago</label>
                    <div class="space-y-3">
                        <label v-for="method in paymentMethods" :key="method.code"
                            class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                            <input type="radio" v-model="formData.paymentMethod" :value="method.code"
                                class="form-radio hidden" required>
                            <div
                                class="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0">
                                <div v-if="formData.paymentMethod === method.code"
                                    class="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                            </div>
                            <span class="text-gray-800">{{ method.value }}</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="formData.alternativeIngredients" class="form-checkbox">
                        <span class="ml-2 text-sm text-gray-700">Acepto el uso de ingredientes alternativos si es
                            necesario</span>
                    </label>
                </div>
                <div>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="formData.termsAccepted" required class="form-checkbox">
                        <span class="ml-2 text-sm text-gray-700">Acepto los <button type="button"
                                @click="showTermsModal = true" class="text-blue-600 underline">términos y
                                condiciones</button></span>
                    </label>
                </div>
                <div>
                    <button type="submit" :disabled="!formData.termsAccepted" :class="{
                        'bg-blue-600 hover:bg-blue-700': formData.termsAccepted,
                        'bg-gray-400 cursor-not-allowed': !formData.termsAccepted,
                    }"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Realizar Pedido
                    </button>
                </div>
            </form>
        </div>
        <!-- Modal de notificación -->
        <div v-if="showNotificationModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
                <div class="p-6">
                    <h3 class="text-lg font-medium mb-4"
                        :class="notificationType === 'success' ? 'text-green-600' : 'text-red-600'">
                        {{ notificationType === 'success' ? '¡Gracias por comprar en La Rompe Faja!' :
                            '¡Vaya! Algo salió mal al crear tu pedido.' }}
                    </h3>
                    <div class="prose prose-sm max-h-96 overflow-y-auto mb-4">
                        <p>{{ notificationMessage }}</p>
                    </div>
                    <button @click="closeNotificationModal"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {{ notificationType === 'success' ? 'Ir al inicio' : 'Cerrar' }}
                    </button>
                </div>
            </div>
        </div>
        <!-- Terms and Conditions Modal -->
        <div v-if="showTermsModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
                <div class="p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Términos y Condiciones</h3>
                    <div class="prose prose-sm max-h-96 overflow-y-auto mb-4">
                        <p>Bienvenido a Rompe Faja, ubicado en Casma, Perú. Al utilizar nuestros servicios, usted acepta
                            los siguientes términos y condiciones:</p>
                        <ol>
                            <li>Todos los pedidos están sujetos a disponibilidad de ingredientes.</li>
                            <li>Nos reservamos el derecho de utilizar ingredientes alternativos de calidad similar en
                                caso de falta de stock.</li>
                            <li>Los tiempos de entrega son estimados y pueden variar según la demanda.</li>
                            <li>El pago se realizará al momento de la entrega, a menos que se especifique lo contrario.
                            </li>
                            <li>Los precios están sujetos a cambios sin previo aviso.</li>
                            <li>Nos reservamos el derecho de rechazar pedidos en circunstancias excepcionales.</li>
                            <li>La información personal proporcionada será utilizada únicamente para procesar su pedido
                                y mejorar nuestros servicios.</li>
                            <li>Al proporcionar su número de teléfono, acepta recibir mensajes de texto relacionados con
                                su pedido.</li>
                            <li>Rompe Faja no se hace responsable por alergias o intolerancias no informadas al momento
                                del pedido.</li>
                            <li>Cualquier queja o sugerencia puede ser dirigida a nuestro servicio de atención al
                                cliente.</li>
                        </ol>
                        <p>Al realizar un pedido, usted confirma que ha leído, entendido y aceptado estos términos y
                            condiciones.</p>
                    </div>
                    <button @click="showTermsModal = false"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCheckout } from '../composables/useCheckout';
const {
    formData,
    showTermsModal,
    verifyAndSubmitOrder,
    paymentMethods,
    showNotificationModal,
    notificationType,
    notificationMessage,
    closeNotificationModal
} = useCheckout();
</script>
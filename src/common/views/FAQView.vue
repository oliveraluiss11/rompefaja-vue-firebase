<template>
    <div class="min-h-screen bg-white">
        <nav class="px-6 py-4 border-b">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <router-link to="/" class="flex items-center space-x-2">
                    <UtensilsCrossedIcon class="h-6 w-6" />
                    <span class="font-bold hidden sm:inline">La Rompe Faja</span>
                </router-link>
                <a href="/" class="text-gray-600 hover:text-black">Volver al inicio</a>
            </div>
        </nav>

        <div class="max-w-3xl mx-auto px-6 py-12">
            <h1 class="text-4xl font-bold mb-8 text-center">Preguntas Frecuentes</h1>

            <div class="space-y-6">
                <div v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold mb-2">{{ faq.question }}</h2>
                    <p class="text-gray-600">{{ faq.answer }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UtensilsCrossedIcon } from 'lucide-vue-next'

const faqs = [
    {
        question: "¿Cuál es el horario de atención?",
        answer: "Atendemos de lunes a domingo, excepto los martes. De lunes a jueves, nuestro horario es de 6:00 PM a 12:00 AM. Los viernes, sábados y domingos extendemos nuestro horario hasta la 1:00 AM."
    },
    {
        question: "¿Cómo puedo hacer un pedido?",
        answer: "Puedes hacer tu pedido directamente desde nuestra página web en la sección 'Ordenar ahora'. No es necesario registrarse ni iniciar sesión."
    },
    {
        question: "¿Cuáles son los métodos de pago aceptados?",
        answer: "Aceptamos pagos a través de Yape, Plin y efectivo."
    },
    {
        question: "¿Cuánto tiempo tarda en llegar mi pedido?",
        answer: "El tiempo estimado de entrega es entre 15 a 30 minutos, dependiendo de tu ubicación y la demanda del momento."
    },
    {
        question: "¿Dónde está ubicado el local?",
        answer: "Nuestro local está en la Av. Bolivar Mz E1 Lt 3 en Casma, Ancash, Perú. Estamos frente al BCP."
    },
    {
        question: "¿Cómo sabré el estado de mi pedido?",
        answer: "Una vez realizado tu pedido, te enviaremos actualizaciones sobre el estado del mismo a través de SMS al número que nos proporciones."
    },
    {
        question: "¿Qué tipos de comida ofrecen?",
        answer: "Nos especializamos en hamburguesas, pollo broaster y alitas broaster. Puedes ver nuestro menú completo en la sección 'Ver Productos' de nuestra página web."
    }
]
</script>
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

        <div class="max-w-4xl mx-auto px-6 py-12">
            <h1 class="text-4xl font-bold mb-12 text-center">Nuestro Equipo y Tecnología</h1>

            <div class="mb-16">
                <h2 class="text-2xl font-semibold mb-6">El Equipo detrás de La Rompe Faja</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-gray-50 p-6 rounded-lg flex items-center space-x-4">
                        <img src="" alt="Olenca Medina" class="w-24 h-24 rounded-full object-cover" />
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Olenca Medina</h3>
                            <p class="text-gray-600 mb-2">Gerente General</p>
                            <p class="text-gray-600">Olenca lidera la visión estratégica y operativa de La Rompe Faja,
                                asegurando la calidad y satisfacción de nuestros clientes.</p>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-lg flex items-center space-x-4">
                        <img src="https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/team%2FFOTO_LUIS_OLIVERA.jpg?alt=media&token=c29e92bb-d43d-434d-bc5f-506438b8b2cb"
                            alt="Luis Olivera" class="w-24 h-24 rounded-full object-cover" />
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Luis Olivera</h3>
                            <p class="text-gray-600 mb-2">Arquitecto de Software</p>
                            <p class="text-gray-600">Luis diseña y desarrolla la infraestructura tecnológica que impulsa
                                nuestra plataforma digital, mejorando constantemente la experiencia del usuario.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="text-2xl font-semibold mb-6">Nuestras Tecnologías</h2>
                <p class="text-gray-600 mb-6">En La Rompe Faja, utilizamos tecnologías de vanguardia para asegurarnos de
                    que tu experiencia sea rápida, segura y deliciosa:</p>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div v-for="tech in technologies" :key="tech.name"
                        class="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow">
                        <img :src="tech.logo" :alt="tech.name" class="h-12 w-12 object-contain" />
                        <span class="font-medium text-gray-800 text-center">{{ tech.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UtensilsCrossedIcon } from 'lucide-vue-next'

interface Technology {
    name: string;
    logo: string;
}


const technologies: Technology[] = [
    {
        name: 'Firebase',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg'
    },
    {
        name: 'Vue 3',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/vue.svg'
    },
    {
        name: 'TailwindCSS',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/tailwindcss-icon.svg'
    },
    {
        name: 'Spring',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/spring-icon.svg'
    },
    {
        name: 'Twilio',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/twilio-icon.svg'
    },
    {
        name: 'MongoDB',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/mongodb-icon.svg'
    },
    {
        name: 'Docker',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/docker-icon.svg'
    },
    {
        name: 'Render',
        logo: 'https://firebasestorage.googleapis.com/v0/b/market-express-dev.appspot.com/o/team%2Frender-logo.png?alt=media&token=6fbafd74-678d-4698-9b94-f7954a0026e8'
    },
    {
        name: 'GitHub',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/github-icon.svg'
    },
    {
        name: 'Netlify',
        logo: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/netlify-icon.svg'
    }
];
</script>
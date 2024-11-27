import axios, { type AxiosInstance } from 'axios'
import { API_BASE_URL, API_KEY } from './apiConfig'

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL no está definida. Verifica tu archivo .env')
}

if (!API_KEY) {
  throw new Error('API_KEY no está definida. Verifica tu archivo .env')
}

// Crear una instancia configurada de Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY, // Incluir la clave de API en los headers
  },
})

export default axiosInstance

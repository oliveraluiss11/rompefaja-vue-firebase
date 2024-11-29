// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { FIREBASE_CONFIG } from './apiConfig'

console.info(FIREBASE_CONFIG)
// Inicializar Firebase
const app = initializeApp(FIREBASE_CONFIG)

// Servicios de Firebase
const db: Firestore = getFirestore(app)

export { app, db }

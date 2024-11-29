// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { FIREBASE_CONFIG } from './apiConfig'

const app = initializeApp(FIREBASE_CONFIG)

const db: Firestore = getFirestore(app)

export { app, db }

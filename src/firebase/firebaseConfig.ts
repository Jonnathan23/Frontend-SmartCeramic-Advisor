// src/firebaseConfig.ts

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Configuración generada en Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBqy9TO1njW48G2cATqcn_SLheqpOuvmwI",
  authDomain: "smartcermic-advisor.firebaseapp.com",
  projectId: "smartcermic-advisor",
  storageBucket: "smartcermic-advisor.firebasestorage.app",
  messagingSenderId: "330799149310",
  appId: "1:330799149310:web:826f98345698e9f71af5af"
};

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
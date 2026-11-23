// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDJdiBmUMqsYTr6QrJsQ3X0fTw1d4qlb4",
  authDomain: "jppnet72.firebaseapp.com",
  projectId: "jppnet72",
  storageBucket: "jppnet72.firebasestorage.app",
  messagingSenderId: "740603288969",
  appId: "1:740603288969:web:aaf2fb37efb21357949558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conexión a la base de datos Firestore
export const db = getFirestore(app);

// Conexión al servicio de autenticación (login y registro)
export const auth = getAuth(app);

/* global process */
// Script para crear un usuario administrador.
// Se ejecuta desde la terminal con: node scripts/crearAdmin.js email contraseña
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../src/firestore/config.js';

const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.log('Uso: node scripts/crearAdmin.js email contraseña');
  process.exit(1);
}

let credencial;
try {
  credencial = await createUserWithEmailAndPassword(auth, email, password);
  console.log('Usuario creado.');
} catch (error) {
  if (error.code === 'auth/email-already-in-use') {
    // Si ya existía, entramos con ese usuario
    credencial = await signInWithEmailAndPassword(auth, email, password);
    console.log('El usuario ya existía.');
  } else {
    console.error('Error:', error.code);
    process.exit(1);
  }
}

const uid = credencial.user.uid;
await setDoc(doc(db, 'usuarios', uid), { rol: 'admin' });
console.log(`Listo: ${email} es admin (UID ${uid}).`);
process.exit(0);

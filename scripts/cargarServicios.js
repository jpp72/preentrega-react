/* global process */
// Script para cargar (una sola vez) los servicios y el equipo en Firestore.
// Se ejecuta desde la terminal con: node scripts/cargarServicios.js
import { readFileSync } from 'node:fs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../src/firestore/config.js';

const cargarColeccion = async (archivo, coleccion) => {
  const lista = JSON.parse(readFileSync(archivo, 'utf-8'));
  for (const elemento of lista) {
    const { id, ...datos } = elemento;
    await setDoc(doc(db, coleccion, String(id)), datos);
    console.log(`${coleccion}: cargado ${id} - ${datos.nombre}`);
  }
};

await cargarColeccion('public/data/servicios.json', 'servicios');
await cargarColeccion('public/data/equipo.json', 'equipo');

console.log('Listo, datos cargados en Firestore.');
process.exit(0);

import cargoPlane from '../assets/cargo-plane.jpg';
import travel from '../assets/travel.jpg';
import repar from '../assets/repar.jpg';

export const imagenes = { cargoPlane, travel, repar };

// Si la imagen es un nombre conocido (cargoPlane, travel, repar) devuelve la foto importada.
// Si no, la usa tal cual: es una URL de la web (https://...) o una ruta de /public (/img/foto.jpg).
export const obtenerImagen = (imagen) => imagenes[imagen] || imagen;

# Compañía de Servicios Aéreos

Proyecto final del curso **React JS – Talento Tech**.

Tienda web de servicios aéreos (transporte logístico, pasajes y mantenimiento) hecha con **React + Vite**, con base de datos en **Cloud Firestore** y usuarios con **Firebase Authentication**.

## Funcionalidades

- **Inicio** con los servicios en oferta (campo `oferta: true`).
- **Servicios**: listado completo y página de detalle de cada servicio.
- **Carrito de compras** con Context API: agregar desde la tarjeta (respetando el stock), eliminar un servicio y vaciar el carrito.
- **Nosotros**: el equipo de la empresa, leído desde Firestore.
- **Login, registro y perfil** con Firebase Authentication.
- **Gestión** (solo para administradores):
  - CRUD de servicios: agregar, editar y eliminar, con validaciones.
  - Cupones: crear y eliminar.
- **Rutas protegidas**: `/perfil` requiere estar logueado y `/gestion` requiere rol de administrador.
- Mensajes de carga y de error cuando se consulta la base de datos.
- Diseño responsivo con flexbox (`flex-wrap`).

## Tecnologías

- React 19 + Vite
- React Router
- Firebase (Firestore y Authentication)
- CSS Modules

## Instalación y ejecución en local

Requisitos: tener instalado [Node.js](https://nodejs.org/) (versión 20 o superior).

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jpp72/preentrega-react.git
   cd preentrega-react
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173`).

### Otros comandos

| Comando | Para qué sirve |
| --- | --- |
| `npm run build` | Genera la versión de producción en la carpeta `dist` |
| `npm run preview` | Muestra la versión de producción en local |
| `npm run lint` | Revisa el código con ESLint |
| `node scripts/cargarServicios.js` | Carga en Firestore los servicios y el equipo de `public/data` |

## Base de datos (Firestore)

| Colección | Campos |
| --- | --- |
| `servicios` | `nombre`, `categoria`, `descripcion`, `precio`, `stock`, `imagen`, `oferta` |
| `cupones` | `codigo`, `descuento` |
| `equipo` | `nombre`, `area`, `cargo` |
| `usuarios` | `rol` (el id del documento es el UID del usuario) |

El campo `imagen` acepta:
- una URL de la web (`https://.../imagen.webp`);
- una ruta de la carpeta `public` (`/img/foto.jpg`);
- el nombre de una imagen del proyecto (`cargoPlane`, `travel`, `repar`).

### Usar tu propio proyecto de Firebase

1. Crear un proyecto en la [consola de Firebase](https://console.firebase.google.com/) y una app web.
2. Reemplazar los datos de `firebaseConfig` en `src/firestore/config.js`.
3. Crear la base **Cloud Firestore**.
4. Activar **Authentication** con el proveedor **Correo electrónico y contraseña**.
5. Cargar los datos iniciales con `node scripts/cargarServicios.js`.
6. Crear un administrador:
   - registrar un usuario desde la app (o desde Authentication > Users);
   - copiar su **UID**;
   - en Firestore, crear en la colección `usuarios` un documento con ese UID como id y el campo `rol` con el valor `admin`.

## Estructura

```
src/
├── components/   # Un componente por carpeta, con su .module.css
├── context/      # CartContext (carrito) y AuthContext (usuario)
├── data/         # Mapa de imágenes locales
├── firestore/    # Configuración de Firebase
├── App.jsx       # Rutas
└── main.jsx      # Punto de entrada con los Providers
public/data/      # JSON con los datos iniciales
scripts/          # Script para cargar los datos en Firestore
```

## Deploy

El proyecto incluye `public/_redirects` (Netlify) y `vercel.json` (Vercel) para que las rutas funcionen al recargar la página.

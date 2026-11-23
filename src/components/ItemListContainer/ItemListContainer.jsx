import { useEffect, useState } from 'react';
import styles from './ItemListContainer.module.css';
import ItemList from '../ItemList/ItemList';
import { obtenerImagen } from '../../data/imagenes';
import { db } from '../../firestore/config';
import { collection, getDocs } from 'firebase/firestore';

function ItemListContainer({ titulo, subtitulo, soloOfertas }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'servicios'))
      .then((respuesta) => {
        const productosConImagen = respuesta.docs.map((doc) => {
          const datos = doc.data();
          return {
            ...datos,
            id: doc.id,
            imagen: obtenerImagen(datos.imagen),
          };
        });
        setProductos(productosConImagen);
      })
      .catch((error) => {
        console.error(error);
        setError('No se pudo conectar con la base de datos. Revisá tu conexión e intentá de nuevo.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className={styles.contenedor}>Cargando servicios, por favor espere...</p>;
  }

  if (error) {
    return <p className={styles.contenedor}>Error: {error}</p>;
  }

  const lista = soloOfertas ? productos.filter((producto) => producto.oferta) : productos;

  return (
    <section className={styles.contenedor}>
      {titulo && <h2>{titulo}</h2>}
      {subtitulo && <p>{subtitulo}</p>}
      <ItemList productos={lista} />
    </section>
  );
}

export default ItemListContainer;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductoDetalle.module.css';
import Contador from '../Contador/Contador';
import { obtenerImagen } from '../../data/imagenes';
import { db } from '../../firestore/config';
import { doc, getDoc } from 'firebase/firestore';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'servicios', id))
      .then((respuesta) => {
        if (respuesta.exists()) {
          const datos = respuesta.data();
          setProducto({
            ...datos,
            id: respuesta.id,
            imagen: obtenerImagen(datos.imagen),
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setError('No se pudo conectar con la base de datos. Revisá tu conexión e intentá de nuevo.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <p className={styles.aviso}>Cargando servicio, por favor espere...</p>;
  }

  if (error) {
    return <p className={styles.aviso}>Error: {error}</p>;
  }

  if (!producto) {
    return (
      <div className={styles.aviso}>
        <p>Servicio no encontrado.</p>
        <Link to="/productos">Volver a los servicios</Link>
      </div>
    );
  }

  return (
    <article className={styles.detalle}>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className={styles.contenido}>
        <p className={styles.categoria}>{producto.categoria}</p>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className={styles.precio}>USD {producto.precio}</p>
        <Contador producto={producto} />
        <Link to="/productos">Volver a los servicios</Link>
      </div>
    </article>
  );
}

export default ProductoDetalle;

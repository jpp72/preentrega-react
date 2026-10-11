import { useEffect, useState } from 'react';
import styles from './ItemListContainer.module.css';
import ItemList from '../ItemList/ItemList';
import cargoPlane from '../../assets/cargo-plane.jpg';
import travel from '../../assets/travel.jpg';
import repar from '../../assets/repar.jpg';

const imagenes = { cargoPlane, travel, repar };

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/data/servicios.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información de los servicios');
        }
        return respuesta.json();
      })
      .then((datos) => {
        const productosConImagen = datos.map((producto) => ({
          ...producto,
          imagen: imagenes[producto.imagen],
        }));
        setProductos(productosConImagen);
      })
      .catch((error) => {
        setError(error.message);
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

  return (
    <section className={styles.contenedor}>
      <h2>Nuestros servicios</h2>
      <p>Elegí el servicio que necesitás.</p>
      <ItemList productos={productos} />
    </section>
  );
}

export default ItemListContainer;

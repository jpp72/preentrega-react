import { Link } from 'react-router-dom';
import styles from './Item.module.css';
import Contador from '../Contador/Contador';

function Item({ producto }) {
  const { id, categoria, nombre, descripcion, precio, imagen } = producto;

  return (
    <article className={styles.item}>
      <img src={imagen} alt={nombre} />
      <div className={styles.contenido}>
        <p className={styles.categoria}>{categoria}</p>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>USD {precio}</p>
        <Link to={`/producto/${id}`} className={styles.verDetalle}>Ver detalle</Link>
        <Contador producto={producto} />
      </div>
    </article>
  );
}

export default Item;

import styles from './Item.module.css';
import Contador from '../Contador/Contador';

function Item({ producto }) {
  const { categoria, nombre, descripcion, precio, imagen } = producto;

  return (
    <article className={styles.item}>
      <img src={imagen} alt={nombre} />
      <div className={styles.contenido}>
        <p className={styles.categoria}>{categoria}</p>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>USD {precio}</p>
        <Contador />
      </div>
    </article>
  );
}

export default Item;

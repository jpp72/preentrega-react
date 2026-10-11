import styles from './ItemList.module.css';
import Item from '../Item/Item';

function ItemList({ productos }) {
  return (
    <div className={styles.lista}>
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ItemList;

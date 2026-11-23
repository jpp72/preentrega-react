import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartWidget.module.css';

function CartWidget() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <Link to="/carrito" aria-label="Carrito">
      🛒 {totalItems > 0 && <span className={styles.numero}>{totalItems}</span>}
    </Link>
  );
}

export default CartWidget;

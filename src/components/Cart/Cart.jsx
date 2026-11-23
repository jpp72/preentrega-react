import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeItem, clearCart, getCartTotal } = useCart();

  const finalizarCompra = () => {
    alert('Gracias por comprar');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <section className={styles.carrito}>
        <h2>El carrito está vacío</h2>
        <p>Agregá servicios para continuar la compra.</p>
        <Link to="/productos" className={styles.boton}>Ver servicios</Link>
      </section>
    );
  }

  return (
    <section className={styles.carrito}>
      <h2>Carrito de compras</h2>

      {cart.map((item) => (
        <div className={styles.item} key={item.id}>
          <div>
            <h4>{item.nombre}</h4>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio unitario: USD {item.precio}</p>
            <p>Subtotal: USD {item.precio * item.cantidad}</p>
          </div>
          <button className={styles.botonEliminar} onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>
      ))}

      <h3>Total a pagar: USD {getCartTotal()}</h3>

      <div className={styles.acciones}>
        <button className={styles.botonEliminar} onClick={clearCart}>Vaciar carrito</button>
        <Link to="/" className={styles.boton} onClick={finalizarCompra}>Finalizar compra</Link>
      </div>
    </section>
  );
}

export default Cart;

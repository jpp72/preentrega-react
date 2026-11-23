import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Contador.module.css';

function Contador({ producto }) {
  const { addToCart, isInCart, getCantidadActual } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  // Lo que todavía se puede comprar: el stock menos lo que ya está en el carrito
  const stock = producto.stock ?? 0;
  const disponible = stock - getCantidadActual(producto.id);

  const restar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const sumar = () => {
    if (cantidad < disponible) {
      setCantidad(cantidad + 1);
    }
  };

  const comprar = () => {
    if (cantidad === 0) {
      setMensaje('Elegí al menos 1 para comprar');
    } else if (cantidad > disponible) {
      setMensaje(`No hay stock suficiente. Disponibles: ${disponible}`);
    } else {
      addToCart(producto, cantidad);
      setMensaje(`Agregaste ${cantidad} al carrito`);
      setCantidad(1);
    }
  };

  if (stock === 0) {
    return <p className={styles.mensaje}>Sin stock</p>;
  }

  return (
    <div className={styles.contador}>
      <div className={styles.controles}>
        <button className={styles.botonCantidad} onClick={restar}>-</button>
        <span className={styles.numero}>{cantidad}</span>
        <button className={styles.botonCantidad} onClick={sumar}>+</button>
      </div>
      <button className={styles.boton} onClick={comprar}>Comprar</button>
      <p className={styles.mensaje}>Stock disponible: {disponible}</p>
      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
      {isInCart(producto.id) && <p className={styles.mensaje}>En el carrito: {getCantidadActual(producto.id)}</p>}
    </div>
  );
}

export default Contador;

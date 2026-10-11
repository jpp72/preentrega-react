import { useState } from 'react';
import styles from './Contador.module.css';

function Contador() {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  const restar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const sumar = () => {
    if (cantidad < 10) {
      setCantidad(cantidad + 1);
    }
  };

  const comprar = () => {
    if (cantidad === 0) {
      setMensaje('Elegí al menos 1 para comprar');
    } else {
      setMensaje(`Agregaste ${cantidad} al carrito`);
    }
  };

  return (
    <div className={styles.contador}>
      <div className={styles.controles}>
        <button className={styles.botonCantidad} onClick={restar}>-</button>
        <span className={styles.numero}>{cantidad}</span>
        <button className={styles.botonCantidad} onClick={sumar}>+</button>
      </div>
      <button className={styles.boton} onClick={comprar}>Comprar</button>
      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
    </div>
  );
}

export default Contador;

import { Link } from 'react-router-dom';
import styles from './NoEncontrada.module.css';

function NoEncontrada() {
  return (
    <section className={styles.aviso}>
      <h2>Página no encontrada</h2>
      <p>La dirección que escribiste no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NoEncontrada;

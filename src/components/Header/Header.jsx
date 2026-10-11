import styles from './Header.module.css';
import logo from '../../assets/logo1.png';

function Header() {
  return (
    <>
      <header className={styles.header1}>
        <div className={styles.menu0}>
          <a href="#" className={styles.logoLink}>
            <img src={logo} alt="Logo de la compañía" className={styles.logo} />
          </a>
          <h1>Compania de Servicios Aereos</h1>
        </div>

        <nav className={styles.menu1}>
          <ul className={styles.menu11}>
            <li className={styles.nav1}><a href="#">Login</a></li>
            <li className={styles.nav1}><a href="#reg">Registrate</a></li>
            <li className={styles.nav1}><a href="#carr">carrito</a></li>
          </ul>
        </nav>
      </header>

      <nav className={styles.menu2}>
        <ul className={styles.menu22}>
          <li className={styles.nav2}><a href="#">Inicio</a></li>
          <li className={styles.nav2}><a href="#servicio">Servicios</a></li>
          <li className={styles.nav2}><a href="#rese">Reseñas</a></li>
          <li className={styles.nav2}><a href="#conta">Contacto</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
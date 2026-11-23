import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/logo1.png';
import CartWidget from '../CartWidget/CartWidget';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <header className={styles.header1}>
        <div className={styles.menu0}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="Logo de la compañía" className={styles.logo} />
          </Link>
          <h1>Compañía de Servicios Aéreos</h1>
        </div>

        <nav className={styles.menu1}>
          <ul className={styles.menu11}>
            {user ? (
              <>
                <li className={styles.nav1}><Link to="/perfil">¡Hola, {user.email}!</Link></li>
                <li className={styles.nav1}>
                  <button className={styles.salir} onClick={cerrarSesion}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.nav1}><Link to="/login">Login</Link></li>
                <li className={styles.nav1}><Link to="/registro">Registrate</Link></li>
              </>
            )}
            <li className={styles.nav1}><CartWidget /></li>
          </ul>
        </nav>
      </header>

      <nav className={styles.menu2}>
        <ul className={styles.menu22}>
          <li className={styles.nav2}><Link to="/">Inicio</Link></li>
          <li className={styles.nav2}><Link to="/productos">Servicios</Link></li>
          <li className={styles.nav2}><Link to="/nosotros">Nosotros</Link></li>
          {user && user.rol === 'admin' && (
            <li className={styles.nav2}><Link to="/gestion">Gestión</Link></li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Header;

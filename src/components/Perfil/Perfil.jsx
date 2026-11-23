import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login/Login.module.css';

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate('/');
  };

  return (
    <section className={styles.formulario}>
      <h2>Mi perfil</h2>
      <p>¡Hola de nuevo, {user.email}!</p>
      <p>Tipo de usuario: {user.rol === 'admin' ? 'Administrador' : 'Usuario'}</p>
      <button className={styles.boton} onClick={cerrarSesion}>Cerrar sesión</button>
    </section>
  );
}

export default Perfil;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error en el login:', error.code);
      setError('Email o contraseña incorrectos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.boton} disabled={cargando}>
        {cargando ? 'Ingresando...' : 'Ingresar'}
      </button>
      <p>¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link></p>
    </form>
  );
}

export default Login;

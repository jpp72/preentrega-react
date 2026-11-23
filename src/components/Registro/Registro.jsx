import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login/Login.module.css';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);
    try {
      await signup(email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        const quiereLoguearse = window.confirm(
          'Este correo electrónico ya está registrado. ¿Querés iniciar sesión?'
        );
        navigate(quiereLoguearse ? '/login' : '/');
      } else {
        console.error('Error en el registro:', error.code);
        setError('Ocurrió un error al registrar el usuario. Verificá los datos e intentá nuevamente.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <h2>Crear una nueva cuenta</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.boton} disabled={cargando}>
        {cargando ? 'Registrando...' : 'Registrarse'}
      </button>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </form>
  );
}

export default Registro;

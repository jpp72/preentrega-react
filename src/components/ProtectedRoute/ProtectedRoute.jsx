import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, rolesPermitidos }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no hay nadie logueado, lo mandamos al login.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si está logueado pero su rol no está permitido, lo mandamos al inicio.
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

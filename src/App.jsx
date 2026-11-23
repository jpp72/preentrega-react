import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout/Layout';
import Inicio from './components/Inicio/Inicio';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ProductoDetalle from './components/ProductoDetalle/ProductoDetalle';
import Cart from './components/Cart/Cart';
import Nosotros from './components/Nosotros/Nosotros';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import Perfil from './components/Perfil/Perfil';
import Gestion from './components/Gestion/Gestion';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NoEncontrada from './components/NoEncontrada/NoEncontrada';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={<ItemListContainer titulo="Nuestros servicios" subtitulo="Elegí el servicio que necesitás." />}
        />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion"
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <Gestion />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App;

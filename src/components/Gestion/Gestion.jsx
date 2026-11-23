import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firestore/config';
import { obtenerImagen } from '../../data/imagenes';
import FormularioProducto from '../FormularioProducto/FormularioProducto';
import GestionCupones from '../GestionCupones/GestionCupones';
import styles from './Gestion.module.css';

const estadoInicialForm = {
  nombre: '',
  categoria: '',
  descripcion: '',
  precio: '',
  stock: '',
  imagen: '',
  oferta: false,
};

function Gestion() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // READ: trae todos los servicios de Firestore
  const cargarProductos = async () => {
    try {
      const respuesta = await getDocs(collection(db, 'servicios'));
      const lista = respuesta.docs.map((documento) => ({ ...documento.data(), id: documento.id }));
      setProductos(lista);
      setError(null);
    } catch (error) {
      console.error('Error al cargar los servicios:', error);
      setError('No se pudieron cargar los servicios. Revisá tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarProductos();
  }, []);

  // Cuando elegimos un producto para editar, llenamos el formulario con sus datos
  useEffect(() => {
    if (productoAEditar) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDatosForm({
        nombre: productoAEditar.nombre,
        categoria: productoAEditar.categoria,
        descripcion: productoAEditar.descripcion,
        precio: productoAEditar.precio,
        stock: productoAEditar.stock ?? 0,
        imagen: productoAEditar.imagen,
        oferta: productoAEditar.oferta ?? false,
      });
    } else {
      setDatosForm(estadoInicialForm);
    }
  }, [productoAEditar]);

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  };

  // CREATE y UPDATE: el mismo formulario sirve para las dos cosas
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validaciones
    const precio = Number(datosForm.precio);
    const stock = Number(datosForm.stock);

    if (datosForm.nombre.trim() === '') {
      alert('El nombre es obligatorio.');
      return;
    }
    if (isNaN(precio) || precio <= 0) {
      alert('El precio debe ser un número mayor a cero.');
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      alert('El stock debe ser un número entero mayor o igual a cero.');
      return;
    }
    if (datosForm.imagen.trim() === '') {
      alert('Ingresá la URL de una imagen.');
      return;
    }

    const productoFinal = {
      nombre: datosForm.nombre.trim(),
      categoria: datosForm.categoria,
      descripcion: datosForm.descripcion.trim(),
      precio,
      stock,
      imagen: datosForm.imagen.trim(),
      oferta: datosForm.oferta,
    };

    setGuardando(true);
    try {
      if (productoAEditar) {
        await updateDoc(doc(db, 'servicios', productoAEditar.id), productoFinal);
        alert('Servicio actualizado con éxito.');
      } else {
        await addDoc(collection(db, 'servicios'), productoFinal);
        alert('Servicio guardado con éxito.');
      }
      setProductoAEditar(null);
      setDatosForm(estadoInicialForm);
      await cargarProductos();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Hubo un error al guardar el servicio. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  // DELETE: pide confirmación antes de borrar
  const eliminarProducto = async (producto) => {
    const confirmado = window.confirm(`¿Seguro que querés eliminar "${producto.nombre}"?`);
    if (!confirmado) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'servicios', producto.id));
      setProductos(productos.filter((item) => item.id !== producto.id));
      if (productoAEditar && productoAEditar.id === producto.id) {
        setProductoAEditar(null);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar el servicio. Intentá de nuevo.');
    }
  };

  return (
    <div className={styles.gestion}>
      <h2>Gestión de servicios</h2>

      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        modoEdicion={!!productoAEditar}
        cancelarEdicion={cancelarEdicion}
        guardando={guardando}
      />

      <h3>Lista de servicios</h3>
      {cargando && <p>Cargando servicios...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.lista}>
        {productos.map((producto) => (
          <div className={styles.fila} key={producto.id}>
            <img src={obtenerImagen(producto.imagen)} alt={producto.nombre} />
            <div className={styles.datos}>
              <strong>{producto.nombre}</strong>
              <span>USD {producto.precio} · Stock: {producto.stock ?? 0}</span>
              {producto.oferta && <span className={styles.oferta}>En oferta</span>}
            </div>
            <div className={styles.acciones}>
              <button className={styles.editar} onClick={() => handleEditClick(producto)}>Editar</button>
              <button className={styles.eliminar} onClick={() => eliminarProducto(producto)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <GestionCupones />
    </div>
  );
}

export default Gestion;

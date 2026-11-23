import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firestore/config';
import styles from './GestionCupones.module.css';

function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // READ: trae los cupones de Firestore
  useEffect(() => {
    getDocs(collection(db, 'cupones'))
      .then((respuesta) => {
        setCupones(respuesta.docs.map((documento) => ({ ...documento.data(), id: documento.id })));
      })
      .catch((error) => {
        console.error('Error al cargar los cupones:', error);
        setError('No se pudieron cargar los cupones.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // CREATE
  const agregarCupon = async (evento) => {
    evento.preventDefault();

    const codigoFinal = codigo.trim().toUpperCase();
    const descuentoFinal = Number(descuento);

    if (codigoFinal === '') {
      alert('El código del cupón es obligatorio.');
      return;
    }
    if (isNaN(descuentoFinal) || descuentoFinal <= 0 || descuentoFinal > 100) {
      alert('El descuento debe ser un número entre 1 y 100.');
      return;
    }
    if (cupones.some((cupon) => cupon.codigo === codigoFinal)) {
      alert('Ya existe un cupón con ese código.');
      return;
    }

    const nuevoCupon = { codigo: codigoFinal, descuento: descuentoFinal };
    try {
      const referencia = await addDoc(collection(db, 'cupones'), nuevoCupon);
      setCupones([...cupones, { ...nuevoCupon, id: referencia.id }]);
      setCodigo('');
      setDescuento('');
    } catch (error) {
      console.error('Error al crear el cupón:', error);
      alert('No se pudo crear el cupón. Intentá de nuevo.');
    }
  };

  // DELETE
  const eliminarCupon = async (cupon) => {
    if (!window.confirm(`¿Seguro que querés eliminar el cupón ${cupon.codigo}?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'cupones', cupon.id));
      setCupones(cupones.filter((item) => item.id !== cupon.id));
    } catch (error) {
      console.error('Error al eliminar el cupón:', error);
      alert('No se pudo eliminar el cupón. Intentá de nuevo.');
    }
  };

  return (
    <section className={styles.cupones}>
      <h3>Gestión de cupones</h3>

      <form className={styles.formulario} onSubmit={agregarCupon}>
        <input
          type="text"
          placeholder="Código (ej: VERANO10)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Descuento %"
          min="1"
          max="100"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
          required
        />
        <button type="submit" className={styles.boton}>Crear cupón</button>
      </form>

      {cargando && <p>Cargando cupones...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!cargando && !error && cupones.length === 0 && <p>Todavía no hay cupones.</p>}

      <ul className={styles.lista}>
        {cupones.map((cupon) => (
          <li key={cupon.id} className={styles.cupon}>
            <span><strong>{cupon.codigo}</strong> · {cupon.descuento}% de descuento</span>
            <button className={styles.eliminar} onClick={() => eliminarCupon(cupon)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default GestionCupones;

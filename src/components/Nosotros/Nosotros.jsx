import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore/config';
import styles from './Nosotros.module.css';

function Nosotros() {
  const [equipo, setEquipo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDocs(collection(db, 'equipo'))
      .then((respuesta) => {
        setEquipo(respuesta.docs.map((documento) => ({ ...documento.data(), id: documento.id })));
      })
      .catch((error) => {
        console.error('Error al cargar el equipo:', error);
        setError('No se pudo cargar la información del equipo.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className={styles.aviso}>Cargando equipo...</p>;
  }

  if (error) {
    return <p className={styles.aviso}>{error}</p>;
  }

  return (
    <section className={styles.nosotros}>
      <h2>Nosotros</h2>
      <p>Somos una compañía de servicios aéreos: transporte logístico, venta de pasajes y mantenimiento de aeronaves.</p>

      <h3>Nuestro equipo</h3>
      <div className={styles.equipo}>
        {equipo.map((persona) => (
          <div className={styles.persona} key={persona.id}>
            <p className={styles.area}>{persona.area}</p>
            <p className={styles.nombre}>{persona.nombre}</p>
            <p>{persona.cargo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Nosotros;

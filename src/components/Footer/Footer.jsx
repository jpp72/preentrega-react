import styles from './Footer.module.css';

function Footer() {
  const equipo = [
    { id: 1, area: 'Logística', nombre: 'Martín Ferreyra', cargo: 'Jefe de Logística' },
    { id: 2, area: 'Turismo', nombre: 'Lucía Benítez', cargo: 'Coordinadora de Turismo' },
    { id: 3, area: 'Ingeniería', nombre: 'Diego Alvarado', cargo: 'Jefe de Ingeniería' },
  ];

  return (
    <footer className={styles.footer}>
      <h3 className={styles.titulo}>Nuestro equipo</h3>

      <div className={styles.equipo}>
        {equipo.map((persona) => (
          <div className={styles.persona} key={persona.id}>
            <p className={styles.area}>{persona.area}</p>
            <p className={styles.nombre}>{persona.nombre}</p>
            <p className={styles.cargo}>{persona.cargo}</p>
          </div>
        ))}
      </div>

      <small>Derechos reservados Talento Tech</small>
    </footer>
  );
}

export default Footer;

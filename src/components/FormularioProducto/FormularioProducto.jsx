import styles from './FormularioProducto.module.css';

function FormularioProducto({ datosForm, manejarCambio, manejarCambioImagen, manejarEnvio, cargando, mensaje, urlImagen }) {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3>Agregar nuevo servicio</h3>

      <div className={styles.campo}>
        <label htmlFor="nombre">Nombre del servicio:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej: Carga express"
          value={datosForm.nombre}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
          required
        >
          <option value="">Elegí una categoría</option>
          <option value="Transporte logístico">Transporte logístico</option>
          <option value="Viajes">Viajes</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Ej: Envíos urgentes en 24 horas"
          value={datosForm.descripcion}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="precio">Precio (USD):</label>
        <input
          type="number"
          id="precio"
          name="precio"
          placeholder="Ej: 1500"
          value={datosForm.precio}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={manejarCambioImagen}
        />
      </div>

      <button type="submit" className={styles.boton} disabled={cargando}>
        {cargando ? 'Subiendo imagen...' : 'Guardar servicio'}
      </button>

      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
      {urlImagen && <img className={styles.vistaPrevia} src={urlImagen} alt="Imagen subida" />}
    </form>
  );
}

export default FormularioProducto;

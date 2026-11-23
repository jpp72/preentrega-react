import styles from './FormularioProducto.module.css';
import { obtenerImagen } from '../../data/imagenes';

function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, modoEdicion, cancelarEdicion, guardando }) {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3>{modoEdicion ? 'Editar servicio' : 'Agregar nuevo servicio'}</h3>

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
          min="1"
          value={datosForm.precio}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="stock">Stock disponible:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Ej: 10"
          min="0"
          step="1"
          value={datosForm.stock}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="imagen">Imagen (URL):</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          placeholder="Ej: https://sitio.com/imagen.webp o /img/foto.jpg"
          value={datosForm.imagen}
          onChange={manejarCambio}
          required
        />
        {datosForm.imagen && (
          <img className={styles.vistaPrevia} src={obtenerImagen(datosForm.imagen)} alt="Vista previa" />
        )}
      </div>

      <label className={styles.check}>
        <input
          type="checkbox"
          name="oferta"
          checked={datosForm.oferta}
          onChange={manejarCambio}
        />
        Mostrar en ofertas (página de inicio)
      </label>

      <button type="submit" className={styles.boton} disabled={guardando}>
        {guardando ? 'Guardando...' : modoEdicion ? 'Actualizar servicio' : 'Guardar servicio'}
      </button>

      {modoEdicion && (
        <button type="button" className={styles.botonCancelar} onClick={cancelarEdicion}>
          Cancelar edición
        </button>
      )}
    </form>
  );
}

export default FormularioProducto;

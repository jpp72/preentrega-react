import { useState } from 'react';
import FormularioProducto from '../FormularioProducto/FormularioProducto';

function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: '',
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!imagenFile) {
      setMensaje('Por favor, seleccioná una imagen para el servicio.');
      return;
    }

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      setMensaje('Falta la API key de Imgbb en el archivo .env.local');
      return;
    }

    const formData = new FormData();
    formData.append('image', imagenFile);

    setCargando(true);
    setMensaje('');

    try {
      console.log('Subiendo imagen a Imgbb...');
      const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        const servicioCompleto = {
          ...datosForm,
          urlImagen: datosImgbb.data.url,
        };
        console.log('Enviando los siguientes datos COMPLETOS a la API:', servicioCompleto);
        setUrlImagen(datosImgbb.data.url);
        setMensaje('¡Servicio guardado con éxito!');
      } else {
        throw new Error('La subida de la imagen a Imgbb falló.');
      }
    } catch (error) {
      console.error('Error en el proceso de envío:', error);
      setMensaje('Hubo un error al subir la imagen. Por favor, intentá de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarCambioImagen={manejarCambioImagen}
      manejarEnvio={manejarEnvio}
      cargando={cargando}
      mensaje={mensaje}
      urlImagen={urlImagen}
    />
  );
}

export default FormularioContainer;

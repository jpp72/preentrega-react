import styles from './Inicio.module.css';
import banner from '../../assets/header.jpg';
import ServiciosDestacados from '../ServiciosDestacados/ServiciosDestacados';
import ItemListContainer from '../ItemListContainer/ItemListContainer';

function Inicio() {
  return (
    <>
      <img className={styles.banner} src={banner} alt="Compañía de Servicios Aéreos" />
      <ServiciosDestacados />
      <ItemListContainer soloOfertas />
    </>
  );
}

export default Inicio;

import './App.css'
import Layout from './components/Layout/Layout';
import ServiciosDestacados from './components/ServiciosDestacados/ServiciosDestacados';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import FormularioContainer from './components/FormularioContainer/FormularioContainer';

function App() {
  return (
    <Layout>
      <ServiciosDestacados />
      <ItemListContainer />
      <FormularioContainer />
    </Layout>
  )
}

export default App;

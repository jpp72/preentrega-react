import './App.css'
import Layout from './components/Layout/Layout';
import ServiciosDestacados from './components/ServiciosDestacados/ServiciosDestacados';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  return (
    <Layout>
      <ServiciosDestacados />
      <ItemListContainer />
    </Layout>
  )
}

export default App;

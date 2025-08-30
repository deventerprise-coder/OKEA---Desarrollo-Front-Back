import React from 'react';
import Navbar from './components/componentes/Navbar/Navbar';
import Footer from './components/componentes/Footer/Footer';
import PageMockup from './pages/PagePrueba';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageMockup />{/* <------ ATENCION = ESTA PAGINA LA CREE PARA PROBRAR, ESTO SE DEBERAR BORRAR CUANDO SE QUIERA AGREGAR LAS VERDADERAS PAGE -- sebasteusd*/}
      <Footer />
    </div>
  );
}

export default App;
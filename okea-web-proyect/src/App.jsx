import React from 'react';
import Navbar from './components/componentes/Navbar/Navbar';
import Footer from './components/componentes/Footer/Footer';
import PageMockup from './pages/PagePrueba';
import SocialBar from './components/componentes/SocialBar';
import FloatingActionButton from './components/componentes/FloatingActionButton';
import PreguntasFrecuentes from './components/componentes/PreguntasFrecuentes';
import BloqueDeServicios from './components/componentes/BloqueDeServicios';
import MarcasDestacadas from './components/componentes/MarcasDestacadas';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SocialBar />
      <FloatingActionButton />
      <PageMockup />{/* <------ ATENCION = ESTA PAGINA LA CREE PARA PROBRAR, ESTO SE DEBERAR BORRAR CUANDO SE QUIERA AGREGAR LAS VERDADERAS PAGE -- sebasteusd*/}
      <MarcasDestacadas />
      <PreguntasFrecuentes />
      <BloqueDeServicios />
      <Footer />
    </div>
  );
}

export default App;
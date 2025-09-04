import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageMockup from './pages/PagePrueba';
import SocialBar from './components/SocialBar';
import FloatingActionButton from './components/FloatingActionButton';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import BloqueDeServicios from './components/BloqueDeServicios';
import MarcasDestacadas from './components/MarcasDestacadas';

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
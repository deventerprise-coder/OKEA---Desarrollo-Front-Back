import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageMockup from './pages/PagePrueba';
import SocialBar from './components/SocialBar';
import FloatingActionButton from './components/FloatingActionButton';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import BloqueDeServicios from './components/BloqueDeServicios';
import MarcasDestacadas from './components/MarcasDestacadas';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SocialBar />
      <FloatingActionButton />
      <Home />
      <MarcasDestacadas />
      <PreguntasFrecuentes />
      <BloqueDeServicios />
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SocialBar from './components/SocialBar';
import FloatingActionButton from './components/FloatingActionButton';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import BloqueDeServicios from './components/BloqueDeServicios';
import MarcasDestacadas from './components/MarcasDestacadas';
import Home from './pages/Home/Home';
import CarritoPage from './pages/CarritoPage';
import ScrollToTop from './components/ScrollToTop';
import Categoria from './pages/Catalogo/Catergoria';

function App() {
  return (
<<<<<<< HEAD
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <SocialBar />
          <FloatingActionButton />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <MarcasDestacadas />
                  <PreguntasFrecuentes />
                  <BloqueDeServicios />
                </>
              }
            />
            <Route path="/carrito" element={<CarritoPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
=======
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SocialBar />
                <FloatingActionButton />
                <Home />
                <MarcasDestacadas />
                <PreguntasFrecuentes />
                <BloqueDeServicios />
              </>
            }
          />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route 
            path="/catalogo" 
            element={
              <>
                <Categoria />
                <BloqueDeServicios />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
>>>>>>> ac7a4063ca7d48ed8df6e526ad4124f5c0d16f75
  );
}

export default App;
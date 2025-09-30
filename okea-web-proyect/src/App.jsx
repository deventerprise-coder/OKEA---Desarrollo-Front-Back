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

function App() {
  return (
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
  );
}

export default App;
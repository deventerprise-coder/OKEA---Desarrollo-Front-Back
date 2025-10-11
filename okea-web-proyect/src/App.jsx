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
import DetalleProducto from './components/ecomerce/DetalleProducto';

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
                  <Footer />
                </>
              }
            />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route 
              path="/catalogo/tecnologia" 
              element={
                <>
                  <Categoria categoria={"Tecnología"} subcategoria={"Celulares"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/muebles-y-organizacion" 
              element={
                <>
                  <Categoria categoria={"Muebles y Organización"} subcategoria={"Sofás"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/calzado" 
              element={
                <>
                  <Categoria categoria={"Calzado"} subcategoria={"Zapatillas"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/dormitorio-y-banos" 
              element={
                <>
                  <Categoria categoria={"Dormitorio y Baños"} subcategoria={"Camas"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/accesorios-de-moda" 
              element={
                <>
                  <Categoria categoria={"Accesorios de Moda"} subcategoria={"Carteras"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/salud-y-bienestar" 
              element={
                <>
                  <Categoria categoria={"Salud y Bienestar"} subcategoria={"Cremas"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/juguetes" 
              element={
                <>
                  <Categoria categoria={"Juguetes"} subcategoria={"Carros de Juguete"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/decoracion-e-iluminacion" 
              element={
                <>
                  <Categoria categoria={"Decoración"} subcategoria={"Cuadros"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/mascotas" 
              element={
                <>
                  <Categoria categoria={"Mascotas"} subcategoria={"Comida para Perro"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/supermercado" 
              element={
                <>
                  <Categoria categoria={"Supermercado"} subcategoria={"Cereales"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/electrohogar" 
              element={
                <>
                  <Categoria categoria={"Electrohogar"} subcategoria={"Lavadoras"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/moda-hombre" 
              element={
                <>
                  <Categoria categoria={"Moda Hombre"} subcategoria={"Polos"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/catalogo/moda-mujer" 
              element={
                <>
                  <Categoria categoria={"Moda Mujer"} subcategoria={"Polos"}/>
                  <BloqueDeServicios />
                </>
              }
            />
            <Route 
              path="/producto/detalle/:modelo" 
              element={
                <>
                  <DetalleProducto />
                </>
              }
            />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
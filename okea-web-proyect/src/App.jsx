import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SocialBar from './components/SocialBar';
import BottomBar from './components/BottomBar'; 
import FloatingActionButton from './components/FloatingActionButton';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import BloqueDeServicios from './components/BloqueDeServicios';
import MarcasDestacadas from './components/MarcasDestacadas';
import Home from './pages/Home/Home';
import CarritoPage from './pages/CarritoPage';
import ScrollToTop from './components/ScrollToTop';
import Categoria from './pages/Catalogo/Catergoria';
import DetalleProducto from './components/ecomerce/DetalleProducto';
import Presentacion from './pages/Home/Presentacion';
import CategoriaHome from './pages/Home/CategoriaHome';
import Ofertas from './pages/Home/Ofertas';
import Tecnologia from './pages/Home/Tecnologia';
import Muebles from './pages/Home/Muebles';
import Calzado from './pages/Home/Calzado';
import Supermercado from './pages/Home/Supermercado';
import Recomendados from './pages/Home/Recomendados';
import Vendidos from './pages/Home/Vendidos';
import Ultimo from './pages/Home/Ultimo';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <SocialBar />
          <BottomBar />
          <FloatingActionButton />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Presentacion />
                  <CategoriaHome />
                  <Ofertas />
                  <Tecnologia />
                  <Muebles />
                  <Calzado />
                  <Supermercado />
                  <Recomendados />
                  <Vendidos />
                  <Ultimo />
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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
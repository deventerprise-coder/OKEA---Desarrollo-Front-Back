import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { SortProvider } from './components/ecomerce/SortContext';
import { CartProvider } from "./components/CartContext";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SocialBar from './components/SocialBar';
import BottomBar from './components/BottomBar';
import FloatingActionButton from './components/FloatingActionButton';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import BloqueDeServicios from './components/BloqueDeServicios';
import MarcasDestacadas from './components/MarcasDestacadas';
import ScrollToTop from './components/ScrollToTop';
import Categoria from './pages/Catalogo/Catergoria';
import ProductoDetalle from './pages/Dashboard/Productos/ProductoDetalle';
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
import Cart from './pages/Checkout/Cart';
import OfertasPage from './pages/Ofertas/OfertasPage';

import Perfil_Favoritos from './pages/Dashboard/Usuarios/Perfil_Favoritos'
import PerfilPage from './pages/Perfil/PerfilPage';
import LoginPage from "./pages/auth/LoginPage";
import { createUserFromLogin, emptyUser } from "./mocks/userMocks";

const CategoriaslugMap = {
  'tecnologia': 'Tecnología',
  'muebles-y-organizacion': 'Muebles y Organización',
  'calzado': 'Calzado',
  'dormitorio-y-banos': 'Dormitorio y Baños',
  'accesorios-de-moda': 'Accesorios de Moda',
  'salud-y-bienestar': 'Salud y Bienestar',
  'juguetes': 'Juguetes',
  'decoracion': 'Decoración',
  'mascotas': 'Mascotas',
  'supermercado': 'Supermercado',
  'electrohogar': 'Electrohogar',
  'moda-hombre': 'Moda Hombre',
  'moda-mujer': 'Moda Mujer',
  'automotriz': 'Automotriz',
};

const ProductoDetalleRoute = () => {
  const { categoria, producto } = useParams();
  const location = useLocation();
  const CategoriaProducto = CategoriaslugMap[categoria] || (categoria ? categoria.replace(/-/g, ' ') : '');
  const productoSlug = producto || '';
  const productoState = location.state?.producto;

  return (
    <ProductoDetalle
      CategoriaProducto={CategoriaProducto}
      productoSlug={productoSlug}
      productoState={productoState}
    />
  );
};

function AppContent() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 412);



  const [user, setUser] = useState(emptyUser);
  const isLoggedIn = !!user.id;

  const handleMockLogin = ({ email, name }) => {
    const newUser = createUserFromLogin({ email, name });
    setUser(newUser);
  };

  const handleLogout = () => setUser(emptyUser);

  const handleUpdateName = (newName) => {
    setUser((prev) => ({ ...prev, name: newName }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 412);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideNavFooter = location.pathname === "/carrito" && isMobile;
  if (!isLoggedIn && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Oculta Navbar, SocialBar, BottomBar y FloatingActionButton en /carrito móvil */}
      {!hideNavFooter && (
        <>
          <Navbar />
          <SocialBar />
          <BottomBar />
          <FloatingActionButton />
        </>
      )}

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

        {/*  NUEVA RUTA PERFIL */}
        <Route
          path="/perfil"
          element={
            <>
              <PerfilPage
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                onUpdateName={handleUpdateName}
              />
              <Footer />
            </>
          }
        />       {/*  NUEVA RUTA login */}
        <Route
          path="/login"
          element={
            <>
              <LoginPage onMockLogin={handleMockLogin} />
              <Footer />
            </>
          }
        />




        {/* Página completa de Ofertas */}
        <Route path="/ofertas" element={<OfertasPage />} />

        {/* Rutas de catálogo */}
        <Route path="/catalogo/tecnologia" element={<><Categoria categoria="Tecnología" subcategoria="Celulares" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/muebles-y-organizacion" element={<><Categoria categoria="Muebles y Organización" subcategoria="Sofás" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/calzado" element={<><Categoria categoria="Calzado" subcategoria="Zapatillas" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/dormitorio-y-banos" element={<><Categoria categoria="Dormitorio y Baños" subcategoria="Camas" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/accesorios-de-moda" element={<><Categoria categoria="Accesorios de Moda" subcategoria="Carteras" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/salud-y-bienestar" element={<><Categoria categoria="Salud y Bienestar" subcategoria="Cremas" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/juguetes" element={<><Categoria categoria="Juguetes" subcategoria="Carros de Juguete" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/decoracion-e-iluminacion" element={<><Categoria categoria="Decoración" subcategoria="Cuadros" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/mascotas" element={<><Categoria categoria="Mascotas" subcategoria="Comida para Perro" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/supermercado" element={<><Categoria categoria="Supermercado" subcategoria="Cereales" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/electrohogar" element={<><Categoria categoria="Electrohogar" subcategoria="Lavadoras" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/moda-hombre" element={<><Categoria categoria="Moda Hombre" subcategoria="Polos" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/catalogo/moda-mujer" element={<><Categoria categoria="Moda Mujer" subcategoria="Polos" /><BloqueDeServicios /><Footer /></>} />
        <Route path="/producto/detalle/:categoria/:producto" element={<ProductoDetalleRoute />} />

        {/* 🛒 Ruta del carrito */}
        <Route
          path="/carrito"
          element={
            <>
              <Cart />
              {/* En móviles quitamos también BloqueDeServicios y Footer */}
              {!isMobile && (
                <>
                  <BloqueDeServicios />
                  <Footer />
                </>
              )}
            </>
          }
        />
        <Route path="/perfil_favoritos"
          element={
            <Perfil_Favoritos
              user={user}
              onLogout={handleLogout}
            />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SortProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </SortProvider>
    </ThemeProvider>
  );
}

export default App;

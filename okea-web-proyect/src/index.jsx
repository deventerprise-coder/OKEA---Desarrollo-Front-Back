// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import TestRouter from './pages/Ofertanueva/TestRouter';  // Usamos TestRouter para las rutas de prueba

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TestRouter />  {/* Renderizamos TestRouter para manejar las rutas independientes */}
  </React.StrictMode>
);

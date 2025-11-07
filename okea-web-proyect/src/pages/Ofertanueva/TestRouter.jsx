// src/pages/Ofertanueva/TestRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Oferta1Page from './Oferta1Page';  // Ruta para la página de Oferta1

const TestRouter = () => (
  <Routes>
    {/* Ruta para la página independiente Oferta1 */}
    <Route path="oferta1" element={<Oferta1Page />} />
  </Routes>
);

export default TestRouter;

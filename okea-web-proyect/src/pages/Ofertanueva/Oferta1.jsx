// src/pages/Ofertanueva/Oferta1.jsx

import React, { useState, useEffect } from 'react';


// Importamos la imagen desde la carpeta assets
import bannerImage from '../../assets/imagenes/Home/banner.png';  // Ruta correcta de la imagen
import barraImage from   '../../assets/imagenes/Home/imagen1.png';
import Producto2Image from   '../../assets/imagenes/Home/imagen2.png';
import Producto3Image from   '../../assets/imagenes/Home/imagen3.png';
import Producto4Image from   '../../assets/imagenes/Home/imagen4.png';
import Producto5Image from   '../../assets/imagenes/Home/imagen5.png';
import Producto6Image from   '../../assets/imagenes/Home/imagen6.png';
import banner2Image   from   '../../assets/imagenes/Categorias/Panel/PanelCalzado.png';

import Producto7Image from    '../../assets/imagenes/Home/imagen7.png';
import Producto8Image from    '../../assets/imagenes/Home/imagen8.png';
import Producto9Image from    '../../assets/imagenes/Home/imagen9.png';
import Producto10Image from   '../../assets/imagenes/Home/imagen10.png';
import Producto111Image from   '../../assets/imagenes/Home/imagen111.png';
import Producto121Image from   '../../assets/imagenes/Home/imagen121.png';

import Frame1Image from   '../../assets/imagenes/Home/Frame1.png';

import Producto13Image from    '../../assets/imagenes/Home/imagen13.jpg';
import Producto14Image from    '../../assets/imagenes/Home/imagen18.png';
import Producto141Image from    '../../assets/imagenes/Home/image14.png';



import Producto15Image from    '../../assets/imagenes/Home/imagen15.jpg';
import Producto16Image from   '../../assets/imagenes/Home/imagen16.png';
import Producto17Image from   '../../assets/imagenes/Home/imagen17.png';
import Frame2Image from   '../../assets/imagenes/Home/Frame2.png';
import Producto19Image from   '../../assets/imagenes/Home/imagen19.png';

import Producto20Image from    '../../assets/imagenes/Home/imagen20.png';
import Producto21Image from    '../../assets/imagenes/Home/imagen21.png';
import Producto22Image from    '../../assets/imagenes/Home/imagen22.png';
import Producto23Image from   '../../assets/imagenes/Home/imagen23.png';

import Frame3Image from   '../../assets/imagenes/Home/Frame3.png';
import FooterPequeño from "../../components/Footer/FooterPequeño";  // Correcto según la estructura de tu proyecto
import FooterGrande from "../../components/Footer/FooterGrande"; 
import Footer from "../../components/Footer/Footer"; 
import BloqueDeServicios from "../../components/BloqueDeServicios";

import Frame4Image from   '../../assets/imagenes/Home/Frame4.png';
import Producto25Image from  '../../assets/imagenes/MarcasDestacadas/iphone.png';
import Producto26Image from  '../../assets/imagenes/MarcasDestacadas/nike.png';
import Producto27Image from  '../../assets/imagenes/MarcasDestacadas/samsung.png';
import Producto28Image from  '../../assets/imagenes/MarcasDestacadas/bata.png';
import Producto29Image from  '../../assets/imagenes/MarcasDestacadas/xiaomi.png';

import Navbar from '../../components/Navbar/Navbar';
import { ThemeProvider } from '../../components/ThemeContext';



export default function Oferta1() {








 useEffect(() => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);

  // Escucha el cambio del tema
  const themeObserver = new MutationObserver(() => {
    const newTheme = document.documentElement.getAttribute('data-theme');
    localStorage.setItem('theme', newTheme);
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  return () => themeObserver.disconnect();
}, []);




   // Estado para manejar el slide actual
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerImage, banner2Image]; // Array con las imágenes del carrusel

  // Función para cambiar al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Avanza al siguiente slide
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Retrocede al slide anterior
  };
  
   // Estado para manejar productos
  const [liked, setLiked] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
   
  const handleClick = (id) => {
    setAddedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // solo cambia el botón clickeado
    }));
  };


  return (
    
    <section className="relative w-full pt-10">
      {/* Carrusel de Presentación */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[580px] overflow-hidden">
        {/* Slides con transición de opacidad */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <img
              src={slide}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}

        {/* Controles */}
        <div className="absolute bottom-2 w-full flex items-center justify-evenly px-10 z-50">
          {/* Flecha izquierda */}
          <button
            onClick={prevSlide}
            className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2"
          >
            {'<'}
          </button>

          {/* Indicadores */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 mt-1">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${
                  currentSlide === index ? 'bg-gray-400/50 scale-150' : 'bg-gray-400/50'
                }`}
              ></div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={nextSlide}
            className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2"
          >
            {'>'}
          </button>
        </div>
       </div>
        
      
  
      {/* Frame1  */}
      <div className="flex justify-center items-center w-full bg py-5 mt-1">
        <img 
        src={barraImage}  // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
        alt="Oferta Especial"  // Descripción de la imagen
        className="w-full lg:w-[86%] object-cover rounded-lg "  // Clase de TailwindCSS para el tamaño y estilo
      />
      </div>
    

   <section className="flex justify-start ml-16 px-4 py-1"> {/* Ajustamos el ml-4 y px-4 para móviles */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-0"> 
   
    {/* Producto 1 */}
    <div className="bg-white p-4 rounded-lg shadow-md relative flex justify-center items-center">
      <div className="relative w-[100%] h-[270px] flex justify-center items-center"> {/* Ajustamos el tamaño de la imagen */}
        <img
          className="w-full h-full object-cover rounded-lg border-none outline-none"
          src={Producto2Image}
          alt="Producto en Oferta 1"
        />
      </div>
      <div className="absolute top-1 left-2/11 transform -translate-x-1/2 py-1 px-4 rounded-lg">
        <img 
          src={Frame4Image}
          alt="Descuento"
          className="w-29 h-auto border-none outline-none" 
        />
      </div>
    </div>

    {/* Producto 2 */}
    <div className="bg-white p-4 rounded-lg shadow-md relative flex justify-center items-center">
      <div className="relative w-[100%] h-[270px] flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={Producto3Image}
          alt="Producto en Oferta 2"
        />
      </div>
      <div className="absolute top-1 left-2/11 transform -translate-x-1/2 py-1 px-4 rounded-lg">
        <img src={Frame4Image} 
        alt="Descuento" 
        className="w-29 h-auto border-none outline-none " />
      </div>
    </div>

    {/* Producto 3 */}
    <div className="bg-white p-4 rounded-lg shadow-md relative flex justify-center items-center">
      <div className="relative w-[100%] h-[270px] flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={Producto4Image}
          alt="Producto en Oferta 3"
        />
      </div>
      <div className="absolute top-1 left-2/11 transform -translate-x-1/2 py-1 px-6 rounded-lg">
        <img src={Frame4Image} alt="Descuento" 
        className="w-29 h-auto" />
      </div>
    </div>

  </div>
</section>


 
         <div className="flex justify-center items-center w-full bg py-3 mt-4">
      <img 
        src={Producto5Image}  // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
        alt="Oferta Especial"  // Descripción de la imagen
        className="w-full lg:w-[86%] sm:w-[90%] md:w-[80%]   object-cover rounded-lg "  // Clase de TailwindCSS para el tamaño y estilo
      />
      </div>
    

     <div className="flex justify-center items-center w-full bg py-3 mt-4">

    <img 
        src={Producto6Image}  // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
        alt="Oferta Especial"  // Descripción de la imagen
        className="w-full lg:w-[86%]  sm:w-[90%] md:w-[80%]  object-cover rounded-lg"  // Clase de TailwindCSS para el tamaño y estilo
      />
   </div>
   
    
    {/* Productos Recomendados */}
<section className="w-full px-3 md:px-6 lg:px-24 mt-2">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">

    {/* Card 1 */}
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-3
        bg-[linear-gradient(to_bottom,#f3f4f6_0%,#f3f4f6_50%,#ffffff_50%,#ffffff_100%)]">
          
      {/* chip superior izquierda */}
      <span className="absolute top-3 left-3 h-4 w-12 rounded-full bg-[#FF6F61]"></span>
      {/* corazón */}
      <button className="absolute top-3 right-3 text-gray-300 hover:text-rose-500" aria-label="fav">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.353-9.364-7.004A5.5 5.5 0 1 1 11.3 6.3L12 7l.7-.7a5.5 5.5 0 1 1 8.664 7.696C18.716 16.647 12 21 12 21z"/></svg>
      </button>

      {/* imagen */}
      <div className="h-36 rounded-lg  flex items-center justify-center overflow-hidden">
        <img src={Producto7Image} alt="Producto 1" className="h-full w-full object-contain" />
      </div>

      {/* info */}
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">Label</p>
          <div className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span className="text-gray-500">4.9</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 -mt-0.5">Wooden Sofa Chair</p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[#FF3B30] font-semibold">$80.00</span>
          <span className="text-gray-400 line-through text-xs">$160.00</span>
        </div>

        <button className="mt-3 w-full rounded-full bg-[#DDE34E] hover:bg-[#d3d844] text-gray-800 text-sm font-medium py-2 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/></svg>
          Agregar al carrito
        </button>
      </div>
    </article>

    {/* Card 2 */}
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-3
        bg-[linear-gradient(to_bottom,#f3f4f6_0%,#f3f4f6_50%,#ffffff_50%,#ffffff_100%)]">

      <span className="absolute top-3 left-3 h-4 w-12 rounded-full bg-[#FF6F61]"></span>
      <button className="absolute top-3 right-3 text-gray-300 hover:text-rose-500" aria-label="fav">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.353-9.364-7.004A5.5 5.5 0 1 1 11.3 6.3L12 7l.7-.7a5.5 5.5 0 1 1 8.664 7.696C18.716 16.647 12 21 12 21z"/></svg>
      </button>

      <div className="h-36 rounded-lg  flex items-center justify-center overflow-hidden">
        <img src={Producto8Image} alt="Producto 2" className="h-full w-full object-contain" />
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">Label</p>
          <div className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span className="text-gray-500">4.9</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 -mt-0.5">Wooden Sofa Chair</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[#FF3B30] font-semibold">$80.00</span>
          <span className="text-gray-400 line-through text-xs">$160.00</span>
        </div>
        <button className="mt-3 w-full rounded-full bg-[#DDE34E] hover:bg-[#d3d844] text-gray-800 text-sm font-medium py-2 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/></svg>
          Agregar al carrito
        </button>
      </div>
    </article>

    {/* Card 3 */}
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-3
       bg-[linear-gradient(to_bottom,#f3f4f6_0%,#f3f4f6_50%,#ffffff_50%,#ffffff_100%)]">

      <span className="absolute top-3 left-3 h-4 w-12 rounded-full bg-[#FF6F61]"></span>
      <button className="absolute top-3 right-3 text-gray-300 hover:text-rose-500" aria-label="fav">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.353-9.364-7.004A5.5 5.5 0 1 1 11.3 6.3L12 7l.7-.7a5.5 5.5 0 1 1 8.664 7.696C18.716 16.647 12 21 12 21z"/></svg>
      </button>
      <div className="h-36 rounded-lg  flex items-center justify-center overflow-hidden">
        <img src={Producto9Image} alt="Producto 3" className="h-full w-full object-contain" />
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">Label</p>
          <div className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span className="text-gray-500">4.9</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 -mt-0.5">Wooden Sofa Chair</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[#FF3B30] font-semibold">$80.00</span>
          <span className="text-gray-400 line-through text-xs">$160.00</span>
        </div>
        <button className="mt-3 w-full rounded-full bg-[#DDE34E] hover:bg-[#d3d844] text-gray-800 text-sm font-medium py-2 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/></svg>
          Agregar al carrito
        </button>
      </div>
    </article>

    {/* Card 4 */}
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-3
        bg-[linear-gradient(to_bottom,#f3f4f6_0%,#f3f4f6_50%,#ffffff_50%,#ffffff_100%)]">

      <span className="absolute top-3 left-3 h-4 w-12 rounded-full bg-[#FF6F61]"></span>
      <button className="absolute top-3 right-3 text-gray-300 hover:text-rose-500" aria-label="fav">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.353-9.364-7.004A5.5 5.5 0 1 1 11.3 6.3L12 7l.7-.7a5.5 5.5 0 1 1 8.664 7.696C18.716 16.647 12 21 12 21z"/></svg>
      </button>
      <div className="h-36 rounded-lg  flex items-center justify-center overflow-hidden">
        <img src={Producto10Image} alt="Producto 4" className="h-full w-full object-contain" />
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">Label</p>
          <div className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span className="text-gray-500">4.9</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 -mt-0.5">Wooden Sofa Chair</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[#FF3B30] font-semibold">$80.00</span>
          <span className="text-gray-400 line-through text-xs">$160.00</span>
        </div>
        <button className="mt-3 w-full rounded-full bg-[#DDE34E] hover:bg-[#d3d844] text-gray-800 text-sm font-medium py-2 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/></svg>
          Agregar al carrito
        </button>
      </div>
    </article>

    {/* Card 5 (con -50% y timer chip) */}
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-3
        bg-[linear-gradient(to_bottom,#f3f4f6_0%,#f3f4f6_50%,#ffffff_50%,#ffffff_100%)]">

      <span className="absolute -top-0 left-3 text-[11px] font-semibold text-white bg-rose-500 rounded-full px-2 py-[2px]">-50 %</span>
      <button className="absolute top-3 right-3 text-gray-300 hover:text-rose-500" aria-label="fav">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.353-9.364-7.004A5.5 5.5 0 1 1 11.3 6.3L12 7l.7-.7a5.5 5.5 0 1 1 8.664 7.696C18.716 16.647 12 21 12 21z"/></svg>
      </button>
      <div className="h-30 rounded-lg  flex items-center justify-center overflow-hidden">
        <img src={Producto111Image} alt="Producto 5" className="h-full w-full object-contain" />
      </div>
      {/* chip de tiempo */}
      <div className="flex justify-start mt-2">
        <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-[11px] font-medium px-2 py-[3px] rounded-full">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8v5l4 2-.75 1.86L11 14V8h1zM12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2z"/></svg>
          05 05 02
        </span>
      </div>
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">Label</p>
          <div className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span className="text-gray-500">4.9</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 -mt-0.5">Wooden Sofa Chair</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[#FF3B30] font-semibold">$80.00</span>
          <span className="text-gray-400 line-through text-xs">$160.00</span>
        </div>
        <button className="mt-3 w-full rounded-full bg-[#DDE34E] hover:bg-[#d3d844] text-gray-800 text-sm font-medium py-2 flex items-center justify-center gap-2">
          <svg className="w-5 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/></svg>
          Agregar al carrito
        </button>
      </div>
    </article>

    {/* Card 6 (con -50% y timer chip) */}
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-3
    bg-[linear-gradient(to_bottom,#f3f4f6_0%,#f3f4f6_50%,#ffffff_50%,#ffffff_100%)]">

      <span className="absolute -top-0 left-3 text-[11px] font-semibold text-white bg-rose-500 rounded-full px-2 py-[2px]">-50 %</span>

      <button className="absolute top-3 right-3 text-gray-300 hover:text-rose-500" aria-label="fav">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21s-6.716-4.353-9.364-7.004A5.5 5.5 0 1 1 11.3 6.3L12 7l.7-.7a5.5 5.5 0 1 1 8.664 7.696C18.716 16.647 12 21 12 21z"/>
        </svg>
      </button>

  {/* contenedor de imagen SIN fondo para que se vea el gradiente */}
      <div className="h-30 rounded-lg  flex items-center justify-center overflow-hidden">
        <img src={Producto121Image}
         alt="Producto 6" 
         className="h-[100px] w-[290px] object-contain" />
      </div>


      <div className="flex justify-start mt-2">
        <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-[11px] font-medium px-2 py-[3px] rounded-full">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8v5l4 2-.75 1.86L11 14V8h1zM12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2z"/>
                <path d="M12 8v5l4 2-.75 1.86L11 14V8h1zM12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2z"/>
          </svg>
          05 05 02
        </span>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">Label</p>
          <div className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="text-gray-500">4.9</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 -mt-0.5">Wooden Sofa Chair</p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[#FF3B30] font-semibold">$80.00</span>
          <span className="text-gray-400 line-through text-xs">$160.00</span>
        </div>

        <button className="mt-3 w-full rounded-full bg-[#DDE34E] hover:bg-[#d3d844] text-gray-800 text-sm font-medium py-2 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/>
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26l.03.01 10.44.01a1 1 0 0 0 .97-.76l1.2-4.79A1 1 0 0 0 18.84 7H6.21l-.3-1.2A1 1 0 0 0 5 5H3v2h1.24l2.02 7.87z"/>
          </svg>
          Agregar al carrito
        </button>
      </div>
    </article>

  </div>
</section>

        
   {/* Frame1 */}

 <div className="flex justify-center items-center w-full bg py-2 mt-3">
  <img 
    src={Frame1Image}  
    alt="Oferta Especial"  
    className="w-full lg:w-[86%] sm:w-[90%] md:w-[80%] object-cover rounded-lg"  
  />
 </div>
 
  
   <section className="grid grid-cols-6 gap-3 px-24 py-1"> {/* Cambié gap-7 a gap-4 para reducir el espaciado */}
  {/* Tarjeta 1 (div1) */}
  <div className="col-span-3 row-span-2  p-0 rounded-lg shadow-md relative">
    <img src={Producto13Image} alt="iPhone 16 Pro" className="w-[600px] h-[300px] object-cover rounded-lg" />
    {/* Franja amarilla con texto */}
    <div className="absolute bottom-0 left-0 w-full bg-[] text-[#1C4390] px-4 py-3 rounded-b-lg">
      
    </div>
  </div>

  {/* Tarjeta 2 (div2) */}
  <div className="col-span-3 row-span-2  p-0 rounded-lg shadow-md col-start-4 relative">
    <img src={Producto141Image} alt="Laptop ajustable" className="w-[650px] h-[300px] object-cover rounded-lg" />
    {/* Franja amarilla con texto */}
    <div className="absolute bottom-0 left-0 w-full bg-[] text-[#1C4390] px-4 py-3 rounded-b-lg">
      
    </div>
  </div>

  {/* Tarjeta 3 (div3) */}
  <div className="col-span-2 row-span-2  p-0 rounded-lg shadow-md row-start-4 relative">
    <img src={Producto15Image} alt="AirPods Max" className="w-full h-[350px] object-cover rounded-lg" />
    {/* Franja amarilla con texto */}
    <div className="absolute bottom-0 left-0 w-full bg-[#DFE162] text-[#1C4390] px-4 py-3 rounded-b-lg">
      <h3 className="font-extrabold text-lg tracking-tight">SONY</h3>
      <p className="text-sm leading-none">Audífonos bluetooth</p>
    </div>
  </div>

  {/* Tarjeta 4 (div4) */}
  <div className="col-span-2 row-span-2 bg-white p-0 rounded-lg shadow-md col-start-3 row-start-4 relative">
    <img src={Producto16Image} alt="Echo Pop" className="w-full h-[350px] object-cover rounded-lg" />
    {/* Franja amarilla con texto */}
    <div className="absolute bottom-0 left-0 w-full bg-[#DFE162] text-[#1C4390] px-4 py-3 rounded-b-lg">
      <h3 className="font-extrabold text-lg tracking-tight">SONY</h3>
      <p className="text-sm leading-none">Audífonos bluetooth</p>
    </div>
  </div>

  {/* Tarjeta 5 (div5) */}
  <div className="col-span-2 row-span-2 bg-white p-0 rounded-lg shadow-md col-start-5 row-start-4 relative">
    <img src={Producto17Image} alt="Cámara Canon" className="w-full h-[350px] object-cover rounded-lg" />
    {/* Franja amarilla con texto */}
    <div className="absolute bottom-0 left-0 w-full bg-[#DFE162] text-[#1C4390] px-4 py-3 rounded-b-lg">
      <h3 className="font-extrabold text-lg tracking-tight">SONY</h3>
      <p className="text-sm leading-none">Audífonos bluetooth</p>
    </div>
  </div>
</section>






    <div className="flex justify-center items-center w-full bg py-3 mt-4">
     <img 
        src={Frame2Image}  // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
        alt="Oferta Especial"  // Descripción de la imagen
        className="w-full lg:w-[86%] object-cover rounded-lg"  // Clase de TailwindCSS para el tamaño y estilo
      />
       </div>
       
           <div className="flex justify-center items-center w-full bg py-3 mt-4">
         <img 
        src={Producto19Image}  // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
        alt="Oferta Especial"  // Descripción de la imagen
        className=" w-full lg:w-[86%] object-cover rounded-lg"  // Ajustado al tamaño fijo con espaciado
      />
       </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-23 py-4">
  {/* Producto 1: Reebok */}
  <div className="bg-white rounded-[16px] overflow-hidden shadow-md">
    <img 
      src={Producto20Image} // Imagen de Producto 20
      alt="Producto 20"
      className="w-full h-[320px] object-cover rounded-t-[16px]"
    />
  </div>

  {/* Producto 2: Puma */}
  <div className="bg-white rounded-[16px] overflow-hidden shadow-md">
    <img 
      src={Producto21Image} // Imagen de Producto 21
      alt="Producto 21"
      className="w-full h-[320px] object-cover rounded-t-[16px]"
    />
  </div>

  {/* Producto 3: Adidas */}
  <div className="bg-white rounded-[16px] overflow-hidden shadow-md">
    <img 
      src={Producto22Image} // Imagen de Producto 22
      alt="Producto 22"
      className="w-full h-[320px] object-cover rounded-t-[16px]"
    />
  </div>

  {/* Producto 4: Nuevo Producto */}
  <div className="bg-white rounded-[16px] overflow-hidden shadow-md">
    <img 
      src={Producto23Image} // Imagen de Producto 23
      alt="Producto 23"
      className="w-full h-[320px] object-cover rounded-t-[16px]"
    />
  </div>
</section>


     <section>
  <div>
   <h2 className="text-3xl font-semibold text-center mb-6 py-10">Marcas destacadas</h2>
<section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-23 py-0">
  {/* Producto 1: iPhone */}
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative group  ">
    <img 
      src={Producto25Image} 
      alt="iPhone" 
      className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-60 transition-all duration-300"
    />

  </div>

  {/* Producto 2: Nike */}
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
    <img 
      src={Producto26Image} 
      alt="Nike" 
      className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-60 transition-all duration-300"
    />
    
  </div>

  {/* Producto 3: Samsung */}
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
    <img 
      src={Producto27Image} 
      alt="Samsung" 
      className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-60 transition-all duration-300"

    />
    
  </div>

  {/* Producto 4: Bata */}
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
    <img 
      src={Producto28Image} 
      alt="Bata" 
      className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-60 transition-all duration-300"

    />
    
  </div>

  {/* Producto 5: Xiaomi */}
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative group">
    <img 
      src={Producto29Image} 
      alt="Xiaomi" 
       className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-60 transition-all duration-300"

    />
   
  </div>
</section>

  </div>
      </section>
       
 
    <BloqueDeServicios/>
   <FooterPequeño />
<FooterGrande />





    </section>

        
  );

}


 
// src/pages/Ofertanueva/Oferta1.jsx

import React, { useState, useEffect } from 'react';

// Importamos la imagen desde la carpeta assets
import bannerImage from '../../assets/imagenes/Ofertas/banner.png';
import barraImage from  '../../assets/imagenes/Ofertas/imagen1.png';
import Producto2Image from  '../../assets/imagenes/Ofertas/imagen2.png';
import Producto3Image from  '../../assets/imagenes/Ofertas/imagen3.png';
import Producto4Image from  '../../assets/imagenes/Ofertas/imagen4.png';
import Producto5Image from  '../../assets/imagenes/Ofertas/imagen5.png';
import Producto6Image from  '../../assets/imagenes/Ofertas/imagen6.png';
import banner2Image  from  '../../assets/imagenes/Categorias/Panel/PanelCalzado.png';
import Producto7Image from  '../../assets/imagenes/Ofertas/imagen7.png';
import Producto8Image from '../../assets/imagenes/Ofertas/imagen8.png';
import Producto9Image from '../../assets/imagenes/Ofertas/imagen9.png';
import Producto10Image from '../../assets/imagenes/Ofertas/imagen10.png';
import Producto111Image from  '../../assets/imagenes/Ofertas/imagen111.png';
import Producto121Image from  '../../assets/imagenes/Ofertas/imagen121.png';
import Frame1Image from  '../../assets/imagenes/Ofertas/Frame1.png';
import Producto13Image from '../../assets/imagenes/Ofertas/imagen13.jpg';
import Producto14Image from '../../assets/imagenes/Ofertas/imagen18.png';
import Producto141Image from '../../assets/imagenes/Ofertas/image14.png';
import Producto15Image from '../../assets/imagenes/Ofertas/imagen15.jpg';
import Producto16Image from  '../../assets/imagenes/Ofertas/imagen16.png';
import Producto17Image from  '../../assets/imagenes/Ofertas/imagen17.png';
import Frame2Image from  '../../assets/imagenes/Ofertas/Frame2.png';
import Producto19Image from  '../../assets/imagenes/Ofertas/imagen19.png';
import Producto20Image from '../../assets/imagenes/Ofertas/imagen20.png';
import Producto21Image from '../../assets/imagenes/Ofertas/imagen21.png';
import Producto22Image from '../../assets/imagenes/Ofertas/imagen22.png';
import Producto23Image from  '../../assets/imagenes/Ofertas/imagen23.png';
import Frame3Image from  '../../assets/imagenes/Ofertas/Frame3.png';
import FooterPequeño from "../../components/Footer/FooterPequeño";
import FooterGrande from "../../components/Footer/FooterGrande"; 
import Footer from "../../components/Footer/Footer"; 
import BloqueDeServicios from "../../components/BloqueDeServicios";
import Frame4Image from  '../../assets/imagenes/Ofertas/Frame4.png';
import Producto25Image from '../../assets/imagenes/MarcasDestacadas/iphone.png';
import Producto26Image from '../../assets/imagenes/MarcasDestacadas/nike.png';
import Producto27Image from '../../assets/imagenes/MarcasDestacadas/samsung.png';
import Producto28Image from '../../assets/imagenes/MarcasDestacadas/bata.png';
import Producto29Image from '../../assets/imagenes/MarcasDestacadas/xiaomi.png';
import MarcasDestacadas from '../../components/MarcasDestacadas';

import Navbar from '../../components/Navbar/Navbar';
import ProductCardV2 from '../../components/ProductCardV2'; // Asumo que esta es la ruta

{/* 1. Imports del Tema (como en Muebles.jsx) */}
import { useTheme } from '../../components/ThemeContext';


export default function Oferta1() {

	const { isLight } = useTheme();

	const getBackgroundStyle = () => {
		return {
			backgroundColor: isLight ? '#ffffff' : '#120F31',
			color: isLight ? '#000000' : '#ffffff',
			transition: 'background-color 0.3s ease, color 0.3s ease'
		};
	};

	const getSectionStyle = (customBg = null) => {
		if (customBg) {
			return {
				backgroundColor: isLight ? customBg : 'rgba(16, 16, 30, 0.9)',
				color: isLight ? '#000000' : '#ffffff',
				transition: 'all 0.3s ease'
			};
		}
		return {
			backgroundColor: isLight ? '#ffffff' : 'rgba(24, 24, 60, 0.8)', 
			color: isLight ? '#000000' : '#ffffff',
			transition: 'all 0.3s ease'
		};
	};

	const getTextStyle = () => {
		return {
			color: isLight ? '#434651' : '#FFFFFF',
			transition: 'color 0.3s ease'
		};
	};

	const getCardStyle = () => {
		return {
			backgroundColor: isLight ? '#FFFFFF' : '#292272',
			transition: 'all 0.3s ease'
		};
	};
	{/* --- Fin de las funciones del Tema --- */}


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
	
	// Estado para manejar Productos
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
			[id]: !prev[id], 
		}));
	};

	const Productos = [
		{ id: 'p7', image: Producto7Image, title: 'Producto 7', label: 'Label', oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
		{ id: 'p8', image: Producto8Image, title: 'Producto 8', label: 'Label', oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
		{ id: 'p9', image: Producto9Image, title: 'Producto 9', label: 'Label', oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
		{ id: 'p10', image: Producto10Image, title: 'Producto 10', label: 'Label', oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
		{ id: 'p11', image: Producto111Image, title: 'Producto 11', label: 'Label', oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: '-50 %' },
		{ id: 'p12', image: Producto121Image, title: 'Producto 12', label: 'Label', oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: '-50 %' }
	];
	

	return (
		
		<section className="relative w-full pt-10" style={getBackgroundStyle()}> {/* 5. Apliqué el estilo de fondo principal */}
			{/* Carrusel de Presentación (altura fija, ahora compatible con imágenes correctas) */}
			<div className="relative w-full h-[300px] md:h-[500px] lg:h-[1044px] overflow-hidden">
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
							className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
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
			
			
	
			{/* Frame1 */}
			<div className="flex justify-center items-center w-full bg py-5 mt-1">
				<img 
				src={barraImage} // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
				alt="Oferta Especial" // Descripción de la imagen
				className="w-full lg:w-[86%] object-cover rounded-lg " // Clase de TailwindCSS para el tamaño y estilo
			/>
			</div>
		

		<section className="flex justify-center w-full px-4 py-1">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-0"> 
			
				{/* 6. Apliqué estilo a las cards estáticas */}
				{/* Producto 1 */}
				<div className="bg-white p-4 rounded-lg shadow-md relative flex justify-center items-center w-[516px] h-[382px]" style={getSectionStyle()}>
					<div className="relative w-[100%] h-[270px] flex justify-center items-center">
						<img
							className="w-full h-full object-contain rounded-lg border-none outline-none"
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
				<div className="bg-white p-4 rounded-lg shadow-md relative flex justify-center items-center w-[516px] h-[382px]" style={getSectionStyle()}>
					<div className="relative w-[100%] h-[270px] flex justify-center items-center">
						<img
							className="w-full h-full object-contain rounded-lg"
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
				<div className="bg-white p-4 rounded-lg shadow-md relative flex justify-center items-center w-[516px] h-[382px]" style={getSectionStyle()}>
					<div className="relative w-[100%] h-[270px] flex justify-center items-center">
						<img
							className="w-full h-full object-contain rounded-lg"
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
				src={Producto5Image} // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
				alt="Oferta Especial" // Descripción de la imagen
				className="w-full lg:w-[86%] sm:w-[90%] md:w-[80%]  object-cover rounded-lg " // Clase de TailwindCSS para el tamaño y estilo
			/>
			</div>
		

			<div className="flex justify-center items-center w-full bg py-3 mt-4">

			<img 
				src={Producto6Image} // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
				alt="Oferta Especial" // Descripción de la imagen
				className="w-full lg:w-[86%] sm:w-[90%] md:w-[80%] object-cover rounded-lg" // Clase de TailwindCSS para el tamaño y estilo
			/>
		</div>
		
		
	<section className="w-full px-3 md:px-6 lg:px-24 mt-2">
		
		<div className="carrusel w-full flex flex-nowrap justify-center gap-13 overflow-x-auto pb-4">
			{Productos.map((p) => (
				<div key={p.id} className="flex-shrink-0">
					<ProductCardV2
						id={p.id}
						{...p}
						liked={liked[p.id]}
						added={addedItems[p.id]}
						onLike={toggleLike}
						onAdd={handleClick}
						getCardStyle={getCardStyle}
						getTextStyle={getTextStyle}
					/>
				</div>
			))}
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
	
		{/* 8. Apliqué estilo a las cards de grilla (Sony, etc.) */}
		<section className="grid grid-cols-6 gap-3 px-24 py-1">
			{/* Tarjeta 1 (div1) */}
			<div className="col-span-3 row-span-2 p-0 rounded-lg shadow-md relative" style={getSectionStyle()}>
				<img src={Producto13Image} alt="iPhone 16 Pro" className="w-[600px] h-[300px] object-contain rounded-lg" />
				<div className="absolute bottom-0 left-0 w-full bg-[] text-[#1C4390] px-4 py-3 rounded-b-lg">
				</div>
			</div>

			{/* Tarjeta 2 (div2) */}
			<div className="col-span-3 row-span-2 p-0 rounded-lg shadow-md col-start-4 relative" style={getSectionStyle()}>
				<img src={Producto141Image} alt="Laptop ajustable" className="w-[650px] h-[300px] object-contain rounded-lg" />
				<div className="absolute bottom-0 left-0 w-full bg-[] text-[#1C4390] px-4 py-3 rounded-b-lg">
				</div>
			</div>

			{/* Tarjeta 3 (div3) */}
			<div className="col-span-2 row-span-2 p-0 rounded-lg shadow-md row-start-4 relative" style={getSectionStyle()}>
				<img src={Producto15Image} alt="AirPods Max" className="w-full h-[350px] object-contain rounded-lg" />
				<div className="absolute bottom-0 left-0 w-full bg-[#DFE162] text-[#1C4390] px-4 py-3 rounded-b-lg">
					<h3 className="font-extrabold text-lg tracking-tight">SONY</h3>
					<p className="text-sm leading-none">Audífonos bluetooth</p>
				</div>
			</div>

			{/* Tarjeta 4 (div4) */}
			<div className="col-span-2 row-span-2 bg-white p-0 rounded-lg shadow-md col-start-3 row-start-4 relative" style={getSectionStyle()}>
				<img src={Producto16Image} alt="Echo Pop" className="w-full h-[350px] object-contain rounded-lg" />
				<div className="absolute bottom-0 left-0 w-full bg-[#DFE162] text-[#1C4390] px-4 py-3 rounded-b-lg">
					<h3 className="font-extrabold text-lg tracking-tight">SONY</h3>
					<p className="text-sm leading-none">Audífonos bluetooth</p>
				</div>
			</div>

			{/* Tarjeta 5 (div5) */}
			<div className="col-span-2 row-span-2 bg-white p-0 rounded-lg shadow-md col-start-5 row-start-4 relative" style={getSectionStyle()}>
				<img src={Producto17Image} alt="Cámara Canon" className="w-full h-[350px] object-contain rounded-lg" />
				<div className="absolute bottom-0 left-0 w-full bg-[#DFE162] text-[#1C4390] px-4 py-3 rounded-b-lg">
					<h3 className="font-extrabold text-lg tracking-tight">SONY</h3>
					<p className="text-sm leading-none">Audífonos bluetooth</p>
				</div>
			</div>
		</section>


		<div className="flex justify-center items-center w-full bg py-3 mt-4">
			<img 
				src={Frame2Image} // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
				alt="Oferta Especial" // Descripción de la imagen
				className="w-full lg:w-[86%] object-cover rounded-lg" // Clase de TailwindCSS para el tamaño y estilo
			/>
		</div>
			
		<div className="flex justify-center items-center w-full bg py-3 mt-4">
			<img 
				src={Producto19Image} // Usamos la variable 'bannerImage' que contiene la ruta de la imagen
				alt="Oferta Especial" // Descripción de la imagen
				className=" w-full lg:w-[86%] object-cover rounded-lg" // Ajustado al tamaño fijo con espaciado
			/>
		</div>

		{/* 9. Apliqué estilo a las cards (Reebok, etc.) */}
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 px-23 py-4 w-fit mx-auto">
			{/* Producto 1: Reebok */}
			<div className="bg-white rounded-[16px] w-[362px] overflow-hidden shadow-md" style={getSectionStyle()}>
				<img 
					src={Producto20Image} // Imagen de Producto 20
					alt="Producto 20"
					className="w-full h-[463px] object-contain rounded-t-[16px]"
				/>
			</div>

			{/* Producto 2: Puma */}
			<div className="bg-white rounded-[16px] w-[362px] overflow-hidden shadow-md" style={getSectionStyle()}>
				<img 
					src={Producto21Image} // Imagen de Producto 21
					alt="Producto 21"
					className="w-full h-[463px] object-contain rounded-t-[16px]"
				/>
			</div>

			{/* Producto 3: Adidas */}
			<div className="bg-white rounded-[16px] w-[362px] overflow-hidden shadow-md" style={getSectionStyle()}>
				<img 
					src={Producto22Image} // Imagen de Producto 22
					alt="Producto 22"
					className="w-full h-[463px] object-contain rounded-t-[16px]"
				/>
			</div>

			{/* Producto 4: Nuevo Producto */}
			<div className="bg-white rounded-[16px] w-[362px] overflow-hidden shadow-md" style={getSectionStyle()}>
				<img 
					src={Producto23Image} // Imagen de Producto 23
					alt="Producto 23"
					className="w-full h-[463px] object-contain rounded-t-[16px]"
				/>
			</div>
		</section>
			
	
        <MarcasDestacadas/>
		<BloqueDeServicios/>
		<FooterPequeño />
		<FooterGrande />

	</section>

			
	);

}
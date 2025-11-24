import React, { useRef, useState } from "react";

import bannerImage from "../../assets/imagenes/Ofertas/banner.png";
import barraImage from "../../assets/imagenes/Ofertas/imagen1.png";
import Producto2Image from "../../assets/imagenes/Ofertas/imagen2.png";
import Producto3Image from "../../assets/imagenes/Ofertas/imagen3.png";
import Producto4Image from "../../assets/imagenes/Ofertas/imagen4.png";
import Producto5Image from "../../assets/imagenes/Ofertas/imagen5.png";
import Producto6Image from "../../assets/imagenes/Ofertas/imagen6.png";
import banner2Image from "../../assets/imagenes/Categorias/Panel/PanelCalzado.png";
import Producto7Image from "../../assets/imagenes/Ofertas/imagen7.png";
import Producto8Image from "../../assets/imagenes/Ofertas/imagen8.png";
import Producto9Image from "../../assets/imagenes/Ofertas/imagen9.png";
import Producto10Image from "../../assets/imagenes/Ofertas/imagen10.png";
import Producto111Image from "../../assets/imagenes/Ofertas/imagen111.png";
import Producto121Image from "../../assets/imagenes/Ofertas/imagen121.png";
import Frame1Image from "../../assets/imagenes/Ofertas/Frame1.png";
import Producto13Image from "../../assets/imagenes/Ofertas/imagen13.jpg";
import Producto141Image from "../../assets/imagenes/Ofertas/image14.png";
import Producto15Image from "../../assets/imagenes/Ofertas/imagen15.jpg";
import Producto16Image from "../../assets/imagenes/Ofertas/imagen16.png";
import Producto17Image from "../../assets/imagenes/Ofertas/imagen17.png";
import Frame2Image from "../../assets/imagenes/Ofertas/Frame2.png";
import Producto19Image from "../../assets/imagenes/Ofertas/imagen19.png";
import Producto20Image from "../../assets/imagenes/Ofertas/imagen20.png";
import Producto21Image from "../../assets/imagenes/Ofertas/imagen21.png";
import Producto22Image from "../../assets/imagenes/Ofertas/imagen22.png";
import Producto23Image from "../../assets/imagenes/Ofertas/imagen23.png";
import Frame4Image from "../../assets/imagenes/Ofertas/Frame4.png";

import FooterPequeño from "../../components/Footer/FooterPequeño";
import FooterGrande from "../../components/Footer/FooterGrande";
import BloqueDeServicios from "../../components/BloqueDeServicios";
import MarcasDestacadas from "../../components/MarcasDestacadas";
import ProductCardV2 from "../../components/ProductCardV2";
import ProductCard from "../../components/ProductCard.jsx";
import { TagIconSmall, TagIconSmallDarkMode, ArrowRightIconBlack, ArrowLeftGrayBlueIcon, ArrowRightGrayBlueIcon } from "../../assets/iconos/iconoHome.jsx";
import { useTheme } from "../../components/ThemeContext";

export default function Oferta1() {
  const { isLight } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerImage, banner2Image];
  const productCarouselRef = useRef(null);
  const getSectionStyle = (customBg = null) => {
    if (customBg) {
      return {
        backgroundColor: isLight ? customBg : 'rgba(16, 16, 30, 0.9)',
        color: isLight ? '#000000' : '#ffffff',
        transition: 'all 0.3s ease'
      };
    }
    return {
      backgroundColor: isLight ? '#ffffff' : 'rgba(16, 16, 30, 0.8)',
      color: isLight ? '#000000' : '#ffffff',
      transition: 'all 0.3s ease'
    };
  };

  const containerClass = "w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10";
  const highlightCardClass = `relative flex h-[340px] sm:h-[360px] lg:h-[382px] w-full max-w-[516px] items-center justify-center rounded-[2px] border transition-colors duration-300 ease-in-out ${isLight ? "bg-white border-white/0" : "bg-[#292272] border-white/10"}`;
  const showcaseCardClass = `relative overflow-hidden rounded-[2px] transition-colors duration-300 ease-in-out`;
  const sliderSurfaceClass = `rounded-[2px] border transition-colors duration-300 ease-in-out ${isLight ? "border-white/0 bg-white" : "border-white/10 bg-[#1F1959]"}`;
  const trackGap = "gap-6 sm:gap-7 lg:gap-8";

  const highlightedOffers = [
    { id: "highlight-1", image: Producto2Image, alt: "Producto destacado 1" },
    { id: "highlight-2", image: Producto3Image, alt: "Producto destacado 2" },
    { id: "highlight-3", image: Producto4Image, alt: "Producto destacado 3" },
  ];

  const premiumHighlights = [
    { id: "premium-iphone", image: Producto13Image, alt: "iPhone 16 Pro", colSpan: "lg:col-span-3", heightClass: "h-[400px]" },
    { id: "premium-laptop", image: Producto141Image, alt: "Laptop ajustable", colSpan: "lg:col-span-3", heightClass: "h-[400px]" },
    {
      id: "premium-sony",
      image: Producto15Image,
      alt: "Audífonos Sony",
      colSpan: "lg:col-span-2",
      heightClass: "h-[380px]",
      footer: { title: "SONY", caption: "Audífonos bluetooth" },
    },
    {
      id: "premium-echo",
      image: Producto16Image,
      alt: "Echo Pop",
      colSpan: "lg:col-span-2",
      heightClass: "h-[380px]",
      footer: { title: "SONY", caption: "Audífonos bluetooth" },
    },
    {
      id: "premium-camera",
      image: Producto17Image,
      alt: "Cámara Canon",
      colSpan: "lg:col-span-2",
      heightClass: "h-[380px]",
      footer: { title: "SONY", caption: "Audífonos bluetooth" },
    },
  ];

  const sneakerHighlights = [
    { id: "brand-reebok", image: Producto20Image, alt: "Reebok" },
    { id: "brand-puma", image: Producto21Image, alt: "Puma" },
    { id: "brand-adidas", image: Producto22Image, alt: "Adidas" },
    { id: "brand-latest", image: Producto23Image, alt: "New arrivals" },
  ];

  const getCardStyle = () => ({
    backgroundColor: isLight ? "#FFFFFF" : "#292272",
    borderRadius: "16px",
    border: isLight ? "1px solid rgba(231, 234, 255, 0.6)" : "1px solid rgba(255, 255, 255, 0.12)",
    transition: "all 300ms ease",
  });

  const getTextStyle = () => ({
    color: isLight ? "#434651" : "#E7EAFF",
    transition: "color 300ms ease",
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollProductCarousel = (direction) => {
    if (!productCarouselRef.current) return;
    const distance = productCarouselRef.current.clientWidth * 0.85 || 420;
    const scrollOffset = direction === "left" ? -distance : distance;
    productCarouselRef.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

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

  const productos = [
    { id: "p7", image: Producto7Image, title: "Producto 7", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %"},
    { id: "p8", image: Producto8Image, title: "Producto 8", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %"},
    { id: "p9", image: Producto9Image, title: "Producto 9", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %"},
    { id: "p10", image: Producto10Image, title: "Producto 10", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %"},
    { id: "p11", image: Producto111Image, title: "Producto 11", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-50 %", timeLeft: "05|05|00"},
    { id: "p12", image: Producto121Image, title: "Producto 12", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-50 %", timeLeft: "05|05|00"},
  ];

  return (
    <section
      className={`relative w-full pt-10 pb-20 transition-colors duration-300 ease-in-out ${isLight ? "bg-[#FFFFFF] text-[#0B1B59]" : "bg-[#120F31] text-white"
        }`}
    >
      <div className="relative w-full h-250 mt-8 overflow-hidden">
        {/* Slides con fade */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"}`}
          >
            <img
              src={slide}
              alt={`Oferta ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}

        {/* Controles */}
        <div className="absolute bottom-2 w-full flex items-center justify-evenly px-10 z-50">
          {/* Flecha izquierda */}
          <button onClick={prevSlide} className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
            {"<"}
          </button>

          {/* Indicadores */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 mt-1">
            {slides.map((_, index) => (
              <div key={index} onClick={() => { setCurrentSlide(currentSlide); setCurrentSlide(index); }} className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${currentSlide === index ? "bg-gray-400/50 scale-150" : "bg-gray-400/50"}`}></div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button onClick={nextSlide} className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
            {">"}
          </button>
        </div>
      </div>

      <div className={`${containerClass} mt-16`}>
        <img
          src={barraImage}
          alt="Invita a tus amigos"
          className="w-full rounded-[16px] object-cover"
        />
      </div>

      <div className={`${containerClass} mt-10`}>
        <div className={`flex justify-center ${trackGap} rounded-[32px]`}>
          {highlightedOffers.map((offer) => (
            <div key={offer.id} className={`${highlightCardClass} rounded-[32px]`}>
              <img src={offer.image} alt={offer.alt} className="h-full w-full rounded-[16px]" />
              <img src={Frame4Image} alt="Etiqueta de descuento" className="absolute left-0 -top-2 w-[140px]" />
            </div>
          ))}
        </div>
      </div>

      <div className={`${containerClass} mt-10`}>
        <img
          src={Producto5Image}
          alt="Mundo Apple"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)]"
        />
      </div>

      <div className="mt-16 items-center flex flex-col justify-center">
      <div className="flex justify-center w-400 py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
        style={{
          background: isLight
            ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
            : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
          ...getSectionStyle(),
        }}>
        <div className="my-1">
            {isLight ? <TagIconSmall /> : <TagIconSmallDarkMode />}
        </div>
        <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Favoritos</h1>
        <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
        <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Favoritos que te van a encantar</p>
        <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
          <h1 className='font-popins text-sm'>Ver todo</h1>
          <div className='scale-60 -my-0.5'>
            <ArrowRightIconBlack />
          </div>
        </button>
      </div>
        <div className={`${sliderSurfaceClass} mt-6`}>
          <div className="relative">
            <button
              type="button"
              aria-label="Desplazar hacia la izquierda"
              onClick={() => scrollProductCarousel("left")}
              className={`absolute -left-8 top-1/2 -translate-y-1/2`}
            >
              <ArrowLeftGrayBlueIcon />
            </button>
            <div
              ref={productCarouselRef}
              className={`flex flex-nowrap overflow-x-auto ${trackGap} pb-2 px-5 scrollbar-hide`}
            >
              {productos.map((p) => (
                <div key={p.id} className="flex-shrink-0">
                  <ProductCard
                    id={p.id}
                    {...p}
                    liked={liked[p.id]}
                    added={addedItems[p.id]}
                    onLike={toggleLike}
                    onAdd={handleClick}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                    timeLeft={p.timeLeft}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Desplazar hacia la derecha"
              onClick={() => scrollProductCarousel("right")}
              className={`absolute -right-8 top-1/2 -translate-y-1/2`}
            >
              <ArrowRightGrayBlueIcon slidesCategorias={productCarouselRef}/>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 items-center flex flex-col justify-center">
        <div className="flex justify-center w-400 py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
          style={{
            background: isLight
              ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
              : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
            ...getSectionStyle(),
          }}>
          <div className="my-1">
            {isLight ? <TagIconSmall /> : <TagIconSmallDarkMode />}
          </div>
          <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Moda Digital</h1>
          <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
          <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Favoritos que te van a encantar</p>
          <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
            <h1 className='font-popins text-sm'>Ver todo</h1>
            <div className='scale-60 -my-0.5'>
              <ArrowRightIconBlack />
            </div>
          </button>
        </div>
      </div>

      <div className={`${containerClass} mt-12 grid grid-cols-1 gap-6 lg:grid-cols-6`}>
        {premiumHighlights.map((item) => (
          <div
            key={item.id}
            className={`${showcaseCardClass} col-span-full ${item.colSpan} flex items-center justify-center ${item.heightClass}`}
          >
            <img src={item.image} alt={item.alt} className="h-full w-full rounded-[16px]" />
            {item.footer && (
              <div
                className={`absolute bottom-0 left-0 w-full rounded-b-[16px] px-6 py-4 ${isLight ? "bg-[#DFE162] text-[#000000]" : "bg-[#3A31A9] text-white"
                  }`}
              >
                <h3 className="text-3xl font-bold tracking-tight">{item.footer.title}</h3>
                <p className="text-md font-semibold leading-none">{item.footer.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 items-center flex flex-col justify-center">
        <div className="flex justify-center w-400 py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
          style={{
            background: isLight
              ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
              : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
            ...getSectionStyle(),
          }}>
          <div className="my-1">
            {isLight ? <TagIconSmall /> : <TagIconSmallDarkMode />}
          </div>
          <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Comodidad y Estilo</h1>
          <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
          <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Favoritos que te van a encantar</p>
          <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
            <h1 className='font-popins text-sm'>Ver todo</h1>
            <div className='scale-60 -my-0.5'>
              <ArrowRightIconBlack />
            </div>
          </button>
        </div>
      </div>

      <div className={`${containerClass} mt-12`}>
        <img
          src={Producto19Image}
          alt="Colección adidas"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)]"
        />
      </div>

      <div className={`${containerClass} mt-12 grid gap-6 sm:grid-cols-2 1xl:grid-cols-4`}>
        {sneakerHighlights.map((item) => (
          <div key={item.id} className={`${showcaseCardClass} flex h-[463px] items-center justify-center`}>
            <img src={item.image} alt={item.alt} className="h-full w-full object-contain p-6" />
          </div>
        ))}
      </div>

      <div className="mt-16 space-y-16">
        <MarcasDestacadas />
        <BloqueDeServicios />
        <FooterPequeño />
        <FooterGrande />
      </div>
    </section>
  );
}
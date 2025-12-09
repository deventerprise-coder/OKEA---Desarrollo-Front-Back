import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerImage from "../../assets/imagenes/Ofertas/banner.png";
import bootsImage from "../../assets/imagenes/Ofertas/bota_banner.png";
import sneakersImage from "../../assets/imagenes/Ofertas/zapatilla_banner.png";
import sneakers2Image from "../../assets/imagenes/Ofertas/zapatilla2_banner.png";
import heelsImage from "../../assets/imagenes/Ofertas/tacon_banner.png";
import barraImage from "../../assets/imagenes/Ofertas/imagen1.png";
import Producto2Image from "../../assets/imagenes/Ofertas/imagen2.png";
import Producto3Image from "../../assets/imagenes/Ofertas/imagen3.png";
import Producto4Image from "../../assets/imagenes/Ofertas/imagen4.png";
import Producto5Image from "../../assets/imagenes/Ofertas/imagen5.png";
import banner2Image from "../../assets/imagenes/Categorias/Panel/PanelCalzado.png";
import Producto7Image from "../../assets/imagenes/Ofertas/imagen7.png";
import Producto8Image from "../../assets/imagenes/Ofertas/imagen8.png";
import Producto9Image from "../../assets/imagenes/Ofertas/imagen9.png";
import Producto10Image from "../../assets/imagenes/Ofertas/imagen10.png";
import Producto111Image from "../../assets/imagenes/Ofertas/imagen111.png";
import Producto121Image from "../../assets/imagenes/Ofertas/imagen121.png";
import Producto13Image from "../../assets/imagenes/Ofertas/imagen13.jpg";
import Producto141Image from "../../assets/imagenes/Ofertas/image14.png";
import Producto15Image from "../../assets/imagenes/Ofertas/imagen15.jpg";
import Producto16Image from "../../assets/imagenes/Ofertas/imagen16.png";
import Producto17Image from "../../assets/imagenes/Ofertas/imagen17.png";
import Producto19Image from "../../assets/imagenes/Ofertas/imagen19.png";
import Producto20Image from "../../assets/imagenes/Ofertas/imagen20.png";
import Producto21Image from "../../assets/imagenes/Ofertas/imagen21.png";
import Producto22Image from "../../assets/imagenes/Ofertas/imagen22.png";
import Producto23Image from "../../assets/imagenes/Ofertas/imagen23.png";
import FooterPequeño from "../../components/Footer/FooterPequeño";
import FooterGrande from "../../components/Footer/FooterGrande";
import BloqueDeServicios from "../../components/BloqueDeServicios";
import MarcasDestacadas from "../../components/MarcasDestacadas";
import ProductCard from "../../components/ProductCard.jsx";
import CardDescuento from './CardDescuento.jsx';
import BannerOfertop from "./BannerOfertop.jsx";
import { TagIconSmall, TagIconSmallDarkMode, ArrowRightIconBlack, ArrowLeftGrayBlueIcon, ArrowRightGrayBlueIcon } from "../../assets/iconos/iconoHome.jsx";
import { useTheme } from "../../components/ThemeContext";

export default function Oferta1() {
  const { isLight } = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerImage, banner2Image];
  const slidesPresentacion = [
    <div className="relative w-full h-full xl:h-[1044px] overflow-hidden bg-[#E6DQD0] font-sans" style={{ backgroundColor: '#E2D2C2' }}>

      

      <div className="absolute -top-[40%] right-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#E0B0AF] rotate-30 z-0 mix-blend-multiply opacity-80" />
      <div className="absolute top-[50%] -right-[5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-[#C8D1B8] rotate-[45deg] z-10 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
      <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] md:w-[1000px] md:h-[1800px] bg-[#D6C0B0] rotate-[30deg] z-0" />

      <div className="relative z-10 flex flex-col md:flex-row h-full max-w-[1820x] mx-auto px-4">

        <div className="w-full md:w-[50%] flex flex-col justify-center items-center pl-4 md:pl-20 pt-4 md:pt-0">

          <h3 className="font-serif italic text-[#7D1C2A] text-xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-6xl mb-4 tracking-wide z-20">
            17 F/W PRE-FALL
          </h3>

          <h1 className="font-serif font-semi-bold text-[#111111] text-[60px] sm:text-[100px] md:text-[110px] lg:text-[150px] xl:text-[200px] 2xl:text-[260px] leading-[0.8] tracking-tight mb-8 z-40">
            SHOES
          </h1>

          <p className="text-[#6D635B] text-center text-sm sm:text-base md:text-xl xl:text-2xl 2xl:text-3xl mb-12 font-medium tracking-wide max-w-[100%] z-20">
            La colección premium 17 F/W llega antes que a las tiendas
          </p>

          <div className="bg-[#5D1320] text-white shadow-lg cursor-pointer hover:bg-[#7D1C2A] transition-colors z-20
            py-3 px-8 md:py-5 mb-10" onClick={() => navigate("/catalogo/calzado")}>
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl font-medium tracking-wide">
              F/W NUEVA COLECCIÓN
            </span>
          </div>

          <div className="text-[#9CA3AF] flex flex-col justify-center items-center text-center text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-bold uppercase tracking-[0.2em] leading-loose z-20">
            <p>ALEXANDER MCQUEEN / GOLDEN GOOSE / REPETTO / STUART WEITZMAN / EYTYS</p>
          </div>
        </div>

        <div className="hidden md:block w-full md:w-[55%] relative h-[500px] md:h-full">

          <div className="absolute 
            -top-[30%] right-[10%] 
            lg:-top-[35%] lg:right-[10%] 
            xl:-top-[25%] xl:right-[5%] 
            2xl:-top-[30%] 2xl:right-[30%] 
            w-[350px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] h-auto rotate-[45deg] z-30 hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
            <img src={heelsImage} alt="Red Heels" className="w-full" />
          </div>

          <div className="absolute
            -top-[10%] -right-[30%] 
            lg:-top-[20%] lg:-right-[20%] 
            xl:-top-[15%] xl:-right-[30%] 
            2xl:-top-[15%] 2xl:-right-[5%] 
            w-[400px] lg:w-[500px] xl:w-[650px] 2xl:w-[700px] h-auto -rotate-[45deg] z-50 hover:scale-105 transition-transform duration-500 drop-shadow-xl">
            <img src={sneakersImage} alt="White Sneakers" className="w-full" />
          </div>

          <div className="absolute
            bottom-[15%] -right-[5%] 
            lg:bottom-[15%] lg:right-[5%] 
            xl:bottom-[25%] xl:-right-[5%]
            2xl:bottom-[15%] 2xl:right-[10%] 
            w-[350px] lg:w-[420px] xl:w-[550px] 2xl:w-[700px] h-auto rotate-[35deg] z-30 hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
            <img src={sneakers2Image} alt="Golden Goose" className="w-full" />
          </div>

          <div className="absolute 
            -bottom-[5%] -right-[15%] 
            lg:-bottom-[10%] lg:-right-[5%] 
            xl:bottom-[5%] xl:right-[2%]
            2xl:bottom-[1%] 2xl:right-[4%] 
            w-[250px] lg:w-[280px] xl:w-[320px] 2xl:w-[400px] rotate-[35deg] h-auto z-30 hover:translate-y-[-10px] transition-transform duration-500 drop-shadow-2xl">
            <img src={bootsImage} alt="Black Boot" className="w-full" />
          </div>

        </div>
      </div>
    </div>,
  ];
  const productCarouselRef = useRef(null);
  const sneakerCarouselRef = useRef(null);
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
  const scrollSneakers = (direction) => {
    if (!sneakerCarouselRef.current) return;
    const distance = 350;
    const scrollOffset = direction === "left" ? -distance : distance;
    sneakerCarouselRef.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

  const containerClass = "w-full max-w-[1591px] mx-auto px-4 sm:px-6 lg:px-10";
  const showcaseCardClass = `relative overflow-hidden rounded-[2px] transition-colors duration-300 ease-in-out`;
  const sliderSurfaceClass = `rounded-[2px] border transition-colors duration-300 ease-in-out ${isLight ? "border-white/0 bg-white" : "border-white/0 bg-[#120F31]"}`;
  const trackGap = "gap-6 sm:gap-7 lg:gap-8";
  const bannerSectionClass = "flex w-full max-w-[1591px] flex-wrap items-center justify-center gap-4 rounded-[32px] px-6 py-6 sm:flex-nowrap";
  const bannerTitleClass = "font-popins text-[#434651] text-[clamp(1.5rem,3vw,2.4rem)] leading-tight";
  const bannerSubtitleClass = "hidden md:block font-popins-light text-[#747782] text-[clamp(1rem,2vw,1.5rem)]";
  const bannerCtaClass = "flex items-center gap-2 rounded-full bg-[#DFE162] px-5 py-2.5 text-[#484900]";

  const highlightedOffers = [
    { id: "highlight-1", discount: 50, discountArea: "Sofás", image: Producto2Image, area: "muebles-y-organizacion"},
    { id: "highlight-2", discount: 30, discountArea: "Sofás", image: Producto3Image, area: "calzado"},
    { id: "highlight-3", discount: 10, discountArea: "Sofás", image: Producto4Image, area: "tecnologia"},
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
    backgroundColor: isLight ? "#F4F3FA" : "#292272",
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
    { id: "p7", image: Producto7Image, title: "Producto 7", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %" },
    { id: "p8", image: Producto8Image, title: "Producto 8", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %" },
    { id: "p9", image: Producto9Image, title: "Producto 9", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %" },
    { id: "p10", image: Producto10Image, title: "Producto 10", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-0 %" },
    { id: "p11", image: Producto111Image, title: "Producto 11", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-50 %", timeLeft: "05|05|00" },
    { id: "p12", image: Producto121Image, title: "Producto 12", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-50 %", timeLeft: "05|05|00" },
  ];

  return (
    <section
      className={`relative w-full pt-10 pb-20 transition-colors duration-300 ease-in-out ${isLight ? "bg-[#FFFFFF] text-[#0B1B59]" : "bg-[#120F31] text-white"
        }`}
    >
      <div className="relative w-full h-120 md:h-160 xl:h-230 2xl:h-250 mt-8 overflow-hidden">
        {slidesPresentacion.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"}`}
          >
            {slide}
          </div>
        ))}

        <div className="absolute bottom-2 w-full flex items-center justify-evenly px-10 z-50">
          <button onClick={prevSlide} className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
            {"<"}
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 mt-1">
            {slides.map((_, index) => (
              <div key={index} onClick={() => { setCurrentSlide(currentSlide); setCurrentSlide(index); }} className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${currentSlide === index ? "bg-gray-400/50 scale-150" : "bg-gray-400/50"}`}></div>
            ))}
          </div>
          <button onClick={nextSlide} className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
            {">"}
          </button>
        </div>
      </div>

      <div className={`${containerClass} mt-16`}>
        <BannerOfertop backgroundImage={barraImage} />
      </div>

      <div className={`${containerClass} mt-10`}>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center w-fit mx-auto`}>
          {highlightedOffers.map((offer) => (
            <div key={offer.id} className="w-full">
              <CardDescuento discount={offer.discount} discountArea={offer.discountArea} area={offer.area} image={offer.image} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${containerClass} mt-10`}>
        <img
          src={Producto5Image}
          alt="Mundo Apple"
          draggable="false"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)] cursor-pointer"
          onClick={() => navigate("/catalogo/tecnologia")}
        />
      </div>

      <div className="mt-16 items-center flex flex-col justify-center">
        <div
          className={`${bannerSectionClass} bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]`}
          style={{
            background: isLight
              ? "linear-gradient(to right, #B3C7FF, #DFE162)"
              : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
            ...getSectionStyle(),
          }}
        >
          <div className="my-1">
            {isLight ? <TagIconSmall /> : <TagIconSmallDarkMode />}
          </div>
          <h1 className={bannerTitleClass} style={getTextStyle()}>
            Favoritos
          </h1>
          <div className="hidden md:block bg-[#385BAA] h-8 w-px my-2"></div>
          <p className={`${bannerSubtitleClass} py-1.5`} style={getTextStyle()}>
            Favoritos que te van a encantar
          </p>
          <button className={`${bannerCtaClass} lg:hover:bg-green-500 lg:hover:text-black lg:transition-colors lg:duration-300 lg:cursor-pointer`} onClick={() => navigate("/catalogo/calzado")}>
            <span className="font-popins text-sm">Ver todo</span>
            <div className="scale-60 -my-0.5">
              <ArrowRightIconBlack />
            </div>
          </button>
        </div>
        <div className={`${sliderSurfaceClass} mt-6 w-full max-w-[1591px]`}>
          <div className="relative px-4">

            <button
              type="button"
              aria-label="Desplazar hacia la izquierda"
              onClick={() => scrollProductCarousel("left")}
              className={`hidden 2xl:block absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10`}
            >
              <ArrowLeftGrayBlueIcon />
            </button>
            <button
              type="button"
              onClick={() => scrollProductCarousel("left")}
              className={`block 2xl:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 
                bg-white/90 hover:bg-white text-gray-800 
                rounded-full p-2 shadow-lg transition-all`}
            >
              <div className="scale-75">
                <ArrowLeftGrayBlueIcon />
              </div>
            </button>
            <div
              ref={productCarouselRef}
              className={`flex flex-nowrap overflow-x-auto ${trackGap} pb-4 px-2 scrollbar-hide snap-x snap-mandatory scroll-smooth`}
            >
              {productos.map((p) => (
                <div key={p.id} className="flex-shrink-0 snap-center">
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
              className={`hidden 2xl:block absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10`}
            >
              <ArrowRightGrayBlueIcon slidesCategorias={productCarouselRef} />
            </button>
            <button
              type="button"
              onClick={() => scrollProductCarousel("right")}
              className={`block 2xl:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 
                bg-white/90 hover:bg-white text-gray-800 
                rounded-full p-2 shadow-lg transition-all`}
            >
              <div className="scale-75">
                <ArrowRightGrayBlueIcon slidesCategorias={productCarouselRef} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 items-center flex flex-col justify-center">
        <div
          className={`${bannerSectionClass} bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]`}
          style={{
            background: isLight
              ? "linear-gradient(to right, #B3C7FF, #DFE162)"
              : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
            ...getSectionStyle(),
          }}
        >
          <div className="my-1">
            {isLight ? <TagIconSmall /> : <TagIconSmallDarkMode />}
          </div>
          <h1 className={bannerTitleClass} style={getTextStyle()}>
            Moda Digital
          </h1>
          <div className="hidden md:block bg-[#385BAA] h-8 w-px my-2"></div>
          <p className={`${bannerSubtitleClass} py-1.5`} style={getTextStyle()}>
            Favoritos que te van a encantar
          </p>
          <button className={`${bannerCtaClass} lg:hover:bg-green-500 lg:hover:text-black lg:transition-colors lg:duration-300 lg:cursor-pointer`} onClick={() => navigate("/catalogo/tecnologia")}>
            <span className="font-popins text-sm">Ver todo</span>
            <div className="scale-60 -my-0.5">
              <ArrowRightIconBlack />
            </div>
          </button>
        </div>
      </div>
      <div className={`mt-8 relative group max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10`}>
        <button
          onClick={() => scrollSneakers("left")}
          className="block 2xl:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
        >
          <div className="scale-75">
            <ArrowLeftGrayBlueIcon />
          </div>
        </button>
        <div className="absolute top-3/4 left-32 flex gap-2 z-10 px-4">
          <button
            onClick={() => scrollSneakers("left")}
            className="hidden 2xl:block absolute z-10 p-2 hover:opacity-75 transition-opacity"
            aria-label="Anterior"
          >
            <ArrowLeftGrayBlueIcon />
          </button>
        </div>
        <div className="absolute top-3/4 right-48 flex gap-2 z-10 px-4">
          <button
            onClick={() => scrollSneakers("right")}
            className="hidden 2xl:block absolute z-10 p-2 hover:opacity-75 transition-opacity"
            aria-label="Siguiente"
          >
            <ArrowRightGrayBlueIcon slidesCategorias={sneakerCarouselRef} />
          </button>
        </div>
        <button
          onClick={() => scrollSneakers("right")}
          className="block 2xl:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
        >
          <div className="scale-75">
            <ArrowRightGrayBlueIcon slidesCategorias={sneakerCarouselRef} />
          </div>
        </button>
        <div className={`${containerClass} mt-12 grid grid-cols-1 gap-6 lg:grid-cols-6`}>
          {premiumHighlights.map((item) => (
            <div
              key={item.id}
              className={`${showcaseCardClass} col-span-full ${item.colSpan} flex items-center justify-center ${item.heightClass} relative overflow-hidden rounded-[16px]`}
            >
              <img src={item.image} alt={item.alt} draggable="false" className="h-full w-full lg:hover:scale-105 lg:transition-transform lg:duration-500 lg:cursor-pointer" onClick={() => navigate(`/catalogo/tecnologia`)} />
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
      </div>

      <div className="mt-16 items-center flex flex-col justify-center">
        <div
          className={`${bannerSectionClass} bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]`}
          style={{
            background: isLight
              ? "linear-gradient(to right, #B3C7FF, #DFE162)"
              : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
            ...getSectionStyle(),
          }}
        >
          <div className="my-1">
            {isLight ? <TagIconSmall /> : <TagIconSmallDarkMode />}
          </div>
          <h1 className={bannerTitleClass} style={getTextStyle()}>
            Comodidad y Estilo
          </h1>
          <div className="hidden md:block bg-[#385BAA] h-8 w-px my-2"></div>
          <p className={`${bannerSubtitleClass} py-1.5`} style={getTextStyle()}>
            Favoritos que te van a encantar
          </p>
          <button className={`${bannerCtaClass} lg:hover:bg-green-500 lg:hover:text-black lg:transition-colors lg:duration-300 lg:cursor-pointer`} onClick={() => navigate("/catalogo/calzado")}>
            <span className="font-popins text-sm">Ver todo</span>
            <div className="scale-60 -my-0.5">
              <ArrowRightIconBlack />
            </div>
          </button>
        </div>
      </div>

      <div className={`${containerClass} mt-12`}>
        <img
          src={Producto19Image}
          alt="Colección adidas"
          draggable="false"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)] lg:cursor-pointer"
          onClick={() => navigate(`/catalogo/calzado`)}
        />
      </div>
      <div className={`${containerClass} mt-8 relative group`}>
        <button
          onClick={() => scrollSneakers("left")}
          className="block 2xl:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
        >
          <div className="scale-75">
            <ArrowLeftGrayBlueIcon />
          </div>
        </button>
        <div className="absolute -top-32 left-0 flex gap-2 z-10 px-4">
          <button
            onClick={() => scrollSneakers("left")}
            className="hidden 2xl:block absolute right-2 z-10 p-2 hover:opacity-75 transition-opacity"
            aria-label="Anterior"
          >
            <ArrowLeftGrayBlueIcon />
          </button>
        </div>
        <div className="absolute -top-32 right-0 flex gap-2 z-10 px-4">
          <button
            onClick={() => scrollSneakers("right")}
            className="hidden 2xl:block absolute left-2 z-10 p-2 hover:opacity-75 transition-opacity"
            aria-label="Siguiente"
          >
            <ArrowRightGrayBlueIcon slidesCategorias={sneakerCarouselRef} />
          </button>
        </div>
        <button
          onClick={() => scrollSneakers("right")}
          className="block 2xl:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
        >
          <div className="scale-75">
            <ArrowRightGrayBlueIcon slidesCategorias={sneakerCarouselRef} />
          </div>
        </button>
        <div
          ref={sneakerCarouselRef}
          className={`flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {sneakerHighlights.map((item) => (
            <div
              key={item.id}
              className={`${showcaseCardClass} flex-shrink-0 snap-center
                w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] 
                xl:h-[410px] sm:h-[350px] 
                items-center justify-center overflow-hidden group !rounded-[16px]`}
            >
              <img
                src={item.image}
                alt={item.alt}
                draggable="false"
                className="h-full w-full object-cover lg:transition-transform lg:duration-500 lg:hover:scale-110 lg:cursor-pointer"
                onClick={() => navigate(`/catalogo/calzado`)}
              />
            </div>
          ))}
        </div>
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
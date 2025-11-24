import React, { useState } from "react";

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

import { useTheme } from "../../components/ThemeContext";

export default function Oferta1() {
  const { isLight } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerImage, banner2Image];

  const containerClass = "w-full max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10";
  const highlightCardClass = `relative flex h-[340px] sm:h-[360px] lg:h-[382px] w-full max-w-[516px] items-center justify-center rounded-[32px] border transition-colors duration-300 ease-in-out ${isLight ? "bg-white border-white/0 shadow-[0_18px_48px_rgba(44,80,158,0.12)]" : "bg-[#292272] border-white/10 shadow-[0_18px_48px_rgba(12,10,40,0.45)]"}`;
  const showcaseCardClass = `relative overflow-hidden rounded-[32px] transition-colors duration-300 ease-in-out ${isLight ? "bg-white shadow-[0_18px_48px_rgba(44,80,158,0.12)]" : "bg-[#292272] shadow-[0_18px_48px_rgba(12,10,40,0.45)]"}`;
  const sliderSurfaceClass = `rounded-[32px] border transition-colors duration-300 ease-in-out ${isLight ? "border-white/0 bg-white shadow-[0_18px_48px_rgba(44,80,158,0.12)]" : "border-white/10 bg-[#1F1959]"}`;
  const trackGap = "gap-6 sm:gap-7 lg:gap-8";

  const highlightedOffers = [
    { id: "highlight-1", image: Producto2Image, alt: "Producto destacado 1" },
    { id: "highlight-2", image: Producto3Image, alt: "Producto destacado 2" },
    { id: "highlight-3", image: Producto4Image, alt: "Producto destacado 3" },
  ];

  const premiumHighlights = [
    { id: "premium-iphone", image: Producto13Image, alt: "iPhone 16 Pro", colSpan: "lg:col-span-3", heightClass: "h-[320px]" },
    { id: "premium-laptop", image: Producto141Image, alt: "Laptop ajustable", colSpan: "lg:col-span-3", heightClass: "h-[320px]" },
    {
      id: "premium-sony",
      image: Producto15Image,
      alt: "Audífonos Sony",
      colSpan: "lg:col-span-2",
      heightClass: "h-[350px]",
      footer: { title: "SONY", caption: "Audífonos bluetooth" },
    },
    {
      id: "premium-echo",
      image: Producto16Image,
      alt: "Echo Pop",
      colSpan: "lg:col-span-2",
      heightClass: "h-[350px]",
      footer: { title: "SONY", caption: "Audífonos bluetooth" },
    },
    {
      id: "premium-camera",
      image: Producto17Image,
      alt: "Cámara Canon",
      colSpan: "lg:col-span-2",
      heightClass: "h-[350px]",
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
    boxShadow: isLight ? "0 18px 48px rgba(44, 80, 158, 0.12)" : "0 18px 48px rgba(12, 10, 40, 0.45)",
    borderRadius: "32px",
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
    { id: "p7", image: Producto7Image, title: "Producto 7", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
    { id: "p8", image: Producto8Image, title: "Producto 8", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
    { id: "p9", image: Producto9Image, title: "Producto 9", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
    { id: "p10", image: Producto10Image, title: "Producto 10", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9" },
    { id: "p11", image: Producto111Image, title: "Producto 11", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-50 %" },
    { id: "p12", image: Producto121Image, title: "Producto 12", label: "Label", oldPrice: "s/ 160.00", price: "s/ 80.00", rating: "4.9", discount: "-50 %" },
  ];

  return (
    <section
      className={`relative w-full pt-10 pb-20 transition-colors duration-300 ease-in-out ${
        isLight ? "bg-[#F7F8FF] text-[#0B1B59]" : "bg-[#120F31] text-white"
      }`}
    >
      <div className={`${containerClass}`}>
        <div className="relative h-[300px] md:h-[520px] 1xl:h-[680px] 2xl:h-[760px] overflow-hidden rounded-[40px] shadow-[0_24px_80px_rgba(44,80,158,0.14)]">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
            >
              <img src={slide} alt={`Slide ${index + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}

          <div className="absolute bottom-6 left-0 z-30 flex w-full items-center justify-between px-6">
            <button
              onClick={prevSlide}
              className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-semibold transition ${
                isLight
                  ? "border-white/40 bg-white/90 text-[#0B1B59] hover:bg-white"
                  : "border-white/20 bg-[#1F1959] text-white hover:bg-[#2D257D]"
              }`}
              aria-label="Anterior"
              type="button"
            >
              {"<"}
            </button>
            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition ${
                    currentSlide === index
                      ? "scale-125 bg-white"
                      : isLight
                      ? "bg-white/60 hover:bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-semibold transition ${
                isLight
                  ? "border-white/40 bg-white/90 text-[#0B1B59] hover:bg-white"
                  : "border-white/20 bg-[#1F1959] text-white hover:bg-[#2D257D]"
              }`}
              aria-label="Siguiente"
              type="button"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

      <div className={`${containerClass} mt-8`}>
        <img
          src={barraImage}
          alt="Invita a tus amigos"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)]"
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

      <div className={`${containerClass} mt-8`}>
        <img
          src={Producto6Image}
          alt="Colección destacada"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)]"
        />
      </div>

      <div className={`${containerClass} mt-12`}>
        <div className={`${sliderSurfaceClass} mt-6`}>
          <div className={`flex flex-nowrap overflow-x-auto ${trackGap} pb-2 scrollbar-hide`}>
            {productos.map((p) => (
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
        </div>
      </div>

      <div className={`${containerClass} mt-12`}>
        <img
          src={Frame1Image}
          alt="Moda digital"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)]"
        />
      </div>

      <div className={`${containerClass} mt-12 grid grid-cols-1 gap-6 lg:grid-cols-6`}>
        {premiumHighlights.map((item) => (
          <div
            key={item.id}
            className={`${showcaseCardClass} col-span-full ${item.colSpan} flex items-center justify-center ${item.heightClass}`}
          >
            <img src={item.image} alt={item.alt} className="h-full w-full rounded-[32px] object-cover" />
            {item.footer && (
              <div
                className={`absolute bottom-0 left-0 w-full rounded-b-[32px] px-6 py-4 ${
                  isLight ? "bg-[#DFE162] text-[#1C4390]" : "bg-[#3A31A9] text-white"
                }`}
              >
                <h3 className="text-lg font-semibold tracking-tight">{item.footer.title}</h3>
                <p className="text-sm leading-none">{item.footer.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`${containerClass} mt-12`}>
        <img
          src={Frame2Image}
          alt="Comodidad y estilo"
          className="w-full rounded-[32px] object-cover shadow-[0_18px_48px_rgba(44,80,158,0.12)]"
        />
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
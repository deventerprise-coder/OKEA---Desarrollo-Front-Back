import { useState } from "react";
import { useTheme } from "../../components/ThemeContext";

import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png";
import ProductCard from "../../components/ProductCard.jsx";
import { ArrowLeftNormal, ArrowRightNormal } from "../../assets/iconos/iconoHome.jsx";

export default function Recomendados() {
  const { isLight } = useTheme();

  const getBackgroundStyle = () => ({
    backgroundColor: isLight ? "#ffffff" : "#120F31",
    color: isLight ? "#000000" : "#ffffff",
    transition: "background-color 0.3s ease, color 0.3s ease",
  });

  const getSectionStyle = (customBg = null) => {
    if (customBg) {
      return {
        backgroundColor: isLight ? customBg : "rgba(16, 16, 30, 0.9)",
        color: isLight ? "#000000" : "#ffffff",
        transition: "all 0.3s ease",
      };
    }
    return {
      backgroundColor: isLight ? "#ffffff" : "rgba(16, 16, 30, 0.8)",
      color: isLight ? "#000000" : "#ffffff",
      transition: "all 0.3s ease",
    };
  };

  const getTextStyle = () => ({
    color: isLight ? "#434651" : "#FFFFFF",
    transition: "color 0.3s ease",
  });

  const getCardStyle = () => ({
    backgroundColor: isLight ? "#FFFFFF" : "#292272",
    transition: "all 0.3s ease",
  });

  const [liked, setLiked] = useState({});
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

  // lista de productos
  const productos = Array.from({ length: 7 }, (_, i) => ({
    id: `producto${i + 1}Recomendados`,
    image: muebleMesitaNoche,
    discount: "-50%",
    label: "Label",
    title: "Wooden Sofa Chair",
    price: "$80.00",
    oldPrice: "s/ 160.00",
    rating: "4.9",
  }));

  return (
    <section className="Home" style={getBackgroundStyle()}>
      {/* Recomendados */}
      <section className="Recomendados">
        <div className="mt-8 md:mt-16 items-center px-4 sm:px-6/12 md:3/12 lg:px-40 flex flex-col justify-center">
          {/* título */}
          <div
            className="text-3xl md:text-5xl font-popins w-full text-[#434651] text-center"
            style={getTextStyle()}
          >
            Recomendados para ti
          </div>

          {/* 💻 Versión escritorio (igual a la tuya) */}
          <div className="relative overflow-hidden hidden md:flex px-4 w-full py-4 mt-4 h-100 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
            style={{
              background: isLight
                ? "linear-gradient(to right, #B3C7FF, #DFE162)"
                : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
              ...getSectionStyle(),
            }}
          >
            <button className="text-4xl mr-4 w-100% text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
              <ArrowLeftNormal />
            </button>

            <div className=" carrusel w-100% flex gap-4">
              {productos.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  {...p}
                  liked={liked[p.id]}
                  added={addedItems[p.id]}
                  onLike={toggleLike}
                  onAdd={handleClick}
                  getCardStyle={getCardStyle}
                  getTextStyle={getTextStyle}
                />
              ))}
            </div>

            <button className=" absolute right-1 z-10 text-4xl mx-4 w-100% text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
              <ArrowRightNormal />
            </button>
          </div>

          {/* 📱 Versión móvil (carrusel deslizable) */}
          <div
            className="md:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 w-full mt-4 py-4 px-2 rounded-4xl group"
          >
            {productos.map((p) => (
              <div key={p.id}>
                  <ProductCard
                  key={p.id}
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
      </section>
    </section>
  );
}

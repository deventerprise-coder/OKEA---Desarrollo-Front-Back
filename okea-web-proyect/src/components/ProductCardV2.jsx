import React from "react";
import { useTheme } from "./ThemeContext";
import {
  ClockIcon,
  ShoppingCartIcon,
} from "../assets/iconos/iconoHome";
import { HeartIconMejor, StarIconMejor } from "../assets/iconos/Icons";

const ProductCardV2 = ({
  id,
  image,
  discount,
  label,
  title,
  price,
  oldPrice,
  rating,
  liked,
  added,
  onLike,
  onAdd,
  getCardStyle,
  getTextStyle,
  forceLightText = false,
}) => {
  const { isLight } = useTheme();
  const useLightTextStyle = isLight || forceLightText;

  const getButtonStyle = () => {
    const baseStyle = {
      transition: "background-color 300ms ease, color 300ms ease",
    };

    // Nota: Aquí también aplico la lógica al color del texto del botón si no está agregado
    if (added) {
      return { ...baseStyle, backgroundColor: isLight ? "#22c55e" : "#15803d", color: "#fff" };
    }

    // Si no está agregado:
    return {
      ...baseStyle,
      backgroundColor: useLightTextStyle ? "#DFE162" : "#F5F692",
      // Aquí forzamos el color de letra del botón también
      color: useLightTextStyle ? "#484900" : "#251F67"
    };
  };
  const getPriceStyle = () => ({
    color: useLightTextStyle ? "#EB5A45" : "#F5F692",
    transition: "color 300ms ease",
  });

  const getTitleStyle = () => ({
    color: useLightTextStyle ? "#1D1B20" : "#E2E2E9",
    transition: "color 300ms ease",
  });

  const getSubtitleStyle = () => ({
    color: useLightTextStyle ? "#1D1B20" : "#E5E2E1",
    transition: "color 300ms ease",
  });
  

  return (
    <div
      className="w-57.5 h-92 bg-white rounded-3xl overflow-hidden hover:border-[#EB5A45] hover:border-[0.5px] transition group"
      style={getCardStyle()}
    >
      {/* Imagen */}
      <div className="relative w-57.5 h-50 bg-[#EEEDF4] overflow-hidden rounded-3xl">
        <div className="w-57 rounded-2xl ml-8 mr-5">
          <div
            className="absolute -bottom-60 h-160 w-150 bg-no-repeat bg-cover scale-25 -ml-52 mb-6 group-hover:scale-35 transition"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>

        {discount && (
          <div className="absolute top-3 rounded-3xl bg-[#EB5A45] w-15 h-6 font-popins text-sm text-white text-center ml-2 flex items-center justify-center">
            {discount}
          </div>
        )}

        {/* ❤️ */}
        <div
          className="absolute top-2 right-3 cursor-pointer"
          onClick={() => onLike(id)}
        >
          <HeartIconMejor color={liked ? "#eb5a45" : "#c4c6d3"} />
        </div>
      </div>

      {/* Info */}
      <div className="info font-popins pt-4 px-3 z-10">
        {/* 🔹 Título principal (label) — ahora con altura fija */}
        <div className="flex text-black justify-between items-center">
          <h1
            className="text-[18px] font-medium truncate overflow-hidden whitespace-nowrap max-w-[150px]"
            style={getTitleStyle()}
            title={label}
          >
            {label}
          </h1>
          <div className="flex p-0.5 items-center">
            <StarIconMejor color="#f4604b" />
            <h1 className="py-1 text-sm" style={getTextStyle()}>
              {rating}
            </h1>
          </div>
        </div>

        {/* Subtítulo */}
        <h1
          className="text-sm line-clamp-1 text-ellipsis overflow-hidden whitespace-nowrap"
          style={getSubtitleStyle()}
          title={title}
        >
          {title}
        </h1>

        {/* Precio */}
        <div className="flex items-center">
          <h1 className="text-2xl" style={getPriceStyle()}>
            {price}
          </h1>
          <h1 className="font-popins-light text-[#747782] line-through text-xs pt-2 ml-4">
            {oldPrice}
          </h1>
        </div>

        {/* Botón 🛒 */}
        <button
          onClick={() => onAdd(id)}
          className="flex py-3 w-full px-3 mt-3 mb-4 h-10 rounded-4xl items-center justify-center transition-all duration-600 hover:opacity-90 whitespace-nowrap cursor-pointer"
          style={getButtonStyle()}
        >
          <div
            className={`flex items-center gap-1.5 transition-all duration-900 ${
              added ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <ShoppingCartIcon
              color={added ? "#ffffff" : isLight ? "#484900" : "#251F67"}
              className={`w-4 h-4 transition-all duration-500 ${
                added ? "translate-x-2" : "translate-x-0"
              }`}
            />
            <h1
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "16px",
                letterSpacing: "0.1px",
                verticalAlign: "middle",
                whiteSpace: "nowrap",
              }}
            >
              {added ? "Agregado" : "Agregar al carrito"}
            </h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCardV2;

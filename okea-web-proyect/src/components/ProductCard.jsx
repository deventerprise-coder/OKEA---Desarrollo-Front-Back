import React from "react";
import { useTheme } from "./ThemeContext";

import {
  ClockIcon,
  ShoppingCartIcon,
} from "../assets/iconos/iconoHome";
import { HeartIconMejor, StarIconMejor, ClockCircleIcon } from "../assets/iconos/Icons";

const ProductCard = ({
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
}) => {
  const { isLight } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      transition: "background-color 300ms ease, color 300ms ease",
    };

    if (added) {
      return {
        ...baseStyle,
        backgroundColor: isLight ? "#22c55e" : "#15803d",
        color: "#ffffffff",
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: isLight ? "#DFE162" : "#F5F692",
        color: isLight ? "#484900" : "#251F67",
      };
    }
  };

  const getPriceStyle = () => {
    return {
      color: isLight ? "#EB5A45" : "#F5F692", 
      transition: "color 300ms ease",
    };
  };

  const getTitleStyle = () => {
    return {
      color: isLight ? "#1D1B20" : "#E2E2E9", 
      transition: "color 300ms ease",
    };
  };

  
  const getSubtitleStyle = () => {
    return {
      color: isLight ? "#1D1B20" : "#E5E2E1",
      transition: "color 300ms ease",
    };
  };

  return (
    <div
      className="w-57.5 h-92 bg-white rounded-3xl overflow-hidden hover:border-[#EB5A45] hover:border-[0.5px] transition group"
      style={getCardStyle()}
    >
      <div className="relative full h-50 bg-[#EEEDF4] overflow-hidden rounded-3xl">
          <div
            className="absolute -bottom-60 h-160 w-150 bg-no-repeat bg-cover bg-center scale-25 left-1/2 -translate-x-1/2 mb-6 group-hover:scale-35 transition"
            style={{ backgroundImage: `url(${image})` }}
          />

        {discount && (
        <div className="absolute top-3 rounded-3xl bg-[#EB5A45] w-15 h-6 font-popins text-sm text-white text-center ml-2 flex items-center justify-center">
            {discount}
        </div>
        )}

        <div
          className="absolute top-2 right-3 cursor-pointer"
          onClick={() => onLike(id)}
        >
          <HeartIconMejor color={liked ? "#eb5a45" : "#c4c6d3"} />
        </div>

        <div className="flex justify-center">
          <div className="flex absolute bottom-1 text-lg font-popins-light text-white w-30 h-7 rounded-3xl pl-1 pr-2 justify-between bg-[#EB5A45]">
            <ClockCircleIcon className="mt-1" />
            <div>05</div>
            <div className="text-xs font-extralight pt-1">|</div>
            <div>05</div>
            <div className="text-xs font-extralight pt-1">|</div>
            <div>00</div>
          </div>
        </div>
      </div>

      <div className="info font-popins pt-4 px-2 z-10">
        <div className="flex text-black justify-between">
          <h1 className="text-2xl" style={getTitleStyle()}>
            {label}
          </h1>
          <div className="flex p-0.5">
            <StarIconMejor color="#f4604b" />
            <h1
              className="py-1 font-popins-light text-sm"
              style={getTextStyle()}
            >
              {rating}
            </h1>
          </div>
        </div>

        <h1 style={getSubtitleStyle()}>{title}</h1>

        <div className="flex">
          <h1 className="text-2xl" style={getPriceStyle()}>
            {price}
          </h1>
          <h1 className="font-popins-light text-[#747782] line-through text-xs pt-2 ml-4">
            {oldPrice}
          </h1>
        </div>

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

export default ProductCard;
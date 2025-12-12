import { useState } from "react";
import {FavoritoCardIcon, EstrellaIcon, CarritoProductoIcon} from "../../assets/iconos/Icons";
import { useNavigate } from 'react-router-dom';
import { slugify } from "../../utils/slugify";

export function ProductCard({id,imagen, imgHover, marca, modelo, descripcion, precio, precioSinDescuento, etiqueta, calificacion, categoria, colores, isLight}) {
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const iconColor = added ? "#FFFFFF" : (hover ? "#FFFFFF" : "#484900");
  
  const etiquetaBg = etiqueta === "Standard"
  ? "#385BAA"
  : etiqueta === "New"
    ? "#FBC101"
    : "#EB5A45";
  const navigate = useNavigate();
  const handleNavigate = () => {
    const Categoriaslug = slugify(categoria || "");
    const productSlug = slugify(/*id || */modelo || marca || descripcion || "producto");
    navigate(`/producto/detalle/${Categoriaslug}/${productSlug}`, {
      state: {
        categoria,
        producto: {
          id,
          imagen,
          marca,
          modelo,
          descripcion,
          precio,
          precioSinDescuento,
          etiqueta,
          calificacion,
        },
      },
    });
  };

  return (
    <div className={`shadow-sm overflow-hidden flex flex-col items-center relative transition-colors duration-300 ease-out ${isLight ? "bg-white border border-gray-200 hover:drop-shadow-[0_0px_3px_rgba(223,225,98,1)] hover:border-none" : "bg-[#292272] hover:drop-shadow-[0_0px_10.7px_rgba(223,225,98,1)]"} transition-colors duration-500 ease-out transition-border duration-500 ease-out w-full max-w-[305px] min-w-[180px] h-[580px] md:h-[580px] lg:h-[630px]`}
     style={{
      borderRadius: 10,
    }}
     onClick={handleNavigate}>
      <div className="absolute top-3 left-3 text-white font-semibold px-2 py-1 rounded-full z-10" style={{
        fontFamily: 'Inter, sans-serif',
        backgroundColor: etiquetaBg,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '20px',
        fontStyle: 'Medium',
      }}>
        {etiqueta}
      </div>

      <button
        onClick={(event) => {
          event.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute top-3 right-3 cursor-pointer z-10"
      >
        {liked ? <FavoritoCardIcon color="#EB5A45"/> : <FavoritoCardIcon color="#C4C6D3"/>}
      </button>

      <div className="w-full flex justify-center items-center h-[300px] lg:h-[350px] bg-white relative"
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
      >
        <img 
          key={selectedColor}
          className={`w-full h-full ${categoria === "Calzado" || categoria === "Juguetes" || categoria === "Supermercado" ? "object-contain" : "object-cover"} transition-opacity duration-500 ease-in-out`}
          src={colores && colores.length > 0 ? colores[selectedColor].imagen : imagen}
          alt={modelo || "Producto"}
          style={{
            animation: 'fadeIn 500ms ease-in-out'
          }}
        />
        {imgHover && (
          <img 
            className={`w-full h-full ${categoria === "Calzado" || categoria === "Juguetes" || categoria === "Supermercado" ? "object-contain" : "object-cover"} absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${imageHover ? 'opacity-100' : 'opacity-0'}`}
            src={imgHover}
            alt={`${modelo || "Producto"} hover`}
          />
        )}
      </div>
      <div className="w-full text-left px-4 mt-10 ">
        <p className={`text-gray-400 text-xs font-medium           transition-colors duration-500 ease-out`}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 300,
        }}>{marca}</p>
        <p className={`font-semibold ${isLight ? "text-gray-900" : "text-white"} transition-colors duration-500 ease-out`} style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          fontWeight: 500,
        }}>{modelo}</p>
        <p className={`text-sm ${isLight ? "text-gray-500" : "text-white"} transition-colors duration-500 ease-out`} style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          fontWeight: 400,
        }}>
          {descripcion}
        </p>

        <div className="mt-5">
          <span className={`text-xl font-bold ${isLight ? "text-red-600" : "text-[#DBDB8E]"} transition-colors duration-500 ease-out`} style={{
            fontFamily: 'Body, sans-serif',
            fontStyle: 'Medium',
            fontSize: 24,
            fontWeight: 400,
          }}>S/{precio}</span>
          {precioSinDescuento && <span className="text-gray-400 line-through ml-2 transition-colors duration-500 ease-out" style={{
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'Medium',
            fontSize: 12,
            fontWeight: 500,
          }}>S/{precioSinDescuento}</span>}
        </div>

        {colores && colores.length > 0 && (
          <div className="flex gap-2 mt-3">
            {colores.map((colorData, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(index);
                }}
                className={`w-[18px] h-[18px] rounded-full transition-all duration-300 cursor-pointer ${
                  selectedColor === index 
                    ? isLight ? 'border-[#333333CC] border-[1px]': 'border-white border-[1px]'
                    : ''
                }`}
                style={{
                  backgroundColor: colorData.hex,
                }}
                aria-label={`Color ${colorData.nombre || index + 1}`}
                title={colorData.nombre}
              />
            ))}
          </div>
        )}

      </div>

      <div className="flex text-yellow-500 mt-1 w-full justify-end items-center mt-1 pr-4">
          <EstrellaIcon TamanoIcon="18"/>
          <span className={`ml-1 ${isLight ? "text-gray-700" : "text-[#C3C7CB]"}`} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            fontStyle: 'Medium',
          }}>{calificacion}</span>
        </div>

      <button
        className={`absolute bottom-3 flex items-center text-[11px] justify-center py-2 px-7 rounded-4xl cursor-pointer ${added ? 'bg-[#EB5A45] text-white' : isLight ?'bg-[#E4E666] text-[#484900]': 'bg-[#F5F692] text-[#251F67]'} hover:bg-[#EB5A45] hover:text-white transition-colors duration-500 ease-out sm:text-[14px]`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(event) => {
          event.stopPropagation();
          setAdded(!added);
          if (added) {
            setTimeout(() => {
              setHover(false);
            }, 500);
          }
        }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontStyle: 'normal',
          width: 'calc(100% - 20px)',
          maxWidth: 270,
          height: 42,
          marginBottom: 10,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className={`${added ? "sm:translate-x-[560%] translate-x-[420%]" : ""} transition-transform duration-300 ease-out`}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
  >
          <CarritoProductoIcon color={iconColor} />
        </span>
        <span
          style={{
            transition: 'color 300ms',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            marginLeft: added ? '-40px' : '8px',
          }}
        >
          {added ? 'Producto agregado' : 'Agregar al carrito'}
        </span>
      </button>
    </div>
  );
}
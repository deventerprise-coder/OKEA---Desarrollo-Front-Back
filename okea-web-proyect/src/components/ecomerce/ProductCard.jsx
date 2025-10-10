import { useState } from "react";
import {FavoritoCardIcon, EstrellaIcon} from "../../assets/iconos/Icons";
import {ShoppingCartIcon} from "../../assets/iconos/iconoHome";

export function ProductCard({imagen, marca, modelo, descripcion, precio, precioSinDescuento, etiqueta, calificacion, categoria}) {
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);

  const iconColor = hover || added ? "#FFFFFF" : "#484900";
  const etiquetaBg = etiqueta === "Standard"
  ? "#385BAA"
  : etiqueta === "New"
    ? "#FBC101"
    : "#EB5A45";
  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden flex flex-col items-center relative hover:border-[#E4E666] transition-colors duration-300 ease-out"
     style={{
      width: 305,
      height: 685,
      borderRadius: 10,
    }}>
      <div className="absolute top-3 left-3 text-white font-semibold px-2 py-1 rounded-full" style={{
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
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 cursor-pointer"
      >
        {liked ? <FavoritoCardIcon color="#EB5A45"/> : <FavoritoCardIcon color="#C4C6D3"/>}
      </button>
      
      <div className="w-full flex justify-center items-center h-[400px]">
        <img className={`w-full h-full ${categoria === "Calzado" || categoria === "Juguetes" || categoria === "Supermercado" ? "object-contain" : "object-cover"}`}        
        src={imagen}
        alt="iPhone"
      />
      </div>
      <div className="w-full text-left px-4 mt-10 ">
        <p className="text-gray-400 text-xs font-medium"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 300,
        }}>{marca}</p>
        <p className="text-gray-900 font-semibold" style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          fontWeight: 500,
        }}>{modelo}</p>
        <p className="text-gray-500 text-sm" style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          fontWeight: 400,
        }}>
          {descripcion}
        </p>

        <div className="mt-5">
          <span className="text-red-600 text-xl font-bold" style={{
            fontFamily: 'Body, sans-serif',
            fontStyle: 'Medium',
            fontSize: 24,
            fontWeight: 400,
          }}>S/{precio}</span>
          {precioSinDescuento && <span className="text-gray-400 line-through ml-2" style={{
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'Medium',
            fontSize: 12,
            fontWeight: 500,
          }}>S/{precioSinDescuento}</span>}
        </div>

      </div>

      <div className="flex text-yellow-500 mt-1 w-full justify-end items-center mt-1 pr-4">
          <EstrellaIcon TamanoIcon="18"/>
          <span className="ml-1 text-gray-700" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            fontStyle: 'Medium',
          }}>{calificacion}</span>
        </div>

      <button
        className={`absolute bottom-3 flex items-center justify-center gap-2 py-2 px-7 rounded-4xl cursor-pointer ${added ? 'bg-[#EB5A45] text-white' : 'bg-[#E4E666] text-[#484900]'} hover:bg-[#EB5A45] hover:text-white transition-colors duration-300 ease-out`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setAdded(!added)}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          fontStyle: 'normal',
          width: 270,
          height: 42,
          marginBottom: 10,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 300ms ease',
            transform: added ? 'translateX(130px)' : 'translateX(0)',
          }}
        >
          <ShoppingCartIcon color={iconColor} />
        </span>
        <span
          style={{
            transition: 'color 300ms',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            marginLeft: added ? '-40px' : '0',
          }}
        >
          {added ? 'Producto agregado' : 'Agregar al carrito'}
        </span>
      </button>
    </div>
  );
}
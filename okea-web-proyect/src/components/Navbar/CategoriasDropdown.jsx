
import okeaLogoCategorias from '../../assets/iconos/okea_logo_categorias.svg';
import {
  TechnologyIcon,
  LavadoIcon,
  FlechaDerecha,
  MuebleIcon,
  ToallaIcon,
  HombreIcon,
  MujerIcon,
  CalzadoIcon,
  AnilloIcon,
  SaludIcon,
  JugueteIcon,
  DecoracionIcon,
  MascotaIcon,
  SupermercadoIcon,
  LlantaIcon,
  SalirIcon,
} from '../../assets/iconos/Icons';
import { categoriasDetalle } from './categoriasDetalle';
import CategoriaDetalleDropdown from './CategoriaDetalleDropdown';
import { useState } from 'react';

export default function CategoriasDropdown({ onClose }) {
  const categorias = [
    "Tecnología",
    "Electrohogar",
    "Muebles y Organización",
    "Dormitorio y Baños",
    "Moda Hombre",
    "Moda Mujer",
    "Calzado",
    "Accesorios de moda",
    "Salud y Bienestar",
    "Juguetes, Autos y Vehículos",
    "Decoración e Iluminación",
    "Mascotas",
    "Supermercado",
    "Automotriz",
  ];

  const [categoriaActiva, setCategoriaActiva] = useState(null);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[1100] backdrop-blur-xl shadow-lg border border-[#DAE2FF] p-4"
        style={{
          left: 3,
          top: 0,
          width: 324,
          maxHeight: 960,
          borderRadius: 32,
          borderWidth: 1,
          backgroundColor: 'rgba(44, 80, 158, 0.5)',
          overflowY: 'auto',
          paddingTop: 40,
          position: 'fixed',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón para cerrar categorias, aunque se puede cerrar clickeando afuera tambien*/}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            zIndex: 1001,
          }}
          aria-label="Cerrar menú de categorías"
        >
          <SalirIcon />
        </button>
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <img
          src={okeaLogoCategorias}
          alt="Okea Logo Categorías"
          style={{
            width: 124,
            height: 41,
            opacity: 1,
            marginLeft: 0,
            marginBottom: 20,
            display: 'block',
          }}
        />
        <hr
          style={{
            width: 292,
            height: 0,
            opacity: 0.9,
            borderWidth: 1,
            borderColor: '#747a87',
            margin: '0 auto 20px auto',
          }}
        />
        <h2
          className="text-white font-poppins mb-2"
          style={{
            width: 272.55,
            height: 40,
            opacity: 1,
            gap: 10,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 16,
            lineHeight: '20px',
            letterSpacing: '0.25px',
            marginBottom: 8,
          }}
        >
          Categorías
        </h2>
        <ul className="flex flex-col gap-4">
          {categorias.map((cat, i) => {
            let IconComponent = TechnologyIcon;
            if (cat === "Electrohogar") IconComponent = LavadoIcon;
            else if (cat === "Muebles y Organización") IconComponent = MuebleIcon;
            else if (cat === "Dormitorio y Baños") IconComponent = ToallaIcon;
            else if (cat === "Moda Hombre") IconComponent = HombreIcon;
            else if (cat === "Moda Mujer") IconComponent = MujerIcon;
            else if (cat === "Calzado") IconComponent = CalzadoIcon;
            else if (cat === "Accesorios de moda") IconComponent = AnilloIcon;
            else if (cat === "Salud y Bienestar") IconComponent = SaludIcon;
            else if (cat === "Juguetes, Autos y Vehículos") IconComponent = JugueteIcon;
            else if (cat === "Decoración e Iluminación") IconComponent = DecoracionIcon;
            else if (cat === "Mascotas") IconComponent = MascotaIcon;
            else if (cat === "Supermercado") IconComponent = SupermercadoIcon;
            else if (cat === "Automotriz") IconComponent = LlantaIcon;
            return (
              <li
                key={i}
                className="text-white text-sm font-poppins px-3 py-2 rounded-lg hover:bg-[#5a6ca3] cursor-pointer transition-colors flex items-center gap-2"
                onClick={() => setCategoriaActiva(cat)}
              >
                <span className="flex items-center justify-center" style={{ paddingLeft: 12 }}>
                  <IconComponent />
                </span>
                <span
                  className="flex-1 font-poppins"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: 14,
                    lineHeight: '20px',
                    letterSpacing: '0.25px',
                    paddingLeft: 16,
                  }}
                >
                  {cat}
                </span>
                <span className="flex items-center justify-center ml-2">
                  <FlechaDerecha />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Dropdown de detalle de categoría */}
      {categoriaActiva && categoriasDetalle[categoriaActiva] && (
        <CategoriaDetalleDropdown
          data={categoriasDetalle[categoriaActiva]}
          nombreCategoria={categoriaActiva}
          onClose={() => setCategoriaActiva(null)}
        />
      )}
    </>
  );
}

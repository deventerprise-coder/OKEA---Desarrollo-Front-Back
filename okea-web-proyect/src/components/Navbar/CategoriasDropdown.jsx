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
  CloseIcon,
  SalirIcon,
} from '../../assets/iconos/Icons';
import { CategoriasDetalle } from './categoriasDetalle.js';
import CategoriaDetalleDropdown from './CategoriaDetalleDropdown.jsx';
import { useState, useEffect } from 'react';

const animations = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-20px);
    }
  }

  .menu-enter {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .menu-exit {
    animation: fadeOut 0.3s ease-out forwards;
  }

  /* Agregar estos estilos para ocultar la barra de scroll */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* Para Internet Explorer y Edge */
    scrollbar-width: none;     /* Para Firefox */
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Para Chrome, Safari y Opera */
  }
`;

export default function CategoriasDropdown({isVisible, onClose }) {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(22, 18, 60, 0.4)' : 'rgba(44, 80, 158, 0.5)',
      border: '1px solid #DAE2FF',
    };
  };

  const handleCategoriaClick = (categoria) => {
    if (categoriaActiva === categoria) {
      setCategoriaActiva(null);
    } else {
      setCategoriaActiva(categoria);
    }
  };

  const Categorias = [
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

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-[1100] backdrop-blur-xl shadow-lg border border-[#DAE2FF] p-4 hide-scrollbar ${
          isVisible ? 'menu-enter' : 'menu-exit'
        }`}
        style={{
          left: 3,
          top: 0,
          width: 324,
          maxHeight: 960,
          borderRadius: 32,
          borderWidth: 1,
          ...getThemeStyles(),
          overflowY: 'auto',
          paddingTop: 40,
          position: 'fixed',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{animations}</style>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose && onClose();
          }}
          aria-label="Cerrar categorías"
          className="p-1 rounded-full text-white/80 hover:bg-white/10 transition-colors"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
          }}
        >
          <CloseIcon />
        </button>

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
          {Categorias.map((cat, i) => {
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
                className={`text-white text-sm font-poppins px-3 py-2 rounded-lg hover:bg-[#5a6ca3] cursor-pointer transition-colors flex items-center gap-2 ${
                  categoriaActiva === cat ? 'bg-[#5a6ca3]' : ''
                }`}
                onClick={() => handleCategoriaClick(cat)}
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
      {categoriaActiva && CategoriasDetalle[categoriaActiva] && (
        <CategoriaDetalleDropdown
          data={CategoriasDetalle[categoriaActiva]}
          nombreCategoria={categoriaActiva}
          onClose={() => setCategoriaActiva(null)}
          onCloseAll={() => {
            setCategoriaActiva(null);
            onClose && onClose();
          }}
        />
      )}
    </>
  );
}

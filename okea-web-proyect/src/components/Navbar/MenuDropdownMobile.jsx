import {
  AvatarNuevo,
  CloseIcon,
  FlechaAbajo,
  IconFacebook2,
  IconInstagram2,
  IconYouTube2,
  IconLinkedIn2,
  IconTikTok2,
} from "../../assets/iconos/Icons";

import { CategoriasDetalle } from "./categoriasDetalle.js";
import { useState, useEffect } from "react";
import ThemeToggle from "../Navbar/ThemeToggle";
import { useNavigate } from "react-router-dom"; 

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

.hide-scrollbar {
-ms-overflow-style: none;
scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
display: none;
}
`;

export default function MenuDropdownMobile({ isOpen, onClose }) {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || "light";
  });

  const navigate = useNavigate(); 


  const getCategoriaRuta = (nombreCategoria) => {
    return nombreCategoria === "Tecnología" ? "tecnologia"
      : nombreCategoria === "Electrohogar" ? "electrohogar"
      : nombreCategoria === "Muebles y Organización" ? "muebles-y-organizacion"
      : nombreCategoria === "Dormitorio y Baños" ? "dormitorio-y-banos"
      : nombreCategoria === "Moda Hombre" ? "moda-hombre"
      : nombreCategoria === "Moda Mujer" ? "moda-mujer"
      : nombreCategoria === "Mascotas" ? "mascotas"
      : nombreCategoria === "Supermercado" ? "supermercado"
      : nombreCategoria === "Calzado" ? "calzado"
      : nombreCategoria === "Salud y Bienestar" ? "salud-y-bienestar"
      : nombreCategoria === "Juguetes, Autos y Vehículos" ? "juguetes"
      : nombreCategoria === "Accesorios de moda" ? "accesorios-de-moda"
      : nombreCategoria === "Decoración e Iluminación" ? "decoracion-e-iluminacion"
      : "";
  };

  const [animationState, setAnimationState] = useState("closed");

  useEffect(() => {
    if (isOpen && animationState === "closed") {
      setAnimationState("entering");
    } else if (!isOpen && animationState === "entering") {
      setAnimationState("exiting");
      const timer = setTimeout(() => {
        setAnimationState("closed");
        onClose && onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationState, onClose]);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(
            document.documentElement.getAttribute("data-theme") || "light"
          );
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const getThemeStyles = () => ({
    backgroundColor:
      theme === "dark" ? "rgba(22, 18, 60, 0.4)" : "rgba(44, 80, 158, 0.4)",
    border: "1px solid #DAE2FF",
  });

  const handleClose = () => {
    setAnimationState("exiting");
    const timer = setTimeout(() => {
      setAnimationState("closed");
      onClose && onClose();
    }, 300);
    return () => clearTimeout(timer);
  };

  const handleCategoriaClick = (categoria) => {
    setCategoriaActiva(categoriaActiva === categoria ? null : categoria);
  };
  
  const handleSocialClick = (platform) => {
    console.log(`Clic en ${platform}`);
  };

  const Categorias = Object.keys(CategoriasDetalle);

  if (animationState === "closed") return null;

  const AccordionSubtitulos = ({ categoriaData, categoriaName }) => {
    if (!categoriaData || !categoriaData.columnas) return null;

    return (
      <div className="flex flex-wrap gap-2 py-2 px-4">
        {categoriaData.columnas.map((columna, colIndex) => (
          <button
            key={colIndex}
            onClick={(e) => {
              e.stopPropagation();
              const ruta = getCategoriaRuta(categoriaName);
              if (ruta) {
                navigate(`/catalogo/${ruta}`);
              }
              handleClose();
            }}
            className="text-white text-sm font-poppins px-3 py-2 rounded-lg border border-white/50 hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer"
            style={{
              borderColor: theme === "dark" ? "#E4E66666" : "#E4E66666",
              background: "transparent",
            }}
          >
            {columna.titulo}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-[1100] backdrop-blur-xl shadow-lg border border-[#DAE2FF] py-3 px-3 hide-scrollbar ${
          animationState === "entering" ? "menu-enter" : "menu-exit"
        }`}
        style={{
          left: 3,
          top: 5, 
          width: 320,
          maxHeight: 'calc(100vh - 5px)', 
          borderRadius: 16,
          borderWidth: 1,
          ...getThemeStyles(),
          overflowY: "auto",
          paddingTop: 20,
          position: "fixed",
          willChange: "opacity, transform",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{animations}</style>

        <div className="flex justify-between items-center px-0 mb-3">
          <div
            className="flex items-center gap-4 py-3 cursor-pointer"
            style={{ marginLeft: 0, opacity: 1, paddingLeft: 8 }}
          >
            <div style={{ width: 40, height: 40, flexShrink: 0 }}>
              <AvatarNuevo
                color={theme === "dark" ? "#F5F692" : "#DFE162"}
                pathColor={theme === "dark" ? "#282800" : "#616200"}
              />
            </div>
            <span
              className="text-white text-base font-poppins"
              style={{ lineHeight: "1.2" }}
            >
              Hola,
              <br />
              Inicie Sesión
            </span>
          </div>
          <div
            className="flex items-center py-3 gap-2"
            style={{ paddingRight: 8 }}
          >
            <ThemeToggle />
            <button
              onClick={handleClose}
              aria-label="Cerrar menú móvil"
              className="p-1 rounded-full text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <hr
          style={{
            width: 292,
            height: 0,
            opacity: 0.9,
            borderWidth: 1,
            borderColor: "#747a87",
            margin: "5px auto 5px auto",
          }}
        />

        <h2
          className="text-white font-poppins mb-2"
          style={{
            width: 272.55,
            height: 40,
            opacity: 1,
            gap: 10,
            paddingTop: 5,
            paddingRight: 10,
            paddingBottom: 5,
            paddingLeft: 8,
            display: "flex",
            alignItems: "center",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: 16,
            lineHeight: "20px",
            letterSpacing: "0.25px",
            marginBottom: 8,
          }}
        >
          Todas las categorías
        </h2>

        <ul className="flex flex-col gap-2">
          {Categorias.map((cat, i) => {
            const catData = CategoriasDetalle[cat];
            const isOpenAccordion = categoriaActiva === cat;
            const IconComponent = catData.icon;
            const maxAccordionHeight = isOpenAccordion
              ? "max-h-[800px]"
              : "max-h-0";

            return (
              <li key={i} className="flex flex-col">
                <div
                  className={`text-white text-sm font-poppins px-3 py-2 rounded-full hover:bg-[#E4E66666] cursor-pointer transition-colors flex items-center gap-2`}
                  onClick={() => handleCategoriaClick(cat)}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{ paddingLeft: 8 }}
                  >
                    <IconComponent />
                  </span>
                  <span
                    className="flex-1 font-poppins"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: 14,
                      lineHeight: "20px",
                      letterSpacing: "0.25px",
                      paddingLeft: 8,
                    }}
                  >
                    {cat}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const ruta = getCategoriaRuta(cat);
                      if (ruta) {
                        navigate(`/catalogo/${ruta}`);
                      }
                      handleClose();
                    }}
                    aria-label={`Ver todo ${cat}`}
                    className="p-1 rounded-full text-white/80 hover:bg-white/10 transition-colors"
                    style={{ marginLeft: 8 }}
                  >
                    <FlechaAbajo
                      style={{
                        transform: isOpenAccordion ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${maxAccordionHeight} ${
                    isOpenAccordion ? "opacity-100 pt-2" : "opacity-0"
                  }`}
                >
                  <AccordionSubtitulos categoriaData={catData} categoriaName={cat} />
                </div>
              </li>
            );
          })}
        </ul>

        <hr
          style={{
            width: 292,
            height: 0,
            opacity: 0.9,
            borderWidth: 1,
            borderColor: "#747a87",
            margin: "15px auto 15px auto", 
          }}
        />

        
        <div className="px-8 py-4 mt-2"> 
          <div className="flex justify-between"> 
            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Facebook')}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Síguenos en Facebook"
            >
              <IconFacebook2 color="#FFFFFF" size={24} /> 
            </a>
            
            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Instagram')}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Síguenos en Instagram"
            >
              <IconInstagram2 color="#FFFFFF" size={24} />
            </a>

            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Youtube')}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Suscríbete en Youtube"
            >
              <IconYouTube2 color="#FFFFFF" size={24} />
            </a>


            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('LinkedIn')}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Conéctanos en LinkedIn"
            >
              <IconLinkedIn2 color="#FFFFFF" size={24} />
            </a>

            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('TikTok')}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Conéctanos en TikTok"
            >
              <IconTikTok2 color="#FFFFFF" size={24} />
            </a>

          </div>
        </div>
        
      </div>
    </>
  );
}
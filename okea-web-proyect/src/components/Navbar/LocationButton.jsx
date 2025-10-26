import { useEffect, useState } from "react";
import { LocationIcon } from "../../assets/iconos/Icons";

// =======================
// 1. COMPONENTE LocationButton
// =======================

export default function LocationButton({ onClick }) {
  // Estado para el tema actual (claro/oscuro)
  const [theme, setTheme] = useState('light');

  // =======================
  // 2. EFECTO: OBSERVAR CAMBIO DE TEMA
  // =======================

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Limpia el observer al desmontar
    return () => observer.disconnect();
  }, []);

  // =======================
  // 3. ESTILOS SEGÚN TEMA
  // =======================

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#B3C7FF66',
      color: theme === 'dark' ? '#C6C4E3' : '#1C4390'
    };
  };

  // =======================
  // 4. RENDER
  // =======================

  return (
    <button
      onClick={onClick}
      style={getThemeStyles()}
      className="
        flex items-center justify-center
        gap-1 sm:gap-[6px]
        px-2 sm:px-4 md:px-6 lg:px-9
        py-1.5 sm:py-2
        rounded-full
        hover:brightness-90 transition-all duration-200
        cursor-pointer
        w-full sm:w-auto
        min-w-[60px] sm:min-w-[80px] md:min-w-[100px]
        text-xs sm:text-sm md:text-base
      "
    >

      <LocationIcon 
        color={theme === 'dark' ? '#C6C4E3' : '#1C4390'} 
        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      />

      <span className="
        font-poppins font-medium 
        text-[11px] sm:text-[12px] md:text-[14px] 
        leading-[16px] sm:leading-[18px] md:leading-[20px] 
        tracking-[0.1px] 
        text-center
        hidden xs:inline sm:inline
        whitespace-nowrap
      ">
        Ubicación
      </span>

      <span className="
        font-poppins font-medium 
        text-[10px] 
        leading-[14px] 
        tracking-[0.1px] 
        text-center
        inline xs:hidden sm:hidden
        whitespace-nowrap
      ">
        Ubic.
      </span>
    </button>
  );
}
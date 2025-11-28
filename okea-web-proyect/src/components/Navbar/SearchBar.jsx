import { MenuIcon, SearchIcon } from "../../assets/iconos/Icons";
import { useState, useEffect, useRef } from "react";

// =======================
// 1. COMPONENTE PRINCIPAL
// =======================
export default function SearchBar({ onToggleCategorias, CategoriasDropdownOpen }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState('light');
  const inputRef = useRef(null);

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
    return () => observer.disconnect();
  }, []);

  // =======================
  // 3. LÓGICA DE PLACEHOLDER Y ACCIONES
  // =======================
  const showPlaceholder = !isFocused && inputValue.trim() === "";

  const handleSearchIconClick = () => {
    inputRef.current?.focus();
  };

  // =======================
  // 4. ESTILOS SEGÚN TEMA
  // =======================
  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(41, 34, 114, 1)' : 'white',
      color: theme === 'dark' ? '#49454F' : '#1C4390',
      width: 'clamp(280px, 35.36vw, 679px)', 
      height: '40px', 
    };
  };

  const getCategoriesButtonStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? '#F5F692' : '#DFE162',
      color: theme === 'dark' ? '#323200' : '#484900'
    };
  };

  // =======================
  // 5. RENDER
  // =======================
  return (
    <div className="relative flex justify-center w-full">
      <div
        style={getThemeStyles()}
        className="relative flex items-center rounded-full px-2 sm:px-3 md:px-4 gap-2 sm:gap-[10px] transition-all duration-300"
      >
        {showPlaceholder && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none px-[40px] sm:px-[200px]">
            <span className="font-poppins font-light text-[12px] sm:text-[14px] md:text-[16px] text-[#CAC4D0] truncate">
              <span className="hidden sm:inline">¿Qué estás buscando?</span>
              <span className="sm:hidden">Buscar...</span>
            </span>
          </span>
        )}
        {(!isFocused || CategoriasDropdownOpen) && (
          <button
            style={getCategoriesButtonStyles()}
            className="ml-[-14px] flex-shrink-0 flex items-center justify-center gap-1 sm:gap-[6px] px-2 sm:px-3 md:px-4 h-[36px] w-[178px] rounded-full hover:brightness-95 cursor-pointer transition-all duration-200"
            onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleCategorias(); }}
          >
            <MenuIcon
              color={theme === 'dark' ? '#C6C4E3' : '#484900'}
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
            />
            <span className="font-poppins font-medium text-[10px] sm:text-[14px] whitespace-nowrap">
              <span className="hidden sm:inline">Categorías</span>
              <span className="sm:hidden">Cat.</span>
            </span>
          </button>
        )}

        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: theme === 'dark' ? '#C6C4E3' : '#1C4390' }}
          className="relative z-10 flex-grow min-w-0 h-full bg-transparent outline-none font-poppins text-[14px] sm:text-[16px] md:text-[18px] tracking-[1px]"
        />

        
        <div onClick={handleSearchIconClick} className="relative z-10 cursor-pointer p-1">
          <SearchIcon
            color={theme === 'dark' ? '#C6C4E3' : '#1C4390'}
            className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
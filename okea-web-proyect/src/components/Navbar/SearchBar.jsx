import { MenuIcon, SearchIcon } from "../../assets/iconos/Icons";
import { useState, useEffect } from "react";

export default function SearchBar({ onToggleCategorias, categoriasDropdownOpen }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState('light');

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

  const showPlaceholder = !isFocused && inputValue.trim() === "";

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(41, 34, 114, 1)' : 'white',
      color: theme === 'dark' ? '#49454F' : '#1C4390'
    };
  };

  const getCategoriesButtonStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? '#F5F692' : '#DFE162',
      color: theme === 'dark' ? '#323200' : '#484900'
    };
  };

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[720px]">
      <div
        style={getThemeStyles()}
        className={`relative flex items-center rounded-full px-2 gap-[10px] transition-all duration-300 ${
          isFocused ? "py-2" : "py-0.5"
        }`}
      >
        {showPlaceholder && (
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none font-poppins font-light text-[16px] leading-[24px] tracking-[0.5px] text-[#CAC4D0]">
            ¿Qué estás buscando?
          </span>
        )}

        {(!isFocused || categoriasDropdownOpen) && (
          <button
            style={getCategoriesButtonStyles()}
            className="ml-[-6px] w-[170px] flex-shrink-0 flex items-center justify-center gap-[6px] px-4 py-2 rounded-full hover:brightness-95 cursor-pointer"
            onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleCategorias(); }}
          >
            <MenuIcon color={theme === 'dark' ? '#C6C4E3' : '#484900'} />
            <span className="font-poppins font-medium text-[14px] leading-[20px] tracking-[0.1px] text-center">
              Categorías
            </span>
          </button>
        )}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: theme === 'dark' ? '#C6C4E3' : '#1C4390' }}
          className="flex-grow w-full bg-transparent outline-none font-poppins text-[18px] leading-[24px] tracking-[2px] placeholder-transparent"
        />

        <SearchIcon color={theme === 'dark' ? '#C6C4E3' : '#1C4390'} />
      </div>
    </div>
  );
}
import { MenuIcon, SearchIcon } from "../../assets/iconos/Icons";
import { useState } from "react";

export default function SearchBar({ onToggleCategorias, categoriasDropdownOpen }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showPlaceholder = !isFocused && inputValue.trim() === "";

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[720px]">
      <div
        className={`relative flex items-center bg-white rounded-full px-2 gap-[10px] transition-all duration-300 ${
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
            className="ml-[-6px] w-[170px] flex-shrink-0 flex items-center justify-center gap-[6px] px-4 py-2 rounded-full hover:brightness-95 bg-[#DFE162] cursor-pointer"
            onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleCategorias(); }}
          >
            <MenuIcon />
            <span className="font-poppins font-medium text-[14px] leading-[20px] tracking-[0.1px] text-center text-[#484900]">
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
          className="flex-grow w-full bg-transparent outline-none font-poppins text-[18px] leading-[24px] tracking-[2px] text-gray-700 placeholder-transparent"
        />

        <SearchIcon />
      </div>
    </div>
  );
}
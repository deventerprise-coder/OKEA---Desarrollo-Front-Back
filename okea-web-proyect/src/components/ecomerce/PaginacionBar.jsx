import { useState } from "react";
import { FlechaDPaginacion, FlechaIPaginacion, FlechaFiltro} from "../../assets/iconos/Icons";

export default function CustomSelect({isFocused, isLight}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Precio más bajo");
  const [hover, setHover] = useState(false);

  const iconColor = isLight ? isFocused || hover ? "#2C509ECC" : "#333333CC" : isFocused || hover ? "#2C509ECC":"#FFFFFFCC";

  const options = [
    "Precio más bajo",
    "Precio más alto",
    "Lo más vendido",
    "Lo más nuevo",
    "Mejor descuento",
  ];

  return (
    <div className="relative w-[200px] font-medium text-[14px]">
      <div
       className={`border-0 border-b 
                   focus:outline-none focus:border-gray-400 
                   text-sm cursor-pointer w-full text-left
                   flex items-center justify-between group-hover:border-[#2C509ECC]
                   font-medium group-hover:text-[#2C509ECC] ${isLight ? isFocused ? 'text-[#2C509ECC] border-[#2C509ECC]' : 'text-[#333333] border-gray-400' : isFocused ? 'text-[#2C509ECC] border-[#2C509ECC]':'text-[#FFFFFF] border-gray-400'} transition-colors duration-500`}
        style={{ fontFamily: "Inter, sans-serif" }}
        onClick={() => { setIsOpen(!isOpen)}}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {selected}
        <FlechaFiltro fill={iconColor}/>
      </div>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-[230px] h-[161px] bg-[#FFFFFFCC] border border-gray-300 rounded-lg shadow-lg 
                     max-h-60 overflow-auto left-1/2 -translate-x-1/2 backdrop-blur-[30px] py-2"
        >
          {options.map((option) => (
            <li
              key={option}
              className={`px-5 py-[3px] cursor-pointer text-[#1F3A58] hover:font-semibold text-[14px] font-regular`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PaginacionBar({ page, setPage, totalPages, isLight }) {
  const [isFocused, setIsFocused] = useState(false);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className={`w-full h-[80px] flex items-center justify-between border rounded-[10px] px-10 shadow-sm ${isLight ? "border-[#1F3A581A]" : "border-[#FFFFFF33]"} transition-all duration-500`}>

        <div className="flex flex-col gap-2 text-gray-600 group cursor-pointer group">
            <div onClick={() => setIsFocused(!isFocused)} className="order-2">
                <CustomSelect isFocused={isFocused} isLight={isLight}/>
            </div>

          <label
            className={`group-hover:text-[#2C509E66] order-1 font-medium text-[14px] ${isLight ? isFocused ? 'text-[#2C509E66]': 'text-[#33333366]' : isFocused ? 'text-[#2C509E66]':'text-[#FFFFFF66]'} transition-colors duration-500`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
          Ordenar por:
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="p-1 text-gray-600 disabled:text-gray-300 cursor-pointer"
        >
          <FlechaIPaginacion color={isLight ? "#333333CC" : "#FFFFFFCC"}/>
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm cursor-pointer text-[15px] font-medium
              ${page === i + 1 ? isLight ? "bg-[#385BAA] text-white" : "bg-[#292272] text-[#FFFFFFCC]" : isLight ? "border text-[#333333] hover:bg-[#385BAA] hover:text-white": "border border-[#FFFFFFCC] text-[#FFFFFFCC] hover:bg-[#292272] hover:text-[#FFFFFFCC] hover:border-transparent"}`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="p-1 text-gray-600 disabled:text-gray-300 cursor-pointer"
        >
            <FlechaDPaginacion color={isLight ? "#333333CC" : "#FFFFFFCC"}/>
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { FlechaDerecha, FlechaIzquierda, FlechaFiltro} from "../../assets/iconos/Icons";

export default function CustomSelect({isFocused}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Precio más bajo");
  const [hover, setHover] = useState(false);

  const iconColor = isFocused || hover ? "#2C509ECC" : "#333333CC";

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
       className={`border-0 border-b border-gray-400 
                   focus:outline-none focus:border-gray-400 
                   text-sm cursor-pointer w-full text-left
                   flex items-center justify-between
                   font-medium ${isFocused ? 'text-[#2C509ECC]' : 'text-[#333333]'} group-hover:text-[#2C509ECC]`}
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
          className="absolute z-10 mt-1 w-[230px] h-[161px] bg-white border border-gray-300 rounded-lg shadow-lg 
                     max-h-60 overflow-auto left-1/2 -translate-x-1/2 backdrop-blur-2xl py-2"
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

export function PaginacionBar() {
  const [page, setPage] = useState(1);
  const totalPages = 3;
  const [isFocused, setIsFocused] = useState(false);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-[1395px] h-[80px] flex items-center justify-between border border-gray-200 rounded-[10px] px-10 bg-white shadow-sm mb-6">

        <div className="flex flex-col gap-2 text-gray-600 group cursor-pointer group">
            <div onClick={() => setIsFocused(!isFocused)} className="order-2">
                <CustomSelect isFocused={isFocused} />
            </div>

          <label
            className={`group-hover:text-[#2C509E66] order-1 font-medium text-[14px] ${isFocused ? 'text-[#2C509E66]' : 'text-[#33333366]'}`}
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
          <FlechaIzquierda color="#333333CC"/>
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm cursor-pointer text-[15px] font-medium
              ${page === i + 1 ? "bg-[#385BAA] text-white" : "border text-[#333333] hover:bg-[#385BAA] hover:text-white"}`}
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
            <FlechaDerecha color="#333333CC"/>
        </button>
      </div>
    </div>
  );
}

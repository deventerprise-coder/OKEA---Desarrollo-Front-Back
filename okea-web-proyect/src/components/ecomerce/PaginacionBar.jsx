import { useState, useEffect } from "react";
import { FlechaDPaginacion, FlechaIPaginacion, FlechaFiltro, OrdenarIcon} from "../../assets/iconos/Icons";
import { useSort } from "./useSort";

export default function CustomSelect({isFocused, isLight}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const { selected, setSelected, sortOptions } = useSort();

  const iconColor = isLight ? isFocused || hover ? "#2C509ECC" : "#333333CC" : isFocused || hover ? "#2C509ECC":"#FFFFFFCC";

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
          className="absolute z-50 mt-1 w-[230px] h-[161px] bg-[#FFFFFFCC] border border-gray-300 rounded-lg shadow-lg 
                     max-h-60 overflow-auto left-1/2 -translate-x-1/2 backdrop-blur-[30px] py-2"
        >
          {sortOptions.map((option) => (
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

function CustomOptionMobile({title, onClick}) {

  return (
    <div
      className={`relative flex flex-col items-stretch w-[70%] h-[40.85px] border border-[#C6C6CDCC] mb-2 rounded-[10px] justify-center transition-colors duration-700`}
    >
      <button className="flex w-full h-full bg-auto  px-1 py-0.5 text-sm rounded-md cursor-pointer justify-center items-center px-10" onClick={onClick}>
        <div className="flex justify-center w-full items-center">
          <span className={`flex items-center text-center font-['Inter',sans-serif] font-normal text-white justify-center`} >
            {title}
          </span>
        </div>
      </button>
    </div>
  );
}

export function PaginacionBar({ page, setPage, totalPages, isLight }) {
  const [isFocused, setIsFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const wIcon = windowWidth < 1024 ? 7 : 13;
  const hIcon = windowWidth < 1024 ? 16 : 20;

  return (
    <div className={`w-full h-[80px] flex items-center justify-center lg:justify-between lg:border rounded-[10px] px-10 lg:shadow-sm ${isLight ? "lg:border-[#1F3A581A]" : "lg:border-[#FFFFFF33]"} lg:transition-colors lg:duration-500`}>

        <div className="hidden lg:flex flex-col gap-2 text-gray-600 group cursor-pointer group">
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

      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`flex w-[30px] h-[30px] ${isLight ? "bg-transparent" : "bg-[#626383]"} lg:bg-transparent rounded-full p-1 text-gray-600 disabled:text-gray-300 cursor-pointer lg:w-auto lg:h-auto items-center justify-center`}
        >
          <FlechaIPaginacion color={isLight ? "#333333CC" : windowWidth < 1024 ? "#FFFFFF" : "#FFFFFFCC"} width={wIcon} height={hIcon}/>
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm cursor-pointer text-[15px] font-medium
              ${page === i + 1 ? isLight ? "text-white bg-[#1C4390] lg:bg-[#385BAA]" : "bg-[#292272] text-[#FFFFFFCC]" : isLight ? "border border-[#1F3A58] text-[#1F3A58] lg:border-[#333333] lg:text-[#333333] hover:bg-[#385BAA] hover:text-white": "bg-[#626383] lg:bg-transparent lg:border lg:border-[#FFFFFFCC] text-[#FFFFFFCC] hover:bg-[#292272] hover:text-[#FFFFFFCC] hover:border-transparent"}`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`flex w-[30px] h-[30px] ${isLight ? "bg-transparent" : "bg-[#626383]"} lg:bg-transparent rounded-full p-1 text-gray-600 disabled:text-gray-300 cursor-pointer lg:w-auto lg:h-auto items-center justify-center`}
        >
            <FlechaDPaginacion color={isLight ? "#333333CC" : windowWidth < 1024 ? "#FFFFFF" : "#FFFFFFCC"} width={wIcon} height={hIcon}/>
        </button>
      </div>
    </div>
  );
}

export function MobileOrdenModal({ isOpen, onClose, isLight}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { _, setSelected, sortOptions } = useSort();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);
  if (!isOpen && !isAnimating) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="lg:hidden fixed inset-0 z-30 flex items-end">
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ease-out ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      <div className={`relative w-full h-[80vh] overflow-y-auto rounded-t-2xl p-6 ${
        isLight ? "bg-[#385BAA99]" : "bg-[#07004766]"
      } transform transition-all duration-500 ease-out backdrop-blur-[80px] ${
        isAnimating 
          ? 'translate-y-0' 
          : 'translate-y-full'
      }`}>
      
        <div className="flex flex-col items-center justify-center mb-4 gap-8">
          <hr className="w-[95px] border border-[2px] border-[#D9D9D9]"/>
          <div className="text-[16px] text-white font-medium font-['Poppins', sans-serif] flex items-center gap-5">
            ORDENAR POR <OrdenarIcon color="#FFFFFF"/>
          </div>
          <hr className="w-full border border-[1px] border-[#FFFFFF]"/>
        </div>

        <div className="space-y-4 flex flex-col items-center justify-center mb-4 gap-3">
          {sortOptions.map((option) => (
              <CustomOptionMobile
                key={option}
                title={option}
                onClick={() => {
                  setSelected(option);
                  handleClose();
                }}
              >
              </CustomOptionMobile>
            ))}
        </div>
      </div>
    </div>
  );
}

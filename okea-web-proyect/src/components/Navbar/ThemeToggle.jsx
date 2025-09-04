import { SunIcon, MoonIcon } from "../../assets/iconos/Icons";
import { useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);

  return (
    <div className="flex items-center translate-x-[-125px]">
      <button
        onClick={() => setIsLight(!isLight)}
        className={`relative w-[85px] h-[40px] rounded-full transition-colors duration-300 cursor-pointer ${
          isLight ? "bg-[#DAE2FF]" : "bg-[#DAE2FF]"
        }`}
      >
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300 ${
            isLight ? "left-[45px] bg-white" : "left-[4px] bg-[#1C4390]"
          }`}
        >
          {isLight ? (
            <SunIcon className="w-[24px] h-[24px]" />
          ) : (
            <MoonIcon className="w-[24px] h-[24px]" />
          )}
        </div>
      </button>
    </div>
  );
}
import { SunIcon, MoonIcon } from "../../assets/iconos/Icons";
import { useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);

  const toggleTheme = () => {
    setIsLight(!isLight);
    if (!isLight) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  const getThemeStyles = () => {
    return {
      backgroundColor: isLight ? "#DAE2FF" : "rgba(7, 0, 71, 0.4)",
    };
  };

  return (
    <div className="flex items-center translate-x-[-125px]">
      <button
        onClick={toggleTheme}
        style={getThemeStyles()}
        className="relative w-[85px] h-[40px] rounded-full transition-colors duration-300 cursor-pointer"
      >
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300 ${
            isLight ? "left-[45px] bg-white" : "left-[4px] bg-[#251F67]"
          }`}
        >
          {isLight ? (
            <SunIcon color="#1C4390" className="w-[24px] h-[24px]" />
          ) : (
            <MoonIcon color="#ffffffff" className="w-[24px] h-[24px]" />
          )}
        </div>
      </button>
    </div>
  );
}
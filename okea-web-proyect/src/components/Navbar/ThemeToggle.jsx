import { SunIcon, MoonIcon } from "../../assets/iconos/Icons";
import { useTheme } from "../ThemeContext";

// =======================
// 1. COMPONENTE PRINCIPAL ThemeToggle
// =======================
export default function ThemeToggle() {
  // Obtiene el estado del tema y la función para cambiarlo desde el contexto
  const { isLight, toggleTheme } = useTheme();

  // =======================
  // 2. ESTILOS SEGÚN TEMA
  // =======================
  const getThemeStyles = () => {
    return {
      backgroundColor: isLight ? "#B3C7FF66" : "rgba(7, 0, 71, 0.4)",
    };
  };

  // =======================
  // 3. RENDER
  // =======================
  return (
    <div className="flex items-center">
      {/* Botón para alternar el tema */}
      <button
        onClick={toggleTheme}
        style={getThemeStyles()}
        className="relative w-[85px] h-[40px] rounded-full transition-colors duration-300 cursor-pointer"
      >
        {/* Indicador visual del tema actual */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300 ${
            isLight ? "left-[45px] bg-white" : "left-[4px] bg-[#251F67]"
          }`}
        >
          {/* Icono de sol para tema claro, luna para tema oscuro */}
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
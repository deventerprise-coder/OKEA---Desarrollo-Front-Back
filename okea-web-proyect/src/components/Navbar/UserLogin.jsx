import { AvatarNuevo, UserIcon } from "../../assets/iconos/Icons";
import { forwardRef, useState, useEffect } from "react";

// =======================
// 1. COMPONENTE PRINCIPAL UserLogin
// =======================
const UserLogin = forwardRef((props, ref) => {
  // Estado para el tema actual (claro/oscuro)
  const [theme, setTheme] = useState("light");

  // =======================
  // 2. EFECTO: OBSERVAR CAMBIO DE TEMA
  // =======================
  useEffect(() => {
    // Observa cambios en el atributo data-theme del documento
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(document.documentElement.getAttribute("data-theme") || "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Limpia el observer al desmontar
    return () => observer.disconnect();
  }, []);

  // =======================
  // 3. ESTILOS SEGÚN TEMA
  // =======================
  const getThemeStyles = () => {
    return {
      backgroundColor: theme === "dark" ? "rgba(7, 0, 71, 0.4)" : "#B3C7FF66",
      color: theme === "dark" ? "#C6C4E3" : "#1C4390",
    };
  };

  // =======================
  // 4. RENDER
  // =======================
  return (
    <button
      ref={ref}
      {...props}
      style={getThemeStyles()}
      className="relative flex items-center justify-center px-3 py-3 rounded-full hover:brightness-90 transition h-[40px] cursor-pointer"
    >
      {/* Avatar del usuario, siempre visible */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <AvatarNuevo
          className="w-[40px] h-[40px]"
          color={theme === "dark" ? "#251F67" : "#1C4390"}
        />
      </div>
      {/* Texto solo visible en pantallas md o mayores */}
      <span className="pl-[38px] font-poppins font-medium text-[14px] leading-[24px] tracking-[0.2px] hidden md:inline">
        Hola, Inicie Sesión
      </span>
    </button>
  );
});

export default UserLogin;
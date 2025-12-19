// src/components/Navbar/UserLogin.jsx
import { AvatarNuevo } from "../../assets/iconos/Icons";
import { forwardRef, useState, useEffect } from "react";

const UserLogin = forwardRef((props, ref) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations. forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(
            document. documentElement.getAttribute("data-theme") || "light"
          );
        }
      });
    });

    observer.observe(document. documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const getThemeStyles = () => {
    return {
      backgroundColor: 
        theme === "dark" ? "rgba(7, 0, 71, 0.4)" : "#B3C7FF66",
      color: theme === "dark" ? "#C6C4E3" : "#1C4390",
    };
  };

  return (
    <button
      ref={ref}
      {... props}
      style={getThemeStyles()}
      className="relative flex items-center justify-center px-2 sm:px-3 py-2 sm:py-3 rounded-full hover:brightness-90 transition h-[36px] sm:h-[40px] cursor-pointer"
    >
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <AvatarNuevo
          className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]"
          color={theme === "dark" ? "#251F67" : "#1C4390"}
        />
      </div>
      <span className="pl-[30px] sm:pl-[38px] font-poppins font-medium text-[13px] sm:text-[14px] leading-[20px] sm:leading-[24px] tracking-[0.2px] hidden md:inline">
        Hola, Inicie Sesión
      </span>
    </button>
  );
});

export default UserLogin;
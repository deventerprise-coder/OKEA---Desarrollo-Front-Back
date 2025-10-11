import { CartIcon } from "../../assets/iconos/Icons";
import { useState, useEffect } from "react";

export default function CartBadge({ count = 0, ...props }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === "dark" ? "#251F67" : "#1C4390",
    };
  };

  const getBadgeStyles = () => {
    return {
      backgroundColor: theme === "dark" ? "#F5F692" : "#DFE162",
      color: theme === "dark" ? "#323200" : "#484900",
    };
  };

  return (
    <button
      {...props}
      style={getThemeStyles()}
      className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full hover:brightness-95 transition cursor-pointer"
    >
      <CartIcon
        color={theme === "dark" ? "#C6C4E3" : "#ffffff"}
        className="w-[20px] h-[20px]"
      />

      {count > 0 && (
        <span
          style={getBadgeStyles()}
          className="absolute -top-[6px] -right-[6px] min-w-[18px] h-[18px] px-[4px] rounded-full flex items-center justify-center text-[12px] font-bold leading-none"
        >
          {count}
        </span>
      )}
    </button>
  );
}
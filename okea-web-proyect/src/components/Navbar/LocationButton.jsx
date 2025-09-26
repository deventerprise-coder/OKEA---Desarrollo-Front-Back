import { useEffect, useState } from "react";
import { LocationIcon } from "../../assets/iconos/Icons";

export default function LocationButton({ onClick }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#B3C7FF66',
      color: theme === 'dark' ? '#C6C4E3' : '#1C4390'
    };
  };

  return (
    <button
      onClick={onClick}
      style={getThemeStyles()}
      className="ml-[-660px] flex items-center gap-[6px] px-9 py-2 rounded-full hover:brightness-90 transition cursor-pointer"
    >
      <LocationIcon color={theme === 'dark' ? '#C6C4E3' : '#1C4390'} />
      <span className="font-poppins font-medium text-[14px] leading-[20px] tracking-[0.1px] text-center">
        Ubicación
      </span>
    </button>
  );
}
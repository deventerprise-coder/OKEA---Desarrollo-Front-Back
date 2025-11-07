import { FlechaDerecha, Location1 } from '../../assets/iconos/Icons';
import { useState, useEffect } from 'react';

// =======================
// 1. COMPONENTE PRINCIPAL
// =======================
export default function LocationOptionsDropdown({ options, position, onClose }) {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  // =======================
  // 2. EFECTO: OBSERVAR CAMBIO DE TEMA
  // =======================
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // =======================
  // 3. ESTILOS SEGÚN TEMA
  // =======================
  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#2C509E66',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(60px)',
      WebkitBackdropFilter: 'blur(60px)',
    };
  };

  // =======================
  // 4. RENDER
  // =======================
  return (
    <div
      className="absolute z-[1200] rounded-xl shadow-lg max-h-[400px] overflow-y-auto"
      style={{
        ...getThemeStyles(),
        top: position.top,
        left: position.left,
        width: '310px',
        padding: '20px 8px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="flex flex-col gap-y-2.5">
        {options.map((item, i) => (
          <div
            key={i}
            className="group flex items-center justify-between gap-2 px-4 py-2 hover:bg-[#E4E66644] cursor-pointer text-white rounded-full transition-all duration-150"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <Location1 stroke="#FFFFFF" />
              <span className="text-sm font-poppins">{item}</span>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <FlechaDerecha size={25} stroke="#FFFFFF" strokeWidth={0.2}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
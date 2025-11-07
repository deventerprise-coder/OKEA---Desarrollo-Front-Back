import { Flecha1, Lupa1, Location1 } from '../../assets/iconos/Icons';
import { useRef, useState, useEffect } from 'react';

// =======================
// 1. ANIMACIONES CSS PARA APARICIÓN/DESAPARICIÓN
// =======================
const animations = `
  @keyframes locationFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes locationFadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .location-enter {
    animation: locationFadeIn 0.3s ease-out forwards;
  }

  .location-exit {
    animation: locationFadeOut 0.3s ease-out forwards;
  }
`;

// =======================
// 2. COMPONENTE PRINCIPAL
// =======================
export default function LocationDropdown({ onOpenDropdown, activeDropdownIndex, isVisible }) {
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  // =======================
  // 3. EFECTO: OBSERVAR CAMBIO DE TEMA
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
  // 4. ESTILOS SEGÚN TEMA
  // =======================
  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.5)',
      border: '1.5px solid rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };
  };

  const getInputStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.5)',
      color: theme === 'dark' ? '#ffffff' : '#ffffff',
    };
  };

  // =======================
  // 5. CONSTANTES DE ETIQUETAS
  // =======================
  const labels = ['Departamento', 'Provincia', 'Distrito'];

  // =======================
  // 6. MANEJADOR DE BOTÓN DE FLECHA
  // =======================
  const handleToggle = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onOpenDropdown(index, rect);
  };

  // =======================
  // 7. RENDER
  // =======================
  return (
    <div
      ref={dropdownRef}
      className={`shadow-lg flex flex-col relative ${
        isVisible ? 'location-enter' : 'location-exit'
      }`}
      style={{
        ...getThemeStyles(),
        width: '400px',
        height: '272px',
        borderRadius: '32px',
        padding: '16px',
        gap: '20px',
      }}
    >
      <style>{animations}</style>

      <div style={{ marginTop: '12px' }}>
        <div className="flex items-center gap-2" style={{ marginLeft: '14px' }}>
          <Location1 color={theme === 'dark' ? '#ffffff' : '#ffffff'} />
          <h3
            className="font-poppins"
            style={{
              color: theme === 'dark' ? '#ffffff' : '#ffffff',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.1px',
            }}
          >
            Ingresa tu dirección
          </h3>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: '10px' }}>
        {labels.map((label, index) => (
          <div key={index} className="relative">
            <div className="flex">
              <div
                className="flex items-center px-5 transition-colors duration-200 location-input-container"
                style={{
                  ...getInputStyles(),
                  width: '310px',
                  height: '56px',
                  borderRadius: '28px 4px 4px 28px',
                }}
              >
                <div style={{ marginLeft: '4px' }}>
                  <Lupa1 color={theme === 'dark' ? '#ffffff' : '#ffffff'} />
                </div>
                <input
                  type="text"
                  placeholder={label}
                  className="flex-1 bg-transparent focus:outline-none pl-3"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.1px',
                    color: theme === 'dark' ? '#ffffff' : '#ffffff',
                  }}
                />
              </div>
              <button
                onClick={(e) => handleToggle(index, e)}
                className="ml-0.5 flex items-center justify-center transition-colors duration-200 focus:outline-none pt-[15px] pr-[17px] pb-[15px] pl-[13px] location-arrow-btn"
                style={{
                  ...getInputStyles(),
                  width: '56px',
                  height: '56px',
                  borderRadius: '4px 28px 28px 4px',
                }}
              >
                <Flecha1 
                  isOpen={activeDropdownIndex === index}
                  color={theme === 'dark' ? '#ffffff' : '#ffffff'}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .location-input-container:hover {
          background-color: ${theme === 'dark' ? '#070047' : '#5a6ca3'} !important;
        }
        .location-arrow-btn:hover {
          background-color: ${theme === 'dark' ? '#070047' : '#5a6ca3'} !important;
        }
        input::placeholder {
          color: ${theme === 'dark' ? '#ffffff' : '#ffffff'};
        }
      `}</style>
    </div>
  );
}
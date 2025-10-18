import React, { useState, useEffect } from 'react';

export default function FooterPequeno() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

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
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const getContainerStyles = () => {
    return {
      borderRadius: 32,
      gap: 16,
      background: theme === 'dark' ? '#07004766' : '#B3C7FF66',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'background 0.3s ease',
    };
  };

  const getTextColor = () => {
    return theme === 'dark' ? '#E5E2E1' : '#2C509E';
  };

  const getInputStyles = () => {
    return {
      height: 40,
      fontFamily: 'Poppins, sans-serif',
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.1px',
      backgroundColor: theme === 'dark' ? '#292272' : 'rgba(255, 255, 255, 0.8)',
      color: theme === 'dark' ? '#E5E2E1' : '#2C509E',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    };
  };

  const getPlaceholderStyles = () => {
    if (theme === 'dark') {
      return `
        .email-input-dark::placeholder { color: #B8B5B3 !important; opacity: 1; }
        .email-input-dark::-webkit-input-placeholder { color: #B8B5B3 !important; }
        .email-input-dark::-moz-placeholder { color: #B8B5B3 !important; opacity: 1; }
        .email-input-dark:-ms-input-placeholder { color: #B8B5B3 !important; }
      `;
    } else {
      return `
        .email-input-light::placeholder { color: #6B7280 !important; opacity: 1; }
        .email-input-light::-webkit-input-placeholder { color: #6B7280 !important; }
        .email-input-light::-moz-placeholder { color: #6B7280 !important; opacity: 1; }
        .email-input-light:-ms-input-placeholder { color: #6B7280 !important; }
      `;
    }
  };

  const getButtonStyles = () => {
    return {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      fontStyle: 'normal',
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.1px',
      textAlign: 'center',
      verticalAlign: 'middle',
      width: 120,
      height: 40,
      borderRadius: 9999,
      backgroundColor: theme === 'dark' ? '#F5F692' : '#DFE162',
      color: theme === 'dark' ? '#323200' : '#484900',
      transition: 'all 0.3s ease',
      paddingLeft: 20,
      paddingRight: 20,
    };
  };

  const getButtonHoverStyle = () => {
    return theme === 'dark' ? '#3B3096' : '#e4e666';
  };

  return (
    <>
      <style>
        {getPlaceholderStyles()}
        {/* Aplicamos padding-right solo en el breakpoint donde el botón está superpuesto (xl) */}
        {`
            @media (min-width: 1280px) { /* El breakpoint 'xl' en Tailwind es 1280px */
                .email-input-dark, .email-input-light {
                    padding-right: 130px !important; 
                }
            }
        `}
      </style>
      <div
        // Se mantiene lg:flex-row para la disposición en fila en laptops/desktops
        className="rounded-[32px] flex flex-col items-center justify-between mb-[-98px] z-10 relative w-full max-w-[1332px] mx-auto p-6 lg:p-16 gap-4 lg:flex-row"
        style={getContainerStyles()}
      >
        <span
          // CAMBIO CLAVE: lg:w-1/2 para que el texto ocupe la mitad del espacio horizontal en laptops
          className="text-center lg:text-left text-lg md:text-xl flex-shrink-0 w-full lg:w-1/2"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: 22,
            lineHeight: '28px',
            letterSpacing: 0,
            color: getTextColor(),
            transition: 'color 0.3s ease',
          }}
        >
          Recibe novedades, ofertas exclusivas y contenido
          <br className="hidden lg:block"/>
          útil directamente en tu correo.
        </span>

        {/* Contenedor del Input y Botón */}
        {/* CAMBIO CLAVE: lg:w-1/2 para que el input ocupe la otra mitad en laptops. */}
        {/* xl:w-[615px] para el ancho fijo en desktop grande (zoom 100%). */}
        <div className="relative w-full lg:w-1/2 xl:w-[615px] flex-shrink-0">
          <input
            type="email"
            required
            name="email"
            placeholder="Escribe tu correo electrónico"
            // w-full asegura que el input llene el 100% del espacio de su contenedor padre
            className={`px-5 py-2 font-poppins text-base outline-none border-none w-full rounded-full ${
              theme === 'dark' ? 'email-input-dark' : 'email-input-light'
            }`}
            style={getInputStyles()}
          />
          <button
            type="submit"
            // CAMBIO CLAVE: Se hace 'absolute' en todas las pantallas (sin mt-4 ni relative)
            // Se usa 'inset-y-0' para alinear verticalmente en el centro del input.
            className="absolute inset-y-0 right-0 z-10 cursor-pointer transition-colors duration-200"
            style={getButtonStyles()}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = getButtonHoverStyle();
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme === 'dark' ? '#F5F692' : '#DFE162';
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
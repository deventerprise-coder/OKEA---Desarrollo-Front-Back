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
      minWidth: 0,
      width: 1332,
      height: 200,
      borderRadius: 32,
      gap: 16,
      padding: 64,
      marginTop: 50, 
      background: theme === 'dark' ? '#07004766' : '#B3C7FF66',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'background 0.3s ease'
    };
  };

  const getTextColor = () => {
    return theme === 'dark' ? '#E5E2E1' : '#2C509E';
  };

  const getInputStyles = () => {
    return {
      height: 44,
      borderRadius: 9999,
      fontFamily: 'Poppins, sans-serif',
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.1px',
      backgroundColor: theme === 'dark' ? '#292272' : 'rgba(255, 255, 255, 0.8)',
      color: theme === 'dark' ? '#E5E2E1' : '#2C509E',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    };
  };

  const getPlaceholderStyles = () => {
    if (theme === 'dark') {
      return `
        .email-input-dark::placeholder {
          color: #B8B5B3 !important;
          opacity: 1;
        }
        .email-input-dark::-webkit-input-placeholder {
          color: #B8B5B3 !important;
        }
        .email-input-dark::-moz-placeholder {
          color: #B8B5B3 !important;
          opacity: 1;
        }
        .email-input-dark:-ms-input-placeholder {
          color: #B8B5B3 !important;
        }
      `;
    } else {
      return `
        .email-input-light::placeholder {
          color: #6B7280 !important;
          opacity: 1;
        }
        .email-input-light::-webkit-input-placeholder {
          color: #6B7280 !important;
        }
        .email-input-light::-moz-placeholder {
          color: #6B7280 !important;
          opacity: 1;
        }
        .email-input-light:-ms-input-placeholder {
          color: #6B7280 !important;
        }
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
      borderRadius: 9999,
      backgroundColor: theme === 'dark' ? '#F5F692' : '#DFE162',
      color: theme === 'dark' ? '#323200' : '#484900',
      transition: 'all 0.3s ease'
    };
  };

  const getButtonHoverStyle = () => {
    return theme === 'dark' ? '#3B3096' : '#e4e666';
  };

  return (
    <>
      <style>
        {getPlaceholderStyles()}
      </style>
      <div
        className="rounded-[32px] flex flex-col md:flex-row items-center justify-between mb-[-98px] z-10 relative"
        style={getContainerStyles()}
      >
        <span
          className="mb-2 md:mb-0"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 22,
            lineHeight: '28px',
            letterSpacing: 0,
            color: getTextColor(),
            transition: 'color 0.3s ease'
          }}
        >
          Recibe novedades, ofertas exclusivas y contenido útil directamente en tu correo.
        </span>

        <div className="relative w-[900px]">
          <input
            type="email"
            required
            name="email"
            placeholder="Escribe tu correo electrónico"
            className={`px-5 py-2 font-poppins text-base outline-none border-none w-full ${
              theme === 'dark' ? 'email-input-dark' : 'email-input-light'
            }`}
            style={getInputStyles()}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 w-[120px] h-[44px] cursor-pointer transition-colors duration-200"
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
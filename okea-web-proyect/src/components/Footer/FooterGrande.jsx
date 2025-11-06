import React, { useState, useEffect } from 'react';
import LibroReclamaciones from '../../assets/iconos/LibroReclamaciones.svg';
import VISAIcon from '../../assets/iconos/VISAIcono.svg';
import MCIcon from '../../assets/iconos/MCIcon.svg';
import AMEXIcon from '../../assets/iconos/AMEXIcon.svg';
import PyPIcon from '../../assets/iconos/PyPIcon.svg';
import WUIcon from '../../assets/iconos/WUIcon.svg';
import Facebook from '../../assets/iconos/Facebook.svg';
import Instagram from '../../assets/iconos/Instagram.svg';
import YouTube from '../../assets/iconos/YouTube.svg';
import LinkedIn from '../../assets/iconos/LinkedIn.svg';
import TikTok from '../../assets/iconos/TikTok.svg';

export default function FooterGrande() {
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
      // Figma: height: 500 (lo manejamos con padding y contenido flexible)
      borderRadius: 32,
      backgroundColor: theme === 'dark' ? '#1F1A57' : '#1C4390',
      transition: 'background-color 0.3s ease',
    };
  };

  const getTitleColor = () => {
    return theme === 'dark' ? '#E5E2E1' : '#FFFFFF';
  };

  const getTextColor = () => {
    return theme === 'dark' ? '#C3C7CB' : '#DAE2FF';
  };

  const getPaymentContainerStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
      borderRadius: 9999,
      width: 'fit-content',
      transition: 'background-color 0.3s ease',
    };
  };

  const getBorderColor = () => {
    return theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)';
  };

  const enlacesUtiles = [
    'Términos y Condiciones',
    'Política de Privacidad',
    'Política de Devoluciones',
    'Seguimiento de Pedidos',
  ];

  const informacionCorporativa = [
    'Nombre de la Empresa: OKEA',
    'RUC: 1234567890',
    'Dirección: Av. Principal 123, Ciudad, País',
  ];

  const contacto = [
    'Teléfono: +123 456 7890',
    'Correo: contacto@tuempresa.com',
    'Horario: Lunes a Viernes de 9:00 a.m. a 6:00 p.m.',
  ];

  return (
    // w-full para responsive. max-w-[1600px] para respetar el ancho de Figma.
    // p-8 por defecto (móvil). lg:px-16 (64px) y lg:pt-[100px] para respetar Figma en desktop.
    <div
      // Nota: `pt-[100px]` usa el soporte de clases arbitrarias de Tailwind para aplicar un valor exacto.
      className="flex flex-col relative z-0 w-full max-w-[1600px] mx-auto p-8 sm:p-10 md:px-16 lg:px-20 lg:pt-[100px] lg:pb-16"
      style={getContainerStyles()}
    >
      <div
        // flex-col por defecto (móvil), lg:flex-row (desktop)
        // gap-y-10 (espacio vertical en móvil), lg:gap-x-20 (espacio horizontal en desktop - 20 * 4 = 80px)
        className="flex flex-col lg:flex-row justify-between items-start w-full gap-y-10 lg:gap-x-20"
      >
        {/* Enlaces útiles */}
        <div className="flex flex-col min-w-full lg:min-w-[180px]" style={{ gap: 21 }}>
          <span
            className="mb-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 22,
              lineHeight: '28px',
              color: getTitleColor(),
              transition: 'color 0.3s ease',
            }}
          >
            Enlaces útiles
          </span>
          {enlacesUtiles.map((text, i) => (
            <a
              key={i}
              href="#"
              className="hover:underline"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: getTextColor(),
                transition: 'color 0.3s ease',
              }}
            >
              {text}
            </a>
          ))}
          <a href="#" className="mt-3">
            <img src={LibroReclamaciones} alt="Libro de Reclamaciones" className="h-8" />
          </a>
        </div>

        {/* Información Corporativa */}
        <div className="flex flex-col min-w-full lg:min-w-[220px]" style={{ gap: 21 }}>
          <span
            className="mb-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 22,
              lineHeight: '28px',
              color: getTitleColor(),
              transition: 'color 0.3s ease',
            }}
          >
            Información Corporativa
          </span>
          {informacionCorporativa.map((text, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: getTextColor(),
                transition: 'color 0.3s ease',
              }}
            >
              {text}
            </span>
          ))}
          <span
            className="mt-4"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 22,
              lineHeight: '28px',
              color: getTitleColor(),
              transition: 'color 0.3s ease',
            }}
          >
            Medios de pago
          </span>
          <div
            className="flex flex-wrap items-center gap-4 px-6 py-2" // flex-wrap para responsive
            style={getPaymentContainerStyles()}
          >
            <img src={VISAIcon} alt="Visa" className="h-7" />
            <img src={MCIcon} alt="Mastercard" className="h-7" />
            <img src={AMEXIcon} alt="Amex" className="h-7" />
            <img src={PyPIcon} alt="PyP" className="h-7" />
            <img src={WUIcon} alt="WU" className="h-7" />
          </div>
        </div>

        {/* Contáctanos */}
        <div className="flex flex-col min-w-full lg:min-w-[220px]" style={{ gap: 21 }}>
          <span
            className="mb-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 22,
              lineHeight: '28px',
              color: getTitleColor(),
              transition: 'color 0.3s ease',
            }}
          >
            Contáctanos
          </span>
          {contacto.map((text, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: getTextColor(),
                transition: 'color 0.3s ease',
              }}
            >
              {text}
            </span>
          ))}
          <span
            className="mt-4"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 22,
              lineHeight: '28px',
              color: getTitleColor(),
              transition: 'color 0.3s ease',
            }}
          >
            Conéctate con OKEA
          </span>
          <div className="flex gap-3 mt-1">
            <a href="#"><img src={Facebook} alt="Facebook" className="h-7" /></a>
            <a href="#"><img src={Instagram} alt="Instagram" className="h-7" /></a>
            <a href="#"><img src={YouTube} alt="YouTube" className="h-7" /></a>
            <a href="#"><img src={LinkedIn} alt="LinkedIn" className="h-7" /></a>
            <a href="#"><img src={TikTok} alt="TikTok" className="h-7" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="w-full text-center font-poppins text-sm py-4 mt-8"
        style={{
          background: 'transparent',
          color: getTextColor(),
          borderTop: `1px solid ${getBorderColor()}`,
          transition: 'color 0.3s ease, border-color 0.3s ease',
        }}
      >
        Copyright © 2025 – OKEA – Todos los derechos reservados.
      </div>
    </div>
  );
}
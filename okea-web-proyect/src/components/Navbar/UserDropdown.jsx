import { useState, useEffect } from 'react';
import {
  MiCuentaIcon,
  MisComprasIcon,
  PromocionesIcon,
  FavoritosIcon,
  CerrarSesionIcon,
  FlechaDerecha,
} from '../../assets/iconos/Icons';

// =======================
// 1. ANIMACIONES CSS PARA APARICIÓN/DESAPARICIÓN
// =======================
const animations = `
  @keyframes userFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes userFadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .user-enter {
    animation: userFadeIn 0.3s ease-out forwards;
  }

  .user-exit {
    animation: userFadeOut 0.3s ease-out forwards;
  }
`;

// =======================
// 2. COMPONENTE PRINCIPAL UserDropdown
// =======================
export default function UserDropdown({ onLogout, onSelect, style, isVisible }) {
  // Estado para el tema actual (claro/oscuro)
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  // =======================
  // 3. EFECTO: OBSERVAR CAMBIO DE TEMA
  // =======================
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');

    // Observa cambios en el atributo data-theme del documento
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

    // Limpia el observer al desmontar
    return () => observer.disconnect();
  }, []);

  // =======================
  // 4. ESTILOS SEGÚN TEMA
  // =======================
  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.5)',
    };
  };

  const getLogoutButtonStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#2C509E66',
    };
  };

  // =======================
  // 5. DATOS DE BOTONES
  // =======================
  const buttons = [
    { label: 'Mi cuenta', key: 'cuenta' },
    { label: 'Mis Compras', key: 'compras' },
    { label: 'Promociones', key: 'promociones' },
    { label: 'Favoritos', key: 'favoritos' },
  ];

  const icons = [MiCuentaIcon, MisComprasIcon, PromocionesIcon, FavoritosIcon];

  // =======================
  // 6. RENDER
  // =======================
  return (
    <div
      className={`shadow-lg border flex flex-col backdrop-blur-xl ${
        isVisible ? 'user-enter' : 'user-exit'
      }`}
      style={{
        width: 258,
        height: 296,
        borderRadius: 32,
        border: '1px solid rgba(44, 80, 158, 0.15)',
        gap: 32,
        padding: 16,
        ...getThemeStyles(),
        ...style,
      }}
    >
      {/* Animaciones CSS */}
      <style>{animations}</style>

      {/* Botones de opciones de usuario */}
      <div className="flex flex-col gap-2 flex-1">
        {buttons.map((btn, idx) => {
          const Icon = icons[idx] || null;
          return (
            <button
              key={btn.key}
              className="group text-white font-poppins font-medium text-[16px] leading-6 tracking-[0.15px] px-4 rounded-full transition flex items-center justify-between"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0.15px',
                height: 40,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E4E66666';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => onSelect && onSelect(btn.key)}
            >
              {/* Icono y texto de la opción */}
              <div className="flex items-center gap-3">
                {Icon && (
                  <span className="flex items-center justify-center w-5 h-5">
                    <Icon />
                  </span>
                )}
                <span className="flex items-center">{btn.label}</span>
              </div>

              {/* Flecha derecha visible solo en hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <FlechaDerecha stroke="#FFFFFF" size={25} strokeWidth={0.2} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Botón de cerrar sesión */}
      <button
        className="text-white hover:bg-[#16336e] transition flex items-center justify-center gap-3 rounded-full"
        style={{
          ...getLogoutButtonStyles(),
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.1px',
          textAlign: 'center',
          verticalAlign: 'middle',
          width: 226,
          height: 40,
          paddingRight: 16,
          paddingLeft: 16,
          opacity: 1,
          alignSelf: 'center',
          marginTop: 8,
        }}
        onClick={onLogout}
      >
        <span className="flex items-center justify-center w-5 h-5">
          <CerrarSesionIcon />
        </span>
        <span className="flex items-center">Cerrar Sesión</span>
      </button>
    </div>
  );
}
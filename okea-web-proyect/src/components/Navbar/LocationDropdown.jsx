import { Flecha1 } from '../../assets/iconos/Icons';
import { Lupa1 } from '../../assets/iconos/Icons';
import { Location1 } from '../../assets/iconos/Icons';

import { useRef} from 'react';

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

export default function LocationDropdown({ onOpenDropdown, activeDropdownIndex, isVisible }) {
  const dropdownRef = useRef(null);

  const labels = ['Departamento', 'Provincia', 'Distrito'];

  const handleToggle = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onOpenDropdown(index, rect);
  };

  return (
    <div
      ref={dropdownRef}
      className={`shadow-lg border flex flex-col relative ${
        isVisible ? 'location-enter' : 'location-exit'
      }`}
      style={{
        backgroundColor: 'rgba(44, 80, 158, 0.5)',
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)',
        width: '400px',
        height: '272px',
        top: '17px',
        right: '550px',
        borderRadius: '32px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        padding: '16px',
        gap: '20px',
      }}
    >
      <style>{animations}</style>

      <div style={{ marginTop: '12px' }}>
        <div className="flex items-center gap-2" style={{ marginLeft: '14px' }}>
          <Location1 />
          <h3
            className="text-white font-poppins"
            style={{
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

      {/* Campos de localidad*/}
      <div className="flex flex-col" style={{ gap: '10px' }}>
        {labels.map((label, index) => (
          <div key={index} className="relative">
            <div className="flex">
              {/* Input para cada campo (en proceso la logica de rastreo)*/}
              <div
                className="flex items-center px-5 transition-colors duration-200 location-input-container"
                style={{
                  backgroundColor: 'rgba(44, 80, 158, 0.5)',
                  width: '310px',
                  height: '56px',
                  borderRadius: '28px 4px 4px 28px',
                }}
              >
                <div style={{ marginLeft: '4px' }}>
                  <Lupa1 />
                </div>
                <input
                  type="text"
                  placeholder={label}
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-white pl-3"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.1px',
                  }}
                />
              </div>

              {/* Botón flecha */}
              <button
                onClick={(e) => handleToggle(index, e)}
                className="ml-0.5 flex items-center justify-center text-white transition-colors duration-200 focus:outline-none pt-[15px] pr-[17px] pb-[15px] pl-[13px] location-arrow-btn"
                style={{
                  backgroundColor: 'rgba(44, 80, 158, 0.5)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '4px 28px 28px 4px',
                }}
              >
                <Flecha1 isOpen={activeDropdownIndex === index} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .location-input-container:hover {
          background-color: #5a6ca3 !important;
        }
        .location-arrow-btn:hover {
          background-color: #5a6ca3 !important;
        }
      `}</style>
    </div>
  );
}
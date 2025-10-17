import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudifonosJBL from '../../assets/imagenes/AudifonosJBL.png';
import AguaCieloGas from '../../assets/imagenes/AguaCieloGas.png';
import MuebleCenizasBlanco from '../../assets/imagenes/MuebleCenizasBlanco.png';

function StarIcon({ color = '#DFE162' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
  );
}

// Ejemplo de productos, esto luego se enviará al backend
const exampleProducts = [
  {
    id: 1,
    name: 'Audífonos JBL',
    price: 80.0,
    rating: 4.9,
    image: AudifonosJBL,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Agua Cielo',
    price: 4.0,
    rating: 4.9,
    image: AguaCieloGas,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Mueble Cenizas',
    price: 140.0,
    rating: 4.9,
    image: MuebleCenizasBlanco,
    quantity: 1,
  },
];

const animations = `
  @keyframes cartFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes cartFadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .cart-enter {
    animation: cartFadeIn 0.3s ease-out forwards;
  }

  .cart-exit {
    animation: cartFadeOut 0.3s ease-out forwards;
  }
`;

export default function CartBadgeDropdown({ products = exampleProducts, subtotal = 240, isVisible }) {
  const [cartItems, setCartItems] = useState(products);
  const [theme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const getThemeStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.5)',
    };
  };

  const getContainerStyles = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : 'rgba(44, 80, 158, 0.1)',
    };
  };

  return (
    <div
      ref={dropdownRef}
      className={`shadow-lg border flex flex-col relative ${
        isVisible ? 'cart-enter' : 'cart-exit'
      }`}
      style={{
        ...getThemeStyles(),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        width: '352px', // Ancho fijo para cálculos precisos
        height: 'auto',
        maxHeight: '80vh',
        borderRadius: '32px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        padding: '16px',
        gap: '20px',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      <style>{animations}</style>
      
      {/* Subtotal y boton del carrito */}
      <div
        className="flex items-center justify-between rounded-2xl px-4 py-3 mb-2 backdrop-blur-md"
        style={{
          ...getContainerStyles(),
          borderRadius: '20px',
          minHeight: 60,
        }}
      >
        <div className="flex flex-col">
          <span className="text-white font-poppins text-[15px] font-light">Subtotal</span>
          <span 
            className="font-poppins text-[22px] font-light leading-6"
            style={{ color: theme === 'dark' ? 'rgba(245, 246, 146, 1)' : '#DFE162' }}
          >
            s/ {subtotal.toFixed(2)}
          </span>
        </div>
        <button
          className="ml-2 px-4 sm:px-6 py-2 rounded-full font-poppins text-[14px] sm:text-[15px] font-medium transition hover:brightness-95"
          style={{ 
            minWidth: 100,
            backgroundColor: theme === 'dark' ? 'rgba(245, 246, 146, 1)' : '#DFE162',
            color: theme === 'dark' ? 'rgba(50, 50, 0, 1)' : '#484900'
          }}
          onClick={() => navigate('/carrito')}
        >
          Ir al carrito
        </button>
      </div>

      {/* Informacion de cada producto */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1" style={{ maxHeight: 420 }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center justify-between rounded-2xl px-3 sm:px-4 py-3 backdrop-blur-md"
            style={{
              ...getContainerStyles(),
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              minHeight: 110,
              borderRadius: 20,
            }}
          >
            {/* Info izquierda */}
            <div className="flex flex-col flex-1 min-w-0 pr-2" style={{ maxWidth: 160 }}>
              <span className="text-white font-poppins text-[14px] sm:text-[15px] font-light truncate" title={item.name}>{item.name}</span>
              <span className="text-[#FFFFFF] font-poppins text-[16px] sm:text-[17px] font-light leading-6">s/ {(item.price * item.quantity).toFixed(2)}</span>
              <div className="flex items-center gap-1 mt-1">
                <StarIcon />
                <span className="text-[#FFFFFF] text-[13px] sm:text-[14px] font-light ml-1">{item.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
                <button
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-white text-sm sm:text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(6px)',
                  }}
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  –
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-7 h-6 sm:w-8 sm:h-7 text-center rounded text-[#FFFFFF] font-light font-poppins text-[14px] sm:text-[15px] mx-1 outline-none border border-white bg-transparent"
                  style={{ minWidth: 28 }}
                />
                <button
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-white text-sm sm:text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(6px)',
                  }}
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Info derecha (imagen)*/}
            <div className="flex-shrink-0 flex items-center justify-center ml-2 sm:ml-4" style={{ height: 80, width: 80, background: '#fff', borderRadius: 16 }}>
              <img
                src={item.image}
                alt={item.name}
                className="object-contain"
                style={{ maxHeight: 70, maxWidth: 70, borderRadius: 12 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
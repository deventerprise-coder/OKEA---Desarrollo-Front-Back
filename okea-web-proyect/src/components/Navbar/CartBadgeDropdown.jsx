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

  return (
    <div
      ref={dropdownRef}
      className={`shadow-lg border flex flex-col relative ${
        isVisible ? 'cart-enter' : 'cart-exit'
      }`}
      style={{
        backgroundColor: 'rgba(44, 80, 158, 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        width: '352px',
        height: '558px',
        borderRadius: '32px',
        border: '1.5px solid rgba(255,255,255,0.15)',
        padding: '16px',
        gap: '20px',
        top: '17px',
        right: '0px',
        overflowY: 'auto',
      }}
    >
      <style>{animations}</style>
      {/* Subtotal y boton del carrito */}
      <div
        className="flex items-center justify-between rounded-2xl px-4 py-3 mb-2 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(44, 80, 158, 0.1)',
          borderRadius: '20px',
          minHeight: 60,
        }}
      >
        <div className="flex flex-col">
          <span className="text-white font-poppins text-[15px] font-light">Subtotal</span>
          <span className="text-[#DFE162] font-poppins text-[22px] font-light leading-6">s/ {subtotal.toFixed(2)}</span>
        </div>
        <button
          className="ml-2 px-6 py-2 rounded-full font-poppins text-[15px] font-medium bg-[#DFE162] text-[#484900] hover:bg-[#e4e666] transition"
          style={{ minWidth: 120 }}
          onClick={() => navigate('/carrito')}
        >
          Ir al carrito
        </button>
      </div>

      {/* Informacion de cada producto*/}
      <div className="flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: 420 }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(59, 91, 170, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              minHeight: 110,
              borderRadius: 20,
            }}
          >
            {/* Info izquierda */}
            <div className="flex flex-col flex-1 min-w-0" style={{ maxWidth: 160 }}>
              <span className="text-white font-poppins text-[15px] font-light truncate" title={item.name}>{item.name}</span>
              <span className="text-[#FFFFFF] font-poppins text-[17px] font-light leading-6">s/ {(item.price * item.quantity).toFixed(2)}</span>
              <div className="flex items-center gap-1 mt-1">
                <StarIcon />
                <span className="text-[#FFFFFF] text-[14px] font-light ml-1">{item.rating}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full text-white text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent"
                  style={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(6px)',
                    fontSize: 18,
                  }}
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  –
                </button>
                <input
                type="text"
                value={item.quantity}
                readOnly
                className="w-8 h-7 text-center rounded text-[#FFFFFF] font-light font-poppins text-[15px] mx-1 outline-none border border-white bg-transparent"
                style={{ minWidth: 32 }}
                />
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full text-white text-lg font-light hover:bg-[#1C4390] outline-none border border-white bg-transparent"
                  style={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(6px)',
                    fontSize: 18,
                  }}
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Info derecha (imagen)*/}
            <div className="flex-shrink-0 flex items-center justify-center ml-4" style={{ height: 90, width: 90, background: '#fff', borderRadius: 16 }}>
              <img
                src={item.image}
                alt={item.name}
                className="object-contain"
                style={{ maxHeight: 80, maxWidth: 80, borderRadius: 12 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
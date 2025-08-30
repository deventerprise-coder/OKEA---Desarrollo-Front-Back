import React from 'react';

export default function FooterPequeno() {
  return (
    <div
      className="rounded-[32px] flex flex-col md:flex-row items-center justify-between mb-[-98px] z-10 relative"
      style={{
        minWidth: 0,
        width: 1332,
        height: 200,
        borderRadius: 32,
        gap: 16,
        padding: 64,
        background: '#B3C7FF66',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <span
        className="text-[#2C509E] mb-2 md:mb-0"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: 22,
          lineHeight: '28px',
          letterSpacing: 0,
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
          className="px-5 py-2 text-[#2C509E] font-poppins text-base outline-none border-none bg-white/80 w-full"
          style={{
            height: 44,
            borderRadius: 9999,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '0.1px',
          }}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 w-[120px] h-[44px] bg-[#DFE162] text-[#484900] hover:bg-[#e4e666] transition-colors duration-200 cursor-pointer"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '0.1px',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderRadius: 9999,
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
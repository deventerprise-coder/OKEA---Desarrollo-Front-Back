import React, { useState, useEffect } from 'react';
import { WhatSappIcon, ChatBotIcon, MensajeIcon } from '../assets/iconos/Icons';

const icons = [
  {
    icon: <WhatSappIcon width={36} height={36} />, 
    bg: '#25D366', 
    shadow: '0 4px 16px 0 rgba(37, 211, 102, 0.3)'
  },
  {
    icon: <ChatBotIcon width={36} height={36} />, 
    bg: '#087DEB', 
    shadow: '0 4px 16px 0 rgba(0, 120, 255, 0.3)'
  },
  {
    icon: <MensajeIcon width={36} height={36} />, 
    bg: '#2C509E',
    shadow: '0 4px 16px 0 rgba(255, 179, 0, 0.3)'
  }
];

export default function FloatingActionButton() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Dropdown que se activa despues de presionar el boton */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 110,
            right: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 12,
            zIndex: 101,
          }}
        >
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#2C509E66',
              color: '#fff',
              borderRadius: 24,
              padding: '8px 20px 8px 16px',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
              minWidth: 180,
              transition: 'background 0.2s',
            }}
          >
            <ChatBotIcon width={20} height={20} style={{ marginRight: 10 }} />
            Chatea con nosotros
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#2C509E66',
              color: '#fff',
              borderRadius: 24,
              padding: '8px 20px 8px 16px',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
              minWidth: 180,
              transition: 'background 0.2s',
            }}
          >
            <WhatSappIcon width={20} height={20} style={{ marginRight: 10 }} />
            Escríbanos al WhatsApp
          </a>
        </div>
      )}
      {/* Boton flotante, el que tiene whatsapp, chatbot, etc */}
      <button
        aria-label="Floating Action Button"
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: open ? '#23488B' : icons[index].bg,
          boxShadow: open ? '0 4px 16px 0 rgba(35, 72, 139, 0.3)' : icons[index].shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          zIndex: 102,
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        {open ? (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="none" />
            <path d="M9 9L19 19M19 9L9 19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          icons[index].icon
        )}
      </button>
    </>
  );
}

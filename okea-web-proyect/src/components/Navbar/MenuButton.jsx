// MenuButton.jsx
import React from 'react';

function MenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <svg
        className="h-6 w-6"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          // Icono de 'X' para cerrar
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          // Icono de hamburguesa
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}

export default MenuButton;
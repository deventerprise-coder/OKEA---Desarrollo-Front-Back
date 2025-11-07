// SearchBarMobile.jsx
import React, { useState, useRef, useEffect } from 'react';

function SearchBarMobile({
    onSearchSubmit,
    isOpen, 
    onToggleOpen, 
    showInput = false,
    inputWidth,
    size = 'h-10 w-10',
    iconColor = '#1C4390',
}) {
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);

    const buttonClasses = `${size} rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer transition-all duration-300 flex items-center justify-center`;
    
    const buttonHeightMatch = size.match(/w-(\d+|\[[^\]]+\])/);

    const paddingRightValue = buttonHeightMatch 
        ? `${parseInt(buttonHeightMatch[1] || '40') + 8}px` 
        : '48px'; 
    const paddingRightClass = `pr-[${paddingRightValue}]`;


    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleIconClick = () => {
        if (onToggleOpen) {
            onToggleOpen(!isOpen);
        }
        if (isOpen) {
             setSearchText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.trim() !== '') {
            if (onSearchSubmit) {
                onSearchSubmit(searchText);
            }
        }
    };

    return (
        <div
            className={`relative flex items-center h-10 transition-all duration-300`}
            style={{
                width: isOpen && showInput && inputWidth ? `${inputWidth}px` : '40px'
            }}
        >
            <input
                ref={inputRef}
                type="search"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`
                    absolute left-0 top-0 w-full h-10
                    pl-4 ${paddingRightClass} 
                    bg-white rounded-full border-none focus:outline-none dark:text-gray-900
                    
                    // ❗ CLASES DE ANIMACIÓN PARA ENCOGIMIENTO HORIZONTAL HACIA LA DERECHA:
                    transform-gpu transition-all duration-500 ease-in-out origin-right 
                    
                    ${isOpen && showInput 
                        ? 'opacity-100 scale-x-100' 
                        
                        : 'opacity-0 scale-x-0' 
                    }
                `}
                style={{
                    zIndex: 1,
                    width: '100%',
                }}
            />
            {/* Botón */}
            <button
                onClick={handleIconClick}
                className={`
                    // Botón pegado a la derecha
                    absolute right-0 top-1/2 -translate-y-1/2
                    ${buttonClasses}
                    bg-white focus:ring-0 focus:ring-transparent focus:outline-none
                `}
                aria-label={isOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'}
                style={{ zIndex: 2 }}
            >
                <svg
                    className={size}
                    fill="none"
                    viewBox="0 0 40 40"
                >
                    <g clipPath="url(#clip0_10044_15178)">
                        <rect width="40" height="40" rx="20" fill="#FFFFFF" /> 
                        
                        <path
                            d="M18.25 11C14.2548 11 11 14.2548 11 18.25C11 22.2452 14.2548 25.5 18.25 25.5C19.9782 25.5 21.5669 24.8895 22.8145 23.875L27.7197 28.7803C27.7888 28.8523 27.8716 28.9097 27.9632 28.9493C28.0548 28.9889 28.1534 29.0098 28.2532 29.0108C28.3529 29.0118 28.4519 28.9929 28.5443 28.9552C28.6367 28.9175 28.7206 28.8617 28.7912 28.7912C28.8617 28.7206 28.9175 28.6367 28.9552 28.5443C28.9929 28.4519 29.0118 28.3529 29.0108 28.2532C29.0098 28.1534 28.9889 28.0548 28.9493 27.9632C28.9097 27.8716 28.8523 27.7888 28.7803 27.7197L23.875 22.8145C24.8895 21.5669 25.5 19.9782 25.5 18.25C25.5 14.2548 22.2452 11 18.25 11ZM18.25 12.5C21.4345 12.5 24 15.0655 24 18.25C24 19.8013 23.3881 21.2029 22.3955 22.2354C22.3343 22.2803 22.2803 22.3343 22.2354 22.3955C21.2029 23.3881 19.8013 24 18.25 24C15.0655 24 12.5 21.4345 12.5 18.25C12.5 15.0655 15.0655 12.5 18.25 12.5Z"
                            fill={iconColor}
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_10044_15178">
                            <rect width="40" height="40" rx="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
}

export default SearchBarMobile;
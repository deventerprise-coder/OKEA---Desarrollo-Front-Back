import okeaLogo from '../../assets/iconos/okea_logo.svg';
import okeaLogoDark from '../../assets/iconos/okea_logo_categorias.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// =======================
// 1. ESTADO Y NAVEGACIÓN
// =======================

export default function Logo() {
    // Hook para navegación
    const navigate = useNavigate();

    // Estado para el tema actual (claro/oscuro)
    const [theme, setTheme] = useState(() => {
        return document.documentElement.getAttribute('data-theme') || 'light';
    });

    // =======================
    // 2. EFECTO: OBSERVAR CAMBIO DE TEMA
    // =======================

    useEffect(() => {
        setTheme(document.documentElement.getAttribute('data-theme') || 'light');
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

    // =======================
    // 3. RENDER
    // =======================

    return (
        <button
            className="focus:outline-none" 
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label="Ir al inicio"
        >

            <img 
                src={theme === 'dark' ? okeaLogoDark : okeaLogo} 
                alt="Okea Logo" 
                className="h-8 w-20 sm:h-10 sm:w-28 md:h-[40px] md:w-[105px] object-contain"
            />
        </button>
    );
}
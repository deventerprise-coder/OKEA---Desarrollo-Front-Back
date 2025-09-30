import okeaLogo from '../../assets/iconos/okea_logo.svg';
import okeaLogoDark from '../../assets/iconos/okea_logo_categorias.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Logo() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

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

  return (
    <button
      className="ml-[130px] focus:outline-none"
      onClick={() => navigate('/')}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      aria-label="Ir al inicio"
    >
      <img 
        src={theme === 'dark' ? okeaLogoDark : okeaLogo} 
        alt="Okea Logo" 
        className="h-[40px] w-[105px]"
      />
    </button>
  );
}
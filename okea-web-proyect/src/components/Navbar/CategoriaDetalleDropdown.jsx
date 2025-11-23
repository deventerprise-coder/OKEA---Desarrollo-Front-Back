import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlechaDerecha } from "../../assets/iconos/Icons";

const animations = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  .detail-enter {
    animation: slideIn 0.4s ease-out forwards;
  }

  .detail-exit {
    animation: slideOut 0.4s ease-out forwards;
  }

  /* Clases para ocultar la barra de scroll */
  .hide-scrollbar {
    /* Firefox */
    scrollbar-width: none;
    /* IE y Edge */
    -ms-overflow-style: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    /* Chrome, Safari y Opera */
    display: none;
  }
`;

const ColumnaItem = ({ col, onNavigateToAll }) => {
  return (
    <div className="lg:min-w-[280px]" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 300,
        fontSize: 20,
        color: '#fff',
        marginBottom: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
          {col.icon && <col.icon width={18} height={18} />} 
          <span>{col.titulo}</span>
        </div>
        {col.iconRight && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <col.iconRight width={18} height={18} />
          </span>
        )}
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ color: '#B8C4E6', fontSize: 14, marginBottom: 6, cursor: 'pointer' }} onClick={onNavigateToAll}>Ver todo</li>
        {col.items.map((item, i) => (
          <li key={i} style={{ color: '#fff', fontSize: 13, fontWeight: 300,marginBottom: 15, cursor: 'pointer' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default function CategoriaDetalleDropdown({ data, nombreCategoria, onClose, onCloseAll }) {
  const [isVisible, setIsVisible] = useState(true);
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
  
  if (!data) return null;
  const Icon = data.icon;

  const left = 340; 


  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400); 
  };

  const categoriaRuta = nombreCategoria === "Tecnología" ? "tecnologia"
    : nombreCategoria === "Electrohogar" ? "electrohogar"
    : nombreCategoria === "Muebles y Organización" ? "muebles-y-organizacion"
    : nombreCategoria === "Dormitorio y Baños" ? "dormitorio-y-banos"
    : nombreCategoria === "Moda Hombre" ? "moda-hombre"
    : nombreCategoria === "Moda Mujer" ? "moda-mujer"
    : nombreCategoria === "Mascotas" ? "mascotas"
    : nombreCategoria === "Supermercado" ? "supermercado"
    : nombreCategoria === "Calzado" ? "calzado"
    : nombreCategoria === "Salud y Bienestar" ? "salud-y-bienestar"
    : nombreCategoria === "Juguetes, Autos y Vehículos" ? "juguetes"
    : nombreCategoria === "Accesorios de moda" ? "accesorios-de-moda"
    : nombreCategoria === "Decoración e Iluminación" ? "decoracion-e-iluminacion"
    : "";

  const handleNavigateToAll = () => {
    navigate(`/catalogo/${categoriaRuta}`);
    if (onCloseAll) {
      onCloseAll(); 
      handleClose(); 
    }
  };

  const getThemeStyles = () => {
    return {
      background: theme === 'dark' ? 'rgba(7, 0, 71, 0.4)' : '#2C509E66'
    };
  };

  return (
    <>
      <style>{animations}</style>
      
      <div
        className={`${isVisible ? 'detail-enter' : 'detail-exit'} max-w-[900px]`}
        style={{
          position: 'fixed',
          top: 0,
          left,
          width: `calc(100vw - ${left}px)`,
          height: 100,
          background: '#E4E66666',
          borderRadius: 32,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
          paddingRight: 32,
          paddingLeft: 16,
          opacity: 1,
          boxSizing: 'border-box',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          zIndex: 1201,
          backdropFilter: 'blur(16px)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon width={54} height={54} color="#fff" />
        </span>
        
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize: 26,
          color: '#fff',
          letterSpacing: '0.25px',
        }}>{nombreCategoria || data.nombre || data.titulo || 'Categoría'}</span>
        
        <button
          onClick={handleClose}  
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 50,
            cursor: 'pointer',
            fontWeight: 200,          
            lineHeight: 1,
            letterSpacing: '-2px',   
          }}
        >
          &times;
        </button>
        
        <span style={{
          marginLeft: 18,
          display: 'flex',
          alignItems: 'center'
        }}>
          <FlechaDerecha
            width={46}                  
            height={50}
            color="#fff"
            style={{
              opacity: 1,
              strokeWidth: 1.2      
            }}
          />
        </span>
      </div>

      <div
        className={`${isVisible ? 'detail-enter' : 'detail-exit'} max-w-[900px]`}
        style={{
          ...getThemeStyles(),
          position: 'fixed',
          top: 116,
          left: left,
          width: `calc(100vw - ${left}px)`,
          height: 908, 
          borderRadius: 32,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.08)',
          opacity: 1,
          boxSizing: 'border-box',
          boxShadow: '0 8px 32px 0 rgba(44,80,158,0.15)',
          zIndex: 1200,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          backdropFilter: 'blur(16px)',
        }}
        onClick={e => e.stopPropagation()} 
      >
      
        <div 
          className="sm:overflow-x-auto xl:overflow-hidden hide-scrollbar" 
          style={{ 
            height: '100%', 
            paddingBottom: 8,
            width: '100%',
            overflowY: 'auto' 
          }}
        >
          
          {data.tipo === 'subCategorias' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {Object.entries(data.subCategorias).map(([nombreSubcategoria, subcategoriaData]) => (
                <div key={nombreSubcategoria}>
                  
                  <h2 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 300,
                    fontSize: 30,
                    color: '#fff',
                    marginBottom: '16px',
                    paddingBottom: '8px'
                  }}>
                    {nombreSubcategoria}
                  </h2>
                  
                  <div 
                    className="grid sm:grid-cols-[repeat(3,_180px)] sm:gap-x-[100px] sm:gap-y-[32px] md:grid-cols-[repeat(3,_210px)] md:gap-x-[0px] md:gap-y-[32px] lg:grid-cols-[repeat(3,1fr)] lg:w-full"
                    style={{ width: 'max-content' }}
                  >
                    {subcategoriaData.columnas.map((col, idx) => (
                      <ColumnaItem key={idx} col={col} onNavigateToAll={handleNavigateToAll} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            
            <div 
              className="grid sm:grid-cols-[repeat(3,_180px)] sm:gap-x-[100px] sm:gap-y-[32px] md:grid-cols-[repeat(3,_210px)] md:gap-x-[0px] md:gap-y-[32px] lg:grid-cols-[repeat(3,1fr)] lg:w-full"
              style={{
                width: 'max-content',
                minHeight: '100%' 
              }}
            >
              {data.columnas.map((col, idx) => (
                <ColumnaItem key={idx} col={col} onNavigateToAll={handleNavigateToAll} />
              ))}
            </div>
          )}
          
        </div>
      </div>
    </>
  );
}
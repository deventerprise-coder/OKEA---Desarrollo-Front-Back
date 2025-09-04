// Recibe data de categoriasDetalle[cat], información referencial, luego supongo que se cargara desde el back

import { FlechaDerecha } from "../../assets/iconos/Icons";

export default function CategoriaDetalleDropdown({ data, nombreCategoria, onClose }) {
  if (!data) return null;
  const Icon = data.icon;

  const left = 340; 
  const width = 900;

  return (
    <>
      {/* Header verde separado */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left,
          width,
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
          onClick={onClose}
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
      {/* Contenido separado */}
      <div
        style={{
          position: 'fixed',
          top: 116,
          left,
          width,
          height: 908,
          background: '#2C509E66',
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
        {/* Grid de 2 filas x 3 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 32, height: '100%' }}>
          {data.columnas.map((col, idx) => (
            <div key={idx} style={{ minWidth: 140, flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 300,
                fontSize: 20,
                color: '#fff',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                {col.icon && <col.icon width={18} height={18} />} {col.titulo}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ color: '#B8C4E6', fontSize: 14, marginBottom: 6, cursor: 'pointer' }}>Ver todo</li>
                {col.items.map((item, i) => (
                  <li key={i} style={{ color: '#fff', fontSize: 13, fontWeight: 300,marginBottom: 15, cursor: 'pointer' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

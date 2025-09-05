import {
  MiCuentaIcon,
  MisComprasIcon,
  PromocionesIcon,
  FavoritosIcon,
  CerrarSesionIcon,
  FlechaDerecha,
} from '../../assets/iconos/Icons';


export default function UserDropdown({ onLogout, onSelect, style }) {
  const buttons = [
    { label: 'Mi cuenta', key: 'cuenta' },
    { label: 'Mis Compras', key: 'compras' },
    { label: 'Promociones', key: 'promociones' },
    { label: 'Favoritos', key: 'favoritos' },
  ];

  const icons = [MiCuentaIcon, MisComprasIcon, PromocionesIcon, FavoritosIcon];

  return (
    <div
      className="shadow-lg border flex flex-col backdrop-blur-xl transition-all duration-500 ease-out opacity-100 translate-y-0"
      style={{
        width: 258,
        height: 296,
        borderRadius: 32,
        border: '1px solid rgba(44, 80, 158, 0.15)',
        gap: 32,
        padding: 16,
        backgroundColor: 'rgba(44, 80, 158, 0.5)',
        ...style,
      }}
    >
      <div className="flex flex-col gap-2 flex-1">
        {buttons.map((btn, idx) => {
          const Icon = icons[idx] || null;
          return (
            <button
              key={btn.key}
              className="group text-white font-poppins font-medium text-[16px] leading-6 tracking-[0.15px] px-4 rounded-full transition flex items-center justify-between"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0.15px',
                height: 40,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E4E66666';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => onSelect && onSelect(btn.key)}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <span className="flex items-center justify-center w-5 h-5">
                    <Icon />
                  </span>
                )}
                <span className="flex items-center">{btn.label}</span>
              </div>

              {/* Flecha derecha visible solo en hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <FlechaDerecha stroke="#FFFFFF" size={25} strokeWidth={0.2} />
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="bg-[#2C509E66] text-white hover:bg-[#16336e] transition flex items-center justify-center gap-3 rounded-full"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.1px',
          textAlign: 'center',
          verticalAlign: 'middle',
          width: 226,
          height: 40,
          paddingRight: 16,
          paddingLeft: 16,
          opacity: 1,
          alignSelf: 'center',
          marginTop: 8,
        }}
        onClick={onLogout}
      >
        <span className="flex items-center justify-center w-5 h-5">
          <CerrarSesionIcon />
        </span>
        <span className="flex items-center">Cerrar Sesión</span>
      </button>
    </div>
  );
}
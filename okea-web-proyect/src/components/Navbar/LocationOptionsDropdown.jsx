import { FlechaDerecha, Location1 } from '../../assets/iconos/Icons';

export default function LocationOptionsDropdown({ options, position, onClose }) {
  return (
    <div
      className="fixed z-[999] rounded-xl shadow-lg max-h-[40 0px] overflow-y-auto"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.15)',
        top: position.top,
        left: position.left,
        transform: 'translateX(-310px)',
        width: '310px',
        backgroundColor: '#2C509E66',
        backdropFilter: 'blur(60px)',
        WebkitBackdropFilter: 'blur(60px)',
        padding: '20px 8px', 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="flex flex-col gap-y-2.5">
        {options.map((item, i) => (
          <div
            key={i}
            className="group flex items-center justify-between gap-2 px-4 py-2 hover:bg-[#E4E66644] cursor-pointer text-white rounded-full transition-all duration-150"
            onClick={onClose}
          >
            <div className="flex items-center gap-2">
              <Location1 stroke="#FFFFFF" />
              <span className="text-sm font-poppins">{item}</span>
            </div>

            {/* Ícono de flecha derecha, visible solo en hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <FlechaDerecha size={25} stroke="#FFFFFF" strokeWidth={0.2}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
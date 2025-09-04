import { Location1 } from '../../assets/iconos/Icons';

export default function LocationOptionsDropdown({ options, position, onClose }) {
  return (
    <div
      className="fixed z-[999] border border-[#DAE2FF] rounded-xl shadow-lg max-h-[250px] overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translateX(-310px)',
        width: '310px',
        backgroundColor: '#2C509EBB',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        padding: '8px',
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

      {options.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#E4E66666] cursor-pointer text-white rounded-full transition-colors duration-150"
          onClick={onClose}
        >
          <Location1 stroke="#FFFFFF" />
          <span className="text-sm font-poppins">{item}</span>
        </div>
      ))}
    </div>
  );
}
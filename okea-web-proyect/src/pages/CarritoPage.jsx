import { useTheme } from "../components/ThemeContext";

export default function CarritoPage() {
  const { isLight } = useTheme();

  const getBackgroundStyle = () => {
    return {
      backgroundColor: isLight ? '#ffffff' : '#1a1a2e',
      color: isLight ? '#000000' : '#ffffff',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    };
  };

  const getSectionStyle = (customBg = null) => {
    if (customBg) {
      return {
        backgroundColor: isLight ? customBg : 'rgba(16, 16, 30, 0.9)',
        color: isLight ? '#000000' : '#ffffff',
        transition: 'all 0.3s ease'
      };
    }
    return {
      backgroundColor: isLight ? '#ffffff' : 'rgba(16, 16, 30, 0.8)',
      color: isLight ? '#000000' : '#ffffff',
      transition: 'all 0.3s ease'
    };
  };

  const getTextStyle = () => {
    return {
      color: isLight ? '#1C4390' : '#DFE162',
      transition: 'color 0.3s ease'
    };
  };

  const getCardStyle = () => {
    return {
      backgroundColor: isLight ? '#F5F5F5' : '#2a2a4a',
      color: isLight ? '#000000' : '#ffffff',
      transition: 'all 0.3s ease'
    };
  };

  const getButtonStyle = () => {
    return {
      backgroundColor: isLight ? '#1C4390' : '#DFE162',
      color: isLight ? '#ffffff' : '#1C4390',
      transition: 'all 0.3s ease'
    };
  };

  return (
    <div className="relative z-0" style={getBackgroundStyle()}>
      <div className="h-[0px]" />

      <section 
        className="px-6 py-30 text-center"
        style={{
          background: isLight 
            ? 'linear-gradient(to right, #B3C7FF, #DFE162)' 
            : 'linear-gradient(to right, #2C509E, #87A922)',
          ...getSectionStyle()
        }}
      >
        <h1 className="text-4xl font-bold mb-4" style={getTextStyle()}>
          ¡Bienvenido al Carrito de OKEA!
        </h1>
        <p className="max-w-2xl mx-auto text-lg" style={{ color: isLight ? '#000000' : '#ffffff' }}>
          Tu plataforma digital para encontrar todo tipo de productos, desde los más simples hasta los más sofisticados
        </p>
      </section>

      <section className="px-6 py-12" style={getSectionStyle()}>
        <h2 className="text-2xl font-semibold mb-6" style={getTextStyle()}>
          ¿Por qué elegir OKEA?
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="p-6 rounded-xl shadow-sm" style={getCardStyle()}>
            Consectetur nisi, eu consectetur
          </li>
          <li className="p-6 rounded-xl shadow-sm" style={getCardStyle()}>
            Asl nisi consectetur
          </li>
          <li className="p-6 rounded-xl shadow-sm" style={getCardStyle()}>
            Nisi eu consectetur consectetur
          </li>
        </ul>
      </section>

      <section 
        className="px-6 py-12" 
        style={getSectionStyle(isLight ? '#FAFAFA' : '#16213e')}
      >
        <h2 className="text-xl font-semibold mb-4" style={getTextStyle()}>
          Contenido de ejemplo para scroll
        </h2>
        <div className="space-y-4 max-w-3xl" style={{ color: isLight ? '#666666' : '#cccccc' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur...</p>
          <p>Phasellus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Morbi euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Aliquam erat volutpat. Etiam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Sed euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Nam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Curabitur euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Donec euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Proin euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
        </div>
      </section>

      <section 
        className="px-6 py-12 text-center"
        style={{
          backgroundColor: isLight ? '#DFE162' : '#87A922',
          color: isLight ? '#000000' : '#ffffff',
          transition: 'all 0.3s ease'
        }}
      >
        <h2 className="text-2xl font-semibold mb-4" style={getTextStyle()}>
          ¿Listo para comenzar?
        </h2>
        <p className="mb-6" style={{ color: isLight ? '#000000' : '#ffffff' }}>
          Únete a la comunidad OKEA y mejora tu comodidad y experiencia.
        </p>
        <button 
          className="px-6 py-3 rounded-full hover:opacity-80 transition"
          style={getButtonStyle()}
        >
          Crear cuenta
        </button>
      </section>
    </div>
  );
}
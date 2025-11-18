//ATENCION = ESTA PAGINA LA CREE PARA PROBRAR, ESTO SE DEBERAR BORRAR CUANDO SE QUIERA AGREGAR LAS VERDADERAS PAGE -- sebasteusd

export default function PageMockup() {
  return (
    <div className="relative z-0">

      <div className="h-[0px]" />


      <section className="px-6 py-30 bg-gradient-to-r from-[#B3C7FF] to-[#DFE162] text-center">
        <h1 className="text-4xl font-bold text-[#1C4390] mb-4">¡Bienvenido a OKEA!</h1>
        <p className="text-gray-800 max-w-2xl mx-auto text-lg">
          Tu plataforma digital para encontrar todo tipo de productos, desde los más simples hasta los más sotisficados
        </p>
      </section>


      <section className="px-6 py-12 bg-white">
        <h2 className="text-2xl font-semibold text-[#1C4390] mb-6">¿Por qué elegir OKEA?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          <li className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">Consectetur nisi, eu consectetur</li>
          <li className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">Asl nisi consectetur</li>
          <li className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">Nisi eu consectetur consectetur</li>
        </ul>
      </section>


      <section className="px-6 py-12 bg-[#FAFAFA]">
        <h2 className="text-xl font-semibold text-[#1C4390] mb-4">Contenido de ejemplo para scroll</h2>
        <div className="space-y-4 max-w-3xl text-gray-600">
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


      <section className="px-6 py-12 bg-[#DFE162] text-center">
        <h2 className="text-2xl font-semibold text-[#1C4390] mb-4">¿Listo para comenzar?</h2>
        <p className="text-gray-800 mb-6">Únete a la comunidad OKEA y mejora tu comodidad y experiencia.</p>
        <button className="px-6 py-3 bg-[#1C4390] text-white rounded-full hover:bg-[#16367a] transition">
          Crear cuenta
        </button>
      </section>
    </div>
  );
}
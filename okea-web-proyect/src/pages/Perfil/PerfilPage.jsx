// src/pages/Perfil/PerfilPage.jsx
import perfilImg from "../../assets/imagenes/Perfil/perfil.png"; // ajusta ruta si cambia

export default function PerfilPage() {
  return (
    <div className="min-h-screen flex justify-center items-start bg-[#E5F0FF] py-10">
      <div className="w-full max-w-md px-4">
        <div className="bg-[#F3F6FF] rounded-[32px] p-5 shadow-lg">
          <div className="bg-white/80 rounded-[32px] p-6 flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-[#E6ECFF] flex items-center justify-center">
              <img
                src={perfilImg}
                alt="Ruben Boyer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mt-2">
              <p className="text-xs tracking-[0.15em] text-gray-400 uppercase">
                Bienvenido de vuelta,
              </p>
              <p className="mt-1 text-xl font-semibold text-[#1E3A8A]">
                RUBEN BOYER
              </p>
            </div>

            <button
              type="button"
              className="mt-2 inline-flex items-center gap-2 px-8 py-2 rounded-full bg-white text-[#1E3A8A] text-sm font-semibold shadow-sm"
            >
              EDITAR
            </button>
          </div>
        </div>

        {/* Aquí luego añadiremos el menú Mi perfil / Mis compras / Tarjetas / ... */}
      </div>
    </div>
  );
}
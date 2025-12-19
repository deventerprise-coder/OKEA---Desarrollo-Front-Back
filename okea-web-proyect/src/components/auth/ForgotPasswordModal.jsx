// src/components/auth/ForgotPasswordModal. jsx
import { useTheme } from "../ThemeContext";

export default function ForgotPasswordModal({ onClose }) {
  const { isLight } = useTheme();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-md ${
          isLight ? "bg-[#1F2937]/40" : "bg-[#0F0B2E]/70"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-50 w-full max-w-[380px] sm:max-w-[430px] rounded-[24px] sm:rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.4)] px-6 py-7 sm:px-7 sm:py-8 md:px-8 md:py-9 ${
          isLight ? "bg-white" : "bg-[#2E2378]"
        }`}
      >
        {/* Título */}
        <h2
          className={`text-[16px] sm:text-[18px] font-semibold text-center mb-2 ${
            isLight ? "text-[#18459F]" : "text-white"
          }`}
        >
          Olvidé mi contraseña
        </h2>

        {/* Descripción */}
        <p
          className={`text-[11px] sm:text-[12px] text-center mb-4 sm:mb-5 ${
            isLight ? "text-[#6B7280]" : "text-[#C4C2E0]"
          }`}
        >
          Introduce la dirección de correo electrónico asociada a tu cuenta de OKEA. 
        </p>

        {/* Formulario */}
        <form
          className="flex flex-col gap-3 sm:gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-1">
            <label
              className={`text-[11px] sm:text-[12px] ${
                isLight ? "text-[#4B5563]" : "text-[#D4D2F0]"
              }`}
            >
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              placeholder="username@gmail.com"
              className={`h-9 sm:h-10 w-full rounded-full px-3 sm:px-4 text-[12px] sm:text-[13px] border-2 focus:outline-none ${
                isLight
                  ? "bg-white text-[#4B5563] border-[#E5E7EB] focus:border-[#3056D3] placeholder: text-[#9CA3AF]"
                  : "bg-transparent text-white border-[#5A4FA0] focus:border-[#7C70C0] placeholder:text-[#A8A6C8]"
              }`}
            />
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            className={`mt-1 h-10 sm:h-11 w-full rounded-full text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 ${
              isLight
                ? "bg-[#18459F] text-white shadow-[0_12px_24px_rgba(24,69,159,0.45)] border-2 border-transparent"
                : "bg-transparent text-white border-2 border-white shadow-[0_8px_20px_rgba(255,255,255,0.15)]"
            }`}
          >
            <span>ENVIAR CÓDIGO</span>
            <span className="text-[15px] sm:text-[16px] leading-none">➜</span>
          </button>
        </form>

        {/* Links inferiores */}
        <div
          className={`mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-center space-y-1 ${
            isLight ? "text-[#6B7280]" : "text-[#C4C2E0]"
          }`}
        >
          <p>
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={onClose}
              className={`font-semibold ${
                isLight ? "text-[#18459F]" :  "text-white underline"
              }`}
            >
              Inicia sesión
            </button>
          </p>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <button
              type="button"
              className={`font-semibold ${
                isLight ? "text-[#18459F]" :  "text-white underline"
              }`}
            >
              Crear una cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
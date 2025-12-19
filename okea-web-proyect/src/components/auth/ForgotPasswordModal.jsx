// src/components/auth/ForgotPasswordModal.jsx
export default function ForgotPasswordModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[#1F2937]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-[380px] sm:max-w-[430px] bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] px-6 py-7 sm:px-7 sm:py-8 md:px-8 md: py-9">
        <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#18459F] text-center mb-2">
          Olvidé mi contraseña
        </h2>
        <p className="text-[11px] sm:text-[12px] text-[#6B7280] text-center mb-4 sm:mb-5">
          Introduce la dirección de correo electrónico asociada a tu cuenta de OKEA. 
        </p>

        <form
          className="flex flex-col gap-3 sm:gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-[11px] sm: text-[12px] text-[#4B5563]">
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              placeholder="username@gmail.com"
              className="h-9 sm:h-10 w-full rounded-full bg-[#F4F5FF] px-3 sm:px-4 text-[12px] sm:text-[13px] text-[#4B5563] border border-transparent focus: outline-none focus:border-[#3056D3]"
            />
          </div>

          <button
            type="submit"
            className="mt-1 h-10 sm:h-11 w-full rounded-full bg-[#18459F] text-white text-[13px] sm:text-[14px] font-semibold shadow-[0_12px_24px_rgba(24,69,159,0.45)] flex items-center justify-center gap-2"
          >
            <span>ENVIAR CÓDIGO</span>
            <span className="text-[15px] sm:text-[16px] leading-none">➜</span>
          </button>
        </form>

        <div className="mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-center text-[#6B7280] space-y-1">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={onClose}
              className="text-[#18459F] font-semibold"
            >
              Inicia sesión
            </button>
          </p>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <button type="button" className="text-[#18459F] font-semibold">
              Crear una cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
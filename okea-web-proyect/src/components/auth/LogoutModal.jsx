import { useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import okeaLogo from "../../assets/iconos/okea_logo.svg";

export default function LogoutModal({ isOpen = true, onClose, onConfirm }) {
  const { isLight } = useTheme();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div
        className={`absolute inset-0 backdrop-blur-md transition-colors ${
          isLight ? "bg-[#1F2937]/40" : "bg-[#0F0B2E]/70"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative z-50 w-full max-w-[380px] sm:max-w-[430px] rounded-[24px] sm:rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.4)] px-6 py-7 sm:px-7 sm:py-8 md:px-8 md:py-9 flex flex-col items-center ${
          isLight ? "bg-white" : "bg-[#2E2378]"
        }`}
      >
        <h2
          className={`text-[16px] sm:text-[18px] font-semibold text-center mb-2 ${
            isLight ? "text-[#18459F]" : "text-white"
          }`}
        >
          CONFIRMAR CIERRE DE SESIÓN
        </h2>

        <p
          className={`text-[11px] sm:text-[12px] text-center mb-6 sm:mb-8 flex items-center justify-center gap-1 ${
            isLight ? "text-[#6B7280]" : "text-[#C4C2E0]"
          }`}
        >
          <span>¿Seguro que deseas salir de</span>
          <img 
            src={okeaLogo} 
            alt="OKEA" 
            className="h-4 sm:h-5 object-contain" 
          />
          <span>?</span>
        </p>

        <div className="flex w-full gap-3 sm:gap-4">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            className={`flex-1 h-10 sm:h-11 rounded-full text-[13px] sm:text-[14px] font-semibold border-2 transition-all ${
              isLight
                ? "bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-gray-50"
                : "bg-transparent text-[#D4D2F0] border-[#5A4FA0] hover:bg-[#5A4FA0]/20"
            }`}
          >
            CANCELAR
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm && onConfirm();
              onClose && onClose();
            }}
            className={`flex-1 h-10 sm:h-11 rounded-full text-[13px] sm:text-[14px] font-semibold flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              isLight
                ? "bg-[#18459F] text-white shadow-[0_12px_24px_rgba(24,69,159,0.45)] border-2 border-transparent"
                : "bg-transparent text-white border-2 border-white shadow-[0_8px_20px_rgba(255,255,255,0.15)]"
            }`}
          >
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </div>
  );
}
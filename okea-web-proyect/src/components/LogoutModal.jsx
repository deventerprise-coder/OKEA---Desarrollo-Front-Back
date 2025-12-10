import React from "react";
import { useTheme } from "./ThemeContext";
import OkeaIcon from "../assets/iconos/okea_logo.svg";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    const { isLight } = useTheme();

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fadeIn ${isLight ? 'bg-black/40' : 'bg-black/60'
                }`}
        >

            <div
                className={`w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl relative animate-scaleUp ${isLight ? 'bg-white' : 'bg-[#292272]'
                    }`}
            >

                <div className={` ${isLight ? 'bg-[#1C4390]' : 'bg-[#1F1A57]'} px-8 py-5 flex items-center`}>
                    <h2 className="text-white font-semibold text-sm tracking-widest uppercase">
                        CONFIRMAR CIERRE DE SESIÓN
                    </h2>
                </div>

                <div className="p-10 flex flex-col items-center text-center gap-8">

                    <h3 className={`text-lg font-medium flex items-center justify-center flex-wrap gap-1 ${isLight ? 'text-gray-800' : 'text-white'
                        }`}>
                        <span>¿Seguro que deseas salir de </span>
                        <img
                            src={OkeaIcon}
                            alt="Okea"
                            className="h-6 object-contain inline-block mb-0.5"
                        />

                        <span>?</span>
                    </h3>

                    <div className="flex gap-4 w-full justify-center mt-2">

                        <button
                            onClick={onClose}
                            className={`px-8 py-2.5 rounded-full border text-xs font-bold tracking-wider transition hover:opacity-80 cursor-pointer ${isLight
                                    ? 'bg-white border-blue-800 text-black'
                                    : 'bg-transparent border-gray-400 text-white'
                                }`}
                        >
                            CANCELAR
                        </button>

                        <button
                            onClick={onConfirm}
                            className={`px-8 py-2.5 rounded-full ${isLight ? 'bg-[#1C4390]' : 'bg-[#1F1A57]'} text-white text-xs font-bold tracking-wider hover:bg-[#15326d] cursor-pointer transition shadow-md`}
                        >
                            CERRAR SESIÓN
                        </button>

                    </div>
                </div>

            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
        </div>
    );
};

export default LogoutModal;
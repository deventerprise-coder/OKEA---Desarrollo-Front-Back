import React from "react";
import { CloseIcon } from "../assets/iconos/Icons";
import { useTheme } from "../components/ThemeContext";

const AddCardModal = ({ isOpen, onClose }) => {
    const { isLight } = useTheme();
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fadeIn ${isLight ? 'bg-black/40' : 'bg-black/60'
            }`}>

            <div className={`w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl relative animate-scaleUp ${isLight ? 'bg-white' : 'bg-[#292272]'
                }`}>

                <div className={` ${isLight ? 'bg-[#1C4390]' : 'bg-[#1F1A57]'} px-6 py-4 flex justify-between items-center`}>
                    <h2 className="text-white font-semibold text-sm tracking-widest uppercase">
                        Agregar Nueva Tarjeta
                    </h2>
                    <button onClick={onClose} className="hover:opacity-80 transition cursor-pointer">
                        <CloseIcon color="#FFFFFF" />
                    </button>
                </div>

                <div className="p-8 flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                        <label className={`text-xs font-medium ml-1 ${isLight ? 'text-gray-500' : 'text-blue-100'
                            }`}>
                            Nombre
                        </label>
                        <input
                            type="text"
                            className={`w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition ${isLight
                                    ? 'bg-[#EEF0F5] text-gray-700'
                                    : 'bg-[#E7EAFF] text-[#1C4390]' 
                                }`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-xs font-medium ml-1 ${isLight ? 'text-gray-500' : 'text-blue-100'
                            }`}>
                            Número de tarjeta
                        </label>
                        <input
                            type="text"
                            className={`w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition ${isLight
                                    ? 'bg-[#EEF0F5] text-gray-700'
                                    : 'bg-[#E7EAFF] text-[#1C4390]'
                                }`}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className={`text-xs font-medium ml-1 ${isLight ? 'text-gray-500' : 'text-blue-100'
                                }`}>
                                Número de expiración
                            </label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className={`w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition placeholder-opacity-70 ${isLight
                                        ? 'bg-[#EEF0F5] text-gray-700 placeholder-gray-400'
                                        : 'bg-[#E7EAFF] text-[#1C4390] placeholder-[#1C4390]/50'
                                    }`}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/3">
                            <label className={`text-xs font-medium ml-1 ${isLight ? 'text-gray-500' : 'text-blue-100'
                                }`}>
                                CVV
                            </label>
                            <input
                                type="text"
                                className={`w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition ${isLight
                                        ? 'bg-[#EEF0F5] text-gray-700'
                                        : 'bg-[#E7EAFF] text-[#1C4390]'
                                    }`}
                            />
                        </div>
                    </div>

                    <button className={` ${isLight ? 'bg-[#1C4390]' : 'bg-[#1F1A57]'} w-full text-white font-bold py-3.5 rounded-full mt-4 hover:bg-[#15326d] transition shadow-md text-sm tracking-wide cursor-pointer`}>
                        AGREGAR TARJETA
                    </button>

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

export default AddCardModal;
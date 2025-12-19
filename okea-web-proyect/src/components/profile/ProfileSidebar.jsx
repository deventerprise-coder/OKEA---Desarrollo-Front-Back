// src/components/profile/ProfileSidebar.jsx
import React, { useState } from "react";
import perfilImg from "../../assets/imagenes/Perfil/perfil.png";
import { useNavigate } from "react-router-dom";
import {
  MiCuentaIcon,
  MisComprasIcon,
  FavoritosIcon,
  UserCardIcon,
  SettingsIcon,
  ExitIcon,
} from "../../assets/iconos/Icons";
import { useTheme } from "../ThemeContext";

// CORRECCIÓN: Asegúrate que la ruta apunte a la carpeta 'auth'
import LogoutModal from "../auth/LogoutModal"; 

const MENU_ITEMS = [
  { key: "profile", label: "Mi Perfil", icon: MiCuentaIcon, path: "/perfil" },
  { key: "orders", label: "Mis compras", icon: MisComprasIcon, path: "/mis-compras" },
  { key: "favorites", label: "Favoritos", icon: FavoritosIcon, path: "/perfil_favoritos" },
  { key: "cards", label: "Tarjetas", icon: UserCardIcon, path: "/tarjetas" },
  { key: "support", label: "Soporte", icon: SettingsIcon, path: "/soporte" },
  { key: "logout", label: "Cerrar sesión", icon: ExitIcon, path: null }, // Path null para interceptarlo
];

export default function ProfileSidebar({
  activeKey = "profile",
  onSelect,
  onEdit,
  isEditing,
  userName,
  onLogout, // Recibimos la función que hace la lógica real de salir
}) {
  const navigate = useNavigate();
  const { isLight } = useTheme();
  
  // Estado para controlar la visibilidad del modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleItemClick = (item) => {
    // 1. Si es logout, abrimos el modal y NO navegamos
    if (item.key === "logout") {
      setShowLogoutModal(true);
      return;
    }

    // 2. Comportamiento normal para los otros items
    if (onSelect) {
      onSelect(item.key);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false); // Cerramos el modal
    onLogout && onLogout();    // Ejecutamos la acción real (borrar token, etc.)
  };

  return (
    <>
      <aside className="w-full lg:max-w-[280px] xl:max-w-[300px] mx-auto lg:mx-0 flex flex-col gap-4 sm:gap-6">
        
        {/* Card de perfil */}
        <div
          className={`${
            isLight ? "bg-white" : "bg-[#292272]"
          } rounded-[24px] sm:rounded-[32px] p-3 sm: p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)]`}
        >
          <div
            className={`${
              isLight ? "bg-[#EAF1FF]" : "bg-[#7674A6]"
            } rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4`}
          >
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg: h-32 rounded-full overflow-hidden bg-[#E6ECFF] flex items-center justify-center">
              <img
                src={perfilImg}
                alt="Usuario Okea"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Texto de bienvenida */}
            <div className="text-center mt-1 sm:mt-2">
              <p
                className={`text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] ${
                  isLight ? "text-[#1E3A8A]" : "text-white"
                } uppercase`}
              >
                BIENVENIDO DE VUELTA,
              </p>
              <p
                className={`mt-1 text-[16px] sm: text-[18px] font-semibold ${
                  isLight ? "text-[#1E3A8A]" : "text-white"
                }`}
              >
                {userName || "Usuario OKEA"}
              </p>
            </div>

            {/* Botón editar/guardar */}
            <button
              type="button"
              onClick={onEdit}
              className={`mt-1 inline-flex items-center gap-2 px-6 sm:px-8 py-2 rounded-full ${
                isLight
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-[#1F1A57] text-white"
              } text-[12px] sm:text-[13px] font-semibold shadow-md`}
            >
              {isEditing ? "GUARDAR" : "EDITAR"}
            </button>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="flex flex-col gap-2 mb-4">
          {MENU_ITEMS.map((item) => {
            const isActive = item.key === activeKey;
            const Icon = item.icon;
            
            const base =
              "w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-[20px] text-[13px] sm:text-[14px] font-medium shadow-md transition-colors text-left";
            
            const styles = isActive
              ? isLight
                ? "bg-[#1E3A8A] text-white"
                : "bg-[#292272] text-white border border-gray-600"
              : isLight
              ? "bg-white text-[#273244]"
              : "bg-transparent text-white border border-gray-600";
            
            // Lógica de color de icono
            const iconColor = isActive
              ? "#FFFFFF"
              : isLight
              ? "#E4E666" // Color amarillo original
              : "#FFFFFF";

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`${base} ${styles}`}
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                  {Icon && <Icon color={iconColor} />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Renderizamos el Modal fuera del aside */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
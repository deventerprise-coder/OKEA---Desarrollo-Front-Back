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
import LogoutModal from "../LogoutModal";

const MENU_ITEMS = [
  { key: "profile", label: "Mi Perfil", icon: MiCuentaIcon, path: "/perfil" },
  { key: "orders", label: "Mis compras", icon: MisComprasIcon, path: "/mis-compras" },
  { key: "perfil", label: "Favoritos", icon: FavoritosIcon, path: "/perfil_favoritos" },
  { key: "cards", label: "Tarjetas", icon: UserCardIcon, path: "/tarjetas" },
  { key: "support", label: "Soporte", icon: SettingsIcon, path: "/soporte" },
  { key: "logout", label: "Cerrar sesión", icon: ExitIcon, path: "null" },
];

export default function ProfileSidebar({
  activeKey = "profile",
  onSelect,
  onEdit,
  isEditing,
  userName,
  onLogout,
}) {
  const navigate = useNavigate();
  const { isLight } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleItemClick = (item) => {
    if (onSelect) {
      onSelect(item.key);
    }

    if (item.key === 'logout') {
      setShowLogoutModal(true);
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout && onLogout();
  };
  return (
    <>
      <aside className="w-full max-w-[300px] flex flex-col gap-6">
        <div className={` ${isLight ? 'bg-white' : 'bg-[#292272]'} rounded-[32px] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)]`}>
          <div className={`${isLight ? 'bg-[#EAF1FF]' : 'bg-[#7674A6]'} rounded-[28px] p-6 flex flex-col items-center gap-4`}>
            <div className="w-32 h-32 rounded-full overflow-hidden bg-[#E6ECFF] flex items-center justify-center">
              <img
                src={perfilImg}
                alt="Usuario Okea"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mt-2">
              <p className={`text-[11px] tracking-[0.15em] ${isLight ? 'text-[#1E3A8A]' : 'text-white'} uppercase`}>
                BIENVENIDO DE VUELTA,
              </p>
              <p className={`mt-1 text-[18px] font-semibold ${isLight ? 'text-[#1E3A8A]' : 'text-white'}`}>
                {userName || "Usuario OKEA"}
              </p>
            </div>

            <button
              type="button"
              onClick={onEdit}
              className={`mt-1 inline-flex items-center gap-2 px-8 py-2 rounded-full ${isLight ? 'bg-white text-[#1E3A8A]' : 'bg-[#1F1A57] text-white'} text-[13px] font-semibold shadow-md`}
            >
              {isEditing ? "GUARDAR" : "EDITAR"}
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mb-4">
          {MENU_ITEMS.map((item) => {
            const isActive = item.key === activeKey;
            const Icon = item.icon;
            const base =
              "w-full flex items-center gap-3 px-5 py-3 rounded-[20px] text-[14px] font-medium shadow-md transition-colors";
            const styles = isActive
              ? isLight
                ? "bg-[#1E3A8A] text-white"
                : "bg-[#292272] text-white border-1 border-gray-600"
              : isLight ? "bg-white text-[#273244]" : "bg-transparent text-white border-1 border-gray-600";
            const iconColor = isActive ? isLight ? "#FFFFFF" : "#FFFFFF"
              : isLight ? "#E4E666" : "#FFFFFF";

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`${base} ${styles}`}
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  {Icon && <Icon color={iconColor} />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
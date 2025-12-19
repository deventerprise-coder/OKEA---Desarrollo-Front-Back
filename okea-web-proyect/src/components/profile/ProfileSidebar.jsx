import React, { useState, useRef } from "react";
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
import LogoutModal from "../auth/LogoutModal";

const GalleryIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 15L16 10L5 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MENU_ITEMS = [
  { key: "profile", label: "Mi Perfil", icon: MiCuentaIcon, path: "/perfil" },
  { key: "orders", label: "Mis compras", icon: MisComprasIcon, path: "/mis-compras" },
  { key: "favorites", label: "Favoritos", icon: FavoritosIcon, path: "/perfil_favoritos" },
  { key: "cards", label: "Tarjetas", icon: UserCardIcon, path: "/tarjetas" },
  { key: "support", label: "Soporte", icon: SettingsIcon, path: "/soporte" },
  { key: "logout", label: "Cerrar sesión", icon: ExitIcon, path: null },
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
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleItemClick = (item) => {
    if (item.key === "logout") {
      setShowLogoutModal(true);
      return;
    }
    if (onSelect) onSelect(item.key);
    if (item.path) navigate(item.path);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout && onLogout();
  };

  return (
    <>
      <aside className="w-full lg:max-w-[280px] xl:max-w-[300px] mx-auto lg:mx-0 flex flex-col gap-4 sm:gap-6">
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
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-[#E6ECFF] group">
              <img
                src={previewImage || perfilImg}
                alt="Usuario Okea"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div
                  onClick={handleImageClick}
                  className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-300 ${
                    isLight ? "bg-white/80 hover:bg-white/90" : "bg-[#1F1A57]/80 hover:bg-[#1F1A57]/90"
                  }`}
                >
                  <div className="mb-1">
                    <GalleryIcon color={isLight ? "#1E3A8A" : "#FFFFFF"} />
                  </div>
                  <div
                    className={`text-[10px] sm:text-[11px] font-bold flex items-center gap-1 ${
                      isLight ? "text-[#1E3A8A]" : "text-white"
                    }`}
                  >
                    <span>SUBIR FOTO</span>
                    <span className="text-[12px]">↑</span>
                  </div>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>

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

            const iconColor = isActive
              ? "#FFFFFF"
              : isLight
              ? "#E4E666"
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

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
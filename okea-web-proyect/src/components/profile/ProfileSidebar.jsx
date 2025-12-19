// src/components/profile/ProfileSidebar.jsx
import perfilImg from "../../assets/imagenes/Perfil/perfil.png";
import {
  MiCuentaIcon,
  MisComprasIcon,
  FavoritosIcon,
  UserCardIcon,
  SettingsIcon,
  ExitIcon,
} from "../../assets/iconos/Icons";

const MENU_ITEMS = [
  { key: "profile", label: "Mi Perfil", icon: MiCuentaIcon },
  { key: "orders", label: "Mis compras", icon: MisComprasIcon },
  { key: "favorites", label: "Favoritos", icon: FavoritosIcon },
  { key: "cards", label: "Tarjetas", icon: UserCardIcon },
  { key: "support", label: "Soporte", icon: SettingsIcon },
  { key: "logout", label: "Cerrar sesión", icon: ExitIcon },
];

export default function ProfileSidebar({
  activeKey = "profile",
  onSelect,
  onEdit,
  isEditing,
  userName,
}) {
  return (
    <aside className="w-full lg:max-w-[280px] xl:max-w-[300px] mx-auto lg:mx-0 flex flex-col gap-4 sm:gap-6">
      {/* Card de perfil */}
      <div className="bg-white rounded-[24px] sm:rounded-[32px] p-3 sm:p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
        <div className="bg-[#EAF1FF] rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-[#E6ECFF] flex items-center justify-center">
            <img
              src={perfilImg}
              alt="Usuario Okea"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texto de bienvenida */}
          <div className="text-center mt-1 sm:mt-2">
            <p className="text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] text-[#1E3A8A] uppercase">
              BIENVENIDO DE VUELTA,
            </p>
            <p className="mt-1 text-[16px] sm:text-[18px] font-semibold text-[#1E3A8A]">
              {userName || "Usuario OKEA"}
            </p>
          </div>

          {/* Botón editar/guardar */}
          <button
            type="button"
            onClick={onEdit}
            className="mt-1 inline-flex items-center gap-2 px-6 sm:px-8 py-2 rounded-full bg-white text-[#1E3A8A] text-[12px] sm:text-[13px] font-semibold shadow-md"
          >
            {isEditing ? "GUARDAR" :  "EDITAR"}
          </button>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col gap-2 mb-4">
        {MENU_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          const Icon = item.icon;
          const base =
            "w-full flex items-center gap-3 px-4 sm:px-5 py-2. 5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-medium shadow-md transition-colors";
          const styles = isActive
            ? "bg-[#1E3A8A] text-white"
            : "bg-white text-[#273244]";
          const iconColor = isActive ? "#FFFFFF" : "#E4E666";

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect && onSelect(item.key)}
              className={`${base} ${styles}`}
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                {Icon && <Icon color={iconColor} />}
              </span>
              <span>{item. label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
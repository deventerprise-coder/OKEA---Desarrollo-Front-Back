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
}) {
  return (
    <aside className="w-full max-w-[300px] flex flex-col gap-6">
      <div className="bg-white rounded-[32px] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
        <div className="bg-[#EAF1FF] rounded-[28px] p-6 flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-[#E6ECFF] flex items-center justify-center">
            <img
              src={perfilImg}
              alt="Ruben Boyer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center mt-2">
            <p className="text-[11px] tracking-[0.15em] text-[#1E3A8A] uppercase">
              BIENVENIDO DE VUELTA,
            </p>
            <p className="mt-1 text-[18px] font-semibold text-[#1E3A8A]">
              RUBEN BOYER
            </p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="mt-1 inline-flex items-center gap-2 px-8 py-2 rounded-full bg-white text-[#1E3A8A] text-[13px] font-semibold shadow-md"
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
            "w-full flex items-center gap-3 px-5 py-3 rounded-[999px] text-[14px] font-medium shadow-md transition-colors";
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
              <span className="w-6 h-6 flex items-center justify-center">
                {Icon && <Icon color={iconColor} />}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
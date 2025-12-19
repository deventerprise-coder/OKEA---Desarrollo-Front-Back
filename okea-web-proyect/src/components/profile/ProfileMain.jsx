// src/components/profile/ProfileMain.jsx
import { useState } from "react";
import {
  EditIcon,
  SaveIcon,
  EyeShowIcon,
  EyeHideIcon,
  PhoneIcon,
  ArchiveIcon,
  MailIcon,
  GlobeLocationIcon,
  LocationProfileIcon,
} from "../../assets/iconos/Icons";
import { useTheme } from "../ThemeContext";

function PasswordField({ placeholder, enabled }) {
  const [visible, setVisible] = useState(false);
  const { isLight } = useTheme();

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        disabled={!enabled}
        className={`w-full h-9 sm:h-10 rounded-full px-3 sm:px-4 pr-10 text-[12px] sm:text-[13px] border border-transparent focus:outline-none ${
          enabled
            ? isLight
              ?  "bg-[#F2F4FF] text-[#273244] focus:border-[#3056D3]"
              : "bg-[#3D3979] text-white focus:border-[#6B8AFF]"
            : isLight
            ? "bg-[#EEF1FF] text-[#A3A7C0] cursor-not-allowed"
            : "bg-[#2A2563] text-[#7C7AA0] cursor-not-allowed"
        }`}
      />
      <button
        type="button"
        disabled={!enabled}
        onClick={() => enabled && setVisible((v) => !v)}
        className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center ${
          enabled
            ? isLight
              ? "text-[#6B7280]"
              : "text-[#A8A6C8]"
            : isLight
            ? "text-[#C5C8DD] cursor-not-allowed"
            : "text-[#5A5880] cursor-not-allowed"
        }`}
      >
        {visible ? (
          <EyeHideIcon color={enabled ? (isLight ? "#6B7280" : "#A8A6C8") : (isLight ? "#C5C8DD" : "#5A5880")} />
        ) : (
          <EyeShowIcon color={enabled ? (isLight ?  "#6B7280" : "#A8A6C8") : (isLight ? "#C5C8DD" : "#5A5880")} />
        )}
      </button>
    </div>
  );
}

export default function ProfileMain({ activeSection, isEditing, user, onUpdateName }) {
  const { isLight } = useTheme();

  const personalFields = [
    { key: "name", label: "Nombres", value: user?.name || "Fabricio", icon: LocationProfileIcon },
    { key:  "district", label: "Distrito", value: "Surco", icon: LocationProfileIcon },
    { key: "phone", label: "Número de teléfono", value:  "+51 912404450", icon: PhoneIcon },
    { key: "province", label: "Provincia", value: "Lima", icon: ArchiveIcon },
    { key: "lastName", label: "Apellidos", value: "Aylas", icon: LocationProfileIcon },
    { key:  "email", label: "Email", value: user?.email || "aylasmorenof@gmail.com", icon: MailIcon },
    { key:  "country", label: "País", value: "Perú", icon: GlobeLocationIcon },
    { key: "postal", label: "Código Postal", value: "15001", icon: ArchiveIcon },
  ];

  const handleFieldBlur = (fieldKey, value) => {
    if (fieldKey === "name" && onUpdateName) {
      onUpdateName(value);
    }
  };

  return (
    <section className="flex-1 flex flex-col gap-4 sm:gap-6">
      {/* Card de datos personales */}
      <div
        className={`${
          isLight ? "bg-white" :  "bg-[#292272]"
        } rounded-[24px] sm:rounded-[32px] shadow-lg p-4 sm:p-6 lg:p-8`}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2
            className={`text-[18px] sm:text-[20px] lg:text-[22px] font-semibold ${
              isLight ? "text-[#1E3A8A]" : "text-white"
            }`}
          >
            Datos Personales
          </h2>
          <button
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-transparent flex items-center justify-center ${
              isLight ?  "text-[#1E3A8A]" :  "text-white"
            }`}
          >
            {isEditing ? (
              <SaveIcon color={isLight ? "#1E3A8A" : "#FFFFFF"} />
            ) : (
              <EditIcon color={isLight ? "#1E3A8A" : "#FFFFFF"} />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {personalFields.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col gap-1 min-w-0">
                <span
                  className={`text-[11px] sm:text-[12px] flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                    isLight ? "text-[#6B7280]" : "text-[#A8A6C8]"
                  }`}
                >
                  {Icon && <Icon color={isLight ? "#6B7280" : "#A8A6C8"} />}
                  {item.label}
                </span>
                {isEditing ?  (
                  <input
                    type="text"
                    defaultValue={item.value}
                    onBlur={(e) => handleFieldBlur(item.key, e.target.value)}
                    className={`h-9 sm:h-10 w-full rounded-full px-3 sm:px-4 text-[12px] sm:text-[13px] border border-transparent focus:outline-none ${
                      isLight
                        ?  "bg-[#F2F4FF] text-[#273244] focus:border-[#3056D3]"
                        : "bg-[#3D3979] text-white focus:border-[#6B8AFF]"
                    }`}
                  />
                ) : (
                  <div
                    className={`h-9 sm:h-10 rounded-full px-3 sm: px-4 flex items-center text-[12px] sm:text-[13px] overflow-hidden text-ellipsis whitespace-nowrap ${
                      isLight
                        ? "bg-[#F2F4FF] text-[#273244]"
                        : "bg-[#3D3979] text-white"
                    }`}
                  >
                    {item.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid de 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card Cambiar Contraseña */}
        <div
          className={`${
            isLight ? "bg-white" : "bg-[#292272]"
          } rounded-[20px] sm:rounded-[24px] shadow-lg p-4 sm:p-6`}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3
              className={`text-[14px] sm:text-[16px] font-semibold ${
                isLight ? "text-[#1E3A8A]" : "text-white"
              }`}
            >
              Cambiar Contraseña
            </h3>
            <button
              className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center ${
                isLight ?  "text-[#1E3A8A]" : "text-white"
              }`}
            >
              {isEditing ? (
                <SaveIcon color={isLight ? "#1E3A8A" : "#FFFFFF"} />
              ) : (
                <EditIcon color={isLight ? "#1E3A8A" : "#FFFFFF"} />
              )}
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <PasswordField placeholder="Contraseña actual" enabled={isEditing} />
            <PasswordField placeholder="8+ caracteres" enabled={isEditing} />
            <PasswordField placeholder="Confirmar contraseña nueva" enabled={isEditing} />
          </div>

          <button
            disabled={!isEditing}
            className={`mt-4 sm:mt-5 w-full h-10 sm:h-11 rounded-full text-[13px] sm:text-[14px] font-semibold shadow-md transition ${
              isEditing
                ? isLight
                  ? "bg-[#3056D3] text-white"
                  : "bg-[#6B8AFF] text-white"
                : isLight
                ? "bg-[#C7D3FF] text-white cursor-not-allowed"
                :  "bg-[#3D3979] text-[#7C7AA0] cursor-not-allowed"
            }`}
          >
            GUARDAR CONTRASEÑA
          </button>
        </div>

        {/* Card Mis Compras */}
        <div
          className={`${
            isLight ? "bg-white" :  "bg-[#292272]"
          } rounded-[20px] sm:rounded-[24px] shadow-lg p-4 sm:p-6`}
        >
          <h3
            className={`text-[14px] sm:text-[16px] font-semibold mb-3 sm:mb-4 ${
              isLight ? "text-[#1E3A8A]" : "text-white"
            }`}
          >
            Mis Compras
          </h3>
          <div
            className={`h-28 sm:h-32 lg:h-40 flex items-center justify-center text-[11px] sm:text-xs ${
              isLight ?  "text-gray-500" : "text-[#A8A6C8]"
            }`}
          >
            Aquí irá el gráfico de compras
          </div>
        </div>

        {/* Card Pedidos Realizados */}
        <div
          className={`${
            isLight ? "bg-white" :  "bg-[#292272]"
          } rounded-[20px] sm:rounded-[24px] shadow-lg p-4 sm:p-6 md:col-span-2 lg:col-span-1`}
        >
          <h3
            className={`text-[14px] sm:text-[16px] font-semibold mb-3 sm: mb-4 ${
              isLight ? "text-[#1E3A8A]" :  "text-white"
            }`}
          >
            Pedidos Realizados Mes de Julio
          </h3>
          <div
            className={`h-28 sm:h-32 lg:h-40 flex flex-col items-center justify-center text-[11px] sm: text-xs gap-3 ${
              isLight ? "text-gray-500" : "text-[#A8A6C8]"
            }`}
          >
            Aquí irá el resumen de pedidos realizados
          </div>
        </div>
      </div>
    </section>
  );
}
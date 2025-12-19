// src/pages/Perfil/PerfilPage.jsx
import { useState } from "react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileMain from "../../components/profile/ProfileMain";
import { useTheme } from "../../components/ThemeContext";

export default function PerfilPage({ user, isLoggedIn, onLogout, onUpdateName }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const { isLight } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 sm:pt-24 lg:pt-[120px] pb-8 sm:pb-12 px-4 md:px-6 ${
        isLight
          ? "bg-gradient-to-b from-[#E5F0FF] to-[#F7F9FC]"
          : "bg-gradient-to-b from-[#1F1A57] to-[#0F0B2E]"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        <ProfileSidebar
          activeKey={activeSection}
          onSelect={(key) => {
            if (key === "logout") {
              onLogout && onLogout();
              return;
            }
            setActiveSection(key);
          }}
          onEdit={() => setIsEditing((prev) => !prev)}
          isEditing={isEditing}
          userName={user?. name}
          onLogout={onLogout}
        />
        <ProfileMain
          activeSection={activeSection}
          isEditing={isEditing}
          user={user}
          onUpdateName={onUpdateName}
        />
      </div>
    </div>
  );
}
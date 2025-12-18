// src/pages/Perfil/PerfilPage.jsx
import { useState } from "react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileMain from "../../components/profile/ProfileMain";

export default function PerfilPage({ user, isLoggedIn, onLogout, onUpdateName }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F0FF] to-[#F7F9FC] pt-[120px] pb-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <ProfileSidebar
          activeKey={activeSection}
          onSelect={(key) => {
            setActiveSection(key);
          }}
          onEdit={() => setIsEditing((prev) => !prev)}
          isEditing={isEditing}
          userName={user?.name}
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
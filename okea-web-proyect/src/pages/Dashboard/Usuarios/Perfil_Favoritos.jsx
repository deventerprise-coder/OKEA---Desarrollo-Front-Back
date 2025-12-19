import React from "react";
import Footer from "../../../components/Footer/Footer";
import Favoritos from "../../../components/Favoritos";
import { useState } from "react";
import ProfileSidebar from "../../../components/profile/ProfileSidebar";
import { useTheme } from "../../../components/ThemeContext";

const Perfil_Favoritos = ({ user, onLogout }) => {
  const { isLight } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`min-h-screen flex flex-col pt-16 ${isLight ? 'bg-gray-50' : 'bg-[#120F31]'}`}
      style={{
        background: isLight
          ? 'radial-gradient(circle at 0% 0%, #E8EEFF 0%, #F3F5F9 40%, #FDFDE0 100%)'
          : '#120F31'
      }}>
      <div className="flex-1 flex justify-center mt-16 px-4 w-full max-w-[1740px] mx-auto mb-20">

        <aside className="hidden xl:flex xl:flex-col w-[378px] shrink-0">

          <div className={`sticky rounded-3xl h-full w-full justify-center flex text-gray-400 z-10`}>
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
          </div>
        </aside>

        <main className="flex-1 w-full max-w-[1314px] xl:min-h-[1047px]">
          <div className="h-full">
            <Favoritos />
          </div>
        </main>

      </div>
      <div
        className="pb-20 w-full relative z-10"
        style={{
          background: isLight
            ? 'linear-gradient(to bottom, transparent 50px, #F1F4F9 220px)'
            : 'linear-gradient(to bottom, transparent 50px, #120F31 220px)'
        }}>
        <Footer />
      </div>

    </div>
  );
};

export default Perfil_Favoritos;
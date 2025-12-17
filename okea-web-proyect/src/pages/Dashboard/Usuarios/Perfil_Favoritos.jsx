import React from "react";
import Footer from "../../../components/Footer/Footer";
import Favoritos from "../../../components/Favoritos";
import { useTheme } from "../../../components/ThemeContext";

const Perfil_Favoritos = () => {
  const { isLight } = useTheme();
  return (
    <div 
      className={`min-h-screen flex flex-col pt-16 ${isLight ? 'bg-gray-50' : 'bg-[#120F31]'}`}
    style={{
      background: isLight
        ? 'radial-gradient(circle at 0% 0%, #E8EEFF 0%, #F3F5F9 40%, #FDFDE0 100%)'
        : '#120F31'
    }}>
      <div className="flex-1 flex justify-center gap-[48px] mt-16 px-4 w-full max-w-[1740px] mx-auto mb-20">

        <aside className="hidden xl:block w-[378px] shrink-0">

          <div className={`rounded-3xl min-h-[1047px] p-4 flex items-center justify-center text-gray-400 ${isLight ? 'bg-white' : 'bg-[#292272]'}`}>
            (378px)
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
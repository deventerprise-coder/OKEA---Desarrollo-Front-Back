// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../components/auth/LoginCard";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import backgroundOverlay from "../../assets/imagenes/login/background.png";
import { useTheme } from "../../components/ThemeContext";

export default function LoginPage({ onMockLogin }) {
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();
  const { isLight } = useTheme();

  const handleLogin = ({ email, name }) => {
    if (onMockLogin) {
      onMockLogin({ email, name });
    }
    navigate("/");
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start md:justify-center"
      style={{
        backgroundColor: isLight ? "#F8F9FA" : "#0F0B2E",
        paddingTop: "110px",
        paddingBottom: "40px"
      }}
    >
      <section
        className="relative w-full flex items-center justify-center overflow-hidden shadow-xl mx-auto px-4 py-8 rounded-[20px] md:rounded-[40px] max-w-[92%] md:max-w-[700px] md:py-16 md:px-10 lg:max-w-[900px] lg:py-20 xl:max-w-[1100px] xl:py-24 2xl:max-w-[1400px] 2xl: py-28"
        style={{
          backgroundImage: `url(${backgroundOverlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: isLight ?  "#E4EDFF" :  "rgba(255,255,255,0.05)",
        }}
      >
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundColor: isLight ? "rgba(255,255,255,0.3)" : "rgba(15, 11, 46, 0.4)" 
          }} 
        />

        <div className="relative z-10 w-full max-w-[380px] md:max-w-[400px]">
          <LoginCard
            onForgotPassword={() => setShowForgot(true)}
            onMockLogin={handleLogin}
          />
        </div>
      </section>

      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </div>
  );
}
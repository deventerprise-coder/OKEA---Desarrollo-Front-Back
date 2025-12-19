// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../components/auth/LoginCard";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import loginBgLight from "../../assets/imagenes/login/background.png";
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
      className="flex items-center justify-center px-4 py-8 md:py-12"
      style={{
        minHeight: "100vh",
        backgroundColor: isLight ? "#E4EDFF" : "#1B1555",
        backgroundImage: isLight ? `url(${loginBgLight})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LoginCard
        onForgotPassword={() => setShowForgot(true)}
        onMockLogin={handleLogin}
      />

      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </div>
  );
}
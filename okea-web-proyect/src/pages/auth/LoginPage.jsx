// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../components/auth/LoginCard";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import loginBg from "../../assets/imagenes/login/background.png";

export default function LoginPage({ onMockLogin }) {
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const handleLogin = ({ email, name }) => {
    if (onMockLogin) {
      onMockLogin({ email, name });
    }
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex items-center justify-center px-4 py-8 md:py-12"
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
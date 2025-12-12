// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import LoginCard from "../../components/auth/LoginCard";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";

export default function LoginPage() {
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#E4EDFF] pt-[96px]">
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full max-w-[1040px] mx-auto px-4 md:px-6 py-10">
          <div className="relative rounded-[40px] bg-[#F2F6FF] shadow-[0_24px_80px_rgba(0,0,0,0.15)] flex items-center justify-center py-10 md:py-14">
            <LoginCard onForgotPassword={() => setShowForgot(true)} />
          </div>
        </section>
      </main>

      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </div>
  );
}
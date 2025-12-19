// src/components/auth/LoginCard.jsx
import { useState } from "react";
import okeaLogo from "../../assets/iconos/okea_logo.svg";
import googleIcon from "../../assets/imagenes/login/google.png";
import githubIcon from "../../assets/imagenes/login/github.png";
import facebookIcon from "../../assets/imagenes/login/facebook.png";
import { EyeShowIcon, EyeHideIcon } from "../../assets/iconos/Icons";

export default function LoginCard({ onForgotPassword, onMockLogin }) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = activeTab === "login";

  return (
    <div className="w-full max-w-[380px] sm:max-w-[430px] bg-[rgba(255,255,255,0.90)] backdrop-blur-xl rounded-[24px] sm:rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.18)] pt-0 pb-6 sm:pb-8 md:pb-9 px-0">
      <div className="flex mb-4 sm:mb-6 rounded-t-[24px] sm:rounded-t-[32px] overflow-hidden">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={`flex-1 h-12 sm:h-14 text-[14px] sm:text-[15px] font-semibold transition-colors ${
            isLogin
              ? "bg-[#18459F] text-white shadow-[0_8px_18px_rgba(24,69,159,0.45)]"
              : "bg-white text-[#D1D5DB]"
          }`}
        >
          Ingresar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("register")}
          className={`flex-1 h-12 sm:h-14 text-[14px] sm:text-[15px] font-semibold transition-colors ${
            !isLogin
              ? "bg-[#18459F] text-white shadow-[0_8px_18px_rgba(24,69,159,0.45)]"
              : "bg-white text-[#D1D5DB]"
          }`}
        >
          Registrarse
        </button>
      </div>

      <div className="px-5 sm:px-8 md:px-10">
        <div className="flex justify-center mb-4 sm: mb-6 mt-2">
          <img
            src={okeaLogo}
            alt="Okea Logo"
            className="h-10 sm:h-12 w-auto object-contain max-w-full"
          />
        </div>

        {isLogin ? (
          <form
            className="flex flex-col gap-3 sm:gap-4"
            onSubmit={(e) => {
              e. preventDefault();
              if (onMockLogin) {
                const email = e.target.elements.email?. value || "";
                const nameFromUser = email.split("@")[0] || "";
                onMockLogin({ email, name: nameFromUser });
              }
            }}
          >
            <div className="flex flex-col gap-1">
              <label className="text-[11px] sm:text-[12px] text-[#4B5563]">
                Correo electrónico
              </label>
              <input
                name="email"
                type="text"
                placeholder="username@gmail.com"
                className="h-9 sm:h-10 w-full rounded-full bg-[rgba(242,244,255,0.9)] px-3 sm:px-4 text-[12px] sm:text-[13px] text-[#4B5563] border border-transparent focus:outline-none focus:border-[#3056D3]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] sm:text-[12px] text-[#4B5563]">
                Contraseña
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="h-9 sm:h-10 w-full rounded-full bg-[rgba(242,244,255,0.9)] px-3 sm:px-4 pr-10 text-[12px] sm:text-[13px] text-[#4B5563] border border-transparent focus: outline-none focus:border-[#3056D3]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] flex items-center justify-center"
                >
                  {showPassword ? (
                    <EyeHideIcon color="#9CA3AF" />
                  ) : (
                    <EyeShowIcon color="#9CA3AF" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onForgotPassword}
              className="self-end text-[11px] sm:text-[12px] text-[#E46A16] font-semibold"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="submit"
              className="mt-2 sm:mt-3 h-10 sm:h-11 w-full rounded-full bg-[#18459F] text-white text-[13px] sm:text-[14px] font-semibold shadow-[0_12px_24px_rgba(24,69,159,0.45)]"
            >
              Iniciar Sesión
            </button>

            <div className="flex items-center gap-3 mt-4 sm:mt-5 mb-3 sm:mb-4">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="text-[10px] sm:text-[11px] text-[#9CA3AF]">
                Continuar con
              </span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            <div className="flex justify-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex items-center justify-center h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-white shadow-md ring-1 ring-[#E5E7EB] hover:shadow-lg transition-shadow"
              >
                <img
                  src={googleIcon}
                  alt="Google"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-white shadow-md ring-1 ring-[#E5E7EB] hover:shadow-lg transition-shadow"
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-white shadow-md ring-1 ring-[#E5E7EB] hover:shadow-lg transition-shadow"
              >
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="w-5 h-5 sm:w-6 sm: h-6 object-contain"
                />
              </button>
            </div>

            <p className="mt-2 sm:mt-3 text-center text-[11px] sm:text-[12px] text-[#6B7280]">
              ¿Aún no tienes una cuenta?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className="text-[#E46A16] font-semibold"
              >
                Regístrate gratis
              </button>
            </p>
          </form>
        ) : (
          <div className="text-[12px] sm:text-[13px] text-center text-[#6B7280] py-8">
            Aquí irá el formulario de registro (mock).
          </div>
        )}
      </div>
    </div>
  );
}
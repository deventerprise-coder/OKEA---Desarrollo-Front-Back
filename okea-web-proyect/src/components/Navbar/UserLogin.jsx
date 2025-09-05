import { AvatarNuevo, UserIcon } from "../../assets/iconos/Icons";
import { forwardRef } from "react";

const UserLogin = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="relative flex items-center justify-center px-3 py-3 rounded-full bg-[#B3C7FF66] hover:brightness-90 transition h-[40px] translate-x-[-170px] cursor-pointer"
    >
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <AvatarNuevo className="w-[40px] h-[40px] text-[#1C4390]" />
      </div>
      <span className="pl-[38px] font-poppins font-medium text-[14px] leading-[24px] tracking-[0.2px] text-[#1C4390]">
        Hola, Inicie Sesión
      </span>
    </button>
  );
});

export default UserLogin;
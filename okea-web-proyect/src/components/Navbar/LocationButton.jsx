import { LocationIcon } from "../../assets/iconos/Icons";

export default function LocationButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="ml-[-580px] flex items-center gap-[6px] px-9 py-2 rounded-full bg-[#B3C7FF66] hover:brightness-90 transition cursor-pointer"
    >
      <LocationIcon />
      <span className="font-poppins font-medium text-[14px] leading-[20px] tracking-[0.1px] text-center text-[#1C4390]">
        Ubicación
      </span>
    </button>
  );
}
import { useState } from "react";
import { TechnologyIcon, FiltroIcon, FlechaFiltro, Pedido, AyudaIcon, SoporteIcon, CheckOptionIcon, CalificacionFiltroOptionIcon,
  ModaIcon, MuebleIcon, CalzadoFilterIcon, DormitorioIcon, AccesoriosIcon, JuguetesIcon, DecoracionFilterIcon, MascotasIcon, SupermercadoFilterIcon,
  ElectrohogarIcon
} from "../../assets/iconos/Icons";
import * as filters from "../../mocks/filtersLists";

function FilterSection({ title, icon: IconComponent, children, isLight }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const iconColor = isLight ?(hover || open) ? "#fff" : "#1F3A58": "#FFFFFF";

  return (
    <div
      className={`relative flex flex-col items-stretch w-[300px] h-[40.85px] border mb-2 rounded-full justify-center px-10 transition-colors duration-700 ${isLight ? "hover:bg-[#385BAA] border-[#3333331A]" : "hover:bg-[#292272] border-[#FFFFFF4D]"} group ${open ? "bg-[#385BAA]" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button className="flex w-full h-[24.51px] bg-auto border-none px-1 py-0.5 text-sm rounded-md cursor-pointer justify-center items-center" onClick={() => setOpen(!open)}>
        <div className="flex justify-between w-full items-center">
          <span className={`flex items-center text-center font-['Inter',sans-serif] font-normal group-hover:text-white transition-colors duration-300 ${open ? "text-white" : ""} ${isLight ? "text-[#1F3A58]" : "text-white"}`} >
            {IconComponent && (
              <span className="mr-1.5 flex items-center">
                <IconComponent stroke={iconColor} className="transition-all duration-300" />
              </span>
            )}{" "}
            {title}
          </span>
          <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <FlechaFiltro fill={iconColor}/>
          </span>
        </div>
      </button>
      {open && <div className={`absolute left-1/2 top-12 w-[330px] h-[180px] backdrop-blur-[8px] rounded-[5px] shadow-lg z-10 border border-[#1F3A5880] text-sm flex flex-col items-center transform -translate-x-1/2 justify-center ${isLight ? "bg-white/10" : "bg-[#292272B2]"}`}>{children}</div>}
    </div>
  );
}

export function CalificacionOptions({calificacion,cantidad, width = 20, height = 18}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: calificacion }, (_, index) => (
        <CalificacionFiltroOptionIcon key={index} width={width} height={height} />
      ))} {cantidad && <span>{cantidad}</span>}
    </div>
  );
}

function OptionFilter({title, isLight}) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <div className={`w-[23px] h-[23px] rounded-full border ${isLight ? "border-[#1F3A58CC]" : "border-white"} flex items-center justify-center ${isSelected ? "bg-[#1F3A58]" : "bg-transparent"}`} onClick={() => setIsSelected(!isSelected)}>
        {isSelected && <CheckOptionIcon />}
      </div>
      <span className={`font-regular text-[12px] ${isLight ? "text-[#1F3A58]" : "text-white"}`} style={{fontFamily: 'Inter'}}>{title}</span>
    </div>
  );
}

function UserOptions({ title, icon: IconComponent, isLight }) {

  const [hover, setHover] = useState(false);

  const iconColor = isLight ? hover ? "#FFF" : "#1F3A58": "#FFFFFF";
  const colorText = isLight ? hover ? "#FFFFFF": "#1F3A58"  : "#FFFFFF";

  return (
    <div className={`flex flex-row items-center w-[300px] h-[40.85px] border mb-2 rounded-full pl-[20%] ${isLight ? "hover:bg-[#385BAA] border-gray-200" : "hover:bg-[#292272] border-[#FFFFFF33]"} transition-all duration-700`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <section className="h-[24.51px] border-none px-1 py-0.5 text-sm rounded-md cursor-pointer items-center bg-transparent">
          <span className="flex items-center text-center text-sm font-['Inter',sans-serif] font-normal" style={{ color: colorText, transition: 'color 0.5s' }}>
          {IconComponent && (
              <span className="mr-6 flex items-center">
                <IconComponent fill={iconColor}/>
              </span>
            )}{" "} 
            {title}
            </span>
      </section>
    </div>
  );
}

export function SidebarMenu({categoria, subcategoria, isLight}) {

  const filtroActual = categoria === "Tecnología" ? filters.filtrosTec
    : categoria === "Muebles y Organización" ? filters.filtrosMuebles
    : categoria === "Calzado" ? filters.filtrosCalzado
    : categoria === "Dormitorio y Baños" ? filters.filtrosDormitorio
    : categoria === "Accesorios de Moda" ? filters.filtrosAccesorios
    : categoria === "Salud y Bienestar" ? filters.filtrosSalud
    : categoria === "Juguetes" ? filters.filtrosJuguetes
    : categoria === "Decoración" ? filters.filtrosDecoracion
    : categoria === "Mascotas" ? filters.filtrosMascotas
    : categoria === "Supermercado" ? filters.filtrosSupermercado
    : categoria === "Electrohogar" ? filters.filtrosElectrohogar
    : categoria === "Moda Hombre" ? filters.filtrosModaHombre
    : categoria === "Moda Mujer" ? filters.filtrosModaMujer
    : null;

    const Icon = categoria === "Tecnología" ? TechnologyIcon
    : categoria === "Muebles y Organización" ? MuebleIcon
    : categoria === "Calzado" ? CalzadoFilterIcon
    : categoria === "Dormitorio y Baños" ? DormitorioIcon
    : categoria === "Accesorios de Moda" ? AccesoriosIcon
    : categoria === "Salud y Bienestar" ? SoporteIcon
    : categoria === "Juguetes" ? JuguetesIcon
    : categoria === "Decoración" ? DecoracionFilterIcon
    : categoria === "Mascotas" ? MascotasIcon
    : categoria === "Supermercado" ? SupermercadoFilterIcon
    : categoria === "Electrohogar" ? ElectrohogarIcon
    : categoria === "Moda Hombre" ? ModaIcon
    : categoria === "Moda Mujer" ? ModaIcon
    : null;

  const colorText= isLight ? "#1F3A58" : "#FFFFFF";
  return (
    <aside className={`flex flex-col items-center w-[380px] h-[980px] border ${isLight ? "border-[#3333331A]" : "border-[#FFFFFF33]"} rounded-2xl px-2 py-4 font-sans ml-[54px] justify-between mr-9`}>
      <div className="flex flex-col items-center justify-center w-[330px] mb-3"> 
        <button className={`flex items-center justify-center text-white ${isLight ? "bg-[#385BAA]" : "bg-[#292272]"} w-[330px] h-12 rounded-[10px] p-2.5 ${categoria === "Tecnología" ? "text-[18px]" : "text-[16px]"} tracking-wide font-['Inter',sans-serif] font-normal`}> <Icon color="#fff" fill="#fff"/> <span className="ml-3">{categoria}</span></button>
          <p className="flex items-center justify-center w-[326px] h-[34.72px] mt-[15px] text-base text-center font-['Inter',sans-serif] font-normal" style={{ color: colorText, transition: 'color 0.5s' }}>{subcategoria}</p>
          <hr className={`border-t ${isLight ? "border-gray-200" : "border-[#FFFFFF33]"} my-2 w-[90%] mx-auto transition-all duration-500`} />
          <p className="flex items-center justify-center w-[326px] h-[34.72px] mt-[15px] text-base text-center font-['Inter',sans-serif] font-normal" style={{ color: colorText, transition: 'color 0.5s' }}><span style={{ marginRight: '15px' }}>Filtros</span><FiltroIcon color={colorText} /></p>
          <hr className={`border-t ${isLight ? "border-gray-200" : "border-[#FFFFFF33]"} my-2 w-[90%] mx-auto transition-all duration-500`} />
      </div>

      <div className="flex flex-col items-center justify-center h-[60%] w-full gap-[13px]">
        {Object.entries(filtroActual).map(([key, filtro]) => (
        <FilterSection key={key} title={filtro.nombre} icon={filtro.icon} isLight={isLight}>
          <div className={`flex flex-col ${key === 'calificacion' ? '' : 'gap-2'}`}>
            {filtro.opciones.map((op) => (
              <label key={op.etiqueta} className="flex items-center font-['Inter',sans-serif] font-normal text-[15px] cursor-pointer mb-2 " style={{ color: colorText, transition: 'color 0.5s' }}>
                <OptionFilter title={op.etiqueta} isLight={isLight} />
              </label>
            ))}
          </div>
        </FilterSection>
      ))}
      </div>

      <div className="flex flex-col items-center justify-center w-[330px] mb-3">
        <hr className={`border-t ${isLight ? "border-gray-200" : "border-[#FFFFFF33]"} my-2 w-[90%] mx-auto transition-all duration-500`} style={{marginBottom: '20px'}}/>
        <UserOptions title="Mis pedidos" icon={Pedido} isLight={isLight}/>
        <UserOptions title="Centro de ayuda" icon={AyudaIcon} isLight={isLight}/>
        <UserOptions title="Soporte técnico" icon={SoporteIcon} isLight={isLight}/>
      </div>
    </aside>
  );
}

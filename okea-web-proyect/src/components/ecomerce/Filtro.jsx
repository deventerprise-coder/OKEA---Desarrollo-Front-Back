import { useState } from "react";
import { TechnologyIcon, FiltroIcon, FlechaFiltro, Pedido, AyudaIcon, SoporteIcon, CheckOptionIcon, CalificacionFiltroOptionIcon,
  ModaIcon, MuebleIcon, CalzadoFilterIcon, DormitorioIcon, AccesoriosIcon, JuguetesIcon, DecoracionFilterIcon, MascotasIcon, SupermercadoFilterIcon,
  ElectrohogarIcon
} from "../../assets/iconos/Icons";
import * as filters from "../../mocks/filtersLists";

function FilterSection({ title, icon: IconComponent, children }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const iconColor = (hover || open) ? "#fff" : "#1F3A58";

  return (
    <div
      className={`relative flex flex-col items-stretch w-[300px] h-[40.85px] border border-gray-200 mb-2 rounded-full justify-center px-10 transition-colors duration-700 hover:bg-[#385BAA] group ${open ? "bg-[#385BAA]" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button className="flex w-full h-[24.51px] bg-auto border-none px-1 py-0.5 text-sm rounded-md cursor-pointer justify-center items-center" onClick={() => setOpen(!open)}>
        <div className="flex justify-between w-full items-center">
          <span className={`flex items-center text-center font-['Inter',sans-serif] font-normal text-[#1F3A58] group-hover:text-white transition-colors duration-300 ${open ? "text-white" : ""}`}>
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
      {open && <div className="absolute left-1/2 top-12 w-[330px] h-[180px] bg-white/10 backdrop-blur-[8px] rounded-[5px] shadow-lg z-10 border border-[#1F3A5880] text-sm flex flex-col items-center transform -translate-x-1/2 justify-center">{children}</div>}
    </div>
  );
}

export function CalificacionOptions({calificacion,cantidad}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: calificacion }, (_, index) => (
        <CalificacionFiltroOptionIcon key={index} />
      ))} <span>{cantidad}</span>
    </div>
  );
}

function OptionFilter({title}) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <div className={`w-[23px] h-[23px] rounded-full border border-[#1F3A58CC] flex items-center justify-center ${isSelected ? "bg-[#1F3A58]" : "bg-transparent"}`} onClick={() => setIsSelected(!isSelected)}>
        {isSelected && <CheckOptionIcon />}
      </div>
      <span className="font-regular text-[12px] text-[#1F3A58]" style={{fontFamily: 'Inter'}}>{title}</span>
    </div>
  );
}

function UserOptions({ title, icon: IconComponent }) {

  const [hover, setHover] = useState(false);

  const iconColor = hover ? "#FFF" : "#1F3A58";

  return (
    <div className="flex flex-row items-center w-[300px] h-[40.85px] border border-gray-200 mb-2 rounded-full pl-[20%] bg-gray-50 text-[#1F3A58] hover:bg-[#385BAA] hover:text-white transition-all duration-700" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <section className="h-[24.51px] border-none px-1 py-0.5 text-sm rounded-md cursor-pointer items-center bg-transparent">
          <span className="flex items-center text-center text-sm font-['Inter',sans-serif] font-normal">
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

export function SidebarMenu({categoria, subcategoria}) {

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

  return (
    <aside className="flex flex-col items-center w-[380px] h-[980px] border border-gray-200 rounded-2xl px-2 py-4 bg-white font-sans ml-[54px] justify-between mr-9">
      <div className="flex flex-col items-center justify-center w-[330px] mb-3"> 
        <button className={`flex items-center justify-center text-white bg-[#385BAA] w-[330px] h-12 rounded-[10px] p-2.5 ${categoria === "Tecnología" ? "text-[18px]" : "text-[16px]"} tracking-wide font-['Inter',sans-serif] font-normal`}> <Icon color="#fff" fill="#fff"/> <span className="ml-3">{categoria}</span></button>
          <p className="flex items-center justify-center w-[326px] h-[34.72px] mt-[15px] text-base text-[#1F3A58] text-center font-['Inter',sans-serif] font-normal">{subcategoria}</p>
          <hr className="border-t border-gray-200 my-2 w-[90%] mx-auto" />
          <p className="flex items-center justify-center w-[326px] h-[34.72px] mt-[15px] text-base text-[#1F3A58] text-center font-['Inter',sans-serif] font-normal"><span style={{ marginRight: '15px' }}>Filtros</span><FiltroIcon/></p>
          <hr className="border-t border-gray-200 my-2 w-[90%] mx-auto" />
      </div>

      <div className="flex flex-col items-center justify-center h-[60%] w-full gap-[13px]">
        {Object.entries(filtroActual).map(([key, filtro]) => (
        <FilterSection key={key} title={filtro.nombre} icon={filtro.icon}>
          <div className={`flex flex-col ${key === 'calificacion' ? '' : 'gap-2'}`}>
            {filtro.opciones.map((op) => (
              <label key={op.etiqueta} className="flex items-center font-['Inter',sans-serif] font-normal text-[15px] text-[#1F3A58] cursor-pointer mb-2">
                <OptionFilter title={op.etiqueta}/>
              </label>
            ))}
          </div>
        </FilterSection>
      ))}
      </div>

      <div className="flex flex-col items-center justify-center w-[330px] mb-3">
        <hr className="border-t border-gray-200 my-2 w-[90%] mx-auto" style={{marginBottom: '20px'}}/>
        <UserOptions title="Mis pedidos" icon={Pedido}/>
        <UserOptions title="Centro de ayuda" icon={AyudaIcon}/>
        <UserOptions title="Soporte técnico" icon={SoporteIcon}/>
      </div>
    </aside>
  );
}

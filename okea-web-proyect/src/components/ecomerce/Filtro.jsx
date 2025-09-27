import { useState } from "react";
import { TechnologyIcon, FiltroIcon, MarcaIcon, FlechaFiltro, Pedido, AyudaIcon, SoporteIcon,
  PrecioIcon, ColorIcon, GeneracionIcon, TamanoIcon, PesoIcon, CalificacionIcon, RAguaIcon, SOIcon, CheckOptionIcon
} from "../../assets/iconos/Icons";

function FilterSection({ title, icon: IconComponent, children }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const iconColor = (hover || open) ? "#fff" : "#1F3A58";

  return (
    <div
      className={`filter-section${open ? " active" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button className="filter-header" onClick={() => setOpen(!open)}>
        <div className="filter-header-content">
          <span className="filter-title">
            {IconComponent && (
              <span className="filter-icon">
                <IconComponent stroke={iconColor} className="filtro-str" />
              </span>
            )}{" "}
            {title}
          </span>
          <span className={`arrow ${open ? "open" : ""}`}>
            <FlechaFiltro fill={iconColor}/>
          </span>
        </div>
      </button>
      {open && <div className="filter-content">{children}</div>}
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
    <div className="option-section" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <section className="option-header">
          <span className="option-title">
          {IconComponent && (
              <span className="filter-icon">
                <IconComponent fill={iconColor}/>
              </span>
            )}{" "} 
            {title}
            </span>
      </section>
    </div>
  );
}

export function SidebarMenu() {
  const filtros = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    sistemaOperativo: {
      icon: SOIcon,
      nombre: "Sistema Operativo",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    generacion: {
      icon: GeneracionIcon,
      nombre: "Generación",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    rAgua: {
      icon: RAguaIcon,
      nombre: "Resistente al agua",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "samsung", etiqueta: "Samsung" },
        { valor: "apple", etiqueta: "Apple" },
        { valor: "xiaomi", etiqueta: "Xiaomi" },
      ],
    },
  };
  
  return (
    <aside className="sidebar mr-9">
      <div className="sidebar-container"> 
        <button className="category-btn"> <TechnologyIcon color="#fff" className="icon" /> Tecnología</button>
          <p className="subtitle">Celulares</p>
          <hr className="divider" />
          <p className="subtitle"><span style={{ marginRight: '15px' }}>Filtros</span><FiltroIcon/></p>
          <hr className="divider" />
      </div>

      <div className="filters-container">
        {Object.entries(filtros).map(([key, filtro]) => (
        <FilterSection key={key} title={filtro.nombre} icon={filtro.icon}>
          <div className="radio-group flex flex-col gap-2">
            {filtro.opciones.map((op) => (
              <label key={op.valor} className="radio-label">
                <OptionFilter title={op.etiqueta}/>
                {/* <input
                  type="radio"
                  name={key}
                  value={op.valor}
                  className="radio-input"
                />
                {op.etiqueta} */}
              </label>
            ))}
          </div>
        </FilterSection>
      ))}
      </div>

      <div className="sidebar-container">
        <hr className="divider" style={{marginBottom: '20px'}}/>
        <UserOptions title="Mis pedidos" icon={Pedido}/>
        <UserOptions title="Centro de ayuda" icon={AyudaIcon}/>
        <UserOptions title="Soporte técnico" icon={SoporteIcon}/>
      </div>
    
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 380px;
          height: 980px;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 16px 8px;
          background: #fff;
          font-family: sans-serif;
          margin-left: 54px;
          justify-content: space-between;
        }

        .sidebar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 330px;
          margin-bottom: 12px;
        }

        .divider {
          border-top: 1px solid #eee;
          margin: 8px 0;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
        
        .divider-const {
          border-top: 1px solid #eee;
          margin: 8px 0;
          width: 83%;
          margin-left: auto;
          margin-right: auto;
        }

        .category-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          color : #fff;
          background: #385BAA;
          width: 330px;
          height: 48px;
          border-radius: 10px;
          padding: 10px;
          font-size: 18px;
          letter-spacing: 0.5px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-style: normal;
        }
        
       
        .subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 326px;
          height: 34.72px;
          margin-top: 15px;
          font-size: 16px;
          color: #1F3A58;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-style: normal;
        }

        .filter-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 300px;
          height: 40.85px;
          border: 1px solid #eee;
          margin-bottom: 8px;
          border-radius: 100px;
          justify-content: center;
          padding: 0px 40px;
        }

        .filter-header {
          display: flex;
          width: 100%;
          height: 24.51px;
          background: auto;
          border: none;
          padding: 2px 3px;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          justify-content: center;
          align-items: center; 
        }

        .filter-icon {
          margin-right: 6px;
          display: flex;
          align-items: center;
        }

        .filter-header-content {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        }

        .option-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 300px;
          height: 40.85px;
          border: 1px solid #eee;
          margin-bottom: 8px;
          border-radius: 100px;
          padding-left: 20%;
          background: #f9f9f9;
          color: #1F3A58;
        }

        .option-header {
          height: 24.51px;
          border: none;
          padding: 2px 3px;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          align-items: center; 
        }

        .option-icon {
          margin-right: 25px;
          display: flex;
          align-items: center;
        }

      

        .option-title {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-style: normal;
        }

        .category-btn .icon {
          margin-right: 15px;
        }

        .filter-title {
          display: flex;
          align-items: center;
          color: #1F3A58;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-style: normal;
        }

        .arrow {
          transition: transform 0.3s;
        }
        .arrow.open {
          transform: rotate(180deg);
        }

        .filter-content {
          position: absolute;
          left: 50%;
          top: 48px;
          width: 330px;
          height: 180px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(44,80,158,0.08);
          z-index: 10;
          border: 1px solid rgba(31, 58, 88, 1) ;
          padding: 8px 12px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          justify-content: center;
        }

        .filter-content label {
          display: block;
          margin-bottom: 6px;
        }

        select {
          width: 100%;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .extra-links {
          margin-top: 16px;
        }

        .extra-links button {
          display: block;
          width: 100%;
          background: #f5f5f5;
          border: none;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .extra-links button:hover {
          background: #e5e5e5;
        }

        .filters-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60%;
          width: 100%;
          gap: 13px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: 15px;
          color: #1F3A58;
          cursor: pointer;
          margin-bottom: 8px;
        }

        .radio-input {
          accent-color: #385BAA;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 8px;
        }

        .filter-section:hover{
          background: #385BAA;
          transition: background-color 0.7s;
        }

        .filter-section:hover .filter-title {
          color: #fff;
          transition: color 0.4s;
        }

         .filter-section.active {
          background: #385BAA;
        }

        .filter-section.active .filter-title {
          color: #fff;
        }

        .option-header {
          background: transparent;
        }

        .option-section:hover {
          background: #385BAA;
          color: #fff;
          transition: background-color 0.7s, color 0.4s;
        }

        .filtro-str{
          transition: stroke 0.4s, fill 0.4s;
        }

      `}</style>
    </aside>
  );
}

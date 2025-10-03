import PanelTecnologia from "../../assets/imagenes/categorias/panel/PanelTecnologia.png";
import PanelMuebles from "../../assets/imagenes/categorias/panel/PanelMuebles.png";
import PanelCalzado from "../../assets/imagenes/categorias/panel/PanelCalzado.png";
import PanelDormitorio from "../../assets/imagenes/categorias/panel/PanelDormitorio.png";
import PanelAccesorios from "../../assets/imagenes/categorias/panel/PanelAccesorios.png";
import PanelDecoracion from "../../assets/imagenes/categorias/panel/PanelDecoracion.png";
import PanelElectrohogar from "../../assets/imagenes/categorias/panel/PanelElectrohogar.png";
import PanelMascotas from "../../assets/imagenes/categorias/panel/PanelMascotas.png";
import PanelModaH from "../../assets/imagenes/categorias/panel/PanelModaH.png";
import PanelModaM from "../../assets/imagenes/categorias/panel/PanelModaM.png";
import PanelSalud from "../../assets/imagenes/categorias/panel/PanelSalud.png";
import PanelSupermercado from "../../assets/imagenes/categorias/panel/PanelSupermercado.png";
import PanelJuguetes from "../../assets/imagenes/categorias/panel/PanelJuguetes.png";
import MarcasJuguetes from "../../assets/imagenes/categorias/panel/MarcasJuguetes.png";
import apple from "../../assets/imagenes/categorias/panel/apple.png";
import { useState } from "react";

function ModelosDestcados({nombre, imagen, categoria}) {
    const [isHovered, setIsHovered] = useState(false);
   return (
        <div
            className="flex items-center transition-all duration-300 ease-in-out ml-[5px]"
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            <button
            className={`z-20 flex-shrink-0 w-[123px] h-[123px] rounded-full bg-white text-[#1C4390] font-popins-bold text-[20px] border-[3px] border-transparent overflow-hidden items-center justify-center flex transform transition-transform duration-300 ease-in-out ${
                isHovered ? "-translate-x-10" : ""
            }`}
            >
            <img
                src={imagen}
                alt={nombre}
                className={`${categoria === "Tecnología" ? "w-[110px] h-[110px]" :  "w-[123px] h-[123px]"} object-contain`}
            />
            </button>
            
            <div className={`z-10 overflow-hidden transition-[gap, opacity] duration-300 fade-in ${
                isHovered 
                    ? "w-[310px] opacity-100 ml-[-143px]" 
                    : "w-0 opacity-0"
            }`}>
                <div className="w-[310px] h-[120px] rounded-[100px] flex items-center justify-center overflow-hidden relative">
                    <img
                    src={imagen}
                    alt={nombre}
                    className="w-[130px] h-[310px] object-cover transform rotate-90"
                    />
                    <span className="absolute inset-0 z-10 text-white font-bold text-[16px] flex items-center justify-center backdrop-blur-xl pl-20"
                        style={{ fontFamily: 'Inter' }}>
                        {nombre}
                    </span>
                </div>
            </div> 
        </div>
    );
}
export function Panel({Categoria, destacados}) {
    const imagenPanel= Categoria === "Tecnología" ? PanelTecnologia 
    : Categoria === "Muebles y Organización" ? PanelMuebles 
    : Categoria === "Calzado" ? PanelCalzado
    : Categoria === "Salud y Bienestar" ? PanelSalud
    : Categoria === "Supermercado" ? PanelSupermercado
    : Categoria === "Dormitorio y Baños" ? PanelDormitorio
    : Categoria === "Accesorios de Moda" ? PanelAccesorios
    : Categoria === "Decoración" ? PanelDecoracion
    : Categoria === "Electrohogar" ? PanelElectrohogar
    : Categoria === "Mascotas" ? PanelMascotas
    : Categoria === "Moda Hombre" ? PanelModaH
    : Categoria === "Moda Mujer" ? PanelModaM
    :Categoria === "Juguetes" ? PanelJuguetes
    : null;
    return(
        <div className={`w-[1924px] h-[817px] relative bg-cover ${Categoria === "Salud y Bienestar" ? "bg-[center_top_90%]" :  Categoria === "Mascotas" ? "bg-[center_right_20%]" : "bg-[center_top_44%]"}`} style={{backgroundImage: `url(${imagenPanel})`}}>
            {Categoria === "Tecnología" && (
                <div className="w-[965px] h-[200px] flex absolute top-[50px] right-[25%] justify-center items-center">
                    <img src={apple} alt="imagen marca" className="w-[117px] h-[140px] object-contain mr-10 mb-6"/>
                    <span className="text-white text-[160px] font-bold" style={{fontFamily: 'Inter'}}>iPhone 16</span>
                </div>
            )}
            {Categoria === "Dormitorio y Baños" && (
                <div>
                    <div className="w-[453px] h-[301px] flex absolute top-[105px] left-[8%] justify-center items-center bg-[#D9D9D966] backdrop-blur-[40px] rotate-[-18deg] relative">
                        <span className="text-white text-[60px] font-['Poppins',sans-serif] font-medium text-center" style={{WebkitTextStroke: '1px #1F3A5880'}}>Vivir como soñamos</span>
                        <div className="absolute w-[73px] h-[29px] bg-[#D9D9D999] backdrop-blur-[50px] top-0 left-[-20px] rotate-[-40deg]"></div>
                        <div className="absolute w-[73px] h-[29px] bg-[#D9D9D999] backdrop-blur-[50px] top-0 right-[-20px] rotate-[40deg]"></div>
                        <div className="absolute w-[73px] h-[29px] bg-[#D9D9D999] backdrop-blur-[50px] bottom-0 left-[-20px] rotate-[40deg]"></div>
                        <div className="absolute w-[73px] h-[29px] bg-[#D9D9D999] backdrop-blur-[50px] bottom-0 right-[-20px] rotate-[-40deg]"></div>
                    </div>
                    <div className="w-[200px] h-[200px] absolute top-[66px] right-[18%] bg-[#EB5A45] border-[3px] border-[#33333333] rounded-full flex items-center justify-center">
                        <span className="text-white text-[60px] font-medium text-center" style={{fontFamily: 'Inter'}}>%50</span>
                    </div>      
                </div>
            )}
            {Categoria === "Juguetes" && (
                <div className="flex flex-col absolute top-[40%] right-[3%] justify-center items-center">
                    <span className="text-white text-[25px] font-[Poppins, sans-serif] font-light">En estas Marcas:</span>
                    <img src={MarcasJuguetes} alt="imagen marca" className="w-[440px] h-[194px] object-contain mt-15"/>  
                </div>
            )}
            <section className="absolute bottom-[-15%] w-full h-[200px] bg-[#33333333] backdrop-blur-xl flex items-center gap-30">
                {destacados.map((item, index) => (
                    index === 0 ? (
                        <div className="ml-60" key={index}>
                            <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria}/>
                        </div>
                    ) : (
                         <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria}/>
                    )
                ))}
            </section>
        </div>
    )
}
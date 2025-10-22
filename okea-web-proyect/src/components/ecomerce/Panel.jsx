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
import { useState, useRef, useEffect } from "react";

function ModelosDestcados({nombre, imagen, categoria}) {
    const [isHovered, setIsHovered] = useState(false);
   return (
        <div
            className={`flex items-center transition-all duration-300 ease-in-out ml-[5px]`}
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="flex flex-col justify-center items-center lg:items-start">
                 <button
                    className={`z-20 flex-shrink-0 w-[80px] h-[80px] xl:w-[123px] xl:h-[123px] lg:w-[90px] lg:h-[90px] rounded-full bg-white text-[#1C4390] font-popins-bold text-[20px] border-[3px] border-transparent overflow-hidden items-center justify-center flex transform transition-translate duration-500 fade-in ${
                        isHovered ? "lg:-translate-x-10" : ""
                    }`}
                    >
                    <img
                        src={imagen}
                        alt={nombre}
                        className={`${categoria === "Tecnología" ? "w-[110px] h-[110px]" :  "w-[123px] h-[123px]"} object-contain`}
                    />
                </button>
                <span className={`lg:hidden mt-2 text-center text-[12px] font-bold text-[#333333]`} style={{fontFamily: 'Poppins, sans-serif'}}>
                    {nombre}
                </span>
            </div>
           

            <div className={`z-10 overflow-hidden transition-[gap, opacity] duration-500 fade-in xl:ml-[-143px] lg:ml-[-130px] ${
                isHovered
                    ? "w-0 opacity-0 lg:w-[310px] lg:opacity-100 xl:mr-[-180px] lg:mr-[-180px]"
                    : "w-0 opacity-0"
            }`}>
                <div className="xl:w-[310px] xl:h-[120px] lg:w-[250px] lg:h-[93px] rounded-[100px] flex items-center justify-center overflow-hidden relative">
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev === 0) {
                    const itemsVisible = window.innerWidth < 640 ? 3 : 4;
                    const maxScroll = Math.max(0, destacados.length - itemsVisible);
                    return maxScroll;
                } else {
                    return 0;
                }
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [destacados.length]);
    return(
        <div className={`w-full md:h-[817px] h-[203px] sm:h-[300px] relative bg-cover bg-center ${Categoria === "Salud y Bienestar" ? "bg-[center_top_90%]" :  Categoria === "Mascotas" ? "bg-[center_right_20%]" : "bg-[center_top_44%]"}`} style={{backgroundImage: `url(${imagenPanel})`}}>
            {Categoria === "Tecnología" && (
                <div className="w-[965px] h-[200px] flex absolute top-[10%] md:top-[27%] xl:top-[20%] lg:top-[24%] 2xl:top-[12%] left-1/2 transform -translate-x-1/2 md:-translate-y-[30%] xl:-translate-y-[20%] -translate-y-[40%] justify-center items-center">
                    <img src={apple} alt="imagen marca" className="2xl:w-[117px] 2xl:h-[140px] xl:w-[100px] xl:h-[120px] lg:w-[80px] lg:h-[100px] md:w-[60px] md:h-[80px] sm:w-[35px] sm:h-[40px] w-[22px] h-[26px] object-contain mr-[30px] mb-[9px] 2xl:mb-6"/>
                    <span className="text-white 2xl:text-[160px] xl:text-[120px] lg:text-[100px] md:text-[80px] text-[35px] font-bold" style={{fontFamily: 'Inter'}}>iPhone 16</span>
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
            <section className="absolute bottom-[-65%] sm:bottom-[-44%] md:bottom-[-15%] w-full h-[160px] sm:h-[200px] bg-gradient-to-b from-[#385BAA] to-[#FFFFFF] lg:bg-none lg:bg-[#33333333] backdrop-blur-[60px] flex items-center gap-3 md:justify-center lg:justify-start overflow-hidden">
                <div className="hidden md:flex items-center gap-3 w-full md:justify-center lg:justify-start">
                    {destacados.map((item, index) => (
                        index === 0 ? (
                            <div className="xl:ml-[15%] lg:ml-[10%] md:ml-0" key={index}>
                                <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria}/>
                            </div>
                        ) : (
                            <div className="lg:ml-[12%]" key={index}>
                                <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria}/>
                            </div>
                        )
                    ))}
                </div>
                <div className="md:hidden w-full overflow-hidden">
                    <div 
                        className="flex items-center gap-3 transition-transform duration-1000 ease-in-out"
                        ref={scrollContainerRef}
                        style={{ transform: `translateX(-${currentIndex * 120}px)` }}
                    >
                        {destacados.map((item, index) => (
                            <div 
                                className="flex-shrink-0 ml-[4%] first:ml-[4%]" 
                                key={index}
                            >
                                <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria}/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
import PanelTecnologia from "../../assets/imagenes/Categorias/Panel/PanelTecnologia.png";
import PanelMuebles from "../../assets/imagenes/Categorias/Panel/PanelMuebles.png";
import PanelCalzado from "../../assets/imagenes/Categorias/Panel/PanelCalzado.png";
import PanelDormitorio from "../../assets/imagenes/Categorias/Panel/PanelDormitorio.png";
import PanelAccesorios from "../../assets/imagenes/Categorias/Panel/PanelAccesorios.png";
import PanelDecoracion from "../../assets/imagenes/Categorias/Panel/PanelDecoracion.png";
import PanelElectrohogar from "../../assets/imagenes/Categorias/Panel/PanelElectrohogar.png";
import PanelMascotas from "../../assets/imagenes/Categorias/Panel/PanelMascotas.png";
import PanelModaH from "../../assets/imagenes/Categorias/Panel/PanelModaH.png";
import PanelModaM from "../../assets/imagenes/Categorias/Panel/PanelModaM.png";
import PanelSalud from "../../assets/imagenes/Categorias/Panel/PanelSalud.png";
import PanelSupermercado from "../../assets/imagenes/Categorias/Panel/PanelSupermercado.png";
import PanelJuguetes from "../../assets/imagenes/Categorias/Panel/PanelJuguetes.png";
import { useState } from "react";

function ModelosDestcados({nombre, imagen, categoria, isLight}) {
    const [isHovered, setIsHovered] = useState(false);
   return (
        <div
            className={`flex items-center transition-all duration-300 ease-in-out ml-[5px]`}
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="flex flex-col justify-center items-center lg:items-start">
                 <button
                    className={`z-20 flex-shrink-0 w-[80px] h-[80px] 2xl:w-[123px] 2xl:h-[123px] xl:w-[100px] xl:h-[100px] lg:w-[90px] lg:h-[90px] rounded-full bg-white text-[#1C4390] font-popins-bold text-[20px] border-[3px] border-transparent overflow-hidden items-center justify-center flex transform transition-translate duration-500 fade-in ${
                        isHovered ? "lg:-translate-x-10" : ""
                    }`}
                    >
                    <img
                        src={imagen}
                        alt={nombre}
                        className={`${categoria === "Tecnología" ? "w-[110px] h-[110px]" :  "w-[123px] h-[123px]"} object-contain`}
                    />
                </button>
                <span className={`lg:hidden mt-2 text-center text-[12px] font-bold ${isLight ? "text-[#333333]" : "text-white"}`} style={{fontFamily: 'Poppins, sans-serif'}}>
                    {nombre}
                </span>
            </div>
           

            <div className={`z-10 overflow-hidden transition-[gap, opacity] duration-500 fade-in xl:ml-[-143px] lg:ml-[-130px] ${
                isHovered
                    ? "w-0 opacity-0 lg:w-[310px] lg:opacity-100 xl:mr-[-180px] lg:mr-[-180px]"
                    : "w-0 opacity-0"
            }`}>
                <div className="2xl:w-[310px] 2xl:h-[120px] xl:w-[290px] xl:h-[97px] lg:w-[250px] lg:h-[93px] rounded-[100px] flex items-center justify-center overflow-hidden relative">
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
export function Panel({Categoria, destacados, isLight}) {
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

    const getBackgroundConfig = (categoria) => {
        switch(categoria) {
            case "Calzado":
            case "Moda Hombre":
            case "Moda Mujer":
            case "Tecnología":
            case "Accesorios de Moda":
            case "Electrohogar":
            case "Decoración":   
                return {
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                };
            case "Juguetes":
            case "Supermercado":
                return {
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                };
            case "Salud y Bienestar":
                return {
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top 90%',
                };
            case "Mascotas":
                return {
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right 20%',
                };
            case "Dormitorio y Baños":
            case "Muebles y Organización":
                return {
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top 44%',
                };
            default:
                return {
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                };
        }
    };

    const backgroundConfig = getBackgroundConfig(Categoria);

    return(
        <div className="w-full max-w-full relative">
            <div className="w-full h-[330px] md:h-[430px] lg:h-[540px] xl:h-[680px] 2xl:h-[817px] relative overflow-hidden">
                <div 
                    className="absolute inset-0 w-full h-full bg-no-repeat"
                    style={{
                        backgroundImage: `url(${imagenPanel})`,
                        backgroundSize: backgroundConfig.backgroundSize,
                        backgroundPosition: backgroundConfig.backgroundPosition,
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                <div className="relative w-full h-full">
            {Categoria === "Dormitorio y Baños" && (
                <div className="w-full max-w-full px-4">
                    <div className="max-w-[453px] min-w-[117px] w-[30%] max-h-[301px] min-h-[78px] xl:h-[301px] lg:h-[270px] md:h-[200px] sm:h-[120px] flex absolute md:top-[105px] top-[30px] left-[8%] justify-center items-center bg-[#D9D9D966] backdrop-blur-[40px] rotate-[-18deg] relative">
                        <span className="text-white 2xl:text-[60px] xl:text-[50px] lg:text-[40px] md:text-[30px] text-[18px] font-['Poppins',sans-serif] font-medium text-center" style={{WebkitTextStroke: '1px #1F3A5880'}}>Vivir como soñamos</span>
                        <div className="absolute lg:w-[73px] lg:h-[29px] md:w-[45px] md:h-[22px] sm:w-[30px] sm:h-[16px] w-[27px] h-[12px] bg-[#D9D9D999] backdrop-blur-[50px] top-0 md:left-[-20px] left-[-13px] rotate-[-40deg]"></div>
                        <div className="absolute lg:w-[73px] lg:h-[29px] md:w-[45px] md:h-[22px] sm:w-[30px] sm:h-[16px] w-[27px] h-[12px] bg-[#D9D9D999] backdrop-blur-[50px] top-0 md:right-[-20px] right-[-13px] rotate-[40deg]"></div>
                        <div className="absolute lg:w-[73px] lg:h-[29px] md:w-[45px] md:h-[22px] sm:w-[30px] sm:h-[16px] w-[27px] h-[12px] bg-[#D9D9D999] backdrop-blur-[50px] bottom-0 md:left-[-20px] left-[-13px] rotate-[40deg]"></div>
                        <div className="absolute lg:w-[73px] lg:h-[29px] md:w-[45px] md:h-[22px] sm:w-[30px] sm:h-[16px] w-[27px] h-[12px] bg-[#D9D9D999] backdrop-blur-[50px] bottom-0 md:right-[-20px] right-[-13px] rotate-[-40deg]"></div>
                    </div>
                    <div className="max-w-[200px] max-h-[200px] xl:w-[200px] xl:h-[200px] lg:w-[170px] lg:h-[170px] md:w-[140px] md:h-[140px] sm:w-[100px] sm:h-[100px] w-[52px] h-[52px] absolute md:top-[66px] xl:right-[18%] top-[30px] right-[10%] bg-[#EB5A45] border-[3px] border-[#33333333] rounded-full flex items-center justify-center">
                        <span className="text-white xl:text-[60px] lg:text-[47px] md:text-[37px] sm:text-[27px] text-[15px] font-medium text-center" style={{fontFamily: 'Inter'}}>%50</span>
                    </div>      
                </div>
            )}
            </div>
            </div>
            <section className={`w-full h-[200px] sm:h-[200px] bg-gradient-to-b ${isLight ? "from-[#385BAA] to-[#FFFFFF]": "from-[#120F31] to-[#292272]"} lg:bg-none lg:bg-[#33333333] lg:backdrop-blur-[60px] md:backdrop-blur-[40px] flex items-center gap-3 md:justify-center lg:justify-start overflow-hidden md:-mt-15 ${Categoria === "Juguetes" ? "lg:-mt-40 sm:pt-16 -mt-16" : Categoria === "Supermercado" ? "-mt-20 sm:-mt-16 lg:-mt-40 sm:pt-16" : "lg:-mt-20 pt-16 -mt-16"} md:pt-0`}>
                <div className="hidden md:flex items-center gap-3 w-full md:justify-center lg:justify-start">
                    {destacados.map((item, index) => (
                        index === 0 ? (
                            <div className="xl:ml-[15%] lg:ml-[10%] md:ml-0" key={index}>
                                <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria} isLight={isLight}/>
                            </div>
                        ) : (
                            <div className="lg:ml-[12%]" key={index}>
                                <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria} isLight={isLight}/>
                            </div>
                        )
                    ))}
                </div>
                <div className="md:hidden w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
                    <div 
                        className="flex items-center gap-3 pb-4"
                        style={{ width: 'max-content' }}
                    >
                        {destacados.map((item, index) => (
                            <div 
                                className="flex-shrink-0 ml-[4%] first:ml-[4%]" 
                                key={index}
                            >
                                <ModelosDestcados nombre={item.nombre} imagen={item.imagen} categoria={Categoria} isLight={isLight} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
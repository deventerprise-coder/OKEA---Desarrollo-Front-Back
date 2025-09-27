import imagenPanel from "../../assets/imagenes/imagenPanel.png";
import apple from "../../assets/imagenes/apple.png";
import modeloApple from "../../assets/imagenes/modeloApple.png";
import { useState } from "react";

function ModelosDestcados() {
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
                src={modeloApple}
                alt="Modelo Apple"
                className="w-[110px] h-[110px] object-contain"
            />
            </button>
            
            <div className={`z-10 overflow-hidden transition-[gap, opacity] duration-300 fade-in ${
                isHovered 
                    ? "w-[310px] opacity-100 ml-[-143px]" 
                    : "w-0 opacity-0"
            }`}>
                <div className="w-[310px] h-[120px] rounded-[100px] flex items-center justify-center overflow-hidden relative">
                    <img
                    src={modeloApple}
                    alt="Modelo Apple"
                    className="w-[130px] h-[310px] object-cover transform rotate-90"
                    />
                    <span className="absolute inset-0 z-10 text-white font-bold text-[16px] flex items-center justify-center backdrop-blur-xl pl-20"
                        style={{ fontFamily: 'Inter' }}>
                        Modelo Apple
                    </span>
                </div>
            </div> 
        </div>
    );
}
export function Panel() {
    return(
        <div className="w-[1924px] h-[785px] relative">
            <img src={imagenPanel} alt="Producto Destacado" className="w-full h-full object-cover"/>
            <div className="w-[965px] h-[200px] flex absolute top-[50px] right-[25%] justify-center items-center">
                <img src={apple} alt="imagen marca" className="w-[117px] h-[140px] object-contain mr-10 mb-6"/>
                <span className="text-white text-[160px] font-bold" style={{fontFamily: 'Inter'}}>iPhone 16</span>
            </div>
            <section className="absolute bottom-[-10%] w-full h-[200px] bg-[#33333333] backdrop-blur-xl flex items-center gap-30">
                <div className="ml-60">
                    <ModelosDestcados />
                </div>
                    <ModelosDestcados />
                    <ModelosDestcados />
                    <ModelosDestcados />
                    <ModelosDestcados />
                    <ModelosDestcados />
            </section>
        </div>
    )
}
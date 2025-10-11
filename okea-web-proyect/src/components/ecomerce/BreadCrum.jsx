import { HomeBreadcrumIcon, ArrowBreadcrumIcon, DynamicCelularesIcon } from "../../assets/iconos/Icons"
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ModaIcon, MueblesIcon, CalzadoFilterIcon, DormitorioIcon, AccesoriosIcon, JuguetesIcon, DecoracionFilterIcon, MascotasIcon, SupermercadoFilterIcon,
  ElectrohogarIcon, SoporteIcon} from "../../assets/iconos/Icons";
export default function DynamicComponent({ firstWord = "iPho", secondWord = "ne", categoria }) {
    const [isHovered, setIsHovered] = useState(false);
    const [firstWordWidth, setFirstWordWidth] = useState(0);
    const [totalWidth, setTotalWidth] = useState(238);
    const firstWordRef = useRef(null);
    const secondWordRef = useRef(null);
    let IconComponent = DynamicCelularesIcon;
        if (categoria === "Electrohogar") IconComponent = ElectrohogarIcon;
        else if (categoria === "Muebles y Organización") IconComponent = MueblesIcon;
        else if (categoria === "Dormitorio y Baños") IconComponent = DormitorioIcon;
        else if (categoria === "Moda Hombre") IconComponent = ModaIcon;
        else if (categoria === "Moda Mujer") IconComponent = ModaIcon;
        else if (categoria === "Calzado") IconComponent = CalzadoFilterIcon;
        else if (categoria === "Accesorios de Moda") IconComponent = AccesoriosIcon;
        else if (categoria === "Salud y Bienestar") IconComponent = SoporteIcon;
        else if (categoria === "Juguetes") IconComponent = JuguetesIcon;
        else if (categoria === "Decoración") IconComponent = DecoracionFilterIcon;
        else if (categoria === "Mascotas") IconComponent = MascotasIcon;
        else if (categoria === "Supermercado") IconComponent = SupermercadoFilterIcon;

    useEffect(() => {
        if (firstWordRef.current && secondWordRef.current) {
            const firstWidth = firstWordRef.current.offsetWidth;
            const secondWidth = secondWordRef.current.offsetWidth;
            setFirstWordWidth(firstWidth);
            
            const calculatedWidth = firstWidth + secondWidth + 50;
            if (calculatedWidth > 238) {
                setTotalWidth(calculatedWidth);
            }
        }
    }, [firstWord, secondWord]);

    const halfWidth = (totalWidth / 2);

    return (
        <div 
            className="relative flex items-center h-[85px] mr-16"
            style={{ width: `${totalWidth}px` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className={`absolute left-0 top-0 bg-[#385BAACC] ${isHovered ? 'translate-x-[100%] rounded-tr-xl rounded-br-xl' : 'rounded-tl-xl rounded-bl-xl'} transition-all duration-500`}
                style={{ width: `${halfWidth}px`, height: '85px' }}
            />
            <div 
                className={`absolute right-0 top-0 bg-[#EBEFF7] ${isHovered ? 'translate-x-[-100%] rounded-tl-xl rounded-bl-xl' : 'rounded-tr-xl rounded-br-xl'} transition-all duration-500`}
                style={{ width: `${totalWidth-halfWidth}px`, height: '85px' }}
            />
            <div className={`relative absolute left-[50%] flex items-center`}>
                <span 
                    ref={firstWordRef}
                    className={`absolute z-10 text-[30px] font-medium ${isHovered ? 'text-[#385BAA]' : 'text-[#FFFFFF]'} transition-colors duration-500`} 
                    style={{
                        fontFamily: 'Inter',
                        transform: `translateX(-${firstWordWidth}px)`,
                        whiteSpace: 'nowrap'
                    }}
                >
                    {firstWord}
                </span>
                <span 
                    ref={secondWordRef}
                    className={`flex absolute z-10 text-[30px] font-medium items-center ${isHovered ? 'text-[#FFFFFF]' : 'text-[#385BAA]'} transition-colors duration-500 gap-1`} 
                    style={{
                        fontFamily: 'Inter',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {secondWord} <IconComponent color={isHovered ? "#FFFFFF" : "#385BAA"} size={30}/>
                </span>
            </div>
        </div>
    )
};
export function BreadCrum({categoria, subcategoria, isLight}) {
    const navigate = useNavigate();
    
    const splitDynamicText = (categoria) => {
        if (categoria === "Tecnología") return { firstWord: "iPho", secondWord: "ne" };
        else if (categoria === "Muebles y Organización") return { firstWord: "Sofá", secondWord: "s" };
        else if (categoria === "Electrohogar") return { firstWord: "Electroh", secondWord: "ogar" };
        else if (categoria === "Calzado") return { firstWord: "Calza", secondWord: "do" };
        else if (categoria === "Dormitorio y Baños") return { firstWord: "Dormi", secondWord: "torio" };
        else if (categoria === "Accesorios de Moda") return { firstWord: "Mod", secondWord: "a" };
        else if (categoria === "Decoración") return { firstWord: "Decora", secondWord: "ción" };
        else if (categoria === "Mascotas") return { firstWord: "Masc", secondWord: "otas" };
        else if (categoria === "Moda Hombre") return { firstWord: "Moda Ho", secondWord: "mbre" };
        else if (categoria === "Moda Mujer") return { firstWord: "Moda\u00A0", secondWord: "Mujer" };
        else if (categoria === "Salud y Bienestar") return { firstWord: "Salu", secondWord: "d" };
        else if (categoria === "Juguetes") return { firstWord: "Jugue", secondWord: "tes" };
        else if (categoria === "Supermercado") return { firstWord: "Superme", secondWord: "rcado" };
    };
    
    const { firstWord, secondWord } = splitDynamicText(categoria);
    
    return (
        <div className="w-full h-[115px] flex items-center justify-between mt-20" style={{fontFamily: 'Inter'}}>
            <div className="flex items-center gap-5 ml-16"> 
                <HomeBreadcrumIcon color={isLight ? "#333333" : "#FFFFFF"}/>
                <ArrowBreadcrumIcon color={isLight ? "#1D2C4E" : "#FFFFFF"}/>
                <a className={`text-[14px] font-regular ${isLight ? "text-[#333333]" : "text-[#FFFFFF]"} cursor-pointer`} style={{fontFamily: 'Inter'}} onClick={() => navigate(`/`)}>Inicio</a>
                <ArrowBreadcrumIcon color={isLight ? "#1D2C4E" : "#FFFFFF"}/>
                <a className={`text-[14px] font-regular ${isLight ? "text-[#333333]" : "text-[#FFFFFF]"} cursor-pointer`} style={{fontFamily: 'Inter'}}>{categoria}</a>
                <ArrowBreadcrumIcon color={isLight ? "#1D2C4E" : "#FFFFFF"}/>
                <a className={`text-[14px] font-bold ${isLight ? "text-[#333333]" : "text-[#FFFFFF]"} cursor-pointer`} style={{fontFamily: 'Inter'}}>{subcategoria}</a>
            </div>
            <DynamicComponent firstWord={firstWord} secondWord={secondWord} categoria={categoria} />
        </div>
    )
}
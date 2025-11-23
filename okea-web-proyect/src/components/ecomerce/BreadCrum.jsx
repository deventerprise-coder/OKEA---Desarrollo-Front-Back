import { HomeBreadcrumIcon, ArrowBreadcrumIcon, DynamicCelularesIcon } from "../../assets/iconos/Icons"
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {ModaIcon, MueblesIcon, CalzadoFilterIcon, DormitorioIcon, AccesoriosIcon, JuguetesIcon, DecoracionFilterIcon, MascotasIcon, SupermercadoFilterIcon,
  ElectrohogarIcon, SoporteIcon} from "../../assets/iconos/Icons";
export default function DynamicComponent({ firstWord = "iPho", secondWord = "ne", categoria }) {
    const [isHovered, setIsHovered] = useState(false);
    const [firstWordWidth, setFirstWordWidth] = useState(0);
    const [totalWidth, setTotalWidth] = useState(238);
    const [isCalculating, setIsCalculating] = useState(true);
    const firstWordRef = useRef(null);
    const secondWordRef = useRef(null);
    const containerRef = useRef(null);
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

    const calculateDimensions = () => {
        if (firstWordRef.current && secondWordRef.current) {
            const firstWidth = firstWordRef.current.offsetWidth;
            const secondWidth = secondWordRef.current.offsetWidth;
            
            if (firstWidth > 0 && secondWidth > 0) {
                setFirstWordWidth(firstWidth);
                
                const calculatedWidth = firstWidth + secondWidth + 50;
                if (calculatedWidth > 238) {
                    setTotalWidth(calculatedWidth);
                } else {
                    setTotalWidth(238);
                }
                setIsCalculating(false);
            }
        }
    };

    useEffect(() => {
        setIsCalculating(true);
        calculateDimensions();
        const timer1 = setTimeout(() => {
            calculateDimensions();
        }, 50);
        
        const timer2 = setTimeout(() => {
            calculateDimensions();
        }, 200);
        
        const resizeObserver = new ResizeObserver(() => {
            calculateDimensions();
        });
        
        if (firstWordRef.current) {
            resizeObserver.observe(firstWordRef.current);
        }
        if (secondWordRef.current) {
            resizeObserver.observe(secondWordRef.current);
        }
        
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            resizeObserver.disconnect();
        };
    }, [firstWord, secondWord, categoria]);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(calculateDimensions, 100);
        };
        
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(calculateDimensions, 50);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const halfWidth = (totalWidth / 2);

    return (
        <div 
            ref={containerRef}
            className="hidden relative md:flex items-center h-[85px] mr-16"
            style={{ 
                width: `${totalWidth}px`,
                opacity: isCalculating ? 0.8 : 1,
                transition: 'opacity 0.3s ease, width 0.3s ease'
            }}
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
                        whiteSpace: 'nowrap',
                        visibility: isCalculating ? 'hidden' : 'visible'
                    }}
                >
                    {firstWord}
                </span>
                <span 
                    ref={secondWordRef}
                    className={`flex absolute z-10 text-[30px] font-medium items-center ${isHovered ? 'text-[#FFFFFF]' : 'text-[#385BAA]'} transition-colors duration-500 gap-1`} 
                    style={{
                        fontFamily: 'Inter',
                        whiteSpace: 'nowrap',
                        visibility: isCalculating ? 'hidden' : 'visible'
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
    const location = useLocation();
    
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
            <div className="flex items-center gap-5 sm:ml-16 ml-8"> 
                <a className="cursor-pointer" onClick={() => navigate(`/`)}> <HomeBreadcrumIcon color={isLight ? "#333333" : "#FFFFFF"}/> </a>
                <ArrowBreadcrumIcon color={isLight ? "#1D2C4E" : "#FFFFFF"}/>
                <a className={`text-[14px] font-regular ${isLight ? "text-[#333333]" : "text-[#FFFFFF]"} cursor-pointer`} style={{fontFamily: 'Inter'}} onClick={() => navigate(`/`)}>Inicio</a>
                <ArrowBreadcrumIcon color={isLight ? "#1D2C4E" : "#FFFFFF"}/>
                <a 
                    className={`text-[14px] font-regular ${isLight ? "text-[#333333]" : "text-[#FFFFFF]"} cursor-pointer`} 
                    style={{fontFamily: 'Inter'}}
                    onClick={() => {
                        const Categoriaslug = categoria === "Tecnología" ? "tecnologia"
                            : categoria === "Electrohogar" ? "electrohogar"
                            : categoria === "Muebles y Organización" ? "muebles-y-organizacion"
                            : categoria === "Dormitorio y Baños" ? "dormitorio-y-banos"
                            : categoria === "Moda Hombre" ? "moda-hombre"
                            : categoria === "Moda Mujer" ? "moda-mujer"
                            : categoria === "Mascotas" ? "mascotas"
                            : categoria === "Supermercado" ? "supermercado"
                            : categoria === "Calzado" ? "calzado"
                            : categoria === "Salud y Bienestar" ? "salud-y-bienestar"
                            : categoria === "Juguetes" ? "juguetes"
                            : categoria === "Accesorios de Moda" ? "accesorios-de-moda"
                            : categoria === "Decoración" ? "decoracion-e-iluminacion"
                            : "";
                        if (Categoriaslug) navigate(`/catalogo/${Categoriaslug}`);
                    }}
                >
                    {categoria}
                </a>
                <ArrowBreadcrumIcon color={isLight ? "#1D2C4E" : "#FFFFFF"}/>
                <a className={`text-[14px] font-semibold md:font-bold ${isLight ? "text-[#333333]" : "text-[#E4E666]"} cursor-pointer`} style={{fontFamily: 'Inter'}}>{subcategoria}</a>
            </div>
            <DynamicComponent 
                key={`${location.pathname}-${categoria}-${firstWord}-${secondWord}`}
                firstWord={firstWord} 
                secondWord={secondWord} 
                categoria={categoria} 
            />
        </div>
    )
}
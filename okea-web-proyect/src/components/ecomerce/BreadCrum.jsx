import { HomeBreadcrumIcon, ArrowBreadcrumIcon, DynamicCelularesIcon } from "../../assets/iconos/Icons"
import { useState } from "react";
export default function DynamicComponent() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="relative flex w-[238px] items-center h-[85px] mr-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`absolute left-0 top-0 w-[119px] h-[85px] bg-[#385BAACC] ${isHovered ? 'translate-x-[100%] rounded-tr-xl  rounded-br-xl' : 'rounded-tl-xl  rounded-bl-xl'} transition-all duration-500`}/>
            <div className={`absolute right-0 top-0 w-[119px] h-[85px] bg-[#EBEFF7] ${isHovered ? 'translate-x-[-100%] rounded-tl-xl  rounded-bl-xl' : 'rounded-tr-xl  rounded-br-xl'} transition-all duration-500`}/>
            <div className="relative absolute left-[50%] flex items-center">
                <span className={`absolute z-10 text-[30px] font-medium transform translate-x-[-101%] ${isHovered ? 'text-[#385BAA]' : 'text-[#FFFFFF]'} transition-colors duration-500`} style={{fontFamily: 'Inter'}}>iPho</span>
                <span className={`flex absolute z-10 text-[30px] font-medium items-center ${isHovered ? 'text-[#FFFFFF]' : 'text-[#385BAA]'} transition-colors duration-500`} style={{fontFamily: 'Inter'}}>ne <DynamicCelularesIcon color={isHovered ? "#FFFFFF" : "#385BAA"}/></span>
            </div>
        </div>
    )
};
export function BreadCrum() {
    return (
        <div className="w-[1922px] h-[115px] flex items-center justify-between mt-20" style={{fontFamily: 'Inter'}}>
            <div className="flex items-center gap-5 ml-16"> 
                <HomeBreadcrumIcon />
                <ArrowBreadcrumIcon />
                <a className="text-[14px] font-regular text-[#333333] cursor-pointer" style={{fontFamily: 'Inter'}}>Inicio</a>
                <ArrowBreadcrumIcon />
                <a className="text-[14px] font-regular text-[#333333] cursor-pointer" style={{fontFamily: 'Inter'}}>Tecnología</a>
                <ArrowBreadcrumIcon />
                <a className="text-[14px] font-bold text-[#333333] cursor-pointer" style={{fontFamily: 'Inter'}}>Celulares</a>
            </div>
            <DynamicComponent />
        </div>
    )
}
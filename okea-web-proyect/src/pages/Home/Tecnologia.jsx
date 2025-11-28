import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import tecnologiaImagen1 from "../../assets/imagenes/Home/tecnologiaImagen1.png";
import tecnologiaImagen2 from "../../assets/imagenes/Home/tecnologiaImagen2.png";
import tecnologiaImagen3 from "../../assets/imagenes/Home/tecnologiaImagen3.png";
import tecnologiaImagen4 from "../../assets/imagenes/Home/tecnologiaImagen4.png";
import tecnologiaImagen5 from "../../assets/imagenes/Home/tecnologiaImagen5.png";
import tecnologiaImagen6 from "../../assets/imagenes/Home/tecnologiaImagen6.png";
import { ArrowRightIconBlack, CursorIcon, TecnologyIcon, TecnologyIconDarkMode, TruckIcon } from "../../assets/iconos/iconoHome";
import { useNavigate } from "react-router-dom";

export default function Tecnologia() {
    // --- Tema ---
    const { isLight } = useTheme();
    const navigate = useNavigate();
    const getBackgroundStyle = () => {
    return {
      backgroundColor: isLight ? '#ffffff' : '#120F31',
      color: isLight ? '#000000' : '#ffffff',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    };
    };

    const getSectionStyle = (customBg = null) => {
    if (customBg) {
      return {
        backgroundColor: isLight ? customBg : 'rgba(16, 16, 30, 0.9)',
        color: isLight ? '#000000' : '#ffffff',
        transition: 'all 0.3s ease'
      };
    }
    return {
      backgroundColor: isLight ? '#ffffff' : 'rgba(16, 16, 30, 0.8)',
      color: isLight ? '#000000' : '#ffffff',
      transition: 'all 0.3s ease'
    };
    };

    const getTextStyle = () => {
    return {
      color: isLight ? '#434651' : '#FFFFFF',
      transition: 'color 0.3s ease'
    };
    };

    const getCardStyle = () => {
    return {
      backgroundColor: isLight ? '#FFFFFF' : '#292272',
      transition: 'all 0.3s ease'
    };
    };

    return (
    <section className="Home" style={getBackgroundStyle()}>
      {/*Tecnologia*/}
      <section className=" Tecnologia">
        <div className="mt-4 md:mt-16 items-center flex flex-col justify-center px-4 sm:px-6/12 md:3/12 lg:px-40">
            {/*Titulo*/}
            <div className="hidden md:flex justify-center w-full py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF] px-2"         
            style={{
          background: isLight
            ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
            : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
          ...getSectionStyle(),
        }}>
                <div className=" mr-5 my-1">
                    {isLight ? <TecnologyIcon /> : <TecnologyIconDarkMode />}
                </div>
                <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Tecnología</h1>
                <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
                <p className='font-popins-light md:text-xl md:text-center xl:text-2xl text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Equipamos tu mundo digital</p>
                <button className='flex  bg-[#DFE162] min-w-[116px] text-[#484900] py-2.5 px-4  h-10 rounded-4xl cursor-pointer' onClick={() => navigate("/catalogo/tecnologia")}>
                    <h1 className='font-popins text-sm'>Ver todo</h1>
                    <div className='scale-60 -my-0.5'>
                        <ArrowRightIconBlack />
                    </div>
                </button>
            </div>
             {/*Título*/}
            <div className=" md:hidden flex w-full text-left gap-5">
                <div className=" scale-70 mt-1.5">
                    {isLight ? <TecnologyIcon /> : < TecnologyIconDarkMode />}
                </div>
                <h1 className='text-3xl md:text-4xl pt-1.5 font-popins  text-[#434651]'style={getTextStyle()}>Tecnología</h1>
            </div>
            
          {/*Contenido fila 2 responsive*/}
           <div className=" mt-4 md:hidden flex overflow-hidden bg-cover w-full rounded-2xl h-24 md:h-80 ml:h-80" style={{ backgroundImage: `url(${tecnologiaImagen6})` }} ></div>
            {/*Contenido fila 1*/}
            <div className="mx-40 w-full h-98 lg:h-60 xl:h-70 2xl:h-100 mt-4 cursor-pointer" onClick={() => navigate("/catalogo/tecnologia")}>
                <div className=" h-98  xl:h-100 md:grid md:grid-cols-2 gap-4 "> 
                    <div className="relative overflow-hidden pt-10 px-2 xl:px-7 bg-[#B1C5FF] h-48 lg:h-60 xl:h-70 2xl:h-100 rounded-2xl md:rounded-4xl">
                        <div className="flex justify-center -mt-4 md:-mt-0  lg:scale-90 xl:scale-100">
                            <h1 className='font-popins text-2xl md:text-3xl lg:text-4xl 2xl:text-[55px] text-white'>Llévate <span className='font-popins font-extralight text-2xl md:text-3xl lg:text-3xl 2xl:text-[55px] text-[#DAE2FF]'>un </span><span className='font-popins text-2xl md:text-2xl lg:text-[40px] 2xl:text-[64px] text-[#1D1B20]'>iPhone 16 Pro</span></h1>
                        </div>
                        <div className="w-52 -ml-10 md:ml-21 text-center mt-2 lg:2 xl:mt-5 2xl:mt-12 xl:scale-120 2xl:scale-100 ">
                            <h2 className='font-popins-light mx-4 ml-6 md:-ml-50 lg:-ml-25 font-bold text-2xl md:text-[20px] lg:text-4xl 2xl:text-[55px] leading-normal md:leading-12 text-white '>OFERTA</h2>
                            <h2 className='font-popins-light font-bold ml-6 md:-ml-55 lg:-ml-25 text-2xl md:text-[20px] lg:text-4xl 2xl:text-[55px] leading-3 md:leading-12 text-white '>ESPECIAL</h2>
                            <h2 className='w-40 md:w-75 ml-6 md:-ml-35 lg:-ml-25 font-popins font-extralight text-md md:text-[20px]lg:text-3xl text-[#DAE2FF]'>por lanzamiento exclusivo</h2>
                        </div>
                        {/*imagen*/}
                        <div className="absolute bg-cover -bottom-48.5 md:-bottom-35.5 lg:-bottom-45 xl:-bottom-40 2xl:-bottom-30 -right-75  2xl:-right-54 w-200 h-124 scale-22 md:scale-30 xl:scale-40 2xl:scale-52 cursor-pointer" style={{ backgroundImage: `url(${tecnologiaImagen1})` }}></div>
                    </div>
                    {/*cuadro derecho*/}
                    <div className="relative py-8 px-10 h-48 lg:h-60 xl:h-70 2xl:h-100 mt-4 md:mt-0  bg-contain bg-no-repeat rounded-2xl md:rounded-4xl bg-[#e35944] cursor-pointer" style={{ backgroundImage: `url(${tecnologiaImagen5})` }} onClick={() => navigate("/catalogo/tecnologia")}>
                      {/*Por si se tiene que hacer cada elemento*/}
                      {/*<div className="absolute bottom-15 right-20 scale-140 text-center w-68 ">
                      <h2 className='font-popins leading-3 font-extralight text-2xl text-white'>SAVE UP TO</h2>
                      <span className='font-popins font-extrabold text-6xl text-white'>60%</span>
                      <h2 className='font-popins font-extralight text-sm text-[#DAE2FF]'>ON<span className='text-white font-bold'> COMPUTER</span> AND <span className='text-white font-bold text-lg leading-1' >ACCESSORIES</span></h2>
                      <h2 className='font-popins text-xs font-light text-[#DAE2FF] pt-5'>www.konga.com</h2>
                      </div>}*/}
                    </div>
                </div>
            </div>
                            
            {/*Contenido fila 2*/}
           <div className=" mt-4 hidden md:flex overflow-hidden bg-cover bg-no-repeat  w-full rounded-2xl h-24 md:h-100 cursor-pointer" style={{ backgroundImage: `url(${tecnologiaImagen6})` }} onClick={() => navigate("/catalogo/tecnologia")}></div>

        </div>
      </section>
    </section>
    )
}
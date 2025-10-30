import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import tecnologiaImagen1 from "../../assets/imagenes/Home/tecnologiaImagen1.png"
import tecnologiaImagen2 from "../../assets/imagenes/Home/tecnologiaImagen2.png"
import tecnologiaImagen3 from "../../assets/imagenes/Home/tecnologiaImagen3.png"
import tecnologiaImagen4 from "../../assets/imagenes/Home/tecnologiaImagen4.png"
import tecnologiaImagen5 from "../../assets/imagenes/Home/tecnologiaImagen5.png"
import tecnologiaImagen6 from "../../assets/imagenes/Home/tecnologiaImagen6.png"
import { ArrowRightIconBlack, CursorIcon, TecnologyIcon, TecnologyIconDarkMode, TruckIcon } from "../../assets/iconos/iconoHome";

export default function Tecnologia() {
    // --- Tema ---
    const { isLight } = useTheme();

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
            <div className="hidden md:flex justify-center w-full py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"         
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
                <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Equipamos tu mundo digital</p>
                <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
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
           <div className=" mt-4 md:hidden flex overflow-hidden bg-cover w-full rounded-2xl h-24 md:h-80" style={{ backgroundImage: `url(${tecnologiaImagen6})` }} ></div>
            {/*Contenido fila 1*/}
            <div className="mx-40  w-full h-98 md:h-100 mt-4">
                <div className=" h-98 md:h-100 md:grid md:grid-cols-2 gap-4 "> 
                    <div className="relative overflow-hidden pt-10 px-7 bg-[#B1C5FF] h-48 md:h-100 rounded-2xl md:rounded-4xl">
                        <div className="flex justify-center -mt-4 md:-mt-0">
                            <h1 className='font-popins text-2xl md:text-[55px] text-white'>Llévate <span className='font-popins font-extralight text-2xl md:text-[55px] text-[#DAE2FF]'>un </span><span className='font-popins text-2xl md:text-[64px] text-[#1D1B20]'>iPhone 16 Pro</span></h1>
                        </div>
                        <div className="w-52 -ml-10 md:ml-20 text-center mt-2 md:mt-12 ">
                            <h2 className='font-popins-light mx-4 font-bold text-2xl md:text-[55px] leading-normal md:leading-12 text-white '>OFERTA</h2>
                            <h2 className='font-popins-light font-bold text-2xl md:text-[55px] leading-3 md:leading-12 text-white '>ESPECIAL</h2>
                            <h2 className='w-40 md:w-75 ml-6 md:-ml- font-popins font-extralight text-md md:text-4xl text-[#DAE2FF]'>por lanzamiento exclusivo</h2>
                        </div>
                        {/*imagen*/}
                        <div className="absolute bg-cover -bottom-48.5 md:-bottom-30 -right-75 md:-right-54 w-200 h-124 scale-22 md:scale-50 " style={{ backgroundImage: `url(${tecnologiaImagen1})` }}></div>
                    </div>
                    {/*cuadro derecho*/}
                    <div className="relative py-8 px-10 h-48 md:h-100 mt-4 md:mt-0  bg-contain bg-no-repeat rounded-2xl md:rounded-4xl bg-[#e35944] " style={{ backgroundImage: `url(${tecnologiaImagen5})` }}>
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
            {/* Imagen po si el contenido fila 2 se tiene que borrar*/}
            <div className="" style={{ backgroundImage: `url(${tecnologiaImagen6})` }}></div>
                            
            {/*Contenido fila 2*/}
           <div className=" mt-6 md:mt-4 hidden md:flex overflow-hidden w-full rounded-3xl h-80 bg-slate-300" > 
                {/*contenido papa*/}
                <div className=" max-w-4xl w-90 h-80 p-10 rounded-r-[60px] bg-gradient-to-b from-[#023770] to-[#1768be]">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-yellow-200"></div>
                    </div> 
                    <h2 className='font-popins mt-3 text-center font-bold text-lg text-white'>¡Merece un equipazo!</h2>
                    <div className=" flex justify-center my-7 scale-350">
                        <TruckIcon />
                    </div>
                    <div className="flex justify-center">
                      <button className='relative rounded-4xl  mt-3 bg-white'>
                          <h2 className='font-popins  px-10'>¡Lo quiero!</h2>
                          <div className="absolute -bottom-1 right-1 scale-200 -rotate-45">
                              <CursorIcon />
                          </div>
                      </button>
                    </div>
                </div>
                {/*Producto1*/}
                <div className="relative pl-11 pt-9 text-center ">
                    <h2 className='font-popins font-light text-lg text-black'>Redmi Note 14</h2>
                    <p className='font-popins font-light text-[10px]'>Cámara de 108MP | 8 GB - 365 GB | 5500 mAh</p>
                    <div className="absolute -top-160 -left-205 w-480 h-430 scale-15 " style={{ backgroundImage: `url(${tecnologiaImagen2})` }}></div>
                    <div className="nombre"></div>
                    <div className="complemento"></div>
                </div>
                <div className="mt-30 w-55 h-25 -mr-12 bg-[#EB5A45] rounded-3xl p-3 text-center">  
                    <h2 className='font-popins font-light text-[9.5px] text-white'>03 CUOTAS SIN INTERESES</h2>
                    <div className="flex  justify-center gap-1">
                        <h2 className='font-popins text-white'>S/</h2>
                        <h2 className='font-popins text-white font-bold text-4xl'>283</h2>
                    </div>
                    <h2 className='font-popins font-light text-[9.5px] text-white'>Precio Oferta: S/849</h2>
                    <h2 className='font-popins font-light text-[9.5px] text-white'>Precio Regular: <span className='line-through'>S/949</span></h2>
                </div>
                {/*Producto2*/}
                <div className="relative pl-11 pt-9  text-center">
                    <div className="flex w-45 justify-center">
                        <h2 className='font-popins font-light text-lg text-black'>Redmi Note 14 Pro+</h2>
                        <div className="ICON"></div>  
                    </div>
                    <p className='font-popins font-light text-[10px]'>Cámara de 200MP | 12GB - 512GB | 5110 mAh</p>
                    <div className="absolute -top-160 -left-200 w-480 h-430 scale-15 " style={{ backgroundImage: `url(${tecnologiaImagen3})` }}></div>
                    <div className="nombre"></div>
                    <div className="complemento"></div>
                </div>
                <div className="mt-30 w-55 h-25 -mr-8 -ml-3 bg-[#EB5A45] rounded-3xl p-3 text-center">  
                    <h2 className='font-popins font-light text-[9.5px] text-white'>03 CUOTAS SIN INTERESES</h2>
                    <div className="flex  justify-center gap-1">
                        <h2 className='font-popins text-white'>S/</h2>
                        <h2 className='font-popins text-white font-bold text-4xl' >609</h2>
                        <h2 className='font-popins text-white'>.67</h2>
                    </div>
                    <h2 className='font-popins font-light text-[9.5px] text-white'>Precio Oferta: S/1,829</h2>
                    <h2 className='font-popins font-light text-[9.5px] text-white'>Precio Regular: <span className='line-through'>S/1,899</span></h2>
                </div>
                {/*Producto3*/}
                <div className="relative pl-11 pt-9 text-center">
                    <h2 className='font-popins  font-light text-lg text-black'>Xiaomi 15</h2>
                    <p className="font-popins font-light text-[10px]">Cámara Leica de 50MP | 12GB - 512GB | 5240 mAh</p>
                    <div className="absolute -top-160 -left-205 w-480 h-430 scale-15 " style={{ backgroundImage: `url(${tecnologiaImagen4})` }}></div>
                    <div className="nombre"></div>
                    <div className="complemento"></div>
                </div>
                <div className="mt-30 mr-10 w-55 h-25 bg-[#EB5A45] rounded-3xl p-3 text-center">  
                    <h2 className='font-popins font-light text-[9.5px] text-white'>03 CUOTAS SIN INTERESES</h2>
                    <div className="flex justify-center gap-1">
                        <h2 className='font-popins text-white'>S/</h2>
                        <h2 className='font-popins text-white font-bold text-4xl'>1,299</h2>
                        <h2 className='font-popins text-white'>.67</h2>
                    </div>
                    <h2 className='font-popins font-light text-[9.5px] text-white'>Precio Oferta: S/3,899</h2>
                    <h2 className='font-popins font-light text-[9.5px] text-white'>Precio Regular: <span className='line-through'>S/4,698</span></h2>
                </div>
          </div>
        </div>
      </section>
    </section>
    )
}
import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import ultimoImagen1 from "../../assets/imagenes/Home/ultimoImagen1.png"
import ultimoImagen4 from "../../assets/imagenes/Home/ultimoImagen4.png"
import ultimoImagen2 from "../../assets/imagenes/Home/ultimoImagen2.png"
import ultimoImagen3 from "../../assets/imagenes/Home/ultimoImagen3.png"
import ultimoImagen5 from "../../assets/imagenes/Home/ultimoImagen5.png"
import ultimoImagen6 from "../../assets/imagenes/Home/ultimoImagen6.png"
import ultimoImagen7 from "../../assets/imagenes/Home/ultimoImagen7.png"
import ultimoImagen8 from "../../assets/imagenes/Home/ultimoImagen8.png"
import ultimoImagen9 from "../../assets/imagenes/Home/ultimoImagen9.png"
import ultimoImagen10 from "../../assets/imagenes/Home/ultimoImagen10.png"
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png"
import ProductCard from "../../components/ProductCard.jsx";
import { ArrowLeftNormal, ArrowRightNormal } from "../../assets/iconos/iconoHome.jsx";


export default function Ultimo() {
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
    //estado para productos
    const [liked, setLiked] = useState(false);
    const [addedItems, setAddedItems] = useState({});

    const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    };
    const handleClick = (id) => { 
     setAddedItems((prev) => ({
         ...prev,
     [id]: !prev[id], // solo cambia el botón clickeado
     }));
  };  


    return (
      <section className="Home" style={getBackgroundStyle()}>
      {/*Ultimo*/}
      <section className="Ultimmo">
        <div className="mt-16 items-center flex flex-col justify-center">
            {/*titulo*/}
            <div className="text-5xl font-popins  w-400  text-[#434651] text-center" style={getTextStyle()}>
                Últimos lanzamientos
            </div>
            {/*Fila 1*/}
            <div className="relative bg-[#FFDAD4] h-100 w-400 no bg-no-repeat rounded-4xl overflow-hidden bg-center " style={{ backgroundImage: `url(${ultimoImagen1})` }}>
                <div className="absolute z-1 ml-190 bg-cover size-100"style={{ backgroundImage: `url(${ultimoImagen2})` }}></div>
                <div className="absolute backdrop-blur-sm size-90 ml-154 "></div>
                <div className="ml-30">
                    <div className="h-30 w-38  bg-cover bg-bottom  bg-no-repeat  " style={{ backgroundImage: `url(${ultimoImagen4})` }}></div>
                </div>
                <div className=" ml-30 mt-3 font-popins-light text-[32px] text-[#EB5A45] ">NUEVO</div>
                <h2 className='ml-30 tracking-tight -mt-5 font-popins text-[78px] font-bold text-[#EB5A45]'>JBL TUNE 520</h2>
                <h2 className='ml-30 w-110 font-popins -pb-2 mb-2 leading-9 text-3xl text-[#2F3036]'>AUDIFONOS ON EAR BLUETOOTH</h2>
                <div className="absolute z-1 transform scale-x-[-1] -mt-88.5 ml-280 bg-cover bg-no-repeat w-180 h-100" style={{ backgroundImage: `url(${ultimoImagen3})` }}></div>
            </div>
            {/*Fila 2*/}
            <div className=" w-400">
                <div className="flex w-400 h-100 bg-cover  rounded-4xl justify-between overflow-hidden mt-4" style={{ backgroundImage: `url(${ultimoImagen5})` }}>
        
                </div>
            </div>
            {/*Fila 3*/}
            <div className="grid grid-cols-4 gap-4 w-400 h-100 bg-cover p-4 bg-[#303030] rounded-4xl overflow-hidden mt-4">
                <div className="col-span-1 bg-cover rounded-4xl" style={{ backgroundImage: `url(${ultimoImagen6})` }}></div>       
                <div className="col-span-1 bg-cover rounded-4xl" style={{ backgroundImage: `url(${ultimoImagen7})` }}></div>
                <div className="col-span-1 bg-cover rounded-4xl" style={{ backgroundImage: `url(${ultimoImagen8})` }}></div>
                <div className="col-span-1 bg-cover rounded-4xl" style={{ backgroundImage: `url(${ultimoImagen9})` }}></div>
            </div>
            {/*Fila 4*/}
            <div 
                className=" w-400 h-200 mt-4 rounded-4xl bg-[45%_50%]  overflow-hidden bg-no-repeat  bg-cover"
                style={{ backgroundImage: `url(${ultimoImagen10})` }}> 
            </div>
        </div>
      </section>

    
     

      </section>
    )
}
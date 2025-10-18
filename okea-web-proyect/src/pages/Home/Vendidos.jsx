import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import vendidosImagen1 from "../../assets/imagenes/Home/vendidosImagen1.png"

import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png"
import ProductCard from "../../components/ProductCard.jsx";
import { ArrowLeftNormal, ArrowRightNormal } from "../../assets/iconos/iconoHome.jsx";


export default function Vendidos() {
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
      {/*Vendidos*/}
      <section className="Vendidos">
        <div className='mt-16 items-center flex flex-col justify-center'>
        {/*titulo*/}
        <div className="text-5xl font-popins w-400 text-[#434651] text-center" style={getTextStyle()}>
            Los más vendidos
        </div>
        {/*fila 1*/}
   
        <div className="w-400 h-100  rounded-4xl mt-4 overflow-hidden flex">
          {/* Imagen normal */}
          <div
            className="w-300 z-20 h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${vendidosImagen1})` }}
          ></div>

          {/* Imagen invertida */}
          <div
            className="w-300 z-10 rounded-4xl -ml-156 h-full bg-cover bg-center transform scale-x-[-1]"
            style={{ backgroundImage: `url(${vendidosImagen1})` }}
          ></div>
        </div>
        {/*fila 2*/}
        <div className="cuadroImagen3 mt-4">
            <div className="flex px-4 w-400  py-4 mt-4 h-100 rounded-4xl  bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"             
            style={{
          background: isLight
            ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
            : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
          ...getSectionStyle(),
        }}>
                <button className="text-4xl mr-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                    <h1 className=''><ArrowLeftNormal/></h1>
                </button>
                <div className="carrusel flex gap-4">
                        {/*Producto23*/}
                        <ProductCard
                          id="producto1Vendidos"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto1Vendidos"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />  
                        {/*Producto24*/}
                        <ProductCard
                          id="producto2Vendidos"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto2Vendidos"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />  
                        {/*Producto25*/}
                        <ProductCard
                          id="producto3Vendidos"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto3Vendidos"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />  
                        {/*Producto26*/}
                        <ProductCard
                          id="producto4Vendidos"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto4Vendidos"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        /> 
                        {/*Producto27*/}
                        <ProductCard
                          id="producto5Vendidos"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto5Vendidos"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        /> 
                        {/*Producto28*/}
                        <ProductCard
                          id="producto6Vendidos"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto6Vendidos"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        /> 
                </div>
            <button className="text-4xl mx-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                <h1 className=''><ArrowRightNormal/></h1>
            </button> 
            </div>
        </div>  
        </div>
      </section>
    
     

      </section>
    )
}
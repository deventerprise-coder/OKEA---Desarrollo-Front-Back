import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png"
import supermercadoImagen1 from "../../assets/imagenes/Home/supermercadoImagen1.png"
import supermercadoImagen2 from "../../assets/imagenes/Home/supermercadoImagen2.png"
import supermercadoImagen3 from "../../assets/imagenes/Home/supermercadoImagen3.png"
import supermercadoImagen4 from "../../assets/imagenes/Home/supermercadoImagen4.png"
import supermercadoImagen5 from "../../assets/imagenes/Home/supermercadoImagen5.png"
import supermercadoImagen6 from "../../assets/imagenes/Home/supermercadoImagen6.png"
import supermercadoImagen7 from "../../assets/imagenes/Home/supermercadoImagen7.png"
import supermercadoImagen8 from "../../assets/imagenes/Home/supermercadoImagen8.jpg"
import ProductCard from "../../components/ProductCard";
import { ArrowLeftNormal, ArrowRightIconBlack, WineBottleIcon, WineBottleIconDarkMode } from "../../assets/iconos/iconoHome";


export default function Supermercado() {
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
              {/*Supermercado*/}
      <section className="Supermercado">
        <div className="mt-16 items-center flex flex-col justify-center">
            {/*Título*/}
            <div className="flex justify-center w-400 py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
            style={{
                background: isLight
                  ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                  : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
                ...getSectionStyle(),
              }}>
                <div className=" mr-5 ">
                    {isLight ? <WineBottleIcon /> : < WineBottleIconDarkMode />}
                </div>
                <h1 className='text-4xl p-0.5 font-popins  text-[#434651]'style={getTextStyle()}>Supermercado</h1>
                <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
                <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Todo lo que necesitas, en un solo lugar</p>
                <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
                    <h1 className='font-popins text-sm'>Ver todo</h1>
                    <div className='scale-60 -my-0.5'>
                        <ArrowRightIconBlack />
                    </div>
                </button>
            </div>
            {/*Fila*/}
            <div className="grid grid-cols-4 w-400 mt-4 gap-4">
                <div className=" col-start-1 col-end-2 h-100  rounded-4xl w-100  bg-gradient-to-br from-[#EB5A45] via-[#EB5A45] to-[#DFE162]">
                    <div className="  mt-10 justify-center scale-140 ">
                        <h2 className='text-white leading-11 font-extralight ml-23 font-popins col-span-2 text-left'>HASTA </h2>
                        <div className="ml-20 flex -mt-6 -mb-5">
                            <h2 className='text-white text-8xl font-extrabold font-popins'>50</h2>
                            <div className="">
                                <h2 className='text-white  mt-2 text-6xl font-extrabold font-popins'>%</h2>
                                <h2 className='text-white  font-popins  font-light'>DCTO.</h2>
                            </div>
                       </div>
                        <h2 className='text-[#DAE2FF] text-left ml-20 w-40 mt-5 text-3xl tracking-tight font-popins-light '>SEGUNDA UNIDAD</h2>
                    </div>
                    <div className="h-70 w-60 ml-43 -mt-30 bg-cover bg-right-bottom" style={{ backgroundImage: `url(${supermercadoImagen1})`}}></div>
                </div>
                <div className="col-span-3 mr-40 w-300 rounded-4xl overflow-hidden">
                    <div className="h-100 w-299 bg-cover bg-center" style={{ backgroundImage: `url(${supermercadoImagen2})` }}>
                    </div>
                </div>
            </div>
            {/*Fila2*/}
            <div className="fila2">
                <div className="cuadroImagen3 mt-3">
                    <div className="flex px-4 w-400 py-4 mt-4 h-100 rounded-4xl  bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"            
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
                        {/*Producto11*/}
                        <ProductCard
                          id="producto1Supermercado"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto1Supermercado"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        /> 
                        {/*Producto12*/}
                        <ProductCard
                          id="producto2Supermercado"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto2Supermercado"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        /> 
                        {/*Producto13*/}
                        <ProductCard
                          id="producto3Supermercado"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto3Supermercado"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto14*/}
                        <ProductCard
                          id="producto4Supermercado"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto4Supermercado"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto15*/}
                        <ProductCard
                          id="producto5Supermercado"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto5Supermercado"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto16*/}
                        <ProductCard
                          id="producto6Supermercado"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto6Supermercado"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        </div>
                    </div>
                </div> 
            </div>
            <div className="flex w-400 h-100 bg-cover  rounded-4xl justify-between overflow-hidden mt-4" style={{ backgroundImage: `url(${supermercadoImagen3})` }}>
                <div className="w-75 h-80 bg-no-repeat bg-cover bg-center rounded-4xl ml-17.5 my-9.5" style={{ backgroundImage: `url(${supermercadoImagen4})` }}></div>
                <div className="pt-25 pr-20">
                    <div className="flex  -ml-10 font-popins text-[#004143] text-7xl font-extrabold">
                        <h1 className='mt-1 -rotate-3 skew-x-6'>O</h1>
                        <h1 className='-mt-0.5 -rotate-3 skew-x-6'>F</h1>
                        <h1 className='-mt-2 -rotate-3 skew-x-6'>F</h1>
                    </div>
                    <div className=' flex text-[#EF7D14] leading-10  font-popins font-extrabold text-9xl'>
                        <h1 className=' -mx-2 rotate-3 -skew-x-6'>1</h1>
                        <h1 className=' -mx-2 rotate-3 -skew-x-6'>0</h1>
                        <h1 className=' rotate-3 -skew-x-6'>%</h1>
                    </div>    
                    <h2 className='font-popins text-2xl mt-12 text-white py-4 px-12 rounded-4xl  bg-[#004143]'>Café de Especialidad</h2>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4  w-400 h-100 bg-cover  rounded-4xl overflow-hidden mt-4">
                <div className="col-span-1 bg-cover" style={{ backgroundImage: `url(${supermercadoImagen5})` }}></div>       
                <div className="col-span-1 bg-cover" style={{ backgroundImage: `url(${supermercadoImagen6})` }}></div>
                <div className="col-span-1 bg-cover" style={{ backgroundImage: `url(${supermercadoImagen7})` }}></div>
                <div className="col-span-1 bg-cover" style={{ backgroundImage: `url(${supermercadoImagen8})` }}></div>
            </div>
        </div>
      </section>
    </section>
    )
}
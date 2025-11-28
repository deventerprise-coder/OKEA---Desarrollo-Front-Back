import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import mueblesFondo from "../../assets/imagenes/Home/mueblesFondo.png"
import cuadroMueble1 from "../../assets/imagenes/Home/muebleCuadroMueble1.png"
import cuadroMueble2 from "../../assets/imagenes/Home/muebleCuadroMueble2.png"
import silla from "../../assets/imagenes/Home/muebleSilla.jpg"
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png"
import { ArrowLeftNormal, ArrowRightBlackIconwhitout, ArrowRightIconBlack, ArrowRightNormal, SofaIcon, SofaIconDarkMode } from "../../assets/iconos/iconoHome";
import ProductCard from "../../components/ProductCard.jsx";
import { useNavigate } from "react-router-dom";


export default function Muebles() {
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

      // lista de productos
      const productos = Array.from({ length: 6 }, (_, i) => ({
        id: `producto${i + 1}Calzado`,
        image: muebleMesitaNoche,
        discount: "-50%",
        label: "Label",
        title: "Wooden Sofa Chair",
        price: "$80.00",
        oldPrice: "s/ 160.00",
        rating: "4.9",
      }));
  

    return (
      <section className="Home" style={getBackgroundStyle()}>
      {/*Muebles*/}
      <section className="Muebles px-4 sm:px-6/12 md:3/12 lg:px-40">
        <div className=" mt-4 md:mt-16 items-center flex flex-col justify-center">
            {/*Titulo*/}
            <div className="hidden md:flex justify-center w-full py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF] px-2"
             style={{
            background: isLight
              ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
              : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
              ...getSectionStyle(),
              }}>
                <div className=" mr-5 my-1">
                    {isLight ? <SofaIcon /> : <SofaIconDarkMode />}
                </div>
                <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Muebles</h1>
                <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
                <p className='font-popins-light md:text-xl md:text-center xl:text-2xl text-2xl font-extralight py-1.5 text-[#747782]' style={getTextStyle()}>Diseño y confort para tu espacio</p>
                <button className='flex  bg-[#DFE162] min-w-[116px] text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
                    <h1 className='font-popins text-sm cursor-pointer' onClick={()=>{navigate("/catalogo/muebles-y-organizacion")}}>Ver todo</h1>
                    <div className='scale-60 -my-0.5'>
                          <ArrowRightIconBlack />
                    </div>
                </button>
            </div>
             {/*Título*/}
            <div className=" md:hidden flex  w-full text-left gap-5">
                <div className=" scale-70 mt-1.5">
                    {isLight ? <SofaIcon color="#434651" /> : < SofaIconDarkMode />}
                </div>
                <h1 className='text-3xl md:text-4xl pt-1.5 font-popins  text-[#434651]'style={getTextStyle()}>Muebles</h1>
            </div>
            {/*Contenido Fila 1*/}
            <div className="grid md:grid-cols-5 gap-4 mt-4 mx-40 w-full">
                {/*Cuadro 1*/}
                <div className=" col-start-1 xl:col-end-5 col-end-7 bg-cover w-full bg-right overflow-hidden h-65.5 md:h-200 rounded-2xl  md:rounded-4xl  bg-no-repeat" style={{ backgroundImage: `url(${mueblesFondo})` }}>
                    <div className="flex justify-between">
                        {/*Promocion*/}
                        <div className="bg-[#EB5A45] h-97 w-100 -mt-31.5 -ml-31.5 md:-mt-0 md:-ml-0 scale-35 md:scale-100 flex justify-center py-11 rounded-br-4xl">    
                            <div className=" scale-110 gap-2 my-11  h-54 w-96">
                                <h2 className='text-white ml-2 pl-16 mb-1 text-2xl font-popins-light text-left'>HASTA </h2>
                                <div className="flex justify-center">
                                    <h2 className='text-white  -mt-5 text-9xl font-extrabold font-popins col-span-1'>50</h2>
                                    <div className="columns-1 text-center -mt-5 col-end-1">
                                        <h2 className='text-white  text-8xl font-extrabold font-popins col-span-1'>%</h2>
                                        <h2 className='text-white text-2xl -mt-2 font-popins font-light '>DCTO.</h2>
                                    </div>
                                </div>
                                <h2 className='text-[#DFE162] text-center mt-10 text-4xl tracking-tight font-popins h-12 w-96'>En todo los <span className='font-bold text-white text-4xl'>sofás</span></h2>
                            </div>
                        </div>    
                        {/*Cuadro Mueble*/}
                        
                        <div className="flex bg-white/20 scale-32 md:scale-100 rounded-3xl -mt-30  md:mt-7.5 -ml-64 lg:-ml-59.5 md:mr-8.5 py-18 backdrop-blur-2xl">
                            <div className="bg-white w-57 h-50 rounded-2xl ml-8 mr-5">
                                <div className="h-86 w-150 bg-no-repeat bg-cover scale-35 -ml-47 -my-19" style={{ backgroundImage: `url(${cuadroMueble1})` }}></div>
                            </div>
                            <div className="text-right w-46 mr-15">
                                <h2 className='text-white text-2xl leading-4 font-popins-light font-extralight'>Sofá minimalista de lino natural</h2>
                                <h2 className='text-white text-2xl my-1 font-popins font-bold'>s/ <span className='text-5xl'>1,400</span></h2>
                                <h2 className='text-white -ml-1 text-xs font-popins-light font-extralight'>precio normal <span className='line-through text-[#C4C6D3]'>s/<span className=' text-xl'>2,800</span></span> </h2>
                                <div className="flex justify-end">
                                    <button className='rounded-4xl bg-white  flex mt-9 py-1 px-3 cursor-pointer' onClick={() => navigate("/producto/detalle/muebles-y-organizacion/modelo-x")}>
                                        <h2 className={`font-popins-light text-sm py-2 text-black`}>VER PRODUCTO</h2>
                                        <div className='  scale-50'>
                                           <ArrowRightBlackIconwhitout />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*Cuadro Mueble*/}
                    <div className="flex justify-end">
                        <div className="flex bg-white/20 scale-32 md:scale-100 rounded-3xl -mt-60.5 md:mb-7.5 md:mt-7 -mr-41 md:mr-8.5 py-18 backdrop-blur-2xl">
                            <div className="text-right w-46 mr-5 mx-9.5 ">
                                    <h2 className='text-white text-2xl leading-4 font-popins-light font-extralight'>Sofá minimalista de lino natural</h2>
                                    <h2 className='text-white text-2xl my-1 font-popins font-bold'>s/ <span className='text-5xl'>1,400</span></h2>
                                    <h2 className='text-white -ml-1 text-xs font-popins-light font-extralight'>precio normal <span className='line-through text-[#C4C6D3]'>s/<span className=' text-xl'>2,800</span></span> </h2>
                                    <div className="flex justify-end">
                                        <button className='rounded-4xl bg-white  flex mt-9 py-1 px-3 cursor-pointer' onClick={() => navigate("/producto/detalle/muebles-y-organizacion/modelo-x")}>
                                            <h2 className={`font-popins-light text-sm py-2 text-black`}>VER PRODUCTO</h2>
                                            <div className=' scale-50'>
                                               <ArrowRightBlackIconwhitout />
                                            </div>
                                        </button>
                                    </div>
                            </div>
                            <div className="bg-white w-57 h-50 rounded-2xl ml-8 mr-5">
                                <div className="h-86 w-150 bg-no-repeat bg-cover scale-35 -ml-47 -my-19" style={{ backgroundImage: `url(${cuadroMueble2})` }}></div>
                            </div>                                                    
                        </div>
                    </div>
                </div>
                {/*Cuadro 2*/}
                <div className='hidden xl:block relative  h-200 rounded-4xl overflow-hidden cursor-pointer' onClick={() => navigate("/catalogo/muebles-y-organizacion")} >
                    <div className=" h-200  bg-cover bg-left-bottom -ml-26" style={{ backgroundImage: `url(${silla})` }}></div>
                    <div className=" absolute bottom-10 left-13   text-center text-white">
                        <div className="bg-gradient-to-t  from-[#E4E666] to-[#E4E666]/0 h-76.5 w-97 xl:-ml-32 2xl:-ml-25 -mb-20 2xl:scale-100 scale-100 xl:scale-97">
                            <h1 className='text-popins text-3xl pt-8 font-semibold  xl:-ml-15 2xl:ml-0 xl:text-2xl 2xl:text-3xl xl:scale-90 2xl:scale-100'>SILLAS DE SALA</h1>
                            <div className="grid justify-center 2xl:scale-140 mt-4 2xl:mt-10 2xl:ml-0 lg:-ml-15">
                                <h2 className='text-white leading-11 font-extralight ml-1 font-popins pb-2 col-span-2 text-left'>HASTA </h2>
                                <div className="flex -mt-7 -mb-5">
                                    <h2 className='text-white text-8xl font-extrabold font-popins col-span-1'>30</h2>
                                    <div className="columna2">
                                        <h2 className='text-white  mt-2 text-6xl font-extrabold font-popins col-span-1'>%</h2>
                                        <h2 className='text-white  font-popins  font-light col-span-1'>DCTO.</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Fila 2*/}
            <div className=" w-full">
                {/*Cuadro 3*/}
                <div className="hidden md:flex px-4 w-full overflow-hidden py-4 mt-4 h-100 rounded-4xl  bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"             style={{
                 background: isLight
                   ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                   : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
                 ...getSectionStyle(),
               }}>
                    <button className="text-4xl mr-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                        <h1 className=''><ArrowLeftNormal/></h1>
                    </button>
                    <div className="carrusel w-100% md:flex gap-4">
                      {productos.map((p) => (
                        <ProductCard
                          key={p.id}
                          id={p.id}
                          {...p}
                          liked={liked[p.id]}
                          added={addedItems[p.id]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                      ))}
                    </div>
                <button className="text-4xl mx-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                    <h1 className=''><ArrowRightNormal/></h1>
                </button> 
                </div>
           {/* 📱 Versión móvil (carrusel deslizable) */}
          <div
            className="md:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 w-full mt-4 py-4 px-2 rounded-4xl group"
          >
            {productos.map((p) => (
              <div key={p.id}>
                  <ProductCard
                  key={p.id}
                  id={p.id}
                  {...p}
                  liked={liked[p.id]}
                  added={addedItems[p.id]}
                  onLike={toggleLike}
                  onAdd={handleClick}
                  getCardStyle={getCardStyle}
                  getTextStyle={getTextStyle}
                />
              </div>
            ))}
          </div>
            </div>    
        </div>
      </section>
      </section>
    )
}
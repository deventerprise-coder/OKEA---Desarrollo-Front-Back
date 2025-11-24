import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png"
import calzadoimagen2 from "../../assets/imagenes/Home/calzadoimagen2.jpg"
import calzadoimagen from "../../assets/imagenes/Home/calzadoimagen.png"
import calzadoFondo from "../../assets/imagenes/Home/calzadoFondo.png"
import { ArrowRightBlackIconwhitout, ArrowRightBrownIcon, ArrowRightIconBlack, FacebookIcon, FootIcon, FootIconDarkMode, HandBagIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from "../../assets/iconos/iconoHome";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Calzado() {
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
      {/*Calzado*/}
      <section className="Calzado">
        <div className='mt-8 md:mt-16 items-center flex flex-col justify-center px-4 sm:px-6/12 md:3/12 lg:px-40'>
          {/* Titulo */}
          <div className="hidden md:flex justify-center w-full  py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF] px-2"
          style={{
              background: isLight
                ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
              ...getSectionStyle(),
            }}>
            <div className=" mr-5  my-1">
              {isLight ? <FootIcon color="#3F3F3F" /> : <FootIconDarkMode />}
            </div>
            <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Calzado</h1>
            <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
            <p className='font-popins-light md:text-xl md:text-center xl:text-2xl text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Diseño y confort para tu espacio</p>
            <button className='flex  bg-[#DFE162] min-w-[116px] text-[#484900] py-2.5 px-4  h-10 rounded-4xl cursor-pointer' onClick={() => navigate("/catalogo/calzado")}>
              <h1 className='font-popins text-sm'>Ver todo</h1>
              <div className='scale-60 -my-0.5'>
                  <ArrowRightIconBlack />
              </div>
            </button>
          </div>
            {/*Título*/}
            <div className=" md:hidden flex  w-full text-left gap-5">
                <div className=" scale-70 mt-1 ">
                    {isLight ? <FootIcon color="#3F3F3F" /> : < FootIconDarkMode />}
                </div>
                <h1 className='text-3xl md:text-4xl pt-1.5 font-popins  text-[#434651]'style={getTextStyle()}>Calzado</h1>
            </div>
          {/* Cuadro Imagen1 */}
          <div className=" px-10 py-10 mt-4 mb-4 h-36 md:h-150 bg-no-repeat bg-cover bg-center rounded-3xl bg-gray-200 w-full cursor-pointer" style={{ backgroundImage: `url(${calzadoFondo})` }} onClick={() => navigate("/catalogo/calzado")}>
          
          </div>
          {/* Cuadro Imagen2 y Imagen3 */}
          <div className="grid grid-cols-6 gap-4 h-70 md:h-196 w-full">
            {/*Cuadro Imagen2*/} 
            <div className="col-start-1 md:col-end-7 2xl:col-end-5 col-end-7 overflow-hidden  h-70 md:h-196  rounded-4xl  flex justify-end relative bgcover from-top" style={{ backgroundImage: `url(${calzadoimagen2})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              {/* Capa de blur lateral */}
              <div className="absolute inset-0 backdrop-blur-2xl [mask-image:linear-gradient(to_left,white,transparent)] [mask-repeat:no-repeat] [mask-size:100%]"></div>
    
              {/* Contenido */}
              <div className="relative font-popins text-center w-6/12 bg-gradient-to-l from-[#EB5A45]/100 via-[#2C509E91]/90 to-[#2C509E91]/0 py-24 rounded-4xl">
                <h2 className=" absolute right-10.5 top-20 md:relative -mt-13 md:ml-0 xl:ml-30 2xl:ml-20 text-4xl md:text-8xl font-semibold text-[#DFE162]">OFERTA</h2>
                <h2 className=" absolute right-12.5 top-16 md:relative  md:pb-10 md:ml-0 xl:ml-30 text-4xl md:text-8xl  font-semibold text-[#DFE162]">ÚNICA</h2>
                {/*Promocion*/}
                <div className=" md:right-50.5  md:w-90  -mt-10  md:pt-16  md:-ml-35 lg:ml-10 xl:ml-40 2xl:ml-30 rounded-br-3xl scale-40 md:scale-120">
                  <h2 className='text-white font-extralight ml-5 font-popins text-3xl text-left'>HASTA </h2>
                  <div className="flex  -mb-5">
                    <h2 className='text-white -mt-4 text-9xl mb-6 ml-2 font-extrabold font-popins col-span-1'>50</h2>
                    <div className="columna2">                                
                      <h2 className='text-white -mt-5 text-8xl font-extrabold font-popins col-span-1'>%</h2>
                      <h2 className='text-white  font-popins -mt-1 font-light col-span-1'>DCTO.</h2>
                    </div>
                  </div>
                  <h2 className='text-white text-center text-2xl pr-12 font-popins w-90 lg:-ml-4 xl:ml-0'>EN ZAPATOS ESCOLARES PARA NIÑOS</h2>
                </div>
                <div className="flex md:pl-13 justify-center md:mt-11 ">
                  <button className='rounded-4xl bg-white scale-50 md:scale-100 flex mb-20 -mt-15 md:mt-9 md:mb-0 ml-7 md:-ml-35 lg:-ml-20 md:py-1 px-1.2 sm:px-3 cursor-pointer' onClick={() => navigate("/catalogo/calzado")}>
                    <h2 className='font-popins-light text-sm py-2 text-black'>VER PRODUCTO</h2>
                    <div className='  scale-50'>
                        <ArrowRightBlackIconwhitout />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden 2xl:flex flex-col col-start-5 col-end-7 h-196 p-4 rounded-4xl overflow-hidden bg-gradient-to-l from-[#DFE162]  via-[#DFE162]/50  to-[#B1C5FF]"            
            style={{
               background: isLight
                 ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                 : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
               ...getSectionStyle(),
             }}>
              {/*Fila 1*/}
              <div className="flex gap-4 pb-4">                
                  {/*Producto7*/}
                  <ProductCard
                    id="producto1Calzado"
                    image={muebleMesitaNoche}
                    discount="-50%"
                    label="Label"
                    title="Wooden Sofa Chair"
                    price="$80.00"
                    oldPrice="s/ 160.00"
                    rating="4.9"
                    liked={liked["producto1Calzado"]}
                    added={addedItems[1]}
                    onLike={toggleLike}
                    onAdd={handleClick}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  /> 
                  {/*Producto8*/}
                  <ProductCard
                    id="producto2Calzado"
                    image={muebleMesitaNoche}
                    discount="-50%"
                    label="Label"
                    title="Wooden Sofa Chair"
                    price="$80.00"
                    oldPrice="s/ 160.00"
                    rating="4.9"
                    liked={liked["producto2Calzado"]}
                    added={addedItems[1]}
                    onLike={toggleLike}
                    onAdd={handleClick}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  /> 
              </div>
              {/*Fila 2*/}
              <div className="flex gap-4 pb-4">                
                  {/*Producto9*/}
                   <ProductCard
                    id="producto3Calzado"
                    image={muebleMesitaNoche}
                    discount="-50%"
                    label="Label"
                    title="Wooden Sofa Chair"
                    price="$80.00"
                    oldPrice="s/ 160.00"
                    rating="4.9"
                    liked={liked["producto3Calzado"]}
                    added={addedItems[1]}
                    onLike={toggleLike}
                    onAdd={handleClick}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  /> 
                  {/*Producto10*/}
                   <ProductCard
                    id="producto4Calzado"
                    image={muebleMesitaNoche}
                    discount="-50%"
                    label="Label"
                    title="Wooden Sofa Chair"
                    price="$80.00"
                    oldPrice="s/ 160.00"
                    rating="4.9"
                    liked={liked["producto4Calzado"]}
                    added={addedItems[1]}
                    onLike={toggleLike}
                    onAdd={handleClick}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  /> 
              </div>
            </div>                 
          </div>
           {/* 📱 Versión móvil (carrusel deslizable) */}
          <div
            className="2xl:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 w-full mt-4 py-4 px-2 rounded-4xl group"
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
          {/* Cuadro Imagen4 */}
          <div className="hidden lg:flex w-full h-50 mt-4 bg-[#2C509ED1] rounded-4xl justify-around">
            <h1 className='ml-10 xl:ml-16.5 font-sans -tracking-widest font-bold text-white/70 lg:text-7xl xl:text-[120px]'>SNEAKERS</h1>
            <div className="h-41 w-4/12 bg-cover bg-center " style={{ backgroundImage: `url(${calzadoimagen})` }}></div>
            <div className="mr-16">
              <h2 className='font-popins tracking-tighter font-bold mt-7 text-white  lg:text-4xl xl:text-6xl'>ENCUENTRA TU ESTILO</h2>
              <div className="flex gap-4">
                <h2 className='text-[#1C4390] p-2.5 font-popins tracking-tighter font-bold text-4xl w-2/12 lg:w-auto h-auto rounded-4xl bg-[#DFE162]'>Compra Ahora</h2>
                <h2 className='font-popins tracking-tighter mt-3 font-bold text-white text-4xl'>50% DESCUENTO</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    )
}
import { useState} from "react";
import { useTheme } from "../../components/ThemeContext";
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png"
import calzadoimagen2 from "../../assets/imagenes/Home/calzadoimagen2.jpg"
import calzadoimagen from "../../assets/imagenes/Home/calzadoimagen.png"
import { ArrowRightBlackIconwhitout, ArrowRightBrownIcon, ArrowRightIconBlack, FacebookIcon, FootIcon, FootIconDarkMode, HandBagIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from "../../assets/iconos/iconoHome";
import ProductCard from "../../components/ProductCard";


export default function Calzado() {
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
      {/*Calzado*/}
      <section className="Calzado">
        <div className='mt-16 items-center flex flex-col justify-center'>
          {/* Titulo */}
          <div className="flex justify-center w-400  py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
          style={{
              background: isLight
                ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
              ...getSectionStyle(),
            }}>
            <div className=" mr-5  my-1">
              {isLight ? <FootIcon /> : <FootIconDarkMode />}
            </div>
            <h1 className='text-4xl p-0.5 font-popins  text-[#434651]' style={getTextStyle()}>Calzado</h1>
            <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
            <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Diseño y confort para tu espacio</p>
            <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
              <h1 className='font-popins text-sm'>Ver todo</h1>
              <div className='scale-60 -my-0.5'>
                  <ArrowRightIconBlack />
              </div>
            </button>
          </div>
          {/* Cuadro Imagen1 */}
          <div className=" px-10 py-10 mt-4 mb-4 h-150 rounded-3xl bg-gray-200 w-400" >
            {/* fila */}
            <div className="flex justify-between font-bold">
              <div className="flex gap-1">
                <div className="logo py-0.5"> <HandBagIcon /> </div>
                <div className="font-popins leading-4 text-[#704d00]">
                  <h1>LOGO</h1>
                  <h1>HERE</h1>
                </div>
              </div>
              <div className="derecha">
                <div className=" text-[#704d00] font-popins -mt-2">
                  <h1>FOLLOW US NOW</h1>
                  {/*Fila*/}
                  <div className="flex justify-around">
                    <div className="size-6 bg-[#704d00] rounded-full p-1"><FacebookIcon /></div>
                    <div className="size-6 bg-[#704d00] rounded-full p-1"><TwitterIcon /></div>
                    <div className="size-6 bg-[#704d00] rounded-full p-1"><YouTubeIcon /></div>
                    <div className="size-6 bg-[#704d00] rounded-full p-1"><InstagramIcon /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" py-20 rounded-3xl font-popins-light text-center w-140 ml-20">
              <h1 className="text-4xl tracking-widest  text-transparent bg-clip-text bg-radial from-[#b17a04] via-[#704d00] to-[#704d00]">LIMITED OFFER</h1>
              <h1 className="text-9xl -mt-4 -mb-4 font-popins font-extrabold text-transparent bg-clip-text bg-radial from-[#b17a04] via-[#704d00] to-[#704d00]">BLACK</h1>
              <h1 className="text-6xl tracking-[1rem] text-transparent bg-clip-text bg-radial from-[#b17a04] via-[#704d00] to-[#704d00]">FRIDAY</h1>
              <div className='flex justify-center mt-5'>    
                <button className='flex gap-2 bg-[#704d00]  text-white py-2  px-2 -mx-5 mt-2 h-8.5 rounded-4xl'>
                  <div className='size-6 p-1  font-bold rounded-full bg-white -mt-1 '>
                    <ArrowRightBrownIcon />
                  </div>
                  <h1 className='font-popins font-bold tracking-wider text-xs -py-1 mt-0.5'>ORDER NOW</h1>
                </button>
              </div>
              <h1 className='text-[#704d00] font-popins font-bold text-2xl mt-3'>609-791-3583</h1>
              <h1 className='font-popins font-bold text-[#704d00] text-xs'>WWW.YOURWEBSITE.COM</h1>
            </div>
          </div>
          {/* Cuadro Imagen2 y Imagen3 */}
          <div className="grid grid-cols-6 gap-4 h-196 w-400">
            {/*Cuadro Imagen2*/} 
            <div className="col-start-1 col-end-5 overflow-hidden  h-196  rounded-4xl  flex justify-end relative bgcover from-top" style={{ backgroundImage: `url(${calzadoimagen2})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              {/* Capa de blur lateral */}
              <div className="absolute inset-0 backdrop-blur-2xl [mask-image:linear-gradient(to_left,white,transparent)] [mask-repeat:no-repeat] [mask-size:100%]"></div>
    
              {/* Contenido */}
              <div className="relative font-popins text-center w-120 bg-gradient-to-l from-[#EB5A45] via-[#2C509E91]/80 to-[#2C509E91]/0 py-24 rounded-4xl">
                <h2 className="text-7xl font-semibold text-[#DFE162]">OFERTA</h2>
                <h2 className="text-7xl  font-semibold text-[#DFE162]">ÚNICA</h2>
                {/*Promocion*/}
                <div className="px-20 w-90 pt-16  rounded-br-3xl scale-120">
                  <h2 className='text-white font-extralight ml-5 font-popins text-2xl text-left'>HASTA </h2>
                  <div className="flex  -mb-5">
                    <h2 className='text-white -mt-4 text-9xl mb-6 ml-2 font-extrabold font-popins col-span-1'>50</h2>
                    <div className="columna2">                                
                      <h2 className='text-white  mt-2 text-7xl font-extrabold font-popins col-span-1'>%</h2>
                      <h2 className='text-white  font-popins  font-light col-span-1'>DCTO.</h2>
                    </div>
                  </div>
                  <h2 className='text-white text-center text-2xl pr-12 font-popins w-90'>EN ZAPATOS ESCOLARES PARA NIÑOS</h2>
                </div>
                <div className="flex justify-center mt-11 ">
                  <button className='rounded-4xl bg-white  flex mt-9 py-1 px-3 '>
                    <h2 className='font-popins-light text-sm py-2'>VER PRODUCTO</h2>
                    <div className='  scale-50'>
                        <ArrowRightBlackIconwhitout />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-start-5 col-end-7 h-196 p-4 rounded-4xl overflow-hidden bg-gradient-to-l from-[#DFE162]  via-[#DFE162]/50  to-[#B1C5FF]"            
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
          {/* Cuadro Imagen4 */}
          <div className="flex  w-400 h-50 mt-4 bg-[#2C509ED1] rounded-4xl justify-around">
            <h1 className=' ml-17 font-popins-light tracking-tighter font-bold text-white/70 text-[120px]'>SNEAKERS</h1>
            <div className="h-80 w-80 bg-cover -mt-20" style={{ backgroundImage: `url(${calzadoimagen})` }}></div>
            <div className="mr-16">
              <h2 className='font-popins-light tracking-tighter font-bold mt-7 text-white text-[55px]'>ENCUENTRA TU ESTILO</h2>
              <div className="flex gap-4">
                <h2 className='text-[#1C4390] p-2.5 font-popins tracking-tighter font-bold text-4xl w-auto h-auto rounded-4xl bg-[#DFE162]'>Compra Ahora</h2>
                <h2 className='font-popins tracking-tighter mt-3 font-bold text-white text-4xl'>50% DESCUENTO</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    )
}
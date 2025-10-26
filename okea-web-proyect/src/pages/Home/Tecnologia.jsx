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
        minHeight: '100vh',
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

    // Estilos fijos del diseño original, redefinidos para usar en lg: (Desktop)
    // 400 es ~100rem o max-w-7xl; 90 es w-24; 55 es w-14
    const _originalDesktopClasses = {
        // Título
        tituloW: 'lg:w-1000', 
        // Fila 1 Contenedor
        fila1W: 'lg:w-400 lg:mx-40', 
        // Fila 2 Contenedor
        fila2W: 'lg:w-400 lg:h-80',
        // Card Azul (Contenido Papa)
        cardAzulW: 'lg:w-90 lg:h-80',
        cardAzulMaxW: 'lg:max-w-4xl',
        // Precios
        precioW: 'lg:w-55 lg:h-25'
    }

    return (
    <section className="Home" style={getBackgroundStyle()}>
        {/*Tecnologia*/}
        {/* Sección: px-40 se activa en LG, adaptado en móvil */}
        <section className="Tecnologia p-4 md:px-8 lg:px-40">
            <div className="mt-16 items-center flex flex-col justify-center">
                
                {/*Titulo - Responsive con look original en LG */}
                <div 
                    // Contenedor del título: ajusté width/height/padding en LG para control exacto
                    className={`flex flex-wrap justify-center w-full max-w-4xl lg:max-w-[1600px] py-3 lg:py-6 gap-2 lg:gap-4 h-auto lg:h-[100px] rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]`}    
                    style={{
                        background: isLight
                            ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                            : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
                        ...getSectionStyle(),
                    }}
                >
                    <div className="mr-0 sm:mr-5 my-1 flex items-center">
                        {isLight ? <TecnologyIcon /> : <TecnologyIconDarkMode />}
                    </div>
                    {/* Texto: Ajuste responsive, vuelve a 4xl en LG */}
                    <h1 className='text-2xl md:text-3xl lg:text-4xl p-0.5 font-popins text-[#434651]' style={getTextStyle()}>Tecnología</h1>
                    <div className="bg-[#385BAA] h-8 w-px my-2 hidden sm:block"></div>
                    {/* Texto: Ajuste responsive, vuelve a 2xl en LG */}
                    <p className='font-popins-light text-sm md:text-xl lg:text-2xl font-extralight py-1.5 text-[#747782] hidden sm:block' style={getTextStyle()}>Equipamos tu mundo digital</p>
                    <button className='flex bg-[#DFE162] text-[#484900] py-2.5 px-4 h-10 rounded-4xl items-center flex-grow-0 mt-2 sm:mt-0'>
                        <h1 className='font-popins text-sm'>Ver todo</h1>
                        <div className='scale-60 -my-0.5'>
                            <ArrowRightIconBlack />
                        </div>
                    </button>
                </div>

                {/*Contenido fila 1 - ahora ambas cards tendrán el mismo ancho (792px en pantallas lg) */}
                <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4 mt-4">
                    <div className="relative overflow-hidden pt-10 px-7 bg-[#B1C5FF] h-[192px] md:h-[300px] lg:h-[400px] rounded-4xl w-full max-w-[792px] lg:w-[792px]">
                        <div className="flex justify-center md:justify-start">
                            <h1 className='font-popins text-3xl sm:text-4xl lg:text-[55px] text-white text-center md:text-left'>Llévate <span className='font-popins font-extralight text-3xl sm:text-4xl lg:text-[55px] text-[#DAE2FF]'>un </span><span className='font-popins text-4xl sm:text-5xl lg:text-[64px] text-[#1D1B20]'>iPhone 16 Pro</span></h1>
                        </div>
                        <div className="w-full sm:w-52 lg:w-52 mx-auto lg:ml-20 text-center mt-6 lg:mt-12 ">
                            <h2 className='font-popins-light mx-4 font-bold text-3xl lg:text-[55px] leading-snug lg:leading-12 text-white '>OFERTA</h2>
                            <h2 className='font-popins-light font-bold text-3xl lg:text-[55px] leading-snug lg:leading-12 text-white '>ESPECIAL</h2>
                            <h2 className='w-full lg:w-65 font-popins font-extralight text-xl lg:text-4xl text-[#DAE2FF]'>por lanzamiento exclusivo</h2>
                        </div>
                        <div 
                            className="absolute bg-cover -bottom-20 -right-20 sm:-right-40 w-40 sm:w-60 md:w-96 lg:w-[480px] h-[180px] sm:h-[260px] md:h-[340px] lg:h-[430px] scale-75 md:scale-90 lg:scale-100"
                            style={{ backgroundImage: `url(${tecnologiaImagen1})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        />
                    </div>

                    <div className="relative py-8 px-10 h-[192px] md:h-[300px] lg:h-[400px] rounded-4xl bg-[#e35944] bg-contain bg-no-repeat bg-center w-full max-w-[792px] lg:w-[792px]" style={{ backgroundImage: `url(${tecnologiaImagen5})` }}>
                        {/* Contenido opcional de la card roja */}
                    </div>
                </div>

                {/* Imagen po si el contenido fila 2 se tiene que borrar*/}
                <div className="" style={{ backgroundImage: `url(${tecnologiaImagen6})` }}></div>
                            
                {/*Contenido fila 2*/}
           <div className=" mt-4 flex overflow-hidden w-400 rounded-3xl h-80 bg-slate-300" > 
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
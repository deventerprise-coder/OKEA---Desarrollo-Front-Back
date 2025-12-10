import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import promocion from "../../assets/imagenes/Home/presentacionPromocion.png";
import apple from "../../assets/imagenes/Home/presentacionApple.png";
import iphone from "../../assets/imagenes/Home/presentacionIphone.png";
import sofa from "../../assets/imagenes/Home/presentacionSofa.png";
import audifonos from "../../assets/imagenes/Home/presentacionAudifonos.png";
import imagenrelok from "../../assets/imagenes/Home/presentacionImagenreloj.png";
import imagentelefono from "../../assets/imagenes/Home/presentacionImagentelefono.png";

export default function Presentacion() {
    // --- Estados presentación ---
    const [currentPres, setCurrentPres] = useState(0);
    const [setPrevPres] = useState(0);
    const [circleGrow, setCircleGrow] = useState(false);

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

    const getCardStyle = () => {
    return {
      backgroundColor: isLight ? '#FFFFFF' : '#292272',
      transition: 'all 0.3s ease'
    };
    };
    
    // --- Autoplay para presentación ---
    //useEffect(() => {
    //  const interval = setInterval(() => {
    //    nextSlidePresentacion();
    //  }, 10000);
    //  return () => clearInterval(interval);
    //},);

    // --- Animación círculo (solo afecta presentación) ---
    useEffect(() => {
     setCircleGrow(true);
      const timeout = setTimeout(() => setCircleGrow(false), 500);
      return () => clearTimeout(timeout);
    }, [currentPres]);

    // --- Funciones presentación ---
    const prevSlidePresentacion = () => {
      setCurrentPres(i =>
        i === 0 ? slidesPresentacion.length - 1 : i - 1
      );
    };

    const nextSlidePresentacion = () => {
      setCurrentPres(i =>
        i === slidesPresentacion.length - 1 ? 0 : i + 1
      );
    };

    // Slides
    const slidesPresentacion = [
        
        // --- Slide 1 ---
        
        <div className="flex relative justify-center scale-130 bg-gradient-to-tr from-[#707DCB] to-[#8B96E8] w-auto h-80 md:h-120 2xl:h-203 overflow-hidden">
          <div className="pl-10 md:pl-100 2xl:pl-101 md:pr-2 2xl:pr-30 -mt-8 -mr-30 md:mr-0 2xl:mr-0 md:mt-3 2xl:mt-40 scale-45 md:scale-65 2xl:scale-100">
            <h1 className="text-8xl md:text-9xl text-center leading-28 font-popins font-extrabold text-white pt-20 md:pt-14">
              Tech
            </h1>
            <h1 className=" text-[80px] md:text-[90px] text-center leading-10 md:leading-20 font-popins font-extrabold text-white pb-9">
              Frenzy
            </h1>
            <div className="text-center pl-2">
              <p className="text-sm md:text-base font-extralight md:font-normal border-b-1 border-t-1 border-white py-3 w-[319px] text-justify font-popins text-white">
                The tech fever is here. Amazing discounts on cutting edge gadgets.{" "}
                <span className="font-medium md:font-bold text-sm md:text-base">Act fast before they're gone!</span>
              </p>
            </div>
          <button className="text-2xl md:text-base mt-5 md:mt-14 py-3 md:py-1 px-8 md:px-15 border-1 border-white text-white rounded-full hover:cursor-pointer">
              Buy now
            </button>
          </div>
          {/* columna2 */}
          <div className="relative scale-33 md:scale-58 2xl:scale-100 -mt-8 md:pt-18 2xl:pt-40 -ml-17 md:-ml-25 2xl:-ml-0 md:mr-80 2xl:mr-100">
              <div
              className={`absolute right-5 top-5 md:top-45 size-20 -z-50 rounded-full 
              bg-gradient-to-b from-[#6625e8] via-[#e592ff] to-[#eddbff] 
              transition-transform duration-1000 ease-in
              ${circleGrow ? "scale-40" : "scale-130"}`}
            />
    
            <div className="relative size-98 md:size-96 backdrop-blur-md z-30 bg-white/30 rounded-4xl mt-20 -ml-10">
              <div
                className="absolute -left-18 -top-18 bg-cover size-34 -rotate-15 scale-75 md:scale-100"
                style={{ backgroundImage: `url(${promocion})` }}
              >
                <div className="text-5xl font-popins text-white font-extrabold text-center pt-6">
                  30% off
                </div>
              </div>
              <div
                className="absolute -right-10 bottom-15 bg-cover size-34 rotate-15 scale-75 md:scale-100"
                style={{ backgroundImage: `url(${promocion})` }}
              >
                <div className="text-5xl font-popins text-white font-extrabold text-center pt-6">
                  50% off
                </div>
              </div>
              <div
                className="absolute -left-50 -bottom-22 md:-bottom-14 bg-cover size-34 rotate-13 scale-90 md:scale-100"
                style={{ backgroundImage: `url(${promocion})` }}
              >
                <div className="text-5xl font-popins text-white font-extrabold text-center pt-6">
                  40% off
                </div>
              </div>
              <div
                className="absolute -left-20 -top-30 w-120 scale-70 h-150 hover:scale-90 hover:z-30"
                style={{ backgroundImage: `url(${imagentelefono})` }}
              ></div>
              <div
                className="absolute z-10 -right-5 -top-10 w-60 h-80  scale-70 hover:scale-90 hover:z-40 hover:-top-5 hover:-right-10"
                style={{ backgroundImage: `url(${imagenrelok})` }}
              ></div>
            </div>
            <div className={`absolute -left-20 md:-left-32 md:-bottom-3 rotate-45 size-40 z-10 bg-gradient-to-b rounded-full from-[#6625e8] via-[#e592ff] to-[#eddbff] transition-transform duration-1500 ease-out
              ${circleGrow ? "scale-80 md:scale-100" : "scale-150 md:scale-180"}`} />
          </div>
        </div>,
    
        // --- Slide 2 ---
        <div className="pb-5 bg-gradient-to-b from-[#C4D1ED] scale-140 to-[#8B72E5]/80 w-auto h-80 md:h-120 2xl:h-203 overflow-hidden">
          <div className="flex justify-center scale-30 md:scale-60 2xl:scale-100 mt-10 md:mt-25 2xl:mt-50">
            <div
              className="size-42 scale-40 -ml-14"
              style={{ backgroundImage: `url(${apple})` }}
            ></div>
            <h1 className="text-6xl md:text-7xl -ml-12 text-center font-popins text-black pt-14">
              iPhone16 {" "}
              <span
                className="text-transparent bg-clip-text -ml-5"
                style={{
                  backgroundImage:
                    "linear-gradient(to top right,#00ccff,#00ccff, #9a4efe,#ff66ff, #f80000, #f86700,#f86700)",
                }}
              >
                e
              </span>
            </h1>
          </div>
          <p
            className=" md:text-3xl -mt-18 md:-mt-13 2xl:-mt-10 scale-80 md:scale-90 2xl:scale-100 text-center font-popins text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(to right,#00ccff,#00ccff,#00ccff, #00ccff,#9a4efe,#ff66ff, #f80000, #f86700,#f86700)",
            }}
          >
            Diseñado para Apple Intelligence
          </p>
          <div className="w-auto md:flex justify-center mr-0 md:-mr-120 2xl:mr-0 -ml-75 md:-ml-125 2xl:ml-10 -mt-36 md:-mt-10 2xl:mt-25 scale-45 md:scale-60 2xl:scale-100">
            <div
              className=" w-350 h-100 -mt-30 scale-40 md:scale-45  2xl:scale-70 bg-cover"
              style={{ backgroundImage: `url(${iphone})` }}
            ></div>
          </div>
        </div>,
        
    
        // --- Slide 3 ---
        <div className="pt-20 flex justify-center bg-gradient-to-br h-80 md:h-120 2xl:h-203 from-[#E6E879] to-[#C5DFA1]">
          <div className="columna1 w-110 -ml-35 md:-ml-28 2xl:-ml-20  md:mr-50 2xl:mr-100 -mt-25 md:-mt-8 2xl:mt-30 scale-40 md:scale-80 2xl:scale-130">
            <h1 className="font-popins text-5xl text-left text-[#d16518]">
              MODERN
            </h1>
            <h1 className="font-popins text-7xl text-left text-[#d16518]">
              FORNITURE
            </h1>
            <div className="ml-50 mr-7 text-4xl font-light border text-center text-[#d16518] border-[#d16518] rounded-4xl">
              Best Quality
            </div>
            <button className="mt-48 px-4 py-1 font-popins text-4xl rounded-4xl bg-green-800 text-white">
              ORDER NOW
            </button>
          </div>
          <div className="scale-25 md:scale-55 2xl:scale-100">
            <div
              className=" relative w-150 h-120  -ml-150 md:-ml-129 2xl:-ml-100 -mt-30 md:-mt-10 2xl:mt-20"
              style={{ backgroundImage: `url(${sofa})` }}
            >
              <div className="absolute -bottom-20 -right-45 size-60 bg-[#d16518]/60 backdrop-blur-md align-center rounded-full text-center">
              <h1 className="text-white text-7xl pt-10 font-popins font-extrabold">
                30% OFF
              </h1>
            </div>
            </div>

          </div>
        </div>,
    
        // --- Slide 4 ---
        <div className="flex justify-center  h-80 md:h-120 2xl:h-203 gap-32 bg-[#CBBCFF] pt-23 md:pt-20 scale-150">
          <h1
            className="font-popins mr-6 md:mr-8  -mt-10 md:mt-7 2xl:mt-50 text-6xl text-transparent bg-clip-text text-center scale-35 md:scale-65 2xl:scale-100 text-balance w-90 font-extrabold"
            style={{
              backgroundImage: "linear-gradient(to bottom ,#0099ff, #9a4efe, #ad05d3)",
            }}
          >
            THINGS TO KNOW BEFORE YOU BUY
          </h1>
          <div
            className="w-90 h-90 scale-35 md:scale-70 2xl:scale-110 -ml-92 md:-ml-75 2xl:-ml-48 -mt-23 md:mt-2 2xl:mt-30"
            style={{ backgroundImage: `url(${audifonos})` }}
          ></div>
        </div>,
    ];

    return(

      <section className="Presentacion ">
      {/* Carrusel de Presentación */}
        <div className="relative w-full h-80 md:h-120 2xl:h-203 overflow-hidden">
          {/* Slides con fade */}
          {slidesPresentacion.map((slide, index) => (
            <div key={index} className={`absolute w-full h-full transition-opacity duration-1000 ${ index === currentPres ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
              {slide}
            </div>
          ))}

          {/* Controles */}
          <div className=" absolute bottom-2 w-full flex items-center justify-evenly px-10 z-50">
            {/* Flecha izquierda */}
            <button onClick={prevSlidePresentacion} className="absolute left-1 bottom-30 md:relative md:left-0 md:bottom-0   text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
              {"<"}
            </button>

            {/* Indicadores */}
            <div className="absolute left-1/2 scale-50 md:scale-100 -mt-3  md:mt-1 transform -translate-x-1/2 flex gap-3 ">
              {slidesPresentacion.map((_, index) => (
                <div key={index} onClick={() => { setPrevPres(currentPres); setCurrentPres(index); }} className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${ currentPres === index ? "bg-gray-400/50 scale-150" : "bg-gray-400/50" }`}></div>
              ))}
            </div>

            {/* Flecha derecha */}
            <button onClick={nextSlidePresentacion} className="absolute right-1 bottom-30 md:relative md:left-0 md:bottom-0  text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
              {">"}
            </button>
          </div>
        </div>
      </section>
    );
  }
import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import promocion from "../../assets/imagenes/Home/presentacionPromocion.png";
import apple from "../../assets/imagenes/Home/presentacionApple.png";
import iphone from "../../assets/imagenes/Home/presentacionIphone.png";
import sofa from "../../assets/imagenes/Home/presentacionSofa.png";
import audifonos from "../../assets/imagenes/Home/presentacionAudifonos.png";
import imagenrelok from "../../assets/imagenes/Home/presentacionImagenreloj.png";
import imagentelefono from "../../assets/imagenes/Home/presentacionImagentelefono.png";
import ProductCard from "../../components/ProductCard.jsx";
import tecnologia from "../../assets/imagenes/Home/categoriaTecnologia.jpg";
import muebles from "../../assets/imagenes/Home/categoriaMuebles.jpg";
import dormitorio from "../../assets/imagenes/Home/categoriaDormitorio.jpg";
import calzado from "../../assets/imagenes/Home/categoriaCalzado.jpg";
import accesorios from "../../assets/imagenes/Home/categoriaAccesorio.jpg";
import salud from "../../assets/imagenes/Home/categoriaSalud.jpg";
import juguetes from "../../assets/imagenes/Home/categoriaJuguetes.jpg";
import decoracion from "../../assets/imagenes/Home/categoriaDecoracion.jpg";
import mascotas from "../../assets/imagenes/Home/categoriaMascotas.jpeg";
import supermercado from "../../assets/imagenes/Home/categoriaSupermercado.jpg";
import automotriz from "../../assets/imagenes/Home/categoriaAutomotriz.jpg";
import tecnologiaImagen1 from "../../assets/imagenes/Home/tecnologiaImagen1.png";
import tecnologiaImagen2 from "../../assets/imagenes/Home/tecnologiaImagen2.png";
import tecnologiaImagen3 from "../../assets/imagenes/Home/tecnologiaImagen3.png";
import tecnologiaImagen4 from "../../assets/imagenes/Home/tecnologiaImagen4.png";
import tecnologiaImagen5 from "../../assets/imagenes/Home/tecnologiaImagen5.png";
import tecnologiaImagen6 from "../../assets/imagenes/Home/tecnologiaImagen6.png";
import mueblesFondo from "../../assets/imagenes/Home/mueblesFondo.png";
import cuadroMueble1 from "../../assets/imagenes/Home/muebleCuadroMueble1.png";
import cuadroMueble2 from "../../assets/imagenes/Home/muebleCuadroMueble2.png";
import silla from "../../assets/imagenes/Home/muebleSilla.jpg";
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png";
import calzadoimagen2 from "../../assets/imagenes/Home/calzadoimagen2.jpg";
import calzadoimagen from "../../assets/imagenes/Home/calzadoimagen.png";
import supermercadoImagen1 from "../../assets/imagenes/Home/supermercadoImagen1.png";
import supermercadoImagen2 from "../../assets/imagenes/Home/supermercadoImagen2.png";
import supermercadoImagen3 from "../../assets/imagenes/Home/supermercadoImagen3.png";
import supermercadoImagen4 from "../../assets/imagenes/Home/supermercadoImagen4.png";
import supermercadoImagen5 from "../../assets/imagenes/Home/supermercadoImagen5.png";
import supermercadoImagen6 from "../../assets/imagenes/Home/supermercadoImagen6.png";
import supermercadoImagen7 from "../../assets/imagenes/Home/supermercadoImagen7.png";
import supermercadoImagen8 from "../../assets/imagenes/Home/supermercadoImagen8.jpg";
import vendidosImagen1 from "../../assets/imagenes/Home/vendidosImagen1.png";
import ultimoImagen1 from "../../assets/imagenes/Home/ultimoImagen1.png";
import ultimoImagen4 from "../../assets/imagenes/Home/ultimoImagen4.png";
import ultimoImagen2 from "../../assets/imagenes/Home/ultimoImagen2.png";
import ultimoImagen3 from "../../assets/imagenes/Home/ultimoImagen3.png";
import ultimoImagen5 from "../../assets/imagenes/Home/ultimoImagen5.png";
import ultimoImagen6 from "../../assets/imagenes/Home/ultimoImagen6.png";
import ultimoImagen7 from "../../assets/imagenes/Home/ultimoImagen7.png";
import ultimoImagen8 from "../../assets/imagenes/Home/ultimoImagen8.png";
import ultimoImagen9 from "../../assets/imagenes/Home/ultimoImagen9.png";
import ultimoImagen10 from "../../assets/imagenes/Home/ultimoImagen10.png";


import {WineBottleIcon, ArrowLeftGrayBlueIcon, ArrowLeftNormal, ArrowRightBlackIconwhitout, ArrowRightBrownIcon, ArrowRightGrayBlueIcon, ArrowRightIcon, ArrowRightIconBlack, ArrowRightNormal, ClockIcon, CursorIcon, FacebookIcon, FootIcon, HandBagIcon, HeartIconblack, InstagramIcon, ShoppingCartIcon, SofaIcon,SofaIconDarkMode, StarIcon, TagIcon, TecnologyIcon, TruckIcon, TwitterIcon, YouTubeIcon, TecnologyIconDarkMode, FootIconDarkMode, WineBottleIconDarkMode } from "../../assets/iconos/iconoHome.jsx";

export default function Home() {

  
// --- Estados presentación ---
const [currentPres, setCurrentPres] = useState(0);
const [setPrevPres] = useState(0);
const [circleGrow, setCircleGrow] = useState(false);

// --- Estados categorías ---
const [currentCat, setCurrentCat] = useState(0);

//estado para productos
const [liked, setLiked] = useState(false);
const [addedItems, setAddedItems] = useState({});

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
useEffect(() => {
  const interval = setInterval(() => {
    nextSlidePresentacion();
  }, 10000);
  return () => clearInterval(interval);
},);

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
// ...existing code...

const nextSlideCategorias = () => {
  setCurrentCat(i =>
    i < slidesCategorias.length - 1 ? i + 1 : i
  );
};

const prevSlideCategorias = () => {
  setCurrentCat(i =>
    i > 0 ? i - 1 : i
  );
};
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

//CountdownTimer
const CountdownTimer = () => {
  // ⏱️ Definicion de duración inicial (5h 5m 10s)
  const initialDuration = (5 * 3600) + (5 * 60) + 10;

  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(initialDuration); //  Reinicia el contador cuando llega a 0
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, initialDuration]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const pad = (num) => (num < 10 ? `0${num}` : num);

    return {
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };

  const formattedTime = formatTime(timeLeft);

  return (
    <div className="flex justify-center items-center space-x-2 h-38.5">
      {/* Horas */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md pt-1 h-33.5 w-24">
        <span className="text-7xl font-bold tracking-tight text-[#434651] transition-all duration-500">
          {formattedTime.hours}
        </span>
        <div className="w-16.5 h-px bg-[#434651] mt-2 px-2.5"></div>
        <span className="text-sm font-semibold mt-2 text-[#434651]">
          Horas
        </span>
      </div>

      {/* Minutos */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md pt-1 h-33.5 w-24">
        <span className="text-7xl font-bold tracking-tight text-[#434651] transition-all duration-500">
          {formattedTime.minutes}
        </span>
        <div className="w-16.5 h-px bg-[#434651] mt-2 px-2.5"></div>
        <span className="text-sm font-semibold mt-2 text-[#434651]">
          Minutos
        </span>
      </div>

      {/* Segundos */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md pt-1 h-33.5 w-24">
        <span className="text-7xl font-bold tracking-tight text-[#434651] transition-all duration-500">
          {formattedTime.seconds}
        </span>
        <div className="w-16.5 h-px bg-[#434651] mt-2 px-2.5"></div>
        <span className="text-sm font-semibold mt-2 text-[#434651]">
          Segundos
        </span>
      </div>
    </div>
  );
};

// Slides
const slidesPresentacion = [
    
    // --- Slide 1 ---
    
      <div className="flex relative justify-center scale-130 bg-gradient-to-tr from-[#707DCB] to-[#8B96E8] w-auto h-203 overflow-hidden">
        <div className="pl-101 pr-30 mt-40">
          <h1 className="text-7xl md:text-9xl text-center leading-28 font-popins font-extrabold text-white pt-14">
            Tech
          </h1>
          <h1 className=" text-5xl md:text-[90px] text-center leading-20 font-popins font-extrabold text-white pb-9">
            Frenzy
          </h1>
          <div className="text-center pl-2">
            <p className="border-b-1 border-t-1 border-white py-3 w-[319px] text-justify font-popins text-white">
              The tech fever is here. Amazing discounts on cutting edge gadgets.{" "}
              <span className="font-bold">Act fast before they're gone!</span>
            </p>
          </div>
          <button className="mt-14 py-1 px-15 border-1 border-white text-white rounded-full hover:cursor-pointer">
            Buy now
          </button>
        </div>
        {/* columna2 */}
        <div className="relative scale-100 pt-40 mr-100">
            <div
            className={`absolute right-5 top-45 size-20 -z-50 rounded-full 
            bg-gradient-to-b from-[#6625e8] via-[#e592ff] to-[#eddbff] 
            transition-transform duration-1000 ease-in
            ${circleGrow ? "scale-40" : "scale-130"}`}
          />

          <div className="relative size-96 backdrop-blur-md z-30 bg-white/30 rounded-4xl mt-20 -ml-10">
            <div
              className="absolute -left-18 -top-18 bg-cover size-34 -rotate-15"
              style={{ backgroundImage: `url(${promocion})` }}
            >
              <div className="text-5xl font-popins text-white font-extrabold text-center pt-6">
                30% off
              </div>
            </div>
            <div
              className="absolute -right-10 bottom-15 bg-cover size-34 rotate-15"
              style={{ backgroundImage: `url(${promocion})` }}
            >
              <div className="text-5xl font-popins text-white font-extrabold text-center pt-6">
                50% off
              </div>
            </div>
            <div
              className="absolute -left-50 -bottom-14 bg-cover size-34 rotate-13"
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
          <div className={`absolute -left-32 -bottom-3 rotate-45 size-40 z-10 bg-gradient-to-b rounded-full from-[#6625e8] via-[#e592ff] to-[#eddbff] transition-transform duration-1500 ease-out
            ${circleGrow ? "scale-100" : "scale-180"}`} />
        </div>
      </div>,

    // --- Slide 2 ---
    <div className="pb-5 bg-gradient-to-b from-[#C4D1ED] scale-140 to-[#8B72E5]/80 w-auto h-203 overflow-hidden">
      <div className="flex justify-center mt-50">
        <div
          className="size-42 scale-40 -ml-14"
          style={{ backgroundImage: `url(${apple})` }}
        ></div>
        <h1 className="text-6xl md:text-7xl -ml-12 text-center font-popins text-black pt-14">
          iPhone16{" "}
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
        className="text-3xl -mt-10 text-center font-popins text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(to right,#00ccff,#00ccff,#00ccff, #9a4efe,#ff66ff, #f80000, #f86700,#f86700)",
        }}
      >
        Diseñado para Apple Intelligence
      </p>
      <div className="flex justify-center -mt-10">
        <div
          className="w-350 h-100 scale-70"
          style={{ backgroundImage: `url(${iphone})` }}
        ></div>
      </div>
    </div>,

    // --- Slide 3 ---
    <div className="pt-20 flex justify-center bg-gradient-to-br h-203 from-[#E6E879] to-[#C5DFA1]">
      <div className="columna1 w-110 mr-100 mt-30 scale-130">
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
      <div className="relative">
        <div
          className="w-150 h-120 -ml-100 mt-20"
          style={{ backgroundImage: `url(${sofa})` }}
        ></div>
        <div className="absolute bottom-30 -right-45 size-60 bg-[#d16518]/60 backdrop-blur-md align-center rounded-full text-center">
          <h1 className="text-white text-7xl pt-10 font-popins font-extrabold">
            30% OFF
          </h1>
        </div>
      </div>
    </div>,

    // --- Slide 4 ---
    <div className="flex justify-center h-203 gap-32 bg-[#CBBCFF] pt-20 scale-150">
      <h1
        className="font-popins mr-10 mt-50 text-6xl text-transparent bg-clip-text text-center text-balance w-90 font-extrabold"
        style={{
          backgroundImage: "linear-gradient(to bottom ,#0099ff, #9a4efe, #ad05d3)",
        }}
      >
        THINGS TO KNOW BEFORE YOU BUY
      </h1>
      <div
        className="w-90 h-90 scale-110 -ml-48 mt-30"
        style={{ backgroundImage: `url(${audifonos})` }}
      ></div>
    </div>,
];

const slidesCategorias = [
      [
        {
          title: "Tecnología",
          desc: "Celulares, accesorios, cases, impresoras, audífonos, electrohogar, ventiladores.",
          img: tecnologia,
        },
        {
          title: "Muebles y Organización",
          desc: "Sillas, butacas, sofás y sillones",
          img: muebles,
        },
        {
          title: "Dormitorio y Baños",
          desc: "Ropa de cama, accesorios de baño, toallas, sábanas.",
          img: dormitorio,
        },
        {
          title: "Calzado",
          desc: "Calzado de hombre, mujer y niños",
          img: calzado,
        },
      ],
      [
        {
          title: "Accesorios de moda",
          desc: "Aros, anillos, pulseras, lentes, gorras, mochilas",
          img: accesorios,
        },
        {
          title: "Salud y Bienestar",
          desc: "Vitaminas, suplementos deportivos, proteínas",
          img: salud,
        },
        {
          title: "Juguetes, Autos y Vehículos",
          desc: "Eléctricos, bicicletas, carros, patinetas, monopatines",
          img: juguetes,
        },
        {
          title: "Decoración e Iluminación",
          desc: "Adornos, cuadros, faroles, lámparas",
          img: decoracion,
        },
      ],
      [
        {
          title: "Mascotas",
          desc: "Alimentos, antipulgas, camas, ropa y accesorios",
          img: mascotas,
        },
        {
          title: "Supermercado",
          desc: "Vinos, whisky, pisco, agua, jugos, dulces y snacks, ron",
          img: supermercado,
        },
        {
          title: "Automotriz",
          desc: "Motos eléctricas, pisos y tapetes, autopartes y accesorios de interior",
          img: automotriz,
        },
      ],
];

return (
    <section className="Home" style={getBackgroundStyle()}>
      {/*Presentacion*/}
      <section className="Presentacion">
      {/* Carrusel de Presentación */}
        <div className="relative w-full h-203 overflow-hidden">
          {/* Slides con fade */}
          {slidesPresentacion.map((slide, index) => (
            <div key={index} className={`absolute w-full h-full transition-opacity duration-1000 ${ index === currentPres ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
              {slide}
            </div>
          ))}

          {/* Controles */}
          <div className="absolute bottom-2 w-full flex items-center justify-evenly px-10 z-50">
            {/* Flecha izquierda */}
            <button onClick={prevSlidePresentacion} className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
              {"<"}
            </button>

            {/* Indicadores */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 mt-1">
              {slidesPresentacion.map((_, index) => (
                <div key={index} onClick={() => { setPrevPres(currentPres); setCurrentPres(index); }} className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${ currentPres === index ? "bg-gray-400/50 scale-150" : "bg-gray-400/50" }`}></div>
              ))}
            </div>

            {/* Flecha derecha */}
            <button onClick={nextSlidePresentacion} className="text-4xl text-white font-bold rounded-full pb-[3.5px] hover:bg-white/30 transition px-2">
              {">"}
            </button>
          </div>
        </div>
      </section>
      
      {/*Categorias*/}
      <section className="Categorias px-40 align-center">
        {/* Titulo */}
        <div className="text-4xl  w-full  font-popins text-[#434651] text-center pt-20 pb-8" style={getTextStyle()}>
          Revisa todas nuestras categorías
        </div>

        {/* Carrusel de Categorías */}
        <div className="w-full h-116 flex flex-col align-center items-center">
            
            <div className="h-100 w-full relative flex flex-col items-center align-center ">
              {/* Slides */}
              {slidesCategorias.map((grupo, i) => (
                <div key={i} className={` absolute h-full w-full flex gap-4 items-center justify-center transition-opacity duration-700 ${ i === currentCat ? "opacity-100" : "opacity-0 pointer-events-none" }`}>
                  {grupo.map((item, j) => (
                    <div key={j} className="relative h-full w-97 rounded-4xl overflow-hidden group pb-7">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-125"style={{ backgroundImage: `url(${item.img})` }}></div>
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 backdrop-blur-lg mask-b-from-100% mask-t-to-80% "></div>
                      </div>
                      {/* Boton */}
                      <button className="absolute backdrop-blur-md flex gap-1 right-8 top-6 bg-[#2C509E]/60  opacity-0 text-white py-2 px-4 rounded-4xl group-hover:opacity-100 transition">
                        <span>Ver todo</span>
                        <ArrowRightIcon />
                      </button>
                      <div className="absolute z-10 w-100 min-h-40 bottom-0 bg-gradient-to-t from-[#2C509E] to-[#2C509E]/0">
                        <h1 className="text-center font-bold text-2xl font-popins text-white mt-5 mb-2 duration-500 group-hover:scale-125 transition">
                          {item.title}
                        </h1>
                        <p className="text-center  font-popins-light text-[#DAE2FF] text-balance duration-500 group-hover:translate-y-1.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          
          {/* Controles e Indicadores */}
          <div className="flex items-center px-2 py-3.5 mt-8 h-8 w-400  ">
              <div className="flex items-center justify-between w-full ">
              {/* Flecha Izquierda */}
              <button onClick={prevSlideCategorias} disabled={currentCat === 0} className="">
                <ArrowLeftGrayBlueIcon current={currentCat} />
              </button>

              {/* Indicadores */}
              <div className="flex justify-center space-x-2">
                {slidesCategorias.map((_, index) => (
                  <div key={index}
                    className={`w-6 h-1 rounded-full transition-all ${ index === currentCat ? "bg-[#385BAA]" : "bg-gray-300" }`} />
                ))}
              </div>

              {/* Flecha Derecha */}
              <button onClick={nextSlideCategorias} disabled={currentCat === slidesCategorias.length - 1} className="">
                <ArrowRightGrayBlueIcon current={currentCat} slidesCategorias={slidesCategorias} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*Ofertas*/}
      <section className="Ofertas px-40 items-center">
        <div className="text-center mt-20">
          <h1 className='text-[57px] tracking-tight  w-full  text-[#434651] mb-4' style={getTextStyle()}>Ofertas del día</h1>
          <div className="w-full items-center flex justify-center">
            <div className="w-400  rounded-4xl  bg-[#EB5A45] py-4 px-31 h-52 flex items-center">
                <div className="size-29 mr-2">
                   <TagIcon /> 
                </div>            
                <h2 className='text-white font-popins font-bold text-4xl mr-5.5 w-48.5'>¡QUEDAN POCAS HORAS!</h2>
                {/*cuadro de texto*/}
                <div className="grid grid-cols-2 gap-2 w-53 mr-13">
                    <h2 className='text-[#DFE162] ml-2  font-popins-light col-span-2 text-left'>HASTA </h2>
                    <div className="flex">
                        <h2 className='text-white -mt-5 text-8xl font-extrabold font-popins col-span-1'>50</h2>
                        <div className="columns-1 -mt-5">
                            <h2 className='text-white   text-7xl font-extrabold font-popins col-span-1'>%</h2>
                            <h2 className='text-white  font-popins font-light col-span-1'>DCTO.</h2>
                        </div>
                    </div>
                    <h2 className='text-[#DFE162] text-center -ml-2 tracking-tight font-popins col-span-2 h-12 w-53'>En diferentes productos y marcas</h2>
                </div>
                {/* Aquí se llama al componente CountdownTimer */}
                <CountdownTimer />
                <div className="flex mx-13">
                    <h2 className='text-white font-popins  mr-4 font-semibold text-[45px] text-center'>COMPRA YA</h2>
                    {/* Flecha derecha */}
                    <button className=" font-bold h-12 w-12 rounded-full mt-1.5 bg-white">
                    <div className="p-2"><ArrowRightBlackIconwhitout/></div>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/*Tecnologia*/}
      <section className="Tecnologia px-40">
        <div className="mt-16 items-center flex flex-col justify-center">
            {/*Titulo*/}
            <div className="flex justify-center w-400 py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"         
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
            {/*Contenido fila 1*/}
            <div className="mx-40 w-400 h-100 mt-4">
                <div className=" h-100 grid grid-cols-2 gap-4 "> 
                    <div className="relative overflow-hidden pt-10 px-7 bg-[#B1C5FF] h-100 rounded-4xl">
                        <div className="flex justify-center">
                            <h1 className='font-popins text-[55px] text-white'>Llévate <span className='font-popins font-extralight text-[55px] text-[#DAE2FF]'>un </span><span className='font-popins text-[64px] text-[#1D1B20]'>iPhone 16 Pro</span></h1>
                        </div>
                        <div className="w-52 ml-20 text-center mt-12 ">
                            <h2 className='font-popins-light mx-4 font-bold text-[55px] leading-12 text-white '>OFERTA</h2>
                            <h2 className='font-popins-light font-bold text-[55px] leading-12 text-white '>ESPECIAL</h2>
                            <h2 className='w-65 font-popins font-extralight text-4xl text-[#DAE2FF]'>por lanzamiento exclusivo</h2>
                        </div>
                        {/*imagen*/}
                        <div className="absolute bg-cover -bottom-30 -right-54 w-200 h-124 scale-50 " style={{ backgroundImage: `url(${tecnologiaImagen1})` }}></div>
                    </div>
                    {/*cuadro derecho*/}
                    <div className="relative py-8 px-10 h-100  bg-contain   bg-no-repeat rounded-4xl bg-[#e35944]" style={{ backgroundImage: `url(${tecnologiaImagen5})` }}>
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

      {/*Muebles*/}
      <section className="Muebles px-40">
        <div className=" mt-16 items-center flex flex-col justify-center">
            {/*Titulo*/}
            <div className="flex justify-center w-400 py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
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
                <p className='font-popins-light text-2xl font-extralight py-1.5  text-[#747782]' style={getTextStyle()}>Diseño y confort para tu espacio</p>
                <button className='flex  bg-[#DFE162]  text-[#484900] py-2.5 px-4  h-10 rounded-4xl'>
                    <h1 className='font-popins text-sm'>Ver todo</h1>
                    <div className='scale-60 -my-0.5'>
                          <ArrowRightIconBlack />
                    </div>
                </button>
            </div>
            {/*Contenido Fila 1*/}
            <div className="grid grid-cols-5 gap-4 mt-4 mx-40 w-400">
                {/*Cuadro 1*/}
                <div className="col-start-1 col-end-5  bg-cover bg-right overflow-hidden h-200 rounded-4xl  bg-no-repeat" style={{ backgroundImage: `url(${mueblesFondo})` }}>
                    <div className="flex justify-between">
                        {/*Promocion*/}
                        <div className="bg-[#EB5A45] h-97 w-100 flex justify-center py-11 rounded-br-4xl">    
                            <div className=" scale-110 gap-2 my-11  h-54 w-96">
                                <h2 className='text-white ml-2 pl-16 font-popins-light text-left'>HASTA </h2>
                                <div className="flex justify-center">
                                    <h2 className='text-white  -mt-5 text-9xl font-extrabold font-popins col-span-1'>50</h2>
                                    <div className="columns-1 text-center -mt-5 col-end-1">
                                        <h2 className='text-white  text-8xl font-extrabold font-popins col-span-1'>%</h2>
                                        <h2 className='text-white  font-popins font-light '>DCTO.</h2>
                                    </div>
                                </div>
                                <h2 className='text-[#DFE162] text-center mt-5 text-3xl tracking-tight font-popins h-12 w-96'>En todo los <span className='font-bold text-white text-4xl'>sofás</span></h2>
                            </div>
                        </div>    
                        {/*Cuadro Mueble*/}
                        <div className="flex bg-white/20 rounded-3xl mt-7.5 mr-8.5 py-18 backdrop-blur-2xl">
                            <div className="bg-white w-57 h-50 rounded-2xl ml-8 mr-5">
                                <div className="h-86 w-150 bg-no-repeat bg-cover scale-35 -ml-47 -my-19" style={{ backgroundImage: `url(${cuadroMueble1})` }}></div>
                            </div>
                            <div className="text-right w-46 mr-15">
                                <h2 className='text-white text-2xl leading-4 font-popins-light font-extralight'>Sofá minimalista de lino natural</h2>
                                <h2 className='text-white text-2xl my-1 font-popins font-bold'>s/ <span className='text-5xl'>1,400</span></h2>
                                <h2 className='text-white -ml-1 text-xs font-popins-light font-extralight'>precio normal <span className='line-through text-[#C4C6D3]'>s/<span className=' text-xl'>2,800</span></span> </h2>
                                <div className="flex justify-end">
                                    <button className='rounded-4xl bg-white  flex mt-9 py-1 px-3 '>
                                        <h2 className='font-popins-light text-sm py-2'>VER PRODUCTO</h2>
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
                        <div className="flex bg-white/20 rounded-3xl mb-7.5 mt-7 mr-8.5 py-18 backdrop-blur-2xl">
                            <div className="text-right w-46 mr-15">
                                    <h2 className='text-white text-2xl leading-4 font-popins-light font-extralight'>Sofá minimalista de lino natural</h2>
                                    <h2 className='text-white text-2xl my-1 font-popins font-bold'>s/ <span className='text-5xl'>1,400</span></h2>
                                    <h2 className='text-white -ml-1 text-xs font-popins-light font-extralight'>precio normal <span className='line-through text-[#C4C6D3]'>s/<span className=' text-xl'>2,800</span></span> </h2>
                                    <div className="flex justify-end">
                                        <button className='rounded-4xl bg-white  flex mt-9 py-1 px-3 '>
                                            <h2 className='font-popins-light text-sm py-2'>VER PRODUCTO</h2>
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
                <div className=' relative  h-200 rounded-4xl overflow-hidden'>
                    <div className=" h-200  bg-cover bg-left-bottom -ml-26" style={{ backgroundImage: `url(${silla})` }}></div>
                    <div className=" absolute bottom-10 left-13   text-center text-white">
                        <div className="bg-gradient-to-t from-[#E4E666] to-[#E4E666]/0 h-76.5 w-97 -ml-25 -mb-20 ">
                            <h1 className='text-popins text-3xl pt-8 font-semibold '>SILLAS DE SALA</h1>
                            <div className="grid justify-center scale-140 mt-10 ">
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
            <div className="mt-3">
                {/*Cuadro 3*/}
                <div className="flex px-4 w-400 mx-40 py-4 mt-4 h-100 rounded-4xl  bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"             style={{
                 background: isLight
                   ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
                   : 'linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)',
                 ...getSectionStyle(),
               }}>
                    <button className="text-4xl mr-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                        <h1 className=''><ArrowLeftNormal/></h1>
                    </button>
                    <div className="carrusel flex gap-4">
                      {/*Producto1*/}
                        <ProductCard
                          id="producto1Muebles"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto1Muebles"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />

                        {/*Producto2*/}
                        <ProductCard
                          id="producto2Muebles"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto2Muebles"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto3*/}
                        <ProductCard
                          id="producto3Muebles"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto3Muebles"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto4*/}
                        <ProductCard
                          id="producto4Muebles"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto4Muebles"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        
                        {/*Producto5*/}
                        
                        <ProductCard
                          id="producto5Muebles"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto5Muebles"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto6*/}
                        <ProductCard
                          id="producto6Muebles"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto6Muebles"]}
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
     
      {/*Recomendados*/}
      <section className="Recomendados">
        <div className="mt-16 items-center flex flex-col justify-center">
            {/*titulo*/}
            
            <div className="text-5xl font-popins w-400  text-[#434651] text-center" style={getTextStyle()}>
                Recomendados para ti 
            </div>
            {/*fila*/}
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
                        {/*Producto17*/}
                        <ProductCard
                          id="producto1Recomendados"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto1Recomendados"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto18*/}
                        <ProductCard
                          id="producto2Recomendados"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto2Recomendados"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto19*/}
                        <ProductCard
                          id="producto3Recomendados"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto3Recomendados"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto20*/}
                        <ProductCard
                          id="producto4Recomendados"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto4Recomendados"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto21*/}
                        <ProductCard
                          id="producto5Recomendados"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto5Recomendados"]}
                          added={addedItems[1]}
                          onLike={toggleLike}
                          onAdd={handleClick}
                          getCardStyle={getCardStyle}
                          getTextStyle={getTextStyle}
                        />
                        {/*Producto22*/}
                        <ProductCard
                          id="producto6Recomendados"
                          image={muebleMesitaNoche}
                          discount="-50%"
                          label="Label"
                          title="Wooden Sofa Chair"
                          price="$80.00"
                          oldPrice="s/ 160.00"
                          rating="4.9"
                          liked={liked["producto6Recomendados"]}
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
);
}

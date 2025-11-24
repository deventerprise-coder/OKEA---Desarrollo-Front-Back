import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../components/ThemeContext";
import { ArrowRightBlackIconwhitout, TagIcon } from "../../assets/iconos/iconoHome";

export default function Ofertas() {
    const navigate = useNavigate();
    // --- Tema ---
    const { isLight } = useTheme();
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const isFlexCol = windowWidth >= 1024 && windowWidth <= 1090;

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
    <div className="flex justify-center items-center space-x-2 h-21 lg:h-38.5">
      {/* Horas */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md -mt-10 lg:mt-0 lg:pt-1 h-21 lg:h-33.5 w-24 lg:w-24">
        <span className="text-5xl lg:text-7xl mt-1 lg:mt-0 h-[52px] font-bold tracking-tight text-[#434651] transition-all duration-500">
          {formattedTime.hours}
        </span>
        <div className="w-16.5 h-px bg-[#434651] -mt-1  lg:mt-7.5 px-2.5"></div>
        <span className="text-sm font-semibold mt-2 text-[#434651]">
          Horas
        </span>
      </div>

      {/* Minutos */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md -mt-10 lg:mt-0 lg:pt-1 h-21 lg:h-33.5 w-24 lg:w-24">
        <span className="text-5xl lg:text-7xl mt-1 lg:mt-0 h-[52px] font-bold tracking-tight text-[#434651] transition-all duration-500">
          {formattedTime.minutes}
        </span>
        <div className="w-16.5 h-px bg-[#434651] -mt-1  lg:mt-7.5 px-2.5"></div>
        <span className="text-sm font-semibold mt-2 text-[#434651]">
          Minutos
        </span>
      </div>

      {/* Segundos */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md -mt-10 lg:mt-0 lg:pt-1 h-21 lg:h-33.5 w-24 lg:w-24">
        <span className="text-5xl lg:text-7xl mt-1 lg:mt-0 h-[52px] font-bold tracking-tight text-[#434651] transition-all duration-500">
          {formattedTime.seconds}
        </span>
        <div className="w-16.5 h-px bg-[#434651] -mt-1 lg:mt-7.5 px-2.5"></div>
        <span className="text-sm font-semibold mt-2 text-[#434651]">
          Segundos
        </span>
      </div>
    </div>
  );
    };

    return (
        <section className="Home" style={getBackgroundStyle()}>
            {/*Ofertas*/}
            <section className="Ofertas  px-4 sm:px-6/12 lg:px-40  xl:px-40 2xl:px-40 items-center">
              <div className="text-center mt-8 md:mt-14 lg:mt-20">
                <h1 className=' text-4xl md:text-[57px] tracking-tight  w-full  text-[#434651] mb-8 md:mb-4' style={getTextStyle()}>Ofertas del día</h1>
                <div className="w-full items-center flex justify-center">
                  <div className="overflow-hidden w-full h-64 md:h-52 2xl:rounded-none 2xl:rounded-tl-4xl 2xl:rounded-bl-4xl rounded-4xl  bg-[#EB5A45] py-4 px-2 md:px-[2vw] lg:px-[1vw] xl:px-[2vw] 2xl:px-[2vw] md:flex items-center">
                      <div className=" md:scale-60  lg:scale-70  xl:scale-80 2xl:scale-100 hidden md:block size-29 mr-2 md:-ml-30 lg:-ml-[2vw] xl:-ml-[2vw] 2xl:-ml-[1vw]">
                         <TagIcon /> 
                      </div>   
                      <div className="flex md:scale-80  lg:scale-70  xl:scale-80 2xl:scale-100 w-full md:w-125 ml-0 lg:-ml-[10vw] xl:-ml-[5vw] 2xl:ml-0" >         
                        <h2 className='text-[#DFE162] md:text-white font-popins md:font-bold  md:-ml-15 lg:ml-0 text-2xl md:text-4xl mt-0 md:mt-3  w-36/12 md:mr-2  md:w-48.5'>¡QUEDAN POCAS HORAS!</h2>
                        {/*cuadro de texto*/}
                        <div className="grid grid-cols-2 gap-2 -mt-7 md:mt-0 scale-70 md:scale-100 w-55 -ml-4 md:-ml-2 md:w-53 mr-34  md:-mr-7 lg:mr-5 2xl:mr-13">
                            <h2 className='text-[#DFE162] ml-2  font-popins-light col-span-2 text-left'>HASTA </h2>
                            <div className="flex">
                                <h2 className='text-white -mt-5 text-8xl font-extrabold font-popins col-span-1'>50</h2>
                               <div className="columns-1 -mt-5">
                                    <h2 className='text-white   text-7xl font-extrabold font-popins col-span-1'>%</h2>
                                    <h2 className='text-white -mt-3 md:-mt-2 font-popins font-light col-span-1'>DCTO.</h2>
                                </div>
                            </div>
                            <h2 className='hidden md:flex text-[#DFE162] text-center -ml-2 tracking-tight font-popins mt-0 md:-mt-4 col-span-2 h-12 w-53'>En diferentes productos y marcas</h2>
                            <h2 className='md:hidden flex text-[#DFE162] text-center justify-center -ml-2 -mt-7 font-popins text-2xl col-span-2 h-10 w-53'>En varias marcas</h2>
                          </div>
                        </div>
                      {/* Aquí se llama al componente CountdownTimer */}
                      <div className="lg:flex md:mt-8 lg:mt-0 scale-100 lg:scale-70 xl:scale-80 2xl:scale-100 ml-0 lg:-ml-[15vw] xl:-ml-[5vw] 2xl:ml-0">
                      <CountdownTimer />
                      <div className={`flex items-center justify-center md:ml-3 2xl:ml-5 -mt-5 md:mt-0 ${isFlexCol ? 'flex-col' : 'flex-row'}`}>
                          <h2 className='text-white px-1 lg:w-40 2xl:w-auto font-popins mr-4 md:font-semibold  text-[45px] md:text-[25px] 2xl:text-[45px] text-center'>COMPRA YA</h2>
                          {/* Flecha derecha */}
                          <button
                            type="button"
                            className="font-bold h-12 w-12 rounded-full mt-1.5 bg-white 2xl:hidden"
                            onClick={() => navigate("/ofertas")}
                          >
                            <div className="p-1.5 cursor-pointer"><ArrowRightBlackIconwhitout/></div>
                          </button>
                      </div>
                    </div>
                  </div>
                    <div className="hidden 2xl:flex bg-[#EB5A45] h-52 items-center justify-center rounded-br-4xl rounded-tr-4xl pr-4">
                      <button
                          type="button"
                          className="font-bold h-12 w-12 rounded-full mt-1.5 bg-white"
                          onClick={() => navigate("/ofertas")}
                        >
                          <div className="p-1.5 cursor-pointer"><ArrowRightBlackIconwhitout/></div>
                      </button>
                    </div>
                </div>
              </div>
            </section>
        </section>
    )
}
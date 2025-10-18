import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import { ArrowRightBlackIconwhitout, TagIcon } from "../../assets/iconos/iconoHome";


export default function Ofertas() {
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

    return (
        <section className="Home" style={getBackgroundStyle()}>
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
        </section>
    )
}
import { useState } from "react";
import { useTheme } from "../../components/ThemeContext";
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
import { useNavigate } from "react-router-dom";

export default function Ultimo() {
  const { isLight } = useTheme();
  const navigate = useNavigate();

  const getBackgroundStyle = () => ({
    backgroundColor: isLight ? "#ffffff" : "#120F31",
    color: isLight ? "#000000" : "#ffffff",
    transition: "background-color 0.3s ease, color 0.3s ease",
  });

  const getTextStyle = () => ({
    color: isLight ? "#434651" : "#FFFFFF",
    transition: "color 0.3s ease",
  });

  const imagenes = [ultimoImagen6, ultimoImagen7, ultimoImagen8, ultimoImagen9];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));

  // para soporte táctil
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  return (
    <section className=" Home items-center justify-center" style={getBackgroundStyle()}>
      <section className="Ultimmo px-4 sm:px-6/12 md:3/12 lg:px-40">
        <div className="mt-8 lg:mt-16 items-center flex flex-col justify-center">
          {/* Título */}
          <div
            className="text-3xl md:text-5xl font-popins w-full text-[#434651] text-center"
            style={getTextStyle()}
          >
            Últimos lanzamientos
          </div>

          {/* Fila 1 */}
            <div className="hidden xl:block relative bg-[#FFDAD4] h-100 w-full bg-no-repeat rounded-4xl overflow-hidden bg-center bg-auto cursor-pointer" onClick={() => navigate("/producto/detalle/tecnologia/modelo-x")}>
                <div className="absolute z-0 ml-150 bg-cover size-100"style={{ backgroundImage: `url(${ultimoImagen1})` }}></div>
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

          {/* Fila 2 */}
          <div className="w-full">
            <div
              className="flex w-full h-19.5 flex-shrink-0 lg:h-100 bg-cover rounded-3xl lg:rounded-4xl justify-between overflow-hidden mt-4 bg-center lg:bg-left cursor-pointer"
              style={{ backgroundImage: `url(${ultimoImagen5})` }}
              onClick={() => navigate("/catalogo/calzado")}
            ></div>
          </div>

          {/* Fila 3 — Carrusel responsive tipo Nike */}
          <div className="w-full mt-4">
            {/* Vista Desktop (4 columnas fijas) */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 bg-[#303030] rounded-4xl p-4">
              {imagenes.map((img, i) => (
                <div
                  key={i}
                  className="bg-cover bg-center rounded-3xl w-full h-100 cursor-pointer"
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => navigate("/catalogo/calzado")}
                ></div>
              ))}
            </div>
            
            {/* Vista Móvil (Carrusel deslizable) */}
            <div className="flex md:hidden gap-4 overflow-x-auto scroll-smooth no-scrollbar p-4 bg-[#303030] rounded-4xl">
              {imagenes.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-50 h-51 bg-cover bg-center rounded-3xl cursor-pointer"
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => navigate("/catalogo/calzado")}
                ></div>
              ))}
            </div>
          </div>
          {/* Fila 4 */}
          <div
            className="hidden xl:block w-full h-200 mt-4 rounded-4xl bg-[45%_50%] overflow-hidden bg-no-repeat bg-cover cursor-pointer"
            style={{ backgroundImage: `url(${ultimoImagen10})` }}
            onClick={() => navigate("/producto/detalle/tecnologia/modelo-x")}
          ></div>
        </div>
      </section>
    </section>
  );
}

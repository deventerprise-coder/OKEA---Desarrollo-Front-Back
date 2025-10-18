import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
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
import { ArrowLeftGrayBlueIcon, ArrowRightGrayBlueIcon, ArrowRightIcon } from "../../assets/iconos/iconoHome";


export default function CategoriaHome() {
    // --- Estados categorías ---
    const [currentCat, setCurrentCat] = useState(0);

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

    //Slides
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
    </section>

    );



}

import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
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
import { ArrowLeftGrayBlueIcon, ArrowRightGrayBlueIcon, ArrowRightIcon, SofaIcon, TecnologyIcon, TecnologyIconDarkMode, TecnologyResponsive, Banio, FootIcon, AccesorioIcon, SaludIcon, VehiculoIcon, DecoracionIcon, MascotasIcon, WineBottleIcon, WineBottleIconDarkMode, AutomotrizIcon, SofaIconDarkMode, FootIconDarkMode } from "../../assets/iconos/iconoHome";


export default function CategoriaHome() {
    // --- Hook de Navegación ---
    const navigate = useNavigate();

    // --- Estados categorías ---
    const [currentCat, setCurrentCat] = useState(0);
    const [hovered, setHovered] = useState(false);
    const scrollRef = useRef(null);

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

    const getTextStyle = (hovered) => ({
        color: isLight
            ? hovered
                ? "#FFFFFF"  // texto blanco cuando hover (modo claro)
                : "#1C4390"  // azul oscuro cuando no hover (modo claro)
            : hovered
                ? "#392F9D"  // azul oscuro cuando hover (modo oscuro)
                : "#E3E1F1", // gris claro cuando no hover (modo oscuro)
        transition: "all 0.3s ease"
    });

    const getCardStyle = (hovered) => ({
        backgroundColor: isLight
            ? hovered
                ? "#1C4390"
                : "#B3C7FF"
            : hovered
                ? "#E3E1F1"
                : "#392F9D",
        transition: "all 0.3s ease"
    });

    // --- Lógica de Navegación ---
    const getCategoriaRuta = (nombreCategoria) => {
        return nombreCategoria === "Tecnología" ? "tecnologia"
            : nombreCategoria === "Muebles y Organización" ? "muebles-y-organizacion"
            : nombreCategoria === "Dormitorio y Baños" ? "dormitorio-y-banos"
            : nombreCategoria === "Calzado" ? "calzado"
            : nombreCategoria === "Accesorios de moda" ? "accesorios-de-moda"
            : nombreCategoria === "Salud y Bienestar" ? "salud-y-bienestar"
            : nombreCategoria === "Juguetes, Autos y Vehículos" ? "juguetes"
            : nombreCategoria === "Decoración e Iluminación" ? "decoracion-e-iluminacion"
            : nombreCategoria === "Mascotas" ? "mascotas"
            : nombreCategoria === "Supermercado" ? "supermercado"
            : nombreCategoria === "Automotriz" ? "automotriz"
            : "";
    };

    // --- Handler de Navegación ---
    const handleNavigate = (nombreCategoria) => {
        const ruta = getCategoriaRuta(nombreCategoria);
        if (ruta) {
            navigate(`/catalogo/${ruta}`);
        }
    };


    function CardCategoria({ iconLight, iconDark, label, isLight }) {
        const [hovered, setHovered] = useState(false);

        return (
            <div
                className="card-1 h-8 px-3 py-1 mr-1 rounded-xl flex group transition-colors duration-200"
                style={{ ...getCardStyle(hovered), cursor: 'pointer' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => handleNavigate(label)}
            >
                <div className="scale-70 -mt-1.5">
                    {isLight ? iconLight(hovered ? "#E3E1F1" : "#1C4390 ") : iconDark(hovered ? "#392F9D" : "#ffffff ")}
                </div>
                <div className="items-center w-max text-[#392F9D] group-hover:text-[#ffffff]" style={getTextStyle(hovered)}>
                    {label}
                </div>
            </div>
        );
    }


    function CarruselAuto({ children }) {
        const scrollRef = useRef(null);

        useEffect(() => {
            const el = scrollRef.current;
            if (!el) return;

            let direction = 1;
            const step = 1;
            const interval = setInterval(() => {
                el.scrollLeft += step * direction;

                // Cambia de dirección al llegar al final/inicio
                if (el.scrollLeft + el.clientWidth >= el.scrollWidth) direction = -1;
                if (el.scrollLeft <= 0) direction = 1;
            }, 20); // velocidad

            return () => clearInterval(interval);
        }, []);

        return (
            <div
                ref={scrollRef}
                className="overflow-x-auto scroll-smooth whitespace-nowrap"
                style={{ scrollbarWidth: "none" }}
            >
                {children}
            </div>
        );
    }

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
            <section className="Categorias px-4 sm:px-6/12 md:3/12 lg:px-40 align-center">
                {/* Titulo */}
                <div className="text-lg md:text-4xl  w-full  font-popins text-[#434651] text-center pt-8 md:pt-14 lg:pt-20 pb-4 md:pb-8" style={getTextStyle()}>
                    Revisa todas nuestras categorías
                </div>

                {/* Carrusel de Categorías */}
                <div className="hidden md:flex w-full m2xl:h-116 flex-col align-center items-center">

                    <div className="md:h-50 lg:h-80 2xl:h-100 w-full relative flex flex-col items-center align-center ">
                        {/* Slides */}
                        {slidesCategorias.map((grupo, i) => (
                            <div key={i} className={` absolute h-full w-full flex gap-4 items-center justify-center transition-opacity duration-700 ${i === currentCat ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                                {grupo.map((item, j) => (
                                    <div
                                        key={j}
                                        className="relative h-full w-97 rounded-4xl overflow-hidden group pb-7 cursor-pointer"
                                        onClick={() => handleNavigate(item.title)}
                                    >
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-125" style={{ backgroundImage: `url(${item.img})` }}></div>
                                        <div className="absolute inset-0">
                                            <div className="absolute inset-0 backdrop-blur-lg mask-b-from-100% mask-t-to-80% "></div>
                                        </div>
                                        {/* Boton */}
                                        <button
                                            className="absolute backdrop-blur-md flex gap-1 right-8 top-6 bg-[#2C509E]/60  opacity-0 text-white py-2 px-4 rounded-4xl group-hover:opacity-100 transition"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handleNavigate(item.title);
                                            }}
                                        >
                                            <span>Ver todo</span>
                                            <ArrowRightIcon />
                                        </button>
                                        <div className="absolute z-10 w-full min-h-40 bottom-0  bg-gradient-to-t from-[#2C509E] to-[#2C509E]/0">
                                            <h1 className="text-center font-bold md:text-sm lg:text-lg 2xl:text-2xl font-popins text-white md:mt-20 lg:mt-11 2xl:mt-5 lg:mb-1 2xl:mb-2 duration-500 group-hover:scale-125 transition">
                                                {item.title}
                                            </h1>
                                            <p className="text-center md:text-[10px] lg:hidden xl:block xl:text-[13px] font-popins-light text-[#DAE2FF] text-balance duration-500 group-hover:translate-y-1.5 px-2">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Controles e Indicadores */}
                    <div className="flex items-center px-2 py-3.5 mt-8 h-8 w-full  ">
                        <div className="flex items-center justify-between w-full ">
                            {/* Flecha Izquierda */}
                            <button onClick={prevSlideCategorias} disabled={currentCat === 0} className="">
                                <ArrowLeftGrayBlueIcon current={currentCat} />
                            </button>

                            {/* Indicadores */}
                            <div className="flex justify-center space-x-2">
                                {slidesCategorias.map((_, index) => (
                                    <div key={index}
                                        className={`w-6 h-1 rounded-full transition-all ${index === currentCat ? "bg-[#385BAA]" : "bg-gray-300"}`} />
                                ))}
                            </div>

                            {/* Flecha Derecha */}
                            <button onClick={nextSlideCategorias} disabled={currentCat === slidesCategorias.length - 1} className="">
                                <ArrowRightGrayBlueIcon current={currentCat} slidesCategorias={slidesCategorias} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Carrusel de Categorías celular*/}
                <div className="flex md:hidden carrusel responsive overflow-hidden relative">
                    <div className="absolute z-10 right-0 w-1/12 h-18 "
                        style={{
                            background: isLight
                                ? "linear-gradient(to left, #ffffff, transparent 100% )"
                                : "linear-gradient(to left, #120F31, transparent 100% )"
                        }}>
                    </div>
                    <div className="absolute z-10 left-0 w-1/12 h-18"
                        style={{
                            background: isLight
                                ? "linear-gradient(to right, #ffffff, transparent 100% )"
                                : "linear-gradient(to right, #120F31, transparent 100% )"
                        }}>
                    </div>

                    <CarruselAuto>
                        <div className="fila-1  mb-2 flex">
                            <CardCategoria
                                iconLight={(color) => <TecnologyResponsive color={color} />}
                                iconDark={() => <TecnologyIconDarkMode />}
                                label="Tecnología"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <SofaIcon color={color} />}
                                iconDark={(color) => <SofaIcon color={color} />}
                                label="Muebles y Organización"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <Banio color={color} />}
                                iconDark={(color) => <Banio color={color} />}
                                label="Dormitorio y Baños"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <FootIcon color={color} />}
                                iconDark={(color) => <FootIcon color={color} />}
                                label="Calzado"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <AccesorioIcon color={color} />}
                                iconDark={(color) => <AccesorioIcon color={color} />}
                                label="Accesorios de moda"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <SaludIcon color={color} />}
                                iconDark={(color) => <SaludIcon color={color} />}
                                label="Salud y Bienestar"
                                isLight={isLight}
                            />
                        </div>
                        <div className="fila-2   mb-2 flex">
                            <CardCategoria
                                iconLight={(color) => <VehiculoIcon color={color} />}
                                iconDark={(color) => <VehiculoIcon color={color} />}
                                label="Juguetes, Autos y Vehículos"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <SaludIcon color={color} />}
                                iconDark={(color) => <SaludIcon color={color} />}
                                label="Salud y Bienestar"
                                isLight={isLight}
                            />

                            <CardCategoria
                                iconLight={(color) => <DecoracionIcon color={color} />}
                                iconDark={(color) => <DecoracionIcon color={color} />}
                                label="Decoración e Iluminación"
                                isLight={isLight}
                            />

                            <CardCategoria
                                iconLight={(color) => <MascotasIcon color={color} />}
                                iconDark={(color) => <MascotasIcon color={color} />}
                                label="Mascotas"
                                isLight={isLight}
                            />

                            <CardCategoria
                                iconLight={(color) => <WineBottleIcon color={color} />}
                                iconDark={(color) => <WineBottleIcon color={color} />}
                                label="Supermercado"
                                isLight={isLight}
                            />
                            <CardCategoria
                                iconLight={(color) => <AutomotrizIcon color={color} />}
                                iconDark={(color) => <AutomotrizIcon color={color} />}
                                label="Automotriz"
                                isLight={isLight}
                            />

                        </div>
                    </CarruselAuto>

                </div>

            </section>
        </section>
    );
}
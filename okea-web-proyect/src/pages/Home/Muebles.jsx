import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import { useCart } from "../../components/CartContext"; // 🛒 Carrito global
import mueblesFondo from "../../assets/imagenes/Home/mueblesFondo.png";
import cuadroMueble1 from "../../assets/imagenes/Home/muebleCuadroMueble1.png";
import cuadroMueble2 from "../../assets/imagenes/Home/muebleCuadroMueble2.png";
import silla from "../../assets/imagenes/Home/muebleSilla.jpg";
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png";
import {
  ArrowLeftNormal,
  ArrowRightIconBlack,
  ArrowRightNormal,
  ArrowRightBlackIconwhitout,
  SofaIcon,
  SofaIconDarkMode,
} from "../../assets/iconos/iconoHome";
import ProductCard from "../../components/ProductCard.jsx";

export default function Muebles() {
  const { isLight } = useTheme();
  const { agregarAlCarrito, carrito } = useCart(); // 🛒 Contexto global del carrito

  const [liked, setLiked] = useState({});
  const [addedItems, setAddedItems] = useState({});

  // 🔄 Sincroniza el estado local con el carrito global
  useEffect(() => {
    const nuevos = {};
    carrito.forEach((p) => {
      nuevos[p.id] = true;
    });
    setAddedItems(nuevos);
  }, [carrito]);

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 🛒 Agregar producto con animación verde
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.title,
      precio: Number(producto.price.replace(/[^\d.]/g, "")),
      imagen: producto.image,
      descripcion: producto.label || "Mueble decorativo",
      cantidad: 1,
    });

    // 🔄 Estado del botón “Agregado ✅”
    setAddedItems((prev) => ({
      ...prev,
      [producto.id]: true,
    }));

    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [producto.id]: false,
      }));
    }, 2000);
  };

  // 🎨 Estilos
  const getBackgroundStyle = () => ({
    backgroundColor: isLight ? "#ffffff" : "#120F31",
    color: isLight ? "#000000" : "#ffffff",
    transition: "background-color 0.3s ease, color 0.3s ease",
  });

  const getSectionStyle = (customBg = null) => ({
    backgroundColor: isLight
      ? customBg || "#ffffff"
      : "rgba(16, 16, 30, 0.8)",
    color: isLight ? "#000000" : "#ffffff",
    transition: "all 0.3s ease",
  });

  const getTextStyle = () => ({
    color: isLight ? "#434651" : "#FFFFFF",
    transition: "color 0.3s ease",
  });

  const getCardStyle = () => ({
    backgroundColor: isLight ? "#FFFFFF" : "#292272",
    transition: "all 0.3s ease",
  });

  // 📦 Lista de productos
  const productos = Array.from({ length: 6 }, (_, i) => ({
    id: `producto${i + 1}Muebles`,
    image: muebleMesitaNoche,
    discount: "-50%",
    label: "Label",
    title: "Wooden Sofa Chair",
    price: "$80.00",
    oldPrice: "s/ 160.00",
    rating: "4.9",
  }));

  return (
    <section className="Home" style={getBackgroundStyle()}>
      <section className="Muebles px-4 sm:px-6/12 md:3/12 lg:px-40">
        <div className="mt-4 md:mt-16 items-center flex flex-col justify-center">
          {/* 🛋️ Título */}
          <div
            className="hidden md:flex justify-center w-full py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
            style={{
              background: isLight
                ? "linear-gradient(to right, #B3C7FF, #DFE162)"
                : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
              ...getSectionStyle(),
            }}
          >
            <div className="mr-5 my-1">
              {isLight ? <SofaIcon /> : <SofaIconDarkMode />}
            </div>
            <h1
              className="text-4xl p-0.5 font-popins text-[#434651]"
              style={getTextStyle()}
            >
              Muebles
            </h1>
            <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
            <p
              className="font-popins-light text-2xl font-extralight py-1.5 text-[#747782]"
              style={getTextStyle()}
            >
              Diseño y confort para tu espacio
            </p>
            <button className="flex bg-[#DFE162] text-[#484900] py-2.5 px-4 h-10 rounded-4xl">
              <h1 className="font-popins text-sm">Ver todo</h1>
              <div className="scale-60 -my-0.5">
                <ArrowRightIconBlack />
              </div>
            </button>
          </div>

          {/* 📱 Título móvil */}
          <div className="md:hidden flex w-full text-left gap-5">
            <div className="scale-70 mt-1.5">
              {isLight ? <SofaIcon color="#434651" /> : <SofaIconDarkMode />}
            </div>
            <h1
              className="text-3xl md:text-4xl pt-1.5 font-popins text-[#434651]"
              style={getTextStyle()}
            >
              Muebles
            </h1>
          </div>

          {/* 🧱 Fila 1: Banner y cuadros */}
          <div className="grid md:grid-cols-5 gap-4 mt-4 mx-40 w-full">
            {/* Banner principal */}
            <div
              className="col-start-1 col-end-5 bg-cover w-full bg-right overflow-hidden h-65.5 md:h-200 rounded-2xl md:rounded-4xl bg-no-repeat"
              style={{ backgroundImage: `url(${mueblesFondo})` }}
            >
              {/* Contenido original del banner */}
              <div className="flex justify-between">
                <div className="bg-[#EB5A45] h-97 w-100 -mt-31.5 -ml-31.5 md:-mt-0 md:-ml-0 scale-35 md:scale-100 flex justify-center py-11 rounded-br-4xl">
                  <div className="scale-110 gap-2 my-11 h-54 w-96">
                    <h2 className="text-white ml-2 pl-16 mb-1 text-2xl font-popins-light text-left">
                      HASTA
                    </h2>
                    <div className="flex justify-center">
                      <h2 className="text-white -mt-5 text-9xl font-extrabold font-popins">
                        50
                      </h2>
                      <div className="text-center -mt-5">
                        <h2 className="text-white text-8xl font-extrabold font-popins">
                          %
                        </h2>
                        <h2 className="text-white text-2xl -mt-2 font-popins font-light">
                          DCTO.
                        </h2>
                      </div>
                    </div>
                    <h2 className="text-[#DFE162] text-center mt-10 text-4xl tracking-tight font-popins">
                      En todos los{" "}
                      <span className="font-bold text-white text-4xl">sofás</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Cuadro derecho */}
            <div className="hidden md:block relative h-200 rounded-4xl overflow-hidden">
              <div
                className="h-200 bg-cover bg-left-bottom -ml-26"
                style={{ backgroundImage: `url(${silla})` }}
              ></div>
              <div className="absolute bottom-10 left-13 text-center text-white">
                <div className="bg-gradient-to-t from-[#E4E666] to-[#E4E666]/0 h-76.5 w-97 -ml-25 -mb-20">
                  <h1 className="text-popins text-3xl pt-8 font-semibold">
                    SILLAS DE SALA
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* 🪑 Fila 2: Productos con carrito */}
          <div className="w-full">
            <div
              className="hidden md:flex px-4 w-full overflow-hidden py-4 mt-4 h-100 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
              style={{
                background: isLight
                  ? "linear-gradient(to right, #B3C7FF, #DFE162)"
                  : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
                ...getSectionStyle(),
              }}
            >
              <button className="text-4xl mr-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                <ArrowLeftNormal />
              </button>

              <div className="carrusel w-100% md:flex gap-4">
                {productos.map((p) => (
                  <ProductCard
                    key={p.id}
                    {...p}
                    liked={liked[p.id]}
                    added={addedItems[p.id]}
                    onLike={toggleLike}
                    onAdd={() => handleAgregarAlCarrito(p)} // ✅ carrito global
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  />
                ))}
              </div>

              <button className="text-4xl mx-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                <ArrowRightNormal />
              </button>
            </div>

            {/* 📱 Versión móvil */}
            <div className="md:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 w-full mt-4 py-4 px-2 rounded-4xl group">
              {productos.map((p) => (
                <div key={p.id}>
                  <ProductCard
                    key={p.id}
                    {...p}
                    liked={liked[p.id]}
                    added={addedItems[p.id]}
                    onLike={toggleLike}
                    onAdd={() => handleAgregarAlCarrito(p)}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

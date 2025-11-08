import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import { useCart } from "../../components/CartContext"; // 🛒 Importa el carrito global
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png";
import supermercadoImagen1 from "../../assets/imagenes/Home/supermercadoImagen1.png";
import supermercadoImagen2 from "../../assets/imagenes/Home/supermercadoImagen2.png";
import supermercadoImagen3 from "../../assets/imagenes/Home/supermercadoImagen3.png";
import supermercadoImagen4 from "../../assets/imagenes/Home/supermercadoImagen4.png";
import supermercadoImagen5 from "../../assets/imagenes/Home/supermercadoImagen5.png";
import supermercadoImagen6 from "../../assets/imagenes/Home/supermercadoImagen6.png";
import supermercadoImagen7 from "../../assets/imagenes/Home/supermercadoImagen7.png";
import supermercadoImagen8 from "../../assets/imagenes/Home/supermercadoImagen8.jpg";
import ProductCardV2 from "../../components/ProductCardV2";
import {
  ArrowLeftNormal,
  ArrowRightIconBlack,
  ArrowRightNormal,
  WineBottleIcon,
  WineBottleIconDarkMode,
} from "../../assets/iconos/iconoHome";

export default function Supermercado() {
  const { isLight } = useTheme();
  const { agregarAlCarrito, carrito } = useCart(); // 🛒 usamos carrito global
  const [liked, setLiked] = useState({});
  const [addedItems, setAddedItems] = useState({}); // ✅ Para animación “Agregado”

  // 🔄 Sincronizar con carrito global (cuando recargas)
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

  // 🛒 Agregar producto al carrito + animación verde
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.title,
      precio: Number(producto.price.replace(/[^\d.]/g, "")),
      imagen: producto.image,
      descripcion: producto.label || "Producto del supermercado",
      cantidad: 1,
    });

    // 🟢 Cambiar a verde
    setAddedItems((prev) => ({
      ...prev,
      [producto.id]: true,
    }));

    // ⏳ Volver al estado normal
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

  const imagenes = [
    supermercadoImagen5,
    supermercadoImagen6,
    supermercadoImagen7,
    supermercadoImagen8,
  ];

  // 🧺 Lista de productos
  const productos = Array.from({ length: 6 }, (_, i) => ({
    id: `producto${i + 1}Supermercado`,
    image: muebleMesitaNoche,
    discount: "-50%",
    label: "Categoría",
    title: "Producto de Supermercado",
    price: "$80.00",
    oldPrice: "S/ 160.00",
    rating: "4.9",
  }));

  return (
    <section className="Home" style={getBackgroundStyle()}>
      {/* 🧾 Sección completa */}
      <section className="Supermercado">
        <div className="mt-4 md:mt-16 items-center flex-col justify-center px-4 sm:px-6/12 md:3/12 lg:px-40">

          {/* 🧾 Título */}
          <div
            className="hidden md:flex justify-center w-full py-6.5 gap-4 h-25 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
            style={{
              background: isLight
                ? "linear-gradient(to right, #B3C7FF, #DFE162)"
                : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
              ...getSectionStyle(),
            }}
          >
            <div className="mr-5">
              {isLight ? <WineBottleIcon /> : <WineBottleIconDarkMode />}
            </div>
            <h1
              className="text-4xl p-0.5 font-popins text-[#434651]"
              style={getTextStyle()}
            >
              Supermercado
            </h1>
            <div className="bg-[#385BAA] h-8 w-px my-2 "></div>
            <p
              className="font-popins-light text-2xl font-extralight py-1.5 text-[#747782]"
              style={getTextStyle()}
            >
              Todo lo que necesitas, en un solo lugar
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
            <div className="scale-60">
              {isLight ? (
                <WineBottleIcon color="#3F3F3F" />
              ) : (
                <WineBottleIconDarkMode />
              )}
            </div>
            <h1
              className="text-3xl md:text-4xl pt-1.5 font-popins text-[#434651]"
              style={getTextStyle()}
            >
              Supermercado
            </h1>
          </div>

          {/* 🧱 Fila 1: Imagen grande y banner */}
          <div className="grid grid-cols-4 w-full mt-4 gap-4">
            <div className="hidden md:block col-start-1 col-end-2 h-100 rounded-4xl w-25% bg-gradient-to-br from-[#EB5A45] via-[#EB5A45] to-[#DFE162]">
              <div className="mt-10 justify-center scale-140">
                <h2 className="text-white leading-11 font-extralight ml-23 font-popins text-left">HASTA</h2>
                <div className="ml-20 flex -mt-6 -mb-5">
                  <h2 className="text-white text-8xl font-extrabold font-popins">50</h2>
                  <div>
                    <h2 className="text-white mt-2 text-6xl font-extrabold font-popins">%</h2>
                    <h2 className="text-white font-popins font-light">DCTO.</h2>
                  </div>
                </div>
                <h2 className="text-[#DAE2FF] text-left ml-20 w-40 mt-5 text-3xl tracking-tight font-popins-light">
                  SEGUNDA UNIDAD
                </h2>
              </div>
              <div
                className="h-70 w-60 ml-43 -mt-30 bg-cover bg-right-bottom"
                style={{ backgroundImage: `url(${supermercadoImagen1})` }}
              ></div>
            </div>

            <div className="col-span-4 md:col-span-3 mr-40 w-full rounded-4xl overflow-hidden">
              <div
                className="h-42 md:h-100 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${supermercadoImagen2})` }}
              ></div>
            </div>
          </div>

          {/* 🧺 Fila 2: Productos con carrito funcional */}
          <div className="cuadroImagen3 hidden md:flex mt-4">
            <div
              className="relative overflow-hidden hidden md:flex px-4 w-full py-4 mt-4 h-100 rounded-4xl bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
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

              <div className="carrusel flex gap-4 w-100%">
                {productos.map((p) => (
                  <ProductCardV2
                    key={p.id}
                    {...p}
                    liked={liked[p.id]}
                    added={addedItems[p.id]}
                    onLike={toggleLike}
                    onAdd={() => handleAgregarAlCarrito(p)}
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  />
                ))}
              </div>

              <button className="absolute right-1 z-10 text-4xl mx-4 text-gray-400 font-bold rounded-full h-10 mt-44 hover:bg-white/30 transition px-2">
                <ArrowRightNormal />
              </button>
            </div>

            {/* 📱 Versión móvil */}
            <div className="md:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 w-full mt-4 py-4 px-2 rounded-4xl group">
              {productos.map((p) => (
                <div key={p.id}>
                  <ProductCardV2
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

          {/* 🧱 Fila 3: Banner con descuento y café */}
          <div
            className="flex w-full h-20 md:h-100 bg-cover bg-center rounded-4xl md:rounded-bl-none md:rounded-br-none justify-between mt-4"
            style={{ backgroundImage: `url(${supermercadoImagen3})` }}
          >
            <div
              className="w-16 md:w-75 h-16 md:h-80 bg-no-repeat bg-cover bg-center my-auto rounded-2xl md:rounded-4xl ml-5 md:ml-17.5 md:my-9.5"
              style={{ backgroundImage: `url(${supermercadoImagen4})` }}
            ></div>
            <div className="flex flex-col scale-60 md:scale-100 -mr-4 -mt-2 md:pt-25 md:pr-20">
              <div className="flex ml-15 md:-ml-10 font-popins text-[#004143] text-4xl md:text-7xl font-extrabold">
                <h1 className="mt-1 -rotate-3 skew-x-6">O</h1>
                <h1 className="-mt-0.5 -rotate-3 skew-x-6">F</h1>
                <h1 className="-mt-2 -rotate-3 skew-x-6">F</h1>
              </div>
              <div className="flex text-[#EF7D14] pb-1 leading-5 md:leading-10 ml-15 font-popins font-extrabold text-6xl md:text-9xl">
                <h1 className="-mx-1 md:-mx-2 rotate-3 -skew-x-6">1</h1>
                <h1 className="md:-mx-2 rotate-3 -skew-x-6">0</h1>
                <h1 className="rotate-3 -skew-x-6">%</h1>
              </div>
              <h2 className="font-popins text-[10px] md:text-2xl mt-3 md:mt-12 text-white py-2 md:py-4 ml-8 px-5 md:px-12 rounded-4xl bg-[#004143]">
                Café de Especialidad
              </h2>
            </div>
          </div>

          {/* 🖼 Fila 4: Cuatro imágenes al final */}
          <div className="hidden md:grid grid-cols-4 gap-4 w-full h-100 bg-cover overflow-hidden mt-4">
            <div
              className="col-span-1 bg-cover rounded-bl-4xl"
              style={{ backgroundImage: `url(${supermercadoImagen5})` }}
            ></div>
            <div
              className="col-span-1 bg-cover"
              style={{ backgroundImage: `url(${supermercadoImagen6})` }}
            ></div>
            <div
              className="col-span-1 bg-cover"
              style={{ backgroundImage: `url(${supermercadoImagen7})` }}
            ></div>
            <div
              className="col-span-1 bg-cover rounded-br-4xl"
              style={{ backgroundImage: `url(${supermercadoImagen8})` }}
            ></div>
          </div>

          {/* 📱 Carrusel móvil */}
          <div className="flex md:hidden gap-4 overflow-x-auto scroll-smooth no-scrollbar mt-4 rounded-4xl">
            {imagenes.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-50 h-51 bg-cover bg-center rounded-3xl"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

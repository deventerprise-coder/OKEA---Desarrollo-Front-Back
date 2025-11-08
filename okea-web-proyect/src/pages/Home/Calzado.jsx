import { useState, useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import { useCart } from "../../components/CartContext"; // 🛒 Carrito global
import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png";
import calzadoimagen2 from "../../assets/imagenes/Home/calzadoimagen2.jpg";
import calzadoimagen from "../../assets/imagenes/Home/calzadoimagen.png";
import calzadoFondo from "../../assets/imagenes/Home/calzadoFondo.png";
import {
  ArrowRightBlackIconwhitout,
  ArrowRightIconBlack,
  FootIcon,
  FootIconDarkMode,
} from "../../assets/iconos/iconoHome";
import ProductCard from "../../components/ProductCard";

export default function Calzado() {
  const { isLight } = useTheme();
  const { agregarAlCarrito, carrito } = useCart(); // 🛒 Contexto global

  const [liked, setLiked] = useState({});
  const [addedItems, setAddedItems] = useState({});

  // 🔄 Mantener estado si ya hay productos en el carrito
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

  // 🛒 Agregar producto + animación verde
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.title,
      precio: Number(producto.price.replace(/[^\d.]/g, "")),
      imagen: producto.image,
      descripcion: producto.label || "Calzado elegante",
      cantidad: 1,
    });

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

  // 🎨 Estilos dinámicos
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

  // 👟 Lista de productos
  const productos = Array.from({ length: 6 }, (_, i) => ({
    id: `producto${i + 1}Calzado`,
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
      <section className="Calzado">
        <div className="mt-8 md:mt-16 items-center flex flex-col justify-center px-4 sm:px-6/12 md:3/12 lg:px-40">
          {/* 🏷️ Título */}
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
              {isLight ? <FootIcon color="#3F3F3F" /> : <FootIconDarkMode />}
            </div>
            <h1
              className="text-4xl p-0.5 font-popins text-[#434651]"
              style={getTextStyle()}
            >
              Calzado
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
            <div className="scale-70 mt-1">
              {isLight ? <FootIcon color="#3F3F3F" /> : <FootIconDarkMode />}
            </div>
            <h1
              className="text-3xl md:text-4xl pt-1.5 font-popins text-[#434651]"
              style={getTextStyle()}
            >
              Calzado
            </h1>
          </div>

          {/* 🖼 Fondo principal */}
          <div
            className="px-10 py-10 mt-4 mb-4 h-36 md:h-150 bg-no-repeat bg-cover bg-center rounded-3xl bg-gray-200 w-full"
            style={{ backgroundImage: `url(${calzadoFondo})` }}
          ></div>

          {/* 🧱 Sección con imágenes y productos */}
          <div className="grid grid-cols-6 gap-4 h-70 md:h-196 w-full">
            {/* Izquierda (banner oferta) */}
            <div
              className="col-start-1 md:col-end-5 col-end-7 overflow-hidden h-70 md:h-196 rounded-4xl flex justify-end relative"
              style={{
                backgroundImage: `url(${calzadoimagen2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 backdrop-blur-2xl [mask-image:linear-gradient(to_left,white,transparent)] [mask-repeat:no-repeat] [mask-size:100%]"></div>

              <div className="relative font-popins text-center w-6/12 bg-gradient-to-l from-[#EB5A45]/100 via-[#2C509E91]/90 to-[#2C509E91]/0 py-24 rounded-4xl">
                <h2 className="absolute right-10.5 top-20 md:relative -mt-13 ml-30 text-4xl md:text-8xl font-semibold text-[#DFE162]">
                  OFERTA
                </h2>
                <h2 className="absolute right-12.5 top-16 md:relative md:pb-10 ml-30 text-4xl md:text-8xl font-semibold text-[#DFE162]">
                  ÚNICA
                </h2>

                <div className="md:px-30 md:w-90 -mt-10 md:pt-16 rounded-br-3xl scale-40 md:scale-120">
                  <h2 className="text-white font-extralight ml-5 font-popins text-3xl text-left">
                    HASTA
                  </h2>
                  <div className="flex -mb-5">
                    <h2 className="text-white -mt-4 text-9xl mb-6 ml-2 font-extrabold font-popins col-span-1">
                      50
                    </h2>
                    <div>
                      <h2 className="text-white -mt-5 text-8xl font-extrabold font-popins">
                        %
                      </h2>
                      <h2 className="text-white font-popins -mt-1 font-light">
                        DCTO.
                      </h2>
                    </div>
                  </div>
                  <h2 className="text-white text-center text-2xl pr-12 font-popins w-90">
                    EN ZAPATOS ESCOLARES PARA NIÑOS
                  </h2>
                </div>

                <div className="flex md:pl-13 justify-center md:mt-11">
                  <button className="rounded-4xl bg-white scale-50 md:scale-100 flex mb-20 -mt-15 md:mt-9 md:mb-0 ml-7 md:ml-0 md:py-1 px-3">
                    <h2 className="font-popins-light text-sm py-2">
                      VER PRODUCTO
                    </h2>
                    <div className="scale-50">
                      <ArrowRightBlackIconwhitout />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Derecha (productos con carrito) */}
            <div
              className="hidden md:flex flex-col col-start-5 col-end-7 h-196 p-4 rounded-4xl overflow-hidden bg-gradient-to-l from-[#DFE162] via-[#DFE162]/50 to-[#B1C5FF]"
              style={{
                background: isLight
                  ? "linear-gradient(to right, #B3C7FF, #DFE162)"
                  : "linear-gradient(to right, #18284F, #087DEB80 30%, #600098 70%)",
                ...getSectionStyle(),
              }}
            >
              {/* Fila 1 */}
              <div className="flex gap-4 pb-4">
                {productos.slice(0, 2).map((p) => (
                  <ProductCard
                    key={p.id}
                    {...p}
                    liked={liked[p.id]}
                    added={addedItems[p.id]}
                    onLike={toggleLike}
                    onAdd={() => handleAgregarAlCarrito(p)} // ✅ carrito funcional
                    getCardStyle={getCardStyle}
                    getTextStyle={getTextStyle}
                  />
                ))}
              </div>

              {/* Fila 2 */}
              <div className="flex gap-4 pb-4">
                {productos.slice(2, 4).map((p) => (
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
                ))}
              </div>
            </div>
          </div>

          {/* 📱 Versión móvil (carrusel) */}
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

          {/* 🖼 Banner final */}
          <div className="hidden lg:flex w-full h-50 mt-4 bg-[#2C509ED1] rounded-4xl justify-around">
            <h1 className="ml-10 xl:ml-16.5 font-sans -tracking-widest font-bold text-white/70 lg:text-7xl xl:text-[120px]">
              SNEAKERS
            </h1>
            <div
              className="h-41 w-4/12 bg-cover bg-center"
              style={{ backgroundImage: `url(${calzadoimagen})` }}
            ></div>
            <div className="mr-16">
              <h2 className="font-popins tracking-tighter font-bold mt-7 text-white lg:text-4xl xl:text-6xl">
                ENCUENTRA TU ESTILO
              </h2>
              <div className="flex gap-4">
                <h2 className="text-[#1C4390] p-2.5 font-popins tracking-tighter font-bold text-4xl w-2/12 lg:w-auto h-auto rounded-4xl bg-[#DFE162]">
                  Compra Ahora
                </h2>
                <h2 className="font-popins tracking-tighter mt-3 font-bold text-white text-4xl">
                  50% DESCUENTO
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

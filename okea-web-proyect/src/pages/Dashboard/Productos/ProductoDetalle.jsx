import React from "react";
import * as productos from "../../../mocks/detalleProdList";
import { BreadCrum } from "../../../components/ecomerce/BreadCrum";
import DetalleProducto from "../../../components/ecomerce/DetalleProducto";
import CustomerReview from "../../../components/CustomerReview";
import { ProdRelacionados } from "../../../components/ecomerce/ProdRelacionados.jsx";
import PreguntasFrecuentes from "../../../components/PreguntasFrecuentes";
import Footer from "../../../components/Footer/Footer";
import { ChevronDownIcon } from "../../../assets/iconos/Icons";
import { useTheme } from "../../../components/ThemeContext";
import { slugify } from "../../../utils/slugify";
const relatedSections = [
    "Productos similares:",
    "Más opciones:"
];
const customerReviews = Array.from({ length: 6 }, (_, i) => ({ id: i }));

const catalogMap = {
    "Tecnología": productos.productoTecnologia,
    "Muebles y Organización": productos.productoMuebles,
    "Calzado": productos.productoCalzado,
    "Dormitorio y Baños": productos.productoDormitorio,
    "Accesorios de Moda": productos.productoAccesorios,
    "Salud y Bienestar": productos.productoSalud,
    "Juguetes": productos.productoJuguetes,
    "Decoración": productos.productoDecoracion,
    "Mascotas": productos.productoMascotas,
    "Supermercado": productos.productoSupermercado,
    "Electrohogar": productos.productoElectroHogar,
    "Moda Hombre": productos.productoModaH,
    "Moda Mujer": productos.productoModaM,
    "Automotriz": productos.productoAutomotriz,
};

const buildProductFromState = (productoState, categoria) => {
    if (!productoState) {
        return null;
    }
    const nombre = productoState.modelo || productoState.NombreProducto || "Producto";
    const precioActual = productoState.precio ? Number(productoState.precio) : productoState.PrecioActual || 0;
    const precioOriginal = productoState.precioSinDescuento ? Number(productoState.precioSinDescuento) : (productoState.PrecioOriginal || precioActual);

    return {
        NombreProducto: nombre,
        Marca: productoState.marca || productoState.Marca || "",
        PrecioActual: precioActual,
        PrecioOriginal: precioOriginal,
        DescripcionCorta: productoState.descripcion || productoState.DescripcionCorta || "",
        DescripcionProducto: productoState.DescripcionProducto || (productoState.descripcion ? [productoState.descripcion] : []),
        Especificaciones: productoState.Especificaciones || [],
        Imagen: productoState.Imagen || (productoState.imagen ? [productoState.imagen] : []),
        Colores: productoState.Colores || [],
        Tamaños: productoState.Tamaños || [],
        Puntuacion: productoState.calificacion ? Number(productoState.calificacion) : (productoState.Puntuacion || 0),
        Reseñas: productoState.Reseñas || 0,
        CategoriaProducto: categoria,
    };
};

export default function ProductoDetalle({CategoriaProducto, productoSlug, productoState}) {
    const { isLight } = useTheme();
    const productosList = catalogMap[CategoriaProducto] || productos.productoTecnologia;
    //Compara el id del producto que esta en detalleProdList.js con el id de ProductoSlug que esta en ProductCard.jsx
    //Por mientras se dejara en comparacion de nombres ya que no se tienen id reales.
    let productoData = productosList.find((item) => slugify(item.NombreProducto || "") === productoSlug);

    const productoFromState = buildProductFromState(productoState, CategoriaProducto);

    if (!productoData && productoFromState) {
        productoData = productoFromState;
    }

    if (!productoData && productosList.length > 0) {
        productoData = productosList[0];
    } else if (productoData && productoFromState) {
        productoData = {
            ...productoData,
            PrecioActual: productoFromState.PrecioActual || productoData.PrecioActual,
            PrecioOriginal: productoFromState.PrecioOriginal || productoData.PrecioOriginal,
            Imagen: productoData.Imagen?.length ? productoData.Imagen : productoFromState.Imagen,
        };
    }

    if (!productoData) {
        productoData = {
            NombreProducto: "Producto",
            Marca: "",
            PrecioActual: 0,
            PrecioOriginal: 0,
            DescripcionCorta: "",
            DescripcionProducto: [],
            Especificaciones: [],
            Imagen: [],
            Colores: [],
            Tamaños: [],
            Puntuacion: 0,
            Reseñas: 0,
        };
    }

    const breadcrumbSubcategoria = productoData?.NombreProducto
        || productoState?.modelo
        || (productoSlug ? productoSlug.replace(/-/g, " ") : "");

    return (
        <div className={`${isLight ? 'bg-white text-[#001947]' : 'bg-[#0B0F38] text-white'} motion-safe:transition-colors motion-safe:duration-300 motion-safe:ease-in-out`}
             data-theme={isLight ? undefined : 'dark'}
        >
            <div className="hidden lg:block [&_div[class*='md:flex']]:hidden p-3 mt-4 pl-[8%] [&>div]:!mt-10 sm:[&>div]:!mt-16 md:[&>div]:!mt-20 [&>div]:!h-auto [&>div]:!pb-4 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                <BreadCrum
                    categoria={CategoriaProducto}
                    subcategoria={breadcrumbSubcategoria}
                    isLight={isLight}
                />
            </div>

            <DetalleProducto 
                NombreProducto={productoData.NombreProducto}
                Marca={productoData.Marca}
                PrecioActual={productoData.PrecioActual}
                PrecioOriginal={productoData.PrecioOriginal}
                DescripcionCorta={productoData.DescripcionCorta}
                DescripcionProducto={productoData.DescripcionProducto}
                Especificaciones={productoData.Especificaciones}
                Imagen={productoData.Imagen}
                Colores={productoData.Colores}
                Tamaños={productoData.Tamaños}
                Puntuacion={productoData.Puntuacion}
                Reseñas={productoData.Reseñas}
            />

            <div className=" lg:flex w-full flex flex-col items-center px-6 sm:px-12 mt-2 mb-16 gap-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                <h2 className={`w-full max-w-[1568px] mx-auto text-left ${isLight ? 'text-[#0B1B59]' : 'text-white'} text-[32px] sm:text-[36px] leading-[1.1] font-[Poppins,sans-serif] font-semibold`}>
                    Opiniones de clientes:
                </h2>
                <div className="w-full max-w-[1568px] mx-auto flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-base font-medium transition focus:outline-none ${
                            isLight
                                ? 'bg-[#EEF1FF] text-[#0B1B59] shadow-[0_6px_18px_rgba(223,227,255,0.8)] hover:shadow-[0_8px_22px_rgba(223,227,255,0.95)] focus:ring-2 focus:ring-[#C9D1FF]'
                                : 'bg-[#3A31A9] text-white shadow-[0_6px_18px_rgba(50,45,140,0.45)] hover:bg-[#2D257D] focus:ring-2 focus:ring-[#5B57C9]'
                        }`}
                    >
                        Filtro: Todas las opiniones
                        <ChevronDownIcon width={18} height={18} />
                    </button>
                    <button
                        type="button"
                        className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-base font-medium transition focus:outline-none ${
                            isLight
                                ? 'bg-[#EEF1FF] text-[#0B1B59] shadow-[0_6px_18px_rgba(223,227,255,0.8)] hover:shadow-[0_8px_22px_rgba(223,227,255,0.95)] focus:ring-2 focus:ring-[#C9D1FF]'
                                : 'bg-[#3A31A9] text-white shadow-[0_6px_18px_rgba(50,45,140,0.45)] hover:bg-[#2D257D] focus:ring-2 focus:ring-[#5B57C9]'
                        }`}
                    >
                        Con foto/video
                    </button>
                </div>
                <div className="w-full max-w-[1568px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {customerReviews.map((r) => (
                        <div key={r.id} className="[&>div]:!max-w-none [&>div]:w-full">
                            <CustomerReview />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col items-center px-6 sm:px-12 mt-16 mb-16 gap-16 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                {relatedSections.map((title) => (
                    <div
                        key={title}
                        className="w-full flex flex-col items-center gap-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out"
                    >
                        <h2 className={`w-full max-w-[1568px] mx-auto text-left ${isLight ? 'text-[#0B1B59]' : 'text-white'} text-[32px] sm:text-[45px] leading-[1.1] font-[Poppins,sans-serif] font-semibold`}>
                            {title}
                        </h2>
                        <div
                            className="w-full [&>div]:!w-full [&>div]:!max-w-[1568px] [&>div]:!px-0 [&>div]:!mx-auto [&>div>h1]:!hidden"
                        >
                            <ProdRelacionados />
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex flex-col items-center px-6 sm:px-12 mt-16 mb-20 gap-10 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                <h2 className={`w-full max-w-[1568px] mx-auto text-left ${isLight ? 'text-[#0B1B59]' : 'text-white'} text-[32px] sm:text-[45px] leading-[1.1] font-[Poppins,sans-serif] font-semibold`}>
                    Preguntas frecuentes:
                </h2>
                <div
                    className={`w-full [&>section]:!w-full [&>section]:!max-w-[1568px] [&>section]:!mx-auto [&>section]:!bg-transparent [&>section]:!p-0 [&>section]:!py-0 [&>section]:!px-0 [&>section>h2]:!hidden [&>section>div]:!w-full [&>section>div]:!max-w-[1568px] [&>section>div]:!mx-0 [&>section>div]:!gap-6 ${
                        isLight
                            ? '[&>section>div>div>div:first-child]:!shadow-none [&>section>div>div>div:first-child]:!border-0'
                            : ''
                    } motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}
                >
                    <PreguntasFrecuentes />
                </div>
            </div>
            <Footer />
        </div>
    );
}
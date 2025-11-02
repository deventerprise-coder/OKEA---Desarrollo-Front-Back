import React from "react";
import * as productos from "../../../mocks/detalleProdList";
import { BreadCrum } from "../../../components/ecomerce/BreadCrum";
import DetalleProducto from "../../../components/ecomerce/DetalleProducto";
import CustomerReview from "../../../components/CustomerReview";
import { ProdRelacionados } from "../../../components/ecomerce/ProdRelacionados";
import PreguntasFrecuentes from "../../../components/PreguntasFrecuentes";
import { ChevronDownIcon } from "../../../assets/iconos/Icons";
import { useTheme } from "../../../components/ThemeContext";
const relatedSections = [
    "Productos similares:",
    "Más opciones:"
];
const customerReviews = Array.from({ length: 6 }, (_, i) => ({ id: i }));
export default function ProductoDetalle({CategoriaProducto, SubCategoriaProducto}) {
    const { isLight } = useTheme();
    const productosList = CategoriaProducto === "Tecnología" ? productos.productoTecnologia
    : CategoriaProducto === "Muebles y Organización" ? productos.productoMuebles
    : CategoriaProducto === "Calzado" ? productos.productoCalzado
    : CategoriaProducto === "Dormitorio y Baños" ? productos.productoDormitorio
    : CategoriaProducto === "Accesorios de Moda" ? productos.productoAccesorios
    : CategoriaProducto === "Salud y Bienestar" ? productos.productoSalud
    : CategoriaProducto === "Juguetes" ? productos.productoJuguetes
    : CategoriaProducto === "Decoración" ? productos.productoDecoracion
    : CategoriaProducto === "Mascotas" ? productos.productoMascotas
    : CategoriaProducto === "Supermercado" ? productos.productoSupermercado
    : CategoriaProducto === "Electrohogar" ? productos.productoElectroHogar
    : CategoriaProducto === "Moda Hombre" ? productos.productoModaH
    : CategoriaProducto === "Automotriz" ? productos.productoAutomotriz
    : productos.productoModaM;
    const productoData = productosList[0];
    return (
        <div className={`${isLight ? 'bg-white text-[#001947]' : 'bg-[#0B0F38] text-white'} motion-safe:transition-colors motion-safe:duration-300 motion-safe:ease-in-out`}
             data-theme={isLight ? undefined : 'dark'}
        >
            <div className="hidden lg:block [&_div[class*='md:flex']]:hidden p-3 mt-4 pl-[8%] [&>div]:!mt-10 sm:[&>div]:!mt-16 md:[&>div]:!mt-20 [&>div]:!h-auto [&>div]:!pb-4 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                <BreadCrum
                    categoria={CategoriaProducto}
                    subcategoria={SubCategoriaProducto}
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

            <div className="hidden lg:flex w-full flex flex-col items-center px-6 sm:px-12 mt-2 mb-16 gap-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
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
                            ? '[&>section>div>div>div:first-child]:!bg-[#F7F7FD] [&>section>div>div>div:first-child]:!shadow-none [&>section>div>div>div:first-child]:!border-0'
                            : ''
                    } motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}
                >
                    <PreguntasFrecuentes />
                </div>
            </div>
        </div>
    );
}
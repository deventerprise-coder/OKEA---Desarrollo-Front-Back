import { FavoritoCardIcon, ShareIcon, ChevronDownIcon } from "../../assets/iconos/Icons"
import { useState, useRef, useEffect } from "react";
import { CalificacionOptions } from "./Filtro";
import { OpinioneDetalleIcon, RemoveProductIcon, AddProductIcon, AddProductToCarIcon, WhatSappIcon } from "../../assets/iconos/Icons";
import { ShoppingCartIcon } from "../../assets/iconos/iconoHome";
import { EnvioEstadarIcon, EnvioExpressoIcon, DevolucionesDetalleIcon, EntregaDetalleIcon } from "../../assets/iconos/Icons";
import { useTheme } from "../ThemeContext";
import TechnicalSpecifications from "../TechnicalSpecifications";

export default function DetalleProducto({
    NombreProducto,
    Marca,
    PrecioActual,
    PrecioOriginal,
    DescripcionCorta,
    DescripcionProducto,
    Especificaciones,
    Imagen,
    Colores,
    Tamaños,
    Puntuacion,
    Reseñas,
}) {
    const { isLight } = useTheme();
    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);
    const [contactarAdded, setContactarAdded] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const iconColor = added ? "#FFFFFF" : "#484900";
    const [selectedColor, setSelectedColor] = useState(Colores ? Colores[0] : '#053559');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const productImages = Imagen || [];
    const thumbnailContainerRef = useRef(null);
    const thumbnailRefs = useRef([]);
    const productSpecifications = Especificaciones;
    const [activeInfoTab, setActiveInfoTab] = useState('descripcion');
    const handleAccordionClick = (tabName) => {
        setActiveInfoTab(prevTab => prevTab === tabName ? null : tabName);
    };
    const productDescription = DescripcionProducto;
    const splitSpecsEqual = (arr) => {
        const half = Math.ceil(arr.length / 2);
        return [arr.slice(0, half), arr.slice(half)];
    };
    const handlePrevImage = () => {
        setSelectedImageIndex(prevIndex => Math.max(0, prevIndex - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex(prevIndex => Math.min(productImages.length - 1, prevIndex + 1));
    };
    useEffect(() => {
        if (thumbnailRefs.current[selectedImageIndex]) {
            thumbnailRefs.current[selectedImageIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selectedImageIndex]);
    return (
        <>
            <div className={`flex flex-col lg:flex-row lg:pt-0 justify-center items-start gap-6 lg:gap-8 xl:px-0 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                <div className={`w-full mt-2 pb-20 pl-16 lg:pl-10 xl:pl-1 2xl:pl-[10%] lg:w-[60%] flex lg:flex-col xl:flex-row gap-4 rounded-tl-[32px] rounded-tr-[32px] lg:rounded-t-none lg:mt-0 ${isLight ? 'bg-white lg:bg-transparent' : 'bg-[#9E9CAF] lg:bg-transparent'} motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>

                    <div className="hidden md:order-1 pl-6 mt-22 lg:mt-0 lg:order-2 xl:order-none md:flex md:flex-col lg:flex-row xl:flex-col items-center gap-2 lg:pr-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <div className="hidden lg:flex xl:hidden">
                            <button
                                onClick={handlePrevImage}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                                disabled={selectedImageIndex === 0}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                        </div>
                        <div className="flex md:flex-col md:h-[380px] lg:h-auto lg:flex-row xl:flex-col gap-2 xl:w-[104px] xl:h-[540px] overflow-hidden motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out" ref={thumbnailContainerRef}>
                            {productImages.map((imgUrl, index) => (
                                <div
                                    key={index}
                                    ref={el => (thumbnailRefs.current[index] = el)}
                                    className={`w-[104px] h-[129px] rounded-2xl overflow-hidden cursor-pointer border-1 p-2 flex-shrink-0 motion-safe:transition-colors motion-safe:duration-300 motion-safe:ease-in-out ${isLight ?
                                        (selectedImageIndex === index
                                            ? 'border-black-500 bg-white'
                                            : 'border-gray-200 bg-gray-50'
                                        ) : (selectedImageIndex === index
                                            ? 'border-black-500 bg-transparent'
                                            : 'border-transparent bg-[#5B596B]'
                                        )} mt-4`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img
                                        src={imgUrl}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-contain motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hidden lg:flex xl:hidden">
                            <button
                                onClick={handleNextImage}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                                disabled={selectedImageIndex === productImages.length - 1}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                        <div className="hidden md:flex lg:hidden xl:flex xl:flex-col gap-2 mt-12">
                            <button
                                onClick={handlePrevImage}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                                disabled={selectedImageIndex === 0}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                            </button>

                            <button
                                onClick={handleNextImage}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                                disabled={selectedImageIndex === productImages.length - 1}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="lg:hidden absolute mt-18 left-6 z-10 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <button
                            onClick={"Boton Volver-Movil"}
                            className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full shadow 
                                ${isLight ? 'bg-[#F4F4F6]' : 'bg-[#1F1959]'}`}
                            disabled={selectedImageIndex === 0}
                            aria-label="Anterior"
                        >
                            <svg className={`w-6 h-6 ${isLight ? 'text-black' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                    </div>
                    <div className={`md:order-2 lg:order-1 xl:order-none relative flex-1 max-w-[680px] flex rounded-none mt-12 md:mt-18 sm:rounded-[24px] lg:mt-0 lg:rounded-[32px] lg:overflow-hidden lg:p-8 min-h-[380px] md:min-h-[540px] lg:min-h-[700px] bg-transparent
                ${isLight ? 'lg:bg-[#F4F4F6]' : 'lg:bg-[#5B596B]'}
                motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                        <img
                            src={productImages[selectedImageIndex]}
                            alt="Producto"
                            className="w-[65%] h-[90%] p-4 lg:w-full lg:h-full relative object-contain left-[5%] md:left-0 lg:p-0 lg:right-0 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out"
                        />
                        <div className="absolute top-[20%] md:top-[25%] right-[15%] lg:hidden motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                            <div className="flex flex-col gap-3">
                                {Colores.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setSelectedColor(c)}
                                        aria-pressed={selectedColor === c}
                                        className={`w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full cursor-pointer transition motion-safe:duration-300 motion-safe:ease-in-out
                                        ${selectedColor === c
                                                ? (isLight
                                                    ? 'ring-2 ring-black ring-offset-2 ring-offset-white'
                                                    : 'ring-2 ring-white ring-offset-2 ring-offset-black')
                                                : ''}`}
                                        style={{ backgroundColor: c }}
                                        title={c}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="lg:hidden absolute bottom-3 left-[20%] flex items-center gap-1.5 sm:gap-2 md:gap-2.5 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                            {productImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImageIndex(i)}
                                    className={`rounded-full border border-white/70 transition-colors duration-300 ease-in-out
                                    ${selectedImageIndex === i ? 'bg-gray-600' : 'bg-gray-300'}
                                    w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`}
                                    aria-label={`Ir a imagen ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <aside className={`flex flex-col w-full lg:w-[35%] gap-6 lg:mr-38 mb-6 lg:my-12 ${isLight ? 'bg-white border-gray-200' : 'bg-[#0B0F38] border-white/20'} -mt-20 pt-6 rounded-tl-[32px] rounded-tr-[32px] border-t lg:rounded-t-none lg:border-t-0 px-4 md:px-16 lg:mt-0 lg:pt-0 lg:px-0 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                    <div className="flex justify-between items-start order-2 lg:order-none">
                        <h2 className={`text-[24px] sm:text-[28px] md:text-[36px] lg:text-[45px] font-semibold font-[Poppins, sans-serif] ${isLight ? 'text-[#001947]' : 'text-white'} motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>{NombreProducto}</h2>
                        <div className="hidden lg:flex flex lg:flex-col items-center gap-x-5 lg:gap-x-0 gap-y-5 sm:gap-y-8 md:gap-y-10 mr-2 sm:mr-4 pt-2 sm:pt-6 -mb-10 sm:-mb-20">
                            <button className="cursor-pointer" onClick={() => setLiked(!liked)}>
                                <FavoritoCardIcon color={liked ? "#EB5A45" : "#C4C6D3"} size="28" />
                            </button>
                            <button
                                className={"cursor-pointer inline-flex items-center justify-center rounded-lg w-10 h-10"}
                            >
                                <ShareIcon size="24" colorborder={isLight ? '#002B5B' : '#E7EAFF'} color={isLight ? '#E7EAFF' : '#002B5B'} />
                            </button>
                        </div>
                        <div className="flex gap-4 items-center lg:hidden">
                            <span className="text-[24px] sm:text-[30px] md:text-[36px] font-bold font-[Poppins, sans-serif] text-[#F4604B]">S/{PrecioActual}</span>
                            <span className="text-[18px] sm:text-[20px] md:text-[24px] font-[Poppins, sans-serif] font-regular line-through text-[#D8D8D8]">S/{PrecioOriginal}</span>
                        </div>
                    </div>
                    <p className={`hidden lg:block ${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'} font-[Poppins, sans-serif] font-medium text-[12px] underline`}>By {Marca}</p>
                    <div className="flex lg:hidden justify-between items-center order-1 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <p className={`${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'} font-[Poppins, sans-serif] font-medium text-[12px] underline pt-2`}>
                            By {Marca}
                        </p>
                        <div className="flex items-center gap-x-5 mr-2 sm:mr-4">
                            <button className="cursor-pointer" onClick={() => setLiked(!liked)}>
                                <FavoritoCardIcon color={liked ? "#EB5A45" : "#C4C6D3"} size="28" />
                            </button>
                            <button className={"cursor-pointer inline-flex items-center justify-center rounded-lg w-10 h-10"}>
                                <ShareIcon size="24" colorborder={isLight ? '#002B5B' : '#E7EAFF'} color={isLight ? '#E7EAFF' : '#002B5B'} />
                            </button>
                        </div>
                    </div>
                    <div className="lg:hidden order-4 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <p className={`text-[15px] ${isLight ? 'text-[#3A3D46]' : 'text-[#E6E9FF]'}`}>
                            {DescripcionCorta}
                        </p>
                        <hr className={`my-6 ${isLight ? 'border-gray-200' : 'border-gray-700'}`} />
                    </div>
                    <div className="flex gap-5 order-3 lg:order-none motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <span className={`${isLight ? 'text-[#001947]' : 'text-white'} font-[Poppins, sans-serif] font-medium text-[14px] sm:text-[16px] flex items-center gap-2`}>
                            {Puntuacion}
                            <span className="lg:hidden">
                                <CalificacionOptions calificacion={1} width={20} height={19.07} />
                            </span>
                            <span className="hidden lg:inline">
                                <CalificacionOptions calificacion={5} width={20} height={19.07} />
                            </span>
                        </span>
                        <span className={`${isLight ? 'text-[#919094]' : 'text-[#B8BEE0]'} font-[Poppins, sans-serif] font-medium text-[12px] flex items-center gap-1`}>
                            <span className="hidden lg:flex lg:gap-2 lg:items-center"><OpinioneDetalleIcon /> {Reseñas} opiniones</span>
                            <span className="lg:hidden">({Reseñas} opiniones)</span>
                        </span>
                    </div>
                    <div className="hidden flex gap-4 items-center lg:flex">
                        <span className="text-[24px] sm:text-[30px] md:text-[36px] font-bold font-[Poppins, sans-serif] text-[#F4604B]">S/{PrecioActual}</span>
                        <span className="text-[18px] sm:text-[20px] md:text-[24px] font-[Poppins, sans-serif] font-regular line-through text-[#D8D8D8]">S/{PrecioOriginal}</span>
                    </div>
                    <div className="hidden flex items-center gap-4 lg:flex motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <p className={`${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'} font-[Poppins, sans-serif] font-medium text-[12px] underline`}>Cuotas sin intereses</p>
                        <p className={`${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'} font-[Poppins, sans-serif] font-medium text-[12px] underline`}>Stock disponible</p>
                    </div>
                    <div className="hidden flex flex-col gap-2 lg:flex motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <p className={`${isLight ? 'text-[#2B2B2B]' : 'text-[#C9CDE1]'} font-[Poppins, sans-serif] font-medium text-[12px]`}>Color:</p>
                        <div className="flex gap-2 items-center motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                            {Colores.map((c, idx) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setSelectedColor(c)}
                                    aria-pressed={selectedColor === c}
                                    className={`w-[32px] h-[32px] rounded-full cursor-pointer ${idx === 0 ? 'ml-3' : ''} duration-300 ease-in-out
                                    ${selectedColor === c
                                            ? (isLight
                                                ? 'ring-2 ring-black ring-offset-2 ring-offset-white'
                                                : 'ring-2 ring-white ring-offset-2 ring-offset-black')
                                            : ''}`}
                                    style={{ backgroundColor: c }}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 order-7 lg:order-none motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <p className={`${isLight ? 'text-[#2B2B2B]' : 'text-[#C9CDE1]'} font-[Poppins, sans-serif] font-medium text-[12px]`}>Tamaño:</p>
                        <div className="flex gap-3 lg:ml-2">
                            {Tamaños && Tamaños.map((size, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedSize(size)}
                                    className={`lg:w-[84px] w-[100px] h-[48px] rounded-[20px] text-[16px] font-[Poppins, sans-serif] font-medium flex items-center justify-center cursor-pointer border-[1.5px] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out ${selectedSize === size
                                            ? (isLight
                                                ? 'bg-[#C8C854] text-[#001947] border-[#AAABB4] hover:border-[#001947]'
                                                : 'bg-[#C8C854] text-black border-[#A6A2C7]')
                                            : (isLight
                                                ? 'bg-[#E4E2E6] text-[#001947] border-[#AAABB4] hover:border-[#001947]'
                                                : 'bg-[#2B2A57] text-[#E7EAFF] border-[#A6A2C7] hover:bg-[#2D257D]')
                                        }`}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2 order-8 lg:order-none motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <p className={`${isLight ? 'text-[#2B2B2B]' : 'text-[#C9CDE1]'} font-[Poppins, sans-serif] font-medium text-[12px]`}>Cantidad:</p>
                        <div className="flex items-center gap-3">
                            <button
                                className={`w-[38px] h-[38px] rounded-full border border-[#C7C6CA] items-center justify-center flex cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${isLight ? 'bg-[#E4E2E6]' : 'bg-[#2B2A57]'}`}
                                onClick={() => setQuantity(q => Math.max(0, q - 1))}
                                disabled={quantity === 0}
                                aria-label="Disminuir cantidad"
                                title="Disminuir"
                            >
                                <RemoveProductIcon color={isLight ? '#001947' : '#E7EAFF'} />
                            </button>
                            <span className={`${isLight ? 'text-[#001947]' : 'text-[#C9CDE1]'}  font-[Poppins, sans-serif] font-medium text-[24px]`} aria-live="polite">{quantity}</span>
                            <button
                                className={`w-[38px] h-[38px] rounded-full border border-[#C7C6CA] items-center justify-center flex cursor-pointer ${isLight ? 'bg-[#E4E2E6] text-[#001947]' : 'bg-[#2B2A57] text-[#E7EAFF]'}`}
                                onClick={() => setQuantity(q => q + 1)}
                                aria-label="Aumentar cantidad"
                                title="Aumentar"
                            >
                                <AddProductIcon color={isLight ? '#001947' : '#E7EAFF'} />
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:flex mt-2 items-center gap-2">
                        <button
                            className={`w-[88%] h-[32px] flex items-center justify-center gap-2 py-6 px-7 rounded-4xl cursor-pointer ${contactarAdded ? 'bg-[#117A37] text-white' : 'bg-[#1ED760] text-white'} transition-colors duration-500 ease-out font-[Poppins, sans-serif] font-medium text-[14px]`}
                            onClick={() => setContactarAdded(!contactarAdded)}>
                            <span
                                style={{
                                    transition: 'color 300ms',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none',
                                    marginLeft: contactarAdded ? '-40px' : '0',
                                }}
                            >
                                {contactarAdded ? 'Redirigiendo...' : 'Contactar con WhatsApp'}
                            </span>
                        </button>
                        <button
                            className={`flex items-center justify-center w-[48px] h-[48px] cursor-pointer ${contactarAdded ? 'bg-[#117A37]' : 'bg-[#1ED760]'} transition-colors duration-500 ease-out rounded-full`}
                            onClick={() => setContactarAdded(!contactarAdded)}
                        >
                            <WhatSappIcon />
                        </button>
                    </div>
                    <div className="hidden lg:flex mt-2 items-center gap-2">
                        <button
                            className={`w-[88%] h-[32px] flex items-center justify-center gap-2 py-6 px-7 rounded-4xl cursor-pointer ${added ? 'bg-[#EB5A45] text-white' : 'bg-[#DFE162] text-[#484900]'} transition-colors duration-500 ease-out font-[Poppins, sans-serif] font-medium text-[14px]`}
                            onClick={() => setAdded(!added)}>
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'transform 300ms ease',
                                    transform: added ? 'translateX(130px)' : 'translateX(0)',
                                }}
                            >
                                <ShoppingCartIcon color={iconColor} />
                            </span>
                            <span
                                style={{
                                    transition: 'color 300ms',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none',
                                    marginLeft: added ? '-40px' : '0',
                                }}
                            >
                                {added ? 'Producto agregado' : 'Agregar al carrito'}
                            </span>
                        </button>
                        <button
                            className={`flex items-center justify-center w-[48px] h-[48px] cursor-pointer ${added ? 'bg-[#EB5A45]' : 'bg-[#F5F692]'} transition-colors duration-500 ease-out rounded-full`}
                            onClick={() => setAdded(!added)}
                        >
                            <AddProductToCarIcon />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 order-6 lg:order-none motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                        <section className="flex flex-col items-center gap-3 lg:flex-row lg:items-start">
                            <div className={`rounded-[15px] flex items-center justify-center w-[72px] h-[48px] ${isLight ? 'bg-[#E4E2E6] text-[#001947] hover:ring-2 hover:ring-black' : 'bg-[#1F1959] text-[#E7EAFF] hover:bg-[#D7D6F4]'} transition-colors duration-300 ease-in-out`}>
                                <EnvioEstadarIcon color={isLight ? '#001947' : '#E7EAFF'} />
                            </div>
                            <div>
                                <h6 className={`${isLight ? 'text-[#001947]' : 'text-white'} font-[Poppins, sans-serif] font-medium text-[16px]`}>Envío estándar</h6>
                                <p className={`hidden lg:block ${isLight ? 'text-[#ACAAAF]' : 'text-[#B8BEE0]'} font-[Poppins, sans-serif] font-medium text-[12px]`}>
                                    <span className={`hidden lg:block ${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'}`}>Gratis</span> / Jue.13 - Mart.15 Junio
                                </p>
                            </div>
                        </section>
                        <section className="flex flex-col items-center gap-3 lg:flex-row lg:items-start">
                            <div className={`rounded-[15px] flex items-center justify-center w-[72px] h-[48px] ${isLight ? 'bg-[#E4E2E6] text-[#001947] hover:ring-2 hover:ring-black' : 'bg-[#1F1959] text-[#E7EAFF] hover:bg-[#D7D6F4]'} transition-colors duration-300 ease-in-out`}>
                                <EnvioExpressoIcon color={isLight ? '#001947' : '#E7EAFF'} />
                            </div>
                            <div>
                                <h6 className={`${isLight ? 'text-[#001947]' : 'text-white'} font-[Poppins, sans-serif] font-medium text-[16px]`}>Envío expresso</h6>
                                <p className={`hidden lg:block ${isLight ? 'text-[#ACAAAF]' : 'text-[#B8BEE0]'} font-[Poppins, sans-serif] font-medium text-[12px]`}>
                                    <span className={`hidden lg:block ${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'}`}>s/20.00</span> / Dom.10 Junio
                                </p>
                            </div>
                        </section>
                        <section className="flex flex-col items-center gap-3 lg:flex-row lg:items-start">
                            <div className={`rounded-[15px] flex items-center justify-center w-[72px] h-[48px] ${isLight ? 'bg-[#E4E2E6] text-[#001947] hover:ring-2 hover:ring-black' : 'bg-[#1F1959] text-[#E7EAFF] hover:bg-[#D7D6F4]'} transition-colors duration-300 ease-in-out`}>
                                <DevolucionesDetalleIcon color={isLight ? '#001947' : '#E7EAFF'} />
                            </div>
                            <div>
                                <h6 className={`${isLight ? 'text-[#001947]' : 'text-white'} font-[Poppins, sans-serif] font-medium text-[16px]`}>
                                    <span className="lg:hidden">Devoluciones free</span>
                                    <span className="hidden lg:inline 2xl:hidden">Devoluciones</span>
                                    <span className="hidden 2xl:inline">Política de devoluciones</span>
                                </h6>
                                <p className={`hidden lg:block ${isLight ? 'text-[#ACAAAF]' : 'text-[#B8BEE0]'} font-[Poppins, sans-serif] font-medium text-[12px]`}>
                                    <span className={`hidden lg:block ${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'}`}>Gratis</span> /  En 30 días
                                </p>
                            </div>
                        </section>
                        <section className="flex flex-col items-center gap-3 lg:flex-row lg:items-start">
                            <div className={`rounded-[15px] flex items-center justify-center w-[72px] h-[48px] ${isLight ? 'bg-[#E4E2E6] text-[#001947] hover:ring-2 hover:ring-black' : 'bg-[#1F1959] text-[#E7EAFF] hover:bg-[#D7D6F4]'} transition-colors duration-300 ease-in-out`}>
                                <EntregaDetalleIcon color={isLight ? '#001947' : '#E7EAFF'} />
                            </div>
                            <div>
                                <h6 className={`${isLight ? 'text-[#001947]' : 'text-white'} font-[Poppins, sans-serif] font-medium text-[16px]`}>Entregas a tiempo</h6>
                                <p className={`hidden font-[Poppins, sans-serif] font-medium text-[12px] ${isLight ? 'text-[#001947]' : 'text-[#E7EAFF]'} lg:block`}>
                                    Estándar / Expreso
                                </p>
                            </div>
                        </section>
                    </div>
                </aside>
            </div>
            <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                <div className={`mx-auto w-full max-w-[480px] flex items-center justify-between gap-3 rounded-[32px] ${isLight ? 'bg-[#2643A4]' : 'bg-[#403F57]'} p-6 shadow-xl motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                    <button
                        className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-full ${added ? 'bg-[#EB5A45] text-white' : 'bg-[#DFE162] text-[#484900]'} transition-colors duration-500 ease-out font-[Poppins, sans-serif] font-medium text-[14px]`}
                        onClick={() => setAdded(!added)}
                    >
                        <ShoppingCartIcon color={added ? '#FFFFFF' : '#484900'} />
                        {added ? 'Producto agregado' : 'Agregar al carrito'}
                    </button>
                    <button
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${added ? 'bg-[#EB5A45]' : 'bg-[#F5F692]'} transition-colors duration-500 ease-out`}
                        onClick={() => setAdded(!added)}
                        aria-label="Agregar rápido"
                    >
                        <AddProductToCarIcon />
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col items-center px-4 sm:px-8 md:px-12 mt-12 md:mt-16 mb-16 gap-3 md:gap-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">

                <h2 className={`hidden lg:block w-full max-w-[1568px] mx-auto text-left ${isLight ? 'text-[#0B1B59]' : 'text-white'} text-[28px] sm:text-[36px] leading-[1.1] font-[Poppins,sans-serif] font-semibold motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                    Información de producto:
                </h2>

                <div className="w-full max-w-[1568px] mx-auto flex flex-col lg:flex-row items-center gap-3 lg:overflow-x-auto lg:no-scrollbar motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out" role="tablist" aria-label="Información de producto tabs">

                    <button
                        type="button"
                        onClick={() => handleAccordionClick('descripcion')}
                        aria-selected={activeInfoTab === 'descripcion'}
                        className={`
                        flex justify-between items-center w-full py-4 px-5 rounded-xl font-medium
                        ${isLight ? 'bg-[#F7F7FD] text-[#0B1B59]' : 'bg-[#1F1959] text-white'}
                        
                        lg:inline-flex lg:w-auto lg:justify-center lg:px-6 lg:py-3 lg:rounded-2xl
                        ${isLight
                                ? (activeInfoTab === 'descripcion'
                                    ? 'lg:bg-[#EEF1FF] lg:shadow-[0_6px_18px_rgba(223,227,255,0.8)] lg:border lg:border-[#0B1B59]'
                                    : 'lg:bg-[#EEF1FF] lg:border lg:border-transparent lg:hover:bg-[#EEF1FF]/20')
                                : (activeInfoTab === 'descripcion'
                                    ? 'lg:bg-[#3A31A9] lg:shadow-[0_6px_18px_rgba(50,45,140,0.45)] lg:border lg:border-[#E7EAFF99]'
                                    : 'lg:bg-[#3A31A9] lg:text-[#E7EAFF] lg:border lg:border-transparent lg:hover:bg-[#2D257D]')
                            }
                        transition focus:outline-none focus:ring-2 focus:ring-offset-0 
                        ${isLight ? 'focus:ring-[#C9D1FF]' : 'focus:ring-[#5B57C9]'}
                    `}
                    >
                        Descripción
                        <ChevronDownIcon className="block lg:hidden" color={isLight ? '#0B1B59' : '#FFFFFF'} />
                    </button>
                    {activeInfoTab === 'descripcion' && (
                        <div className={`block lg:hidden w-full max-w-[1568px] mx-auto rounded-xl shadow-[0_1px_4px_rgba(44,80,158,0.06)] p-6 ${isLight ? 'bg-white text-[#3A3D46]' : 'bg-[#151B3A] text-[#E6E9FF]'} motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                                {productDescription.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => handleAccordionClick('especificaciones')}
                        aria-selected={activeInfoTab === 'especificaciones'}
                        className={`
                        flex justify-between items-center w-full py-4 px-5 rounded-xl font-medium
                        ${isLight ? 'bg-[#F7F7FD] text-[#0B1B59]' : 'bg-[#1F1959] text-white'}
                        
                        lg:inline-flex lg:w-auto lg:justify-center lg:px-6 lg:py-3 lg:rounded-2xl
                        ${isLight
                                ? (activeInfoTab === 'especificaciones'
                                    ? 'lg:bg-[#EEF1FF] lg:shadow-[0_6px_18px_rgba(223,227,255,0.8)] lg:border lg:border-[#0B1B59]'
                                    : 'lg:bg-[#EEF1FF] lg:border lg:border-transparent lg:hover:bg-[#EEF1FF]/20')
                                : (activeInfoTab === 'especificaciones'
                                    ? 'lg:bg-[#3A31A9] lg:shadow-[0_6px_18px_rgba(50,45,140,0.45)] lg:border lg:border-[#E7EAFF99]'
                                    : 'lg:bg-[#3A31A9] lg:text-[#E7EAFF] lg:border lg:border-transparent lg:hover:bg-[#2D257D]')
                            }
                        transition focus:outline-none focus:ring-2 focus:ring-offset-0 
                        ${isLight ? 'focus:ring-[#C9D1FF]' : 'focus:ring-[#5B57C9]'}
                    `}
                    >
                        Especificaciones técnicas
                        <ChevronDownIcon className="block lg:hidden" color={isLight ? '#0B1B59' : '#FFFFFF'} />
                    </button>
                    {activeInfoTab === 'especificaciones' && (
                        (() => {
                            const [leftSpecs, rightSpecs] = splitSpecsEqual(productSpecifications);
                            return (
                                <div className="block lg:hidden w-full max-w-[1568px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 [&>div]:!w-full [&>div]:!max-w-none motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                                    <TechnicalSpecifications specifications={leftSpecs} />
                                    <TechnicalSpecifications specifications={rightSpecs} />
                                </div>
                            );
                        })()
                    )}
                    <button
                        type="button"
                        onClick={() => ('')}
                        aria-selected={''}
                        className={`
                        lg:hidden flex justify-between items-center w-full py-4 px-5 rounded-xl font-medium
                        ${isLight ? 'bg-[#F7F7FD] text-[#0B1B59]' : 'bg-[#1F1959] text-white'}
                        transition focus:outline-none focus:ring-2 focus:ring-offset-0 
                        ${isLight ? 'focus:ring-[#C9D1FF]' : 'focus:ring-[#5B57C9]'}
                    `}>
                        Guía de Tallas
                        <ChevronDownIcon className="block lg:hidden" color={isLight ? '#0B1B59' : '#FFFFFF'} />
                    </button>
                    <button
                        type="button"
                        onClick={() => ('')}
                        aria-selected={''}
                        className={`
                        lg:hidden flex justify-between items-center w-full py-4 px-5 rounded-xl font-medium
                        ${isLight ? 'bg-[#F7F7FD] text-[#0B1B59]' : 'bg-[#1F1959] text-white'}
                        transition focus:outline-none focus:ring-2 focus:ring-offset-0 
                        ${isLight ? 'focus:ring-[#C9D1FF]' : 'focus:ring-[#5B57C9]'}
                    `}>
                        Acerca de la Marca
                        <ChevronDownIcon className="block lg:hidden" color={isLight ? '#0B1B59' : '#FFFFFF'} />
                    </button>
                    <button
                        type="button"
                        onClick={() => ('')}
                        aria-selected={''}
                        className={`
                        lg:hidden flex justify-between items-center w-full py-4 px-5 rounded-xl font-medium
                        ${isLight ? 'bg-[#F7F7FD] text-[#0B1B59]' : 'bg-[#1F1959] text-white'}
                        transition focus:outline-none focus:ring-2 focus:ring-offset-0 
                        ${isLight ? 'focus:ring-[#C9D1FF]' : 'focus:ring-[#5B57C9]'}
                    `}>
                        Envios y Devoluciones
                        <ChevronDownIcon className="block lg:hidden" color={isLight ? '#0B1B59' : '#FFFFFF'} />
                    </button>
                </div>

                {activeInfoTab === 'descripcion' ? (
                    <div className={`hidden lg:block w-full max-w-[1568px] mx-auto rounded-xl shadow-[0_1px_4px_rgba(44,80,158,0.06)] p-6 ${isLight ? 'bg-white text-[#3A3D46]' : 'bg-[#151B3A] text-[#E6E9FF]'} motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out`}>
                        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                            {productDescription.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    (() => {
                        const [leftSpecs, rightSpecs] = splitSpecsEqual(productSpecifications);
                        return (
                            <div className="hidden lg:flex w-full max-w-[1568px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 [&>div]:!w-full [&>div]:!max-w-none motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out">
                                <TechnicalSpecifications specifications={leftSpecs} />
                                <TechnicalSpecifications specifications={rightSpecs} />
                            </div>
                        );
                    })()
                )}
            </div>
        </>
    )
}
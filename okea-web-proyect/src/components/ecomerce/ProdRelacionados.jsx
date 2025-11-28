import { CardProductosRel } from "./CardProductosRel.jsx";
import { FlechaDerechaProdRel, FlechaIzquierdaProdRel } from "../../assets/iconos/Icons.jsx";
//import muebleMesitaNoche from "../../assets/imagenes/Home/muebleMesitaNoche.png";
import ProdRelacionado1 from "../../assets/imagenes/Home/prodrelacionado1.png";
import ProdRelacionado2 from "../../assets/imagenes/Home/prodrelacionado2.png";
import ProdRelacionado3 from "../../assets/imagenes/Home/prodrelacionado3.png";
import ProdRelacionado4 from "../../assets/imagenes/Home/prodrelacionado4.png";
import ProdRelacionado5 from "../../assets/imagenes/Home/prodrelacionado5.png";
import ProdRelacionado6 from "../../assets/imagenes/Home/prodrelacionado6.png";
import ProductCard from "../../components/ProductCard.jsx";
import { useState, useRef } from "react";
import { useTheme } from "../../components/ThemeContext";
export function ProdRelacionados() {
    const [liked, setLiked] = useState(false);
    const [addedItems, setAddedItems] = useState({});
    const { isLight } = useTheme();
    const desktopScrollRef = useRef(null);

    const toggleLike = (id) => {
        setLiked((prev) => ({
        ...prev,
        [id]: !prev[id],
        }));
    };

    const handleClick = (id) => {
        setAddedItems((prev) => ({
            ...prev,
        [id]: !prev[id],
        }));
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

    const productos = [
        { id: "producto1Muebles", index: 1 , image: ProdRelacionado1, title: "Wooden Sofa Chair"},
        { id: "producto2Muebles", index: 2 , image: ProdRelacionado2, title: "Wooden Sofa Chair"},
        { id: "producto3Muebles", index: 3 , image: ProdRelacionado3, title: "Wooden Sofa Chair"},
        { id: "producto4Muebles", index: 4 , image: ProdRelacionado4, title: "Wooden Sofa Chair"},
        { id: "producto5Muebles", index: 5 , image: ProdRelacionado5, title: "Wooden Sofa Chair"},
        { id: "producto6Muebles", index: 6 , image: ProdRelacionado6, title: "Wooden Sofa Chair"},
    ];

    const scrollLeft = () => {
        if (desktopScrollRef.current) {
            desktopScrollRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (desktopScrollRef.current) {
            desktopScrollRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };
    return(
        <div className="w-full max-w-[1568px] mx-auto px-4">
            <h1 className={`text-[22px] sm:text-[45px] flex justify-center mb-20 font-medium ${isLight ? 'text-[#434651]' : 'text-[#FFFFFF]'} transition-colors duration-500 ease-in-out`} style={{fontFamily: 'Inter'}}>productos Relacionados</h1>
            
            <div className="w-full">
                <div className="hidden md:flex w-full">
                        <button
                            onClick={scrollLeft}
                            className="mr-4 cursor-pointer"
                        >
                            <FlechaIzquierdaProdRel color={isLight ? '#385BAA' : '#E5E2E1'} />
                        </button>
                        <div 
                            ref={desktopScrollRef}
                            className="flex gap-10 overflow-x-auto scrollbar-hide px-4"
                            style={{
                                scrollBehavior: 'smooth',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            {productos.map((producto) => (
                                <div key={producto.id} className="flex-shrink-0">
                                    <ProductCard
                                        id={producto.id}
                                        image={producto.image}
                                        discount="-50%"
                                        label="Label"
                                        title={producto.title}
                                        price="$80.00"
                                        oldPrice="s/ 160.00"
                                        rating="4.9"
                                        liked={liked[producto.id]}
                                        added={addedItems[producto.index]}
                                        onLike={toggleLike}
                                        onAdd={handleClick}
                                        getCardStyle={getCardStyle}
                                        getTextStyle={getTextStyle}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={scrollRight}
                            className="ml-4 cursor-pointer"
                        >
                            <FlechaDerechaProdRel color={isLight ? '#385BAA' : '#E5E2E1'} />
                        </button>
                </div>

                <div className="md:hidden">
                    <div 
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2"
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {productos.map((producto) => (
                            <div key={producto.id} className="flex-shrink-0 w-[280px]">
                                <ProductCard
                                    id={producto.id}
                                    image={producto.image}
                                    discount="-50%"
                                    label="Label"
                                    title={producto.title}
                                    price="$80.00"
                                    oldPrice="s/ 160.00"
                                    rating="4.9"
                                    liked={liked[producto.id]}
                                    added={addedItems[producto.index]}
                                    onLike={toggleLike}
                                    onAdd={handleClick}
                                    getCardStyle={getCardStyle}
                                    getTextStyle={getTextStyle}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState } from 'react';
import ProductCardV2 from './ProductCardV2';
import { SearchIconV2 } from "../assets/iconos/Icons";
import Product1 from '../assets/imagenes/Usuario/Favoritos/Product1.png';
import Product2 from '../assets/imagenes/Usuario/Favoritos/Product2.png';
import Product3 from '../assets/imagenes/Usuario/Favoritos/Product3.png';
import Product4 from '../assets/imagenes/Usuario/Favoritos/Producto4.png';
import Product5 from '../assets/imagenes/Usuario/Favoritos/Product5.png';
import Product6 from '../assets/imagenes/Usuario/Favoritos/Product6.png';
import { useTheme } from "./ThemeContext";

const products = [
    {
        id: 1,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        oldPrice: "s/ 160.00",
        discount: '-50 %',
        rating: 4.9,
        image: Product1
    },
    {
        id: 2,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        oldPrice: "s/ 160.00",
        discount: '-50 %',
        rating: 4.9,
        image: Product2
    },
    {
        id: 3,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        oldPrice: "s/ 160.00",
        discount: '-50 %',
        rating: 4.9,
        image: Product1
    },
    {
        id: 4,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        rating: 4.9,
        image: Product3
    },
    {
        id: 5,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        rating: 4.9,
        image: Product4
    },
    {
        id: 6,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        oldPrice: "s/ 160.00",
        discount: '-50 %',
        rating: 4.9,
        image: Product1
    },
    {
        id: 7,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        rating: 4.9,
        image: Product5
    },
    {
        id: 8,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        rating: 4.9,
        image: Product6
    },
    {
        id: 9,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        oldPrice: "s/ 160.00",
        discount: '-50 %',
        rating: 4.9,
        image: Product1
    },
    {
        id: 10,
        label: 'Label',
        title: 'Wooden Sofa Chair',
        price: '$80.00',
        oldPrice: "s/ 160.00",
        discount: '-50 %',
        rating: 4.9,
        image: Product1 
    },
];

export default function FavoritesSection(){
    const [liked, setLiked] = useState(false);
    const [addedItems, setAddedItems] = useState({});
    const { isLight } = useTheme();

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
    const getCardStyle = () => ({
        backgroundColor: "#F4F3FA",
        borderRadius: "24px",
        border: isLight ? "1px solid rgba(231, 234, 255, 0.6)" : "1px solid rgba(255, 255, 255, 0.12)",
        transition: "all 300ms ease",
    });
    const getTextStyle = () => ({
        color: isLight ? "#434651" : "#E7EAFF",
        transition: "color 300ms ease",
    });
    return (
        <div className={'p-6 sm:p-8 rounded-2xl shadow-sm ' + (isLight ? 'bg-white' : 'bg-[#292272]')}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h1 className={'text-2xl sm:text-3xl ' + (isLight ? 'text-blue-900' : 'text-white')}>Favoritos</h1>
                <div className="relative w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Buscar en favoritos"
                        className={'w-full py-2.5 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 ' + (isLight ? 'bg-blue-50 text-gray-700' : 'bg-[#C4C6D366] text-[#C4C6D3]')}
                    />
                    <SearchIconV2 className="absolute right-3 top-2.5" size={20} color='red' />
                </div>
            </div>
            <div
                className={`w-full py-3 px-6 mb-8 rounded-full border flex items-center ${isLight
                        ? 'bg-transparent border-gray-200'
                    : 'bg-[#292272] border-[#4B4D8D]' 
                    }`}
            >
                <span
                    className={`text-xs tracking-widest uppercase ${isLight ? 'text-blue-900' : 'text-white'
                        }`}
                >
                    Productos
                </span>
            </div>

            <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductCardV2 key={product.id} {...product} getCardStyle={getCardStyle} getTextStyle={getTextStyle} forceLightText={true} liked={liked[product.id]} added={addedItems[product.id]} onLike={toggleLike} onAdd={handleClick} />
                ))}
            </div>
        </div>
    );
};
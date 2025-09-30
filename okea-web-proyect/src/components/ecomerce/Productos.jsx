import { ProductCard } from "./ProductCard";
import iphoneImg from "../../assets/imagenes/Iphone.png";
export function Products() {
    const products = [{
        id: 1,
        imagen: iphoneImg,
        marca: "Marca A",
        modelo: "Modelo X",  
        descripcion: "Descripción del producto 1", 
        precio: "100", 
        precioSinDescuento: "120",
        etiqueta: "-20 %",
        calificacion: "4.5"
    },
    {
        id: 2,
        imagen: iphoneImg,
        marca: "Marca B",
        modelo: "Modelo Y",
        descripcion: "Descripción del producto 2",
        precio: "100", 
        precioSinDescuento: "",
        etiqueta: "-20 %",
        calificacion: "4.5"
    }];
    return (
        <div className="grid grid-cols-4 gap-3 w-[1295px] h-[3525px] ">
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
}
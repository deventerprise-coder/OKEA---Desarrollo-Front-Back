import React from "react";
import {SidebarMenu} from "../../components/ecomerce/Filtro";
import {ProductCard} from "../../components/ecomerce/ProductCard";
import {Products} from "../../components/ecomerce/Productos";
import { PaginacionBar } from "../../components/ecomerce/PaginacionBar";
import { ProdRelacionados } from "../../components/ecomerce/ProdRelacionados.jsx";
import { Panel } from "../../components/ecomerce/Panel";
import { BreadCrum } from "../../components/ecomerce/BreadCrum";
import modeloApple from "../../assets/imagenes/Categorias/Panel/modeloApple.png";
import modeloApple12 from "../../assets/imagenes/Categorias/Panel/modeloApple12.png";
import modeloApple13 from "../../assets/imagenes/Categorias/Panel/modeloApple13.png";
import modeloApple14 from "../../assets/imagenes/Categorias/Panel/modeloApple14.png";
import modeloApple15 from "../../assets/imagenes/Categorias/Panel/modeloApple15.png";
import modeloApple16 from "../../assets/imagenes/Categorias/Panel/modeloApple16.png";
import sofaAzul from "../../assets/imagenes/Categorias/Panel/SofaAzul.png";
import sofaBlanco from "../../assets/imagenes/Categorias/Panel/SofaBlanco.png";
import CalzadoBlanco from "../../assets/imagenes/Categorias/Panel/CalzadoBlanco.png";
import CalzadoMarron from "../../assets/imagenes/Categorias/Panel/CalzadoMarron.png";
import Colchon1 from "../../assets/imagenes/Categorias/Panel/Colchon1.png";
import Colchon2 from "../../assets/imagenes/Categorias/Panel/Colchon2.png";
import Lentes from "../../assets/imagenes/Categorias/Panel/Lentes.png";
import PoloAcces from "../../assets/imagenes/Categorias/Panel/PoloAcces.png";
import Salud1 from "../../assets/imagenes/Categorias/Panel/Salud1.png";
import Salud2 from "../../assets/imagenes/Categorias/Panel/Salud2.png";
import Mattel from "../../assets/imagenes/Categorias/Panel/Mattel.png";
import Hasbro from "../../assets/imagenes/Categorias/Panel/Hasbro.png";
import Lego from "../../assets/imagenes/Categorias/Panel/Lego.png";
import Supermecado1 from "../../assets/imagenes/Categorias/Panel/Supermercado1.png";
import Supermecado2 from "../../assets/imagenes/Categorias/Panel/Supermercado2.png";
import Moda1 from "../../assets/imagenes/Categorias/Panel/Moda1.png";
import Moda2 from "../../assets/imagenes/Categorias/Panel/Moda2.png";
import Moda3 from "../../assets/imagenes/Categorias/Panel/Moda3.png";
import Electrohogar1 from "../../assets/imagenes/Categorias/Panel/Electrohogar1.png";
import Electrohogar2 from "../../assets/imagenes/Categorias/Panel/Electrohogar2.png";
import Electrohogar3 from "../../assets/imagenes/Categorias/Panel/Electrohogar3.png";
import Mascotas1 from "../../assets/imagenes/Categorias/Panel/Mascotas1.png";
import Mascotas2 from "../../assets/imagenes/Categorias/Panel/Mascotas2.png";
import Decoracion1 from "../../assets/imagenes/Categorias/Panel/Decoracion1.png";
import Decoracion2 from "../../assets/imagenes/Categorias/Panel/Decoracion2.png";
import * as products from "../../mocks/productsLists";
import { useTheme } from "../../components/ThemeContext";
export default function Categoria({categoria, subcategoria}) {
    const { isLight } = useTheme();
    const tecDestacados = [
        { nombre: "iPhone 11", imagen: modeloApple },
        { nombre: "iPhone 12", imagen: modeloApple12 },
        { nombre: "iPhone 13", imagen: modeloApple13 },
        { nombre: "iPhone 14", imagen: modeloApple14 },
        { nombre: "iPhone 15", imagen: modeloApple15 },
        { nombre: "iPhone 16", imagen: modeloApple16 },
    ];
    const MueblesDestacados = [
        { nombre: "Sofa Cordoba", imagen: sofaBlanco},
        { nombre: "Sofa Cordoba", imagen: sofaAzul },
        { nombre: "Sofa Cordoba", imagen: sofaBlanco},
        { nombre: "Sofa Cordoba", imagen: sofaAzul },
        { nombre: "Sofa Cordoba", imagen: sofaBlanco},
        { nombre: "Sofa Cordoba", imagen: sofaAzul },
    ];
    const CalzadosDestacados = [
        { nombre: "Nike", imagen: CalzadoMarron},
        { nombre: "Puma", imagen: CalzadoBlanco},
        { nombre: "Nike", imagen: CalzadoMarron},
        { nombre: "Puma", imagen: CalzadoBlanco},
        { nombre: "Nike", imagen: CalzadoMarron},
        { nombre: "Puma", imagen: CalzadoBlanco},
        
    ];
    const DestacadosDormitorio = [
        { nombre: "Rosen", imagen: Colchon1},
        { nombre: "Paraíso", imagen: Colchon2},
        { nombre: "Rosen", imagen: Colchon1},
        { nombre: "Paraíso", imagen: Colchon2},
        { nombre: "Rosen", imagen: Colchon1},
        { nombre: "Paraíso", imagen: Colchon2},
        
    ];
    const DestacadosAccesorios= [
        { nombre: "Lentes", imagen: Lentes},
        { nombre: "Polos", imagen: PoloAcces},
        { nombre: "Lentes", imagen: Lentes},
        { nombre: "Polos", imagen: PoloAcces},
        { nombre: "Lentes", imagen: Lentes},
        { nombre: "Polos", imagen: PoloAcces},
    ];
    const DestacadosSalud= [
        { nombre: "Maquillaje", imagen: Salud1},
        { nombre: "Cuidado Capilar", imagen: Salud2},
        { nombre: "Maquillaje", imagen: Salud1},
        { nombre: "Cuidado Capilar", imagen: Salud2},
        { nombre: "Maquillaje", imagen: Salud1},
        { nombre: "Cuidado Capilar", imagen: Salud2},
    ];
    const DestacadosJuguetes= [
        { nombre: "Juegos de Mesa", imagen: Mattel},
        { nombre: "Juegos de Mesa", imagen: Hasbro},
        { nombre: "Juegos de Mesa", imagen: Lego},
        { nombre: "Juegos de Mesa", imagen: Mattel},
        { nombre: "Juegos de Mesa", imagen: Hasbro},
        { nombre: "Juegos de Mesa", imagen: Lego},
    ];
    const DestacadosDecoracion= [
        { nombre: "Lamparas", imagen: Decoracion1},
        { nombre: "Cortinas", imagen: Decoracion2},
        { nombre: "Lamparas", imagen: Decoracion1},
        { nombre: "Cortinas", imagen: Decoracion2},
        { nombre: "Lamparas", imagen: Decoracion1},
        { nombre: "Cortinas", imagen: Decoracion2},
    ];
    const DestacadosMascotas= [
        { nombre: "Friskies", imagen: Mascotas1},
        { nombre: "Royal Canin", imagen: Mascotas2},
        { nombre: "Friskies", imagen: Mascotas1},
        { nombre: "Royal Canin", imagen: Mascotas2},
        { nombre: "Friskies", imagen: Mascotas1},
        { nombre: "Royal Canin", imagen: Mascotas2},
    ];
    const DestacadosSupermercado= [
        { nombre: "Gaseosas", imagen: Supermecado1},
        { nombre: "Lacteos", imagen: Supermecado2},
        { nombre: "Gaseosas", imagen: Supermecado1},
        { nombre: "Lacteos", imagen: Supermecado2},
        { nombre: "Gaseosas", imagen: Supermecado1},
        { nombre: "Lacteos", imagen: Supermecado2},
    ];
    const DestacadosElectrohogar= [
        { nombre: "Mabe", imagen: Electrohogar1},
        { nombre: "Samsung", imagen: Electrohogar2},
        { nombre: "Lg", imagen: Electrohogar3},
        { nombre: "Mabe", imagen: Electrohogar1},
        { nombre: "Samsung", imagen: Electrohogar2},
        { nombre: "Lg", imagen: Electrohogar3},
    ];
    const DestacadosModa= [
        { nombre: "Levis", imagen: Moda1},
        { nombre: "Adidas", imagen: Moda2},
        { nombre: "Mango", imagen: Moda3},
        { nombre: "Levis", imagen: Moda1},
        { nombre: "Adidas", imagen: Moda2},
        { nombre: "Mango", imagen: Moda3},
    ];

    const destacadoList = categoria === "Tecnología" ? tecDestacados
    : categoria === "Muebles y Organización" ? MueblesDestacados
    : categoria === "Calzado" ? CalzadosDestacados
    : categoria === "Dormitorio y Baños" ? DestacadosDormitorio
    : categoria === "Accesorios de Moda" ? DestacadosAccesorios
    : categoria === "Salud y Bienestar" ? DestacadosSalud
    : categoria === "Juguetes" ? DestacadosJuguetes
    : categoria === "Decoración" ? DestacadosDecoracion
    : categoria === "Mascotas" ? DestacadosMascotas
    : categoria === "Supermercado" ? DestacadosSupermercado
    : categoria === "Electrohogar" ? DestacadosElectrohogar
    : DestacadosModa;

    const productosList = categoria === "Tecnología" ? products.productsTecnologia
    : categoria === "Muebles y Organización" ? products.productsMuebles
    : categoria === "Calzado" ? products.productsCalzado
    : categoria === "Dormitorio y Baños" ? products.productsDormitorio
    : categoria === "Accesorios de Moda" ? products.productsAccesorios
    : categoria === "Salud y Bienestar" ? products.productsSalud
    : categoria === "Juguetes" ? products.productsJuguetes
    : categoria === "Decoración" ? products.productsDecoracion
    : categoria === "Mascotas" ? products.productsMascotas
    : categoria === "Supermercado" ? products.productsSupermercado
    : categoria === "Electrohogar" ? products.productsElectrohogar
    : categoria === "Moda Hombre" ? products.productsModaHombre
    : products.productsModaMujer;

  return (
    <div className={`w-full overflow-x-hidden ${isLight ? "bg-white text-black" : "bg-[#120F31] text-white"}`} style={{transition: 'background-color 0.5s, color 0.5s'}}>
      <BreadCrum categoria={categoria} subcategoria={subcategoria} isLight={isLight}/>
      <Panel Categoria={categoria} destacados={destacadoList} isLight={isLight}/>
      <div className="lg:flex w-full overflow-x-hidden lg:mt-8">
        <SidebarMenu categoria={categoria} subcategoria={subcategoria} isLight={isLight}/>
        <aside className="flex flex-col items-center w-full lg:w-auto flex-1 overflow-x-hidden">
          <Products products={productosList} categoria={categoria} isLight={isLight}/>
        </aside>
      </div>
      <div className="flex items-center justify-center mt-20 mb-20 w-full overflow-x-hidden">
        <ProdRelacionados/>
      </div> 
    </div>
  );
}
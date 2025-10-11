import React from "react";
import {SidebarMenu} from "../../components/ecomerce/Filtro";
import {ProductCard} from "../../components/ecomerce/ProductCard";
import {Products} from "../../components/ecomerce/Productos";
import { PaginacionBar } from "../../components/ecomerce/PaginacionBar";
import { ProdRelacionados } from "../../components/ecomerce/ProdRelacionados";
import { Panel } from "../../components/ecomerce/Panel";
import { BreadCrum } from "../../components/ecomerce/BreadCrum";
import modeloApple from "../../assets/imagenes/categorias/panel/modeloApple.png";
import sofaAzul from "../../assets/imagenes/categorias/panel/SofaAzul.png";
import sofaBlanco from "../../assets/imagenes/categorias/panel/SofaBlanco.png";
import CalzadoBlanco from "../../assets/imagenes/categorias/panel/CalzadoBlanco.png";
import CalzadoMarron from "../../assets/imagenes/categorias/panel/CalzadoMarron.png";
import Colchon1 from "../../assets/imagenes/categorias/panel/Colchon1.png";
import Colchon2 from "../../assets/imagenes/categorias/panel/Colchon2.png";
import Lentes from "../../assets/imagenes/categorias/panel/Lentes.png";
import PoloAcces from "../../assets/imagenes/categorias/panel/PoloAcces.png";
import Salud1 from "../../assets/imagenes/categorias/panel/Salud1.png";
import Salud2 from "../../assets/imagenes/categorias/panel/Salud2.png";
import Mattel from "../../assets/imagenes/categorias/panel/Mattel.png";
import Hasbro from "../../assets/imagenes/categorias/panel/Hasbro.png";
import Lego from "../../assets/imagenes/categorias/panel/Lego.png";
import Supermecado1 from "../../assets/imagenes/categorias/panel/Supermercado1.png";
import Supermecado2 from "../../assets/imagenes/categorias/panel/Supermercado2.png";
import Moda1 from "../../assets/imagenes/categorias/panel/Moda1.png";
import Moda2 from "../../assets/imagenes/categorias/panel/Moda2.png";
import Moda3 from "../../assets/imagenes/categorias/panel/Moda3.png";
import Electrohogar1 from "../../assets/imagenes/categorias/panel/Electrohogar1.png";
import Electrohogar2 from "../../assets/imagenes/categorias/panel/Electrohogar2.png";
import Electrohogar3 from "../../assets/imagenes/categorias/panel/Electrohogar3.png";
import Mascotas1 from "../../assets/imagenes/categorias/panel/Mascotas1.png";
import Mascotas2 from "../../assets/imagenes/categorias/panel/Mascotas2.png";
import Decoracion1 from "../../assets/imagenes/categorias/panel/Decoracion1.png";
import Decoracion2 from "../../assets/imagenes/categorias/panel/Decoracion2.png";
import * as products from "../../mocks/productsLists";
import { useTheme } from "../../components/ThemeContext";
export default function Categoria({categoria, subcategoria}) {
    const { isLight } = useTheme();
    const tecDestacados = [
        { nombre: "Modelo Apple", imagen: modeloApple },
        { nombre: "Modelo Samsung", imagen: modeloApple },
        { nombre: "Modelo Apple", imagen: modeloApple },
        { nombre: "Modelo Samsung", imagen: modeloApple },
        { nombre: "Modelo Apple", imagen: modeloApple },
        { nombre: "Modelo Samsung", imagen: modeloApple },
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
    <div className={isLight ? "bg-white text-black" : "bg-[#120F31] text-white"} style={{transition: 'background-color 0.5s, color 0.5s'}}>
      <BreadCrum categoria={categoria} subcategoria={subcategoria} isLight={isLight}/>
      <Panel Categoria={categoria} destacados={destacadoList}/>
      <div className="flex mt-40 w-full">
        <SidebarMenu categoria={categoria} subcategoria={subcategoria} isLight={isLight}/>
        <aside className="flex flex-col items-center w-full">
          <Products products={productosList} categoria={categoria} isLight={isLight}/>
        </aside>
      </div>
      <div className="flex items-center justify-center">
        <ProdRelacionados/>
      </div> 
    </div>
  );
}
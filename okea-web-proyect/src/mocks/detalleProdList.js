import Iphone12 from "../assets/imagenes/ProductCards/Iphone12.png";
import ElectroHogarProd from "../assets/imagenes/ProductCards/ElectrohogarProd.png";
import MuebleProd from "../assets/imagenes/ProductCards/MuebleProd.png";
import DormitorioProd from "../assets/imagenes/ProductCards/DormitorioProd.png";
import ModaHProd from "../assets/imagenes/ProductCards/ModaH.png";
import ModaMProd from "../assets/imagenes/ProductCards/ModaMProd.png";
import CalzadoProd from "../assets/imagenes/ProductCards/CalzadoProd.png";
import AccesoriosProd from "../assets/imagenes/ProductCards/AccesoriosProd.png";
import SaludProd from "../assets/imagenes/ProductCards/SaludProd.png";
import JugueteProd from "../assets/imagenes/ProductCards/JuguetesProd.png";
import DecoracionProd from "../assets/imagenes/ProductCards/DecoracionProd.png";
import MascotasProd from "../assets/imagenes/ProductCards/MascotasProd.png";
import SupermercadoProd from "../assets/imagenes/ProductCards/SupermercadoProd.png";
import AutomotrizProd from "../assets/imagenes/ProductCards/AutomotrizProd.png";

export const productoTecnologia = [
  {
    NombreProducto: "iPhone 12",
    Marca: "Apple",
    PrecioActual: 799,
    PrecioOriginal: 899,
    DescripcionCorta:
      "El iPhone 12 es un teléfono inteligente de Apple con una pantalla de 6.1 pulgadas.",
    DescripcionProducto: [
      "iPhone 12 ofrece un diseño delgado y resistente con pantalla Super Retina XDR de 6.1 pulgadas y Ceramic Shield.",
      "Con el chip A14 Bionic, brinda rendimiento ágil y eficiente para apps y juegos exigentes.",
      "Sistema de doble cámara de 12 MP con Modo Noche, 5G para descargas rápidas y compatibilidad con accesorios MagSafe.",
    ],
    Especificaciones: [
      { label: "Condición del producto", value: "Nuevo" },
      { label: "Marca", value: "Apple" },
      { label: "Modelo", value: "iPhone 12" },
      { label: "Color", value: "Negro" },
      { label: "Pantalla", value: '6.1" Super Retina XDR' },
      { label: "Procesador", value: "A14 Bionic" },
      { label: "Almacenamiento", value: "64/128/256 GB" },
      {
        label: "Cámara",
        value: "Doble 12 MP (Gran angular/Ultra gran angular)",
      },
      { label: "Batería", value: "Carga rápida y MagSafe" },
      { label: "Conectividad", value: "5G, Wi‑Fi 6, Bluetooth 5.0" },
      { label: "Resistencia", value: "IP68" },
      { label: "Sistema", value: "iOS" },
      { label: "País de origen", value: "EEUU" },
    ],
    Imagen: [Iphone12, Iphone12, Iphone12, Iphone12, Iphone12],
    Colores: ["#053559", "#16141F", "#BFB6EB", "#DDF4D8", "#F9F6F1"],
    Tamaños: ["64 GB", "128 GB", "256 GB"],
    Puntuacion: 5.0,
    Reseñas: 110,
    //CategoriaProducto: "Tecnología",
    //SubCategoriaProducto: "Iphone 12",
  },
];

export const productoElectroHogar = [
  {
    NombreProducto: "Lavadora EcoBubble",
    Marca: "LG",
    PrecioActual: 1499,
    PrecioOriginal: 1599,
    DescripcionCorta: "Lavadora de carga frontal de 8 kg.",
    DescripcionProducto: [
      "Capacidad: 8 kg",
      "Eficiencia energética: A+++",
      "Dimensiones: 85 x 60 x 55 cm",
      "Lavadora LG de carga frontal con tecnología de ahorro de energía y agua.",
    ],
    Especificaciones: [
      { label: "Tipo de Carga", value: "Superior" },
      { label: "Capacidad", value: "17 kg (37 lbs)" },
      { label: "Marca", value: "LG" },
      { label: "Tecnología", value: "Smart Inverter, TurboDrum™" },
      { label: "Color", value: "Black Steel (Acero Negro)" },
      { label: "Dimensiones (AnxAlxProf)", value: "63.2 x 102 x 67 cm" },
      { label: "Programas", value: "8 (Normal, Rápido, Edredón, etc.)" },
      { label: "Origen", value: "Tailandia" },
    ],
    Imagen: [
      ElectroHogarProd,
      ElectroHogarProd,
      ElectroHogarProd,
      ElectroHogarProd,
      ElectroHogarProd,
    ],
    Colores: ["#4A4C56", "#D8D8D8"],
    Tamaños: ["17 kg", "24 kg"],
    Puntuacion: 5.0,
    Reseñas: 120,
    //CategoriaProducto: "Electrohogar",
    //SubCategoriaProducto: "Lavadora LG",
  },
];

export const productoMuebles = [
  {
    NombreProducto: "Sofa",
    Marca: "Ikea",
    PrecioActual: 499,
    PrecioOriginal: 599,
    DescripcionCorta: "Sofa de 3 plazas con chaise longue.",
    DescripcionProducto: [
      "Sofa de 3 plazas con chaise longue.",
      "Tapizado en tela de alta calidad.",
      "Estructura de madera resistente.",
      "Incluye cojines decorativos.",
    ],
    Especificaciones: [
      { label: "Material", value: "Tela" },
      { label: "Color", value: "Gris" },
      { label: "Dimensiones", value: "200 x 90 x 85 cm" },
      { label: "Peso", value: "75 kg" },
      { label: "Origen", value: "Suecia" },
    ],
    Imagen: [MuebleProd, MuebleProd, MuebleProd, MuebleProd, MuebleProd],
    Colores: ["#4A4C56", "#D8D8D8"],
    Tamaños: ["3 plazas"],
    Puntuacion: 4.5,
    Reseñas: 120,
    //CategoriaProducto: "Muebles y Organización",
    //SubCategoriaProducto: "Sofas",
  },
];

export const productoDormitorio = [
  {
    NombreProducto: "Cama Confort",
    Marca: "Drimer",
    PrecioActual: 1499,
    PrecioOriginal: 1899,
    DescripcionCorta: "Cama de 2 plazas con cabecera tapizada.",
    DescripcionProducto: [
      "Cama de 2 plazas con cabecera tapizada.",
      "Estructura de madera resistente.",
      "Incluye somier.",
      "No incluye colchón.",
    ],
    Especificaciones: [
      { label: "Material", value: "Madera" },
      { label: "Color", value: "Gris" },
      { label: "Dimensiones", value: "140 x 190 cm" },
      { label: "Peso", value: "50 kg" },
      { label: "Origen", value: "Suecia" },
    ],
    Imagen: [
      DormitorioProd,
      DormitorioProd,
      DormitorioProd,
      DormitorioProd,
      DormitorioProd,
    ],
    Colores: ["#4A4C56", "#D8D8D8"],
    Tamaños: ["1 plaza", "1.5 plazas", "2 plazas", "Queen"],
    Puntuacion: 5.0,
    Reseñas: 120,
    //CategoriaProducto: "Dormitorio y Baños",
    //SubCategoriaProducto: "Camas",
  },
];

export const productoModaH = [
  {
    NombreProducto: "Camiseta manga larga",
    Marca: "H&M",
    PrecioActual: 199,
    PrecioOriginal: 249,
    DescripcionCorta: "Camiseta de manga larga para hombre.",
    DescripcionProducto: [
      "Camiseta de manga larga para hombre.",
      "Tejido suave y cómodo.",
      "Disponible en varios colores.",
    ],
    Especificaciones: [
      { label: "Material", value: "Algodón" },
      { label: "Color", value: "Negro" },
      { label: "Tamaño", value: "M" },
      { label: "Peso", value: "200 g" },
      { label: "Origen", value: "Bangladesh" },
    ],
    Imagen: [ModaHProd, ModaHProd, ModaHProd, ModaHProd, ModaHProd],
    Colores: ["#cbbf53ff", "#FFFFFF", "#000000"],
    Tamaños: ["S", "M", "L", "XL"],
    Puntuacion: 5.0,
    Reseñas: 85,
    //CategoriaProducto: "Moda Hombre",
    //SubCategoriaProducto: "Camisetas",
  },
];

export const productoModaM = [
  {
    NombreProducto: "Polo manga corta",
    Marca: "H&M",
    PrecioActual: 199,
    PrecioOriginal: 249,
    DescripcionCorta: "Polo de manga corta para mujer.",
    DescripcionProducto: [
      "Polo de manga corta para mujer.",
      "Tejido suave y cómodo.",
      "Disponible en varios colores.",
    ],
    Especificaciones: [
      { label: "Material", value: "Algodón" },
      { label: "Color", value: "Negro, Blanco y Azul" },
      { label: "Tamaño", value: "M" },
      { label: "Peso", value: "200 g" },
      { label: "Origen", value: "Bangladesh" },
    ],
    Imagen: [ModaMProd, ModaMProd, ModaMProd, ModaMProd, ModaMProd],
    Colores: ["#001effff", "#FFFFFF", "#000000"],
    Tamaños: ["S", "M", "L"],
    Puntuacion: 5.0,
    Reseñas: 85,
    //CategoriaProducto: "Moda Mujer",
    //SubCategoriaProducto: "Polos",
  },
];

export const productoCalzado = [
  {
    NombreProducto: "Zapatillas Deportivas",
    Marca: "Nike",
    PrecioActual: 299,
    PrecioOriginal: 349,
    DescripcionCorta: "Zapatillas deportivas ligeras y cómodas.",
    DescripcionProducto: [
      "Diseño moderno y elegante.",
      "Ideal para correr y hacer ejercicio.",
      "Plantilla acolchada para mayor comodidad.",
    ],
    Especificaciones: [
      { label: "Material", value: "Textil" },
      { label: "Color", value: "Negro" },
      { label: "Tallas disponibles", value: "36-41" },
      { label: "Origen", value: "Vietnam" },
    ],
    Imagen: [CalzadoProd, CalzadoProd, CalzadoProd, CalzadoProd, CalzadoProd],
    Colores: ["#4A4C56", "#D8D8D8"],
    Tamaños: ["36", "37", "38", "39", "40", "41"],
    Puntuacion: 5.0,
    Reseñas: 150,
    //CategoriaProducto: "Calzado",
    //SubCategoriaProducto: "Zapatillas",
  },
];

export const productoAccesorios = [
  {
    NombreProducto: "Cartera de Cuero",
    Marca: "Gucci",
    PrecioActual: 699,
    PrecioOriginal: 1249,
    DescripcionCorta: "Cartera de cuero genuino con diseño elegante.",
    DescripcionProducto: [
      "Hecha a mano con los mejores materiales.",
      "Amplio espacio para tarjetas y billetes.",
      "Diseño atemporal que nunca pasa de moda.",
    ],
    Especificaciones: [
      { label: "Material", value: "Cuero" },
      { label: "Color", value: "Negro" },
      { label: "Dimensiones", value: "20cm x 10cm x 2cm" },
      { label: "Origen", value: "Italia" },
    ],
    Imagen: [
      AccesoriosProd,
      AccesoriosProd,
      AccesoriosProd,
      AccesoriosProd,
      AccesoriosProd,
    ],
    Colores: ["#4A4C56", "#D8D8D8"],
    Tamaños: ["Único"],
    Puntuacion: 5.0,
    Reseñas: 780,
    //CategoriaProducto: "Accesorios de Moda",
    //SubCategoriaProducto: "Carteras",
  },
];

export const productoSalud = [
  {
    NombreProducto: "Crema hidratante para piel",
    Marca: "Cerave",
    PrecioActual: 69,
    PrecioOriginal: 124,
    DescripcionCorta: "Crema hidratante para piel seca",
    DescripcionProducto: [
      "Hidratación intensa",
      "Textura ligera",
      "Sin fragancia",
    ],
    Especificaciones: [
      { label: "Uso", value: "Diurno" },
      { label: "Efectos", value: "Hidratante" },
    ],
    Imagen: [SaludProd, SaludProd, SaludProd, SaludProd, SaludProd],
    Colores: ["#FFFFFF"],
    Tamaños: ["Único"],
    Puntuacion: 5.0,
    Reseñas: 780,
    //CategoriaProducto: "Salud y Bienestar",
    //SubCategoriaProducto: "Cremas",
  },
];

export const productoJuguetes = [
  {
    NombreProducto: "Carro F1 Coleccionable",
    Marca: "Hot Wheels",
    PrecioActual: 69,
    PrecioOriginal: 124,
    DescripcionCorta: "Carro de juguete a escala",
    DescripcionProducto: [
      "Carro de juguete a escala",
      "Material resistente",
      "Incluye pista de carreras",
    ],
    Especificaciones: [
      { label: "Edad recomendada", value: "3 años en adelante" },
      { label: "Material", value: "Plástico" },
    ],
    Imagen: [JugueteProd, JugueteProd, JugueteProd, JugueteProd, JugueteProd],
    Colores: ["#FF0000", "#00FF00", "#0000FF"],
    Tamaños: ["Pequeño", "Mediano", "Grande"],
    Puntuacion: 5.0,
    Reseñas: 250,
    //CategoriaProducto: "Juguetes",
    //SubCategoriaProducto: "Carros",
  },
];

export const productoDecoracion = [
  {
    NombreProducto: "Cuadro Decorativo",
    Marca: "DecoArt",
    PrecioActual: 69,
    PrecioOriginal: 124,
    DescripcionCorta: "Cuadro decorativo moderno para sala de estar.",
    DescripcionProducto: [
      "Cuadro decorativo moderno para sala de estar.",
      "Fino y refinado con un hermoso paisaje.",
      "Ideal para cualquier ambiente.",
    ],
    Especificaciones: [
      { label: "Material", value: "Lienzo" },
      { label: "Dimensiones", value: "20cm x 10cm x 2cm" },
      { label: "Origen", value: "Italia" },
      { label: "Tamaño", value: "50x70 cm" },
    ],
    Imagen: [
      DecoracionProd,
      DecoracionProd,
      DecoracionProd,
      DecoracionProd,
      DecoracionProd,
    ],
    Colores: ["#FFFFFF"],
    Tamaños: ["Único"],
    Puntuacion: 5.0,
    Reseñas: 780,
    //CategoriaProducto: "Decoración",
    //SubCategoriaProducto: "Cuadros",
  },
];

export const productoMascotas = [
  {
    NombreProducto: "Comida para Perro",
    Marca: "Ricocan",
    PrecioActual: 69,
    PrecioOriginal: 124,
    DescripcionCorta: "Comida para perro premium",
    DescripcionProducto: [
      "Comida para perro premium",
      "Alimento balanceado para perros de todas las razas",
      "Contiene vitaminas y minerales esenciales",
    ],
    Especificaciones: [
      { label: "Tipo", value: "Croquetas" },
      { label: "Sabor", value: "Pollo" },
      { label: "Tamaño", value: "25kg, 50kg, 80kg" },
    ],
    Imagen: [
      MascotasProd,
      MascotasProd,
      MascotasProd,
      MascotasProd,
      MascotasProd,
    ],
    Colores: ["#FFFFFF"],
    Tamaños: ["25kg", "50kg", "80kg"],
    Puntuacion: 5.0,
    Reseñas: 780,
    //CategoriaProducto: "Mascotas",
    //SubCategoriaProducto: "Comida para Perro",
  },
];

export const productoSupermercado = [
  {
    NombreProducto: "Granola",
    Marca: "Tottus",
    PrecioActual: 18,
    PrecioOriginal: 24,
    DescripcionCorta: "Granola saludable y deliciosa",
    DescripcionProducto: [
      "Granola hecha con avena integral y miel",
      "Crujiente y deliciosa",
      "Ideal para el desayuno o como snack",
    ],
    Especificaciones: [
      { label: "Tipo", value: "Granola" },
      { label: "Marca", value: "Tottus" },
      { label: "Contenido", value: "500gr, 1kg, 2kg" },
    ],
    Imagen: [
      SupermercadoProd,
      SupermercadoProd,
      SupermercadoProd,
      SupermercadoProd,
      SupermercadoProd,
    ],
    Colores: ["#FFFFFF"],
    Tamaños: ["500gr", "1kg", "2kg"],
    Puntuacion: 5.0,
    Reseñas: 120,
    //CategoriaProducto: "Supermercado",
    //SubCategoriaProducto: "Alimentos",
  },
];

export const productoAutomotriz = [
  {
    NombreProducto: "Aceite de Motor",
    Marca: "Mobil 1",
    PrecioActual: 45,
    PrecioOriginal: 60,
    DescripcionCorta: "Aceite sintético para motores de alto rendimiento.",
    DescripcionProducto: [
      "Aceite sintético para motores de alto rendimiento.",
      "Proporciona una excelente protección contra el desgaste.",
      "Mejora la eficiencia del combustible.",
    ],
    Especificaciones: [
      { label: "Tipo", value: "Sintético" },
      { label: "Marca", value: "Mobil 1" },
      { label: "Contenido", value: "1L, 5L" },
    ],
    Imagen: [AutomotrizProd, AutomotrizProd, AutomotrizProd, AutomotrizProd, AutomotrizProd],
    Colores: ["#FFFFFF"],
    Tamaños: ["1L", "5L"],
    Puntuacion: 5.0,
    Reseñas: 150,
    CategoriaProducto: "Automotriz",
    SubCategoriaProducto: "Aceites",
  },
];


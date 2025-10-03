import { MarcaIcon,
  PrecioIcon, ColorIcon, GeneracionIcon, TamanoIcon, PesoIcon, CalificacionIcon, RAguaIcon, SOIcon
} from "../assets/iconos/Icons";
import { CalificacionOptions } from "../components/ecomerce/Filtro";

export const filtrosTec = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    sistemaOperativo: {
      icon: SOIcon,
      nombre: "Sistema Operativo",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    generacion: {
      icon: GeneracionIcon,
      nombre: "Generación",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    rAgua: {
      icon: RAguaIcon,
      nombre: "Resistente al agua",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(20)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(35)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(16)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(7)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosMuebles = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    tipoSofa: {
      icon: SOIcon,
      nombre: "Tipo de Sofa",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    anchura: {
      icon: GeneracionIcon,
      nombre: "Anchura",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    limpiaFacil: {
      icon: RAguaIcon,
      nombre: "Limpia Fácil",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(15)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(25)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(12)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(5)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosCalzado = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    materialForro: {
      icon: SOIcon,
      nombre: "Material del Forro",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    genero: {
      icon: GeneracionIcon,
      nombre: "Género",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    materialSuela: {
      icon: RAguaIcon,
      nombre: "Material de la Suela",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(18)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(22)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(3)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosDormitorio = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    formato: {
      icon: SOIcon,
      nombre: "Formato",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    material: {
      icon: GeneracionIcon,
      nombre: "Material",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    relleno: {
      icon: RAguaIcon,
      nombre: "Relleno de Acolchado",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(12)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(19)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(9)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(2)" /> },
      ],
    },
  };

export const filtrosAccesorios = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    formato: {
      icon: SOIcon,
      nombre: "Formato",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    tipoCierre: {
      icon: GeneracionIcon,
      nombre: "Tipo de Cierre",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    disenio: {
      icon: RAguaIcon,
      nombre: "Diseño",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(14)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(21)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(7)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(3)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosSalud = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    formato: {
      icon: SOIcon,
      nombre: "Formato",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    tipoCrema: {
      icon: GeneracionIcon,
      nombre: "Tipo de Crema",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    tipoPiel: {
      icon: RAguaIcon,
      nombre: "Tipo de Piel",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(16)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(23)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(11)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(6)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(2)" /> },
      ],
    },
  };

export const filtrosJuguetes = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    material: {
      icon: SOIcon,
      nombre: "Material",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    grupoEdad: {
      icon: GeneracionIcon,
      nombre: "Grupo de Edad",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    tipoVehiculo: {
      icon: RAguaIcon,
      nombre: "Tipo de Vehículo",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosDecoracion = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    disenioCuadro: {
      icon: SOIcon,
      nombre: "Diseño de Cuadro",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    estampado: {
      icon: GeneracionIcon,
      nombre: "Tipo de Estampado",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    rAgua: {
      icon: RAguaIcon,
      nombre: "Resistente al Agua",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosMascotas = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    balanceo: {
      icon: SOIcon,
      nombre: "Balanceo",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    nutrientes: {
      icon: GeneracionIcon,
      nombre: "Tipo de Nutrientes",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    contieneAgua: {
      icon: RAguaIcon,
      nombre: "Contiene Agua",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosSupermercado = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    cantidad: {
      icon: SOIcon,
      nombre: "Cantidad",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    tipoCereal: {
      icon: GeneracionIcon,
      nombre: "Tipo de Cereal",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    nutrientes: {
      icon: RAguaIcon,
      nombre: "Nutrientes",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosElectrohogar = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    potencia: {
      icon: SOIcon,
      nombre: "Potencia",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    incluyeIA: {
      icon: GeneracionIcon,
      nombre: "Incluye IA",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    modelo: {
      icon: RAguaIcon,
      nombre: "Modelo",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosModaHombre = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    anio: {
      icon: SOIcon,
      nombre: "Año",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    tela: {
      icon: GeneracionIcon,
      nombre: "Tela",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    lavadoRapido: {
      icon: RAguaIcon,
      nombre: "Lavado Rápido",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };

export const filtrosModaMujer = {
    marca: {
      icon: MarcaIcon,
      nombre: "Marca",
      opciones: [
        { valor: "apple", etiqueta: "Apple (8)" },
        { valor: "samsung", etiqueta: "Samsung (5)" },
        { valor: "xiaomi", etiqueta: "Xiaomi (3)" },
      ],
    },
    precio: {
      icon: PrecioIcon,
      nombre: "Precio",
      opciones: [
        { valor: "500", etiqueta: "Menos de S/ 500" },
        { valor: "500-1000", etiqueta: "S/ 500 - S/ 1000" },
        { valor: "1000-2000", etiqueta: "S/ 1000 - S/ 2000" },
        { valor: "2000", etiqueta: "Más de S/ 2000" },
      ],
    },
    color: {
      icon: ColorIcon,
      nombre: "Color",
      opciones: [
        { valor: "negro", etiqueta: "Negro" },
        { valor: "blanco", etiqueta: "Blanco" },
        { valor: "azul", etiqueta: "Azul" },
        { valor: "verde", etiqueta: "Verde" },
      ],
    },
    anio: {
      icon: SOIcon,
      nombre: "Año",
      opciones: [
        { valor: "ios", etiqueta: "IOS" },
        { valor: "android", etiqueta: "Android" },
        { valor: "harmonyos", etiqueta: "HarmonyOS" },
        { valor: "kaios", etiqueta: "KaiOS" },
      ],
    },
    tela: {
      icon: GeneracionIcon,
      nombre: "Tela",
      opciones: [
        { valor: "1", etiqueta: "1era generación" },
        { valor: "2", etiqueta: "2da generación" },
        { valor: "3", etiqueta: "3era generación" },
        { valor: "4", etiqueta: "Última generación" },
      ],
    },
    tamanio: {
      icon: TamanoIcon,
      nombre: "Tamaño",
      opciones: [
        { valor: "5.5", etiqueta: "Menos de 5.5\" " },
        { valor: "5.5-6.1", etiqueta: "5.5\" - 6.1\"" },
        { valor: "6.1-6.7", etiqueta: "6.1\" - 6.7\"" },
        { valor: "6.7", etiqueta: "Más de 6.7\"" },
      ],
    },
    peso: {
      icon: PesoIcon,
      nombre: "Peso",
      opciones: [
        { valor: "150", etiqueta: "Menos de 150g" },
        { valor: "150-180", etiqueta: "150g - 180g" },
        { valor: "181-200", etiqueta: "181g - 200g" },
        { valor: "200", etiqueta: "Más de 200g" },
      ],
    },
    lavadoRapido: {
      icon: RAguaIcon,
      nombre: "Lavado Rápido",
      opciones: [
        { valor: "ip67", etiqueta: "IP67" },
        { valor: "ip68", etiqueta: "IP68" },
        { valor: "no_resistente", etiqueta: "No resistente" },
        { valor: "salpicaduras", etiqueta: "Salpicaduras solamente" },
      ],
    },
    calificacion: {
      icon: CalificacionIcon,
      nombre: "Calificación",
      opciones: [
        { valor: "5", etiqueta: <CalificacionOptions calificacion={5} cantidad="(10)" /> },
        { valor: "4", etiqueta: <CalificacionOptions calificacion={4} cantidad="(17)" /> },
        { valor: "3", etiqueta: <CalificacionOptions calificacion={3} cantidad="(8)" /> },
        { valor: "2", etiqueta: <CalificacionOptions calificacion={2} cantidad="(4)" /> },
        { valor: "1", etiqueta: <CalificacionOptions calificacion={1} cantidad="(1)" /> },
      ],
    },
  };
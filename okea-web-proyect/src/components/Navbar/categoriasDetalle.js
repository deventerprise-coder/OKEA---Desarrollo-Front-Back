// Ejemplo de estructura de datos para los dropdowns de categorías
import { TechnologyIcon, LavadoIcon, MuebleIcon, ToallaIcon, HombreIcon, MujerIcon, CalzadoIcon, AnilloIcon, SaludIcon, JugueteIcon, DecoracionIcon, MascotaIcon, SupermercadoIcon, LlantaIcon } from '../../assets/iconos/Icons';

export const categoriasDetalle = {
  "Tecnología": {
    icon: TechnologyIcon,
    color: '#D6D6A7',
    columnas: [
      { titulo: 'Celulares', items: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro'] },
      { titulo: 'Tv', items: ['Samsung QLED 4K', 'LG OLED evo', 'Sony Bravia XR', 'TCL QLED 4K', 'Hisense ULED 4K', 'Panasonic OLED', 'Sharp Aquos', 'Vizio Quantum'] },
      { titulo: 'Laptops', items: ['MacBook Air M2', 'MacBook Pro 14"', 'MacBook Pro 16"', 'Dell XPS 13', 'HP Spectre x360', 'Lenovo ThinkPad X1 Carbon'] },
      { titulo: 'Impresoras', items: ['HP LaserJet Pro M404dn', 'Canon PIXMA TS6420', 'Epson EcoTank ET-2850', 'Brother HL-L2350DW', 'Samsung Xpress M2020W'] },
      { titulo: 'Audífonos', items: ['Sony WH-1000XM5', 'Bose QuietComfort 45', 'Apple AirPods Pro', 'Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'] },
      { titulo: 'Cámaras', items: ['Canon EOS R5', 'Canon EOS R50', 'Nikon Z6 II', 'Nikon D850', 'Sony Alpha 7 IV', 'Sony ZV-E10', 'Fujifilm X-T5', 'Panasonic Lumix GH6', 'Olympus OM-D E-M10 Mark IV'] }
    ]
  },
  "Electrohogar": {
    icon: LavadoIcon,
    color: '#E0E0E0',
    columnas: [
      { titulo: 'Lavadoras', items: ['LG TurboWash', 'Samsung EcoBubble', 'Bosch Serie 6'] },
      { titulo: 'Refrigeradoras', items: ['Whirlpool X', 'Samsung Family Hub', 'LG InstaView'] },
      { titulo: 'Cocinas', items: ['Bosch Serie 6', 'Mabe Master', 'Indurama Chef'] },
      { titulo: 'Microondas', items: ['Panasonic NN', 'LG NeoChef', 'Samsung Smart'] },
      { titulo: 'Aspiradoras', items: ['Dyson V11', 'Philips PowerPro', 'Electrolux Pure'] },
      { titulo: 'Otros', items: ['Plancha Philips', 'Licuadora Oster', 'Tostadora Black+Decker'] }
    ]
  },
  "Muebles y Organización": {
    icon: MuebleIcon,
    color: '#E6D6A7',
    columnas: [
      { titulo: 'Sofás', items: ['Sofá Esquinero', 'Sofá Cama', 'Sofá 3 cuerpos'] },
      { titulo: 'Roperos', items: ['Ropero 2 puertas', 'Ropero 3 puertas'] },
      { titulo: 'Estantes', items: ['Estante de madera', 'Estante metálico'] },
      { titulo: 'Camas', items: ['Cama Queen', 'Cama King', 'Cama individual'] },
      { titulo: 'Escritorios', items: ['Escritorio gamer', 'Escritorio oficina'] },
      { titulo: 'Sillas', items: ['Silla ergonómica', 'Silla comedor', 'Silla gamer'] }
    ]
  },
  "Dormitorio y Baños": {
    icon: ToallaIcon,
    color: '#A7D6E6',
    columnas: [
      { titulo: 'Colchones', items: ['Colchón ortopédico', 'Colchón memory foam'] },
      { titulo: 'Almohadas', items: ['Almohada viscoelástica', 'Almohada plumas'] },
      { titulo: 'Toallas', items: ['Toalla baño', 'Toalla facial', 'Toalla manos'] },
      { titulo: 'Sábanas', items: ['Sábanas algodón', 'Sábanas microfibra'] },
      { titulo: 'Cortinas', items: ['Cortina baño', 'Cortina blackout'] },
      { titulo: 'Accesorios', items: ['Portacepillos', 'Jabonera', 'Alfombra baño'] }
    ]
  },
  "Moda Hombre": {
    icon: HombreIcon,
    color: '#A7E6B8',
    columnas: [
      { titulo: 'Polos', items: ['Polo manga corta', 'Polo manga larga'] },
      { titulo: 'Camisas', items: ['Camisa casual', 'Camisa formal'] },
      { titulo: 'Pantalones', items: ['Jeans', 'Pantalón de vestir'] },
      { titulo: 'Casacas', items: ['Casaca jean', 'Casaca cuero'] },
      { titulo: 'Shorts', items: ['Short deportivo', 'Short casual'] },
      { titulo: 'Ropa interior', items: ['Boxer', 'Slip'] }
    ]
  },
  "Moda Mujer": {
    icon: MujerIcon,
    color: '#E6A7D6',
    columnas: [
      { titulo: 'Blusas', items: ['Blusa manga larga', 'Blusa sin mangas'] },
      { titulo: 'Vestidos', items: ['Vestido casual', 'Vestido de noche'] },
      { titulo: 'Faldas', items: ['Falda corta', 'Falda larga'] },
      { titulo: 'Pantalones', items: ['Jean skinny', 'Pantalón palazzo'] },
      { titulo: 'Casacas', items: ['Casaca denim', 'Casaca cuero'] },
      { titulo: 'Ropa interior', items: ['Bralette', 'Panty'] }
    ]
  },
  "Calzado": {
    icon: CalzadoIcon,
    color: '#D6A7E6',
    columnas: [
      { titulo: 'Zapatillas', items: ['Nike Air', 'Adidas Superstar'] },
      { titulo: 'Botines', items: ['Botín cuero', 'Botín gamuza'] },
      { titulo: 'Sandalias', items: ['Sandalia plana', 'Sandalia taco'] },
      { titulo: 'Zapatos', items: ['Zapato vestir', 'Zapato casual'] },
      { titulo: 'Pantuflas', items: ['Pantufla peluche', 'Pantufla algodón'] },
      { titulo: 'Deportivos', items: ['Zapatilla running', 'Zapatilla training'] }
    ]
  },
  "Accesorios de moda": {
    icon: AnilloIcon,
    color: '#A7A7E6',
    columnas: [
      { titulo: 'Relojes', items: ['Reloj digital', 'Reloj análogo'] },
      { titulo: 'Gorras', items: ['Gorra plana', 'Gorra trucker'] },
      { titulo: 'Lentes', items: ['Lente sol', 'Lente óptico'] },
      { titulo: 'Carteras', items: ['Cartera cuero', 'Cartera sintética'] },
      { titulo: 'Pulseras', items: ['Pulsera plata', 'Pulsera cuero'] },
      { titulo: 'Collares', items: ['Collar oro', 'Collar acero'] }
    ]
  },
  "Salud y Bienestar": {
    icon: SaludIcon,
    color: '#E6E6A7',
    columnas: [
      { titulo: 'Vitaminas', items: ['Vitamina C', 'Vitamina D'] },
      { titulo: 'Proteínas', items: ['Proteína whey', 'Proteína vegetal'] },
      { titulo: 'Suplementos', items: ['Omega 3', 'Colágeno'] },
      { titulo: 'Cuidado personal', items: ['Shampoo', 'Jabón'] },
      { titulo: 'Fitness', items: ['Mancuernas', 'Banda elástica'] },
      { titulo: 'Salud sexual', items: ['Preservativos', 'Lubricante'] }
    ]
  },
  "Juguetes, Autos y Vehículos": {
    icon: JugueteIcon,
    color: '#D6E6A7',
    columnas: [
      { titulo: 'Juguetes', items: ['Lego', 'Hot Wheels'] },
      { titulo: 'Autos eléctricos', items: ['Auto Tesla', 'Auto BMW'] },
      { titulo: 'Bicicletas', items: ['Bicicleta montaña', 'Bicicleta ruta'] },
      { titulo: 'Scooters', items: ['Scooter eléctrico', 'Scooter clásico'] },
      { titulo: 'Drones', items: ['Drone DJI', 'Drone Parrot'] },
      { titulo: 'Patines', items: ['Patín línea', 'Patín quad'] }
    ]
  },
  "Decoración e Iluminación": {
    icon: DecoracionIcon,
    color: '#A7E6E6',
    columnas: [
      { titulo: 'Lámparas', items: ['Lámpara techo', 'Lámpara mesa'] },
      { titulo: 'Cuadros', items: ['Cuadro abstracto', 'Cuadro paisaje'] },
      { titulo: 'Alfombras', items: ['Alfombra persa', 'Alfombra moderna'] },
      { titulo: 'Cortinas', items: ['Cortina decorativa', 'Cortina blackout'] },
      { titulo: 'Espejos', items: ['Espejo pared', 'Espejo baño'] },
      { titulo: 'Velas', items: ['Vela aromática', 'Vela decorativa'] }
    ]
  },
  "Mascotas": {
    icon: MascotaIcon,
    color: '#E6A7A7',
    columnas: [
      { titulo: 'Alimento', items: ['Alimento perro', 'Alimento gato'] },
      { titulo: 'Juguetes', items: ['Juguete mordedor', 'Juguete pelota'] },
      { titulo: 'Camas', items: ['Cama perro', 'Cama gato'] },
      { titulo: 'Ropa', items: ['Chaleco', 'Capa'] },
      { titulo: 'Higiene', items: ['Shampoo', 'Cepillo'] },
      { titulo: 'Accesorios', items: ['Plato', 'Bebedero'] }
    ]
  },
  "Supermercado": {
    icon: SupermercadoIcon,
    color: '#A7E6A7',
    columnas: [
      { titulo: 'Frutas', items: ['Manzana', 'Plátano'] },
      { titulo: 'Verduras', items: ['Zanahoria', 'Lechuga'] },
      { titulo: 'Carnes', items: ['Pollo', 'Res'] },
      { titulo: 'Lácteos', items: ['Leche', 'Queso'] },
      { titulo: 'Bebidas', items: ['Agua', 'Jugo'] },
      { titulo: 'Snacks', items: ['Papas', 'Galletas'] }
    ]
  },
  "Automotriz": {
    icon: LlantaIcon,
    color: '#E6A7A7',
    columnas: [
      { titulo: 'Llantas', items: ['Llanta Michelin', 'Llanta Pirelli'] },
      { titulo: 'Aceites', items: ['Aceite sintético', 'Aceite mineral'] },
      { titulo: 'Baterías', items: ['Batería Bosch', 'Batería Yuasa'] },
      { titulo: 'Accesorios', items: ['Cubre asientos', 'Tapetes'] },
      { titulo: 'Herramientas', items: ['Gato hidráulico', 'Llave cruz'] },
      { titulo: 'Luces', items: ['Luz LED', 'Luz halógena'] }
    ]
  },
};

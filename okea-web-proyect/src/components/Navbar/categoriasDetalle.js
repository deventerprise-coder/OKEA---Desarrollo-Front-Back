
import { TechnologyIcon, LavadoIcon, MuebleIcon, ToallaIcon, HombreIcon, MujerIcon, CalzadoIcon, AnilloIcon, SaludIcon, JugueteIcon, DecoracionIcon, MascotaIcon, SupermercadoIcon, LlantaIcon, CategoriaPhone, CategoriaTV, CategoriaLaptop, CategoriaImpresora, CategoriaAudifonos, CategoriaCamara, CategoriaRefrigeracion, CategoriaCocina, CategoriaLavado, CategoriaLimpieza, CategoriaBelleza, Categoriasofa, CategoriaEstanteria, CategoriaClosets, CategoriaEscritorio, CategoriaOrganizadores, CategoriaBancas, CategoriaCama, CategoriaVelador, CategoriaBanio, CategoriaToallas, CategoriaTendencia, CategoriaRopa, CategoriaArticulos, CategoriaZapato, CategoriaConsumible, CategoriaMochila, CategoriaReloj, CategoriaLentes, CategoriaGorras, CategoriaCinturon, CategoriaCreatina, Categoriasuplementos, CategoriaCorazon, CategoriaAutos, CategoriaVehiculos, CategoriasSaltarinas, CategoriaRiel, CategoriaFigura, CategoriaAdornos, CategoriaFaroles, CategoriaFloreros, CategoriaEspejos, CategoriaHueso, CategoriaPerro, CategoriaGato, CategoriaHigiene, CategoriaDona, CategoriaWhisky, CategoriaEscoba, CategoriaRon, CategoriaLacteos, CategoriaMartillo, CategoriaLlanta} from '../../assets/iconos/Icons';

export const CategoriasDetalle = {
  "Tecnología": {
    icon: TechnologyIcon,
    color: '#D6D6A7',
    columnas: [
      // Para colocar los iconos de las demas Categorias, solo copiar la logia de esta categoria, e importar los iconos desde icons.jsx
      { titulo: 'Celulares', items: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro'], iconRight: CategoriaPhone},
      { titulo: 'Accesorios', items: ['Samsung QLED 4K', 'LG OLED evo', 'Sony Bravia XR', 'TCL QLED 4K', 'Hisense ULED 4K', 'Panasonic OLED', 'Sharp Aquos', 'Vizio Quantum'], iconRight: CategoriaTV },
      { titulo: 'Parlantes', items: ['MacBook Air M2', 'MacBook Pro 14"', 'MacBook Pro 16"', 'Dell XPS 13', 'HP Spectre x360', 'Lenovo ThinkPad X1 Carbon'], iconRight: CategoriaLaptop },
      { titulo: 'Impresoras', items: ['HP LaserJet Pro M404dn', 'Canon PIXMA TS6420', 'Epson EcoTank ET-2850', 'Brother HL-L2350DW', 'Samsung Xpress M2020W'], iconRight: CategoriaImpresora },
      { titulo: 'Audífonos', items: ['Sony WH-1000XM5', 'Bose QuietComfort 45', 'Apple AirPods Pro', 'Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'], iconRight: CategoriaAudifonos },
      { titulo: 'Cases', items: ['Canon EOS R5', 'Canon EOS R50', 'Nikon Z6 II', 'Nikon D850', 'Sony Alpha 7 IV', 'Sony ZV-E10', 'Fujifilm X-T5', 'Panasonic Lumix GH6', 'Olympus OM-D E-M10 Mark IV'], iconRight: CategoriaCamara }
      
    ]
  },
  "Electrohogar": {
    icon: LavadoIcon,
    color: '#E0E0E0',
    columnas: [
      { titulo: 'Refrigeración', items: ['Kit Antipinchazo', 'Inflador Portátil', 'Rines de Aleación', 'Tapas de Válvula LED'], iconRight: CategoriaRefrigeracion },
      { titulo: 'Cocina', items: ['Aceite 10W40 Shell', 'Llave Cruz', 'Grasa Multiusos', 'Aceite Sintético Mobil', 'Hisense ULED 4K', 'Panasonic OLED','Sharp Aquos','Vizio Quantum'], iconRight: CategoriaCocina },
      { titulo: 'Lavado y Planchado', items: ['Fundas para Asientos', 'Alfombra Antideslizante', 'Organizador de Asiento', 'Soporte', 'Dell XPS 15', 'HP Spectre x360', 'Lenovo ThinkPad X1 Carbon'], iconRight: CategoriaLavado },
      { titulo: 'Equipos de limpieza', items: ['Aditivo para Gasolina', 'Canon PIXMA TS6420', 'Epson EcoTank ET-2850', 'Brother HL-L2350DW', 'Samsung Xpress M2020W'], iconRight: CategoriaLimpieza },
      { titulo: 'Electro Belleza', items: ['Fundas para Asientos', 'Alfombra Antideslizante', 'Organizador de Asiento', 'Apple AirPods Pro (2da generación)', 'Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'], iconRight: CategoriaBelleza },
      { titulo: 'Climatización', items: ['Fundas para Asientos', 'Alfombra Antideslizante', 'Organizador de Asiento', 'Soporte', 'Dell XPS 15', 'HP Spectre x360', 'Lenovo ThinkPad X1 Carbon'], iconRight: CategoriaLavado }
    ]
  },
  "Muebles y Organización": {
    icon: MuebleIcon,
    color: '#E6D6A7',
    columnas: [
      { titulo: 'Sofás', items: ['Sofá Modular 5 Plazas', 'Sofá Cama Reclinable', 'Sofá Seccional Gris 3C', 'Sillón Relax Eléctrico'], iconRight: Categoriasofa },
      { titulo: 'Estanterías', items: ['Estante Flotante Blanco', 'Estantería Tipo Escalera', 'Estantería de Esquina', 'Estante Cubos Modulares', 'Estantería Industrial con Rejas', 'Librero Bajo con Puertas'], iconRight: CategoriaEstanteria },
      { titulo: 'Roperos y Closets', items: ['Ropero 3 Puertas con Espejo', 'Closet de Melamina Blanco', 'Closet Infantil con Cajones', 'Armario Telescópico Plegable', 'Ropero con Puertas Correderas', 'Closet con Espejo Corredizo', 'Closet Modular de Plástico'], iconRight: CategoriaClosets },
      { titulo: 'Escritorios y Mesas', items: ['Escritorio Gamer con LED', 'Mesa de Centro Rústica', 'Escritorio Plegable Blanco', 'Mesa Auxiliar Redonda'], iconRight: CategoriaEscritorio },
      { titulo: 'Organizadores', items: ['Caja Organizadora con Tapa', 'Set de Organizadores de Cajón', 'Organizador Colgante Multiuso', 'Canasta con Ruedas', 'Zapatero Vertical', 'Caja Apilable Transparente', 'Organizador de Escritorio'], iconRight: CategoriaOrganizadores },
      { titulo: 'Bancas', items: ['Silla Ergonómica de Oficina', 'Banca Tapizada de Madera', 'Silla de Comedor Nórdica', 'Silla Plegable con Cojín', 'Silla Gamer con Reposapiés', 'Banca para Recibidor', 'Silla de Polipropileno Moderna', 'Sillón con Apoya Brazos'], iconRight: CategoriaBancas }
    ]
  },
  "Dormitorio y Baños": {
    icon: ToallaIcon,
    color: '#A7D6E6',
    columnas: [
      { titulo: 'Camas', items: ['Cama Queen con Cajones', 'Cama Doble con Cabecera', 'Cama King Espacio Extra', 'Cama Infantil con Baranda', 'Cama Rebatible Plegable', 'Cama Tipo Tatami', 'Cama con Cajones Laterales', 'Cama con Cajones Laterales'], iconRight: CategoriaCama },
      { titulo: 'Colchones', items: ['Cama con Cajones Laterales', 'Colchón de Espuma Alta Densidad', 'Colchón 2 Plazas', 'Colchón Memory Foam', 'Colchón con Gel Frío', 'Colchón Reversible Firme', 'Colchón Inflable'], iconRight: CategoriaClosets },
      { titulo: 'Veladores', items: ['Velador con Luz LED', 'Mesa de Noche con 2 Cajones', 'Velador Flotante Blanco', 'Velador con USB', 'Velador Estilo Vintage', 'Mesa Lateral con Puerta', 'Velador de Madera Oscura'], iconRight: CategoriaVelador },
      { titulo: 'Ropa de Cama', items: ['Juego de Sábanas 300 hilos', 'Edredón Reversible', 'Colcha Acolchada', 'Set de Almohadas', 'Protector de Colchón'], iconRight: CategoriaBancas },
      { titulo: 'Accesorios de baño', items: ['Estante de Ducha Acero', 'Dispensador de Jabón Automático', 'Cortina de Baño con Ganchos', 'Espejo LED Antiempañante', 'Alfombra Antideslizante', 'Perchero de Pared', 'Set de Baño 4 Piezas'], iconRight: CategoriaBanio },
      { titulo: 'Toallas y Alfombras', items: ['Set de Toallas 6 piezas', 'Alfombra Antideslizante', 'Toalla de Secado Rápido', 'Tapete de Microfibra', 'Toalla Playera XL', 'Alfombra Memory Foam', 'Toalla Infantil con Capucha', 'Juego de Toallas Premium'], iconRight: CategoriaToallas }
    ]
  },
  "Moda Hombre": {
    icon: HombreIcon,
    color: '#A7E6B8',
    columnas: [
      { titulo: 'Tendencia', items: ['Sobrecamisas', 'Polos de punto', 'Pantalones de lino o cortes anchos', 'Blazers casuales', 'Zapatillas blancas minimalistas', 'Chalecos utilitarios'], iconRight: CategoriaTendencia },
      { titulo: 'Ropa', items: ['Camisa casual', 'Camisa formal', 'Polos', 'Pantalón de vestir', 'Jeans', 'Abrigos y Chaquetas', 'Sudaderas', 'Ropa de Baño', 'Ropa Deportiva'], iconRight: CategoriaRopa },
      { titulo: 'Ropa Interior y Pijamas', items: ['Bóxers', 'Briefs', 'Calcetines', 'Camisetas interiores', 'Pijamas', 'Batas de Casa'], iconRight: CategoriaLavado },
      { titulo: 'Accesorios', items: ['Relojes', 'Cinturones', 'Gafas de sol', 'Gorras y Boinas', 'Mochilas', 'Bufandas y Pañuelos', 'Corbatas y Corbatines', 'Guantes'], iconRight: CategoriaArticulos},
    ]
  },
  "Moda Mujer": {
    icon: MujerIcon,
    color: '#E6A7D6',
    columnas: [
      { titulo: 'Tendencia', items: ['Blazers Oversize', 'Pantalones Wide Leg', 'Conjuntos de dos piezas', 'Chalecos de vestir', 'Vestidos lenceros', 'Faldas Midi', 'Zapatos tipo Mary Janes'], iconRight: CategoriaTendencia },
      { titulo: 'Ropa', items: ['Vestidos', 'Blusas y Camisas', 'Tops y Bodys', 'Camisetas', 'Pantalones', 'Jeans', 'Faldas', 'Abrigos y Chaquetas', 'Sudaderas'], iconRight: CategoriaRopa },
      { titulo: 'Ropa Interior y Pijamas', items: ['Sujetadores', 'Panties', 'Medias y Pantimedias', 'Bodys', 'Pijamas', 'Batas de Casa'], iconRight: CategoriaLavado },
      { titulo: 'Accesorios', items: ['Bolsos y Carteras', 'Zapatos', 'Joyería', 'Relojes', 'Gafas de sol', 'Pañuelos y Bufandas', 'Sombreros y Gorros', 'Accesorios para el cabello'], iconRight: CategoriaArticulos},
    ]
  },
  "Calzado": {
    icon: CalzadoIcon,
    color: '#D6A7E6',
    columnas: [
      { titulo: 'Tendencia', items: ['Adidas Forum', 'Vans Old Skool', 'Nike Blazer Mid', 'Puma RS-X', 'Fila Disruptor', 'New Balance 574', 'Reebok Classic Leather'],  iconRight: CategoriaZapato},
      { titulo: 'Hombre', items: ['Reebok Runner', 'Nike Revolution 6', 'Under Armour Charged', 'New Balance 410', 'Adidas Duramo', 'Puma Ignite', 'Skechers Go Run', 'Asics Gel-Pulse'],  iconRight: CategoriaZapato },
      { titulo: 'Mujer', items: ['Oxford Clásico', 'Zapato de Cuero Negro', 'Mocasines Casual', 'Zapato Derby', 'Zapatos Monkstrap', 'Zapatos Brogue', 'Zapatos de Charol'],  iconRight: CategoriaZapato },
      { titulo: 'Calzado Niñas', items: ['Botines Chelsea', 'Botas Trekking Impermeables', 'Botines Chelsea', 'Botas de Lluvia', 'Botas Altas de Gamuza'],  iconRight: CategoriaZapato },
      { titulo: 'Botines', items: ['Sony WH-1000XM5', 'Bose QuietComfort 45', 'Apple AirPods Pro', 'Apple AirPods Pro (2da generación)', 'Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'],  iconRight: CategoriaZapato },
      { titulo: 'Botas', items: ['Zapatillas con Luces', 'Crocs Mini', 'Sandalias para Niña', 'Calzado Escolar Negro', 'Zapatos de Princesa Frozen', 'Sony ZV-E10'],  iconRight: CategoriaZapato }
    ]
  },
  "Accesorios de moda": {
    icon: AnilloIcon,
    color: '#A7A7E6',
    columnas: [
      { titulo: 'Mochilas y bolsos', items: ['Mochila Urbana Antirrobo', 'Bolso Tote Cuero', 'Mochila Casual Juvenil', 'Bandolera con Cierre', 'Mochila Casual Juvenil', 'Cartera Casual de Hombro', 'Bandolera con Cierre'], iconRight: CategoriaMochila},
      { titulo: 'Relojes', items: ['Casio Vintage', 'Apple Watch SE', 'Sony Bravia XR', 'TCL QLED 4K', 'Hisense ULED 4K', 'Panasonic OLED', 'Sharp Aquos', 'Vizio Quantum'], iconRight: CategoriaReloj},
      { titulo: 'Lentes de sol', items: ['Lentes Retro Redondos', 'Lentes Aviador', 'Lentes Fotocromáticos', 'Gafas Espejadas', 'Lentes Aviador', 'Lentes Estilo Oversize'], iconRight: CategoriaLentes},
      { titulo: 'Gorras y sombreros', items: ['HP LaserJet Pro M404dn', 'Canon PIXMA TS6420', 'Epson EcoTank ET-2850', 'Brother HL-L2350DW', 'Samsung Xpress M2020W'], iconRight: CategoriaGorras},
      { titulo: 'Joyas y bisutería', items: ['Sony WH-1000XM5', 'Bose QuietComfort 45', 'Apple AirPods Pro', 'Apple AirPods Pro (2da generación)', 'Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'], iconRight: CategoriaTendencia},
      { titulo: 'Cinturones', items: ['Cinturón de Cuero Negro', 'Cinturón Reversible Casual', 'Cinturón Trenzado', 'Cinturón Deportivo', 'Cinturón de Tela Ajustable', 'Cinturón con Hebilla Metálica', 'Fajín de Vestir Mujer'], iconRight: CategoriaCinturon}
    ]
  },
  "Salud y Bienestar": {
    icon: SaludIcon,
    color: '#E6E6A7',
    columnas: [
      { titulo: 'Vitaminas', items: ['Vitamina C', 'Vitamina D', 'Bicicleta Estática', 'Banda de Resistencia', 'Rueda Abdominal', 'Step Aeróbico', 'Rueda Abdominal', 'Step Aeróbico'], iconRight: CategoriaConsumible},
      { titulo: 'Proteínas', items: ['Proteína whey', 'Proteína vegetal','Pistola de Masaje', 'Masajeador de Pies', 'Cojín Vibrador', 'Masajeador de Pies', 'Silla Masajeadora', 'Pistola de Masaje', 'Panasonic OLED'], iconRight: CategoriaConsumible },
      { titulo: 'Sumplementos', items: ['HP LaserJet Pro M404dn', 'Canon PIXMA TS6420', 'Epson EcoTank ET-2850', 'Brother HL-L2350DW', 'Samsung Xpress M2020W'], iconRight: Categoriasuplementos},
      { titulo: 'Creatina', items: ['Omega 3', 'Colágeno', 'Proteína Whey', 'Creatina Monohidratada', 'Multivitamínicos', 'BCAA', 'Probióticos'],  iconRight: CategoriaCreatina },
      { titulo: 'Cuidado del cabello', items: ['Plancha Profesional', 'Cepillo Alisador', 'Tónico Capilar Anticaída', 'Shampoo sin Sulfato'],  iconRight: CategoriaCorazon  },
      { titulo: 'Cuidado Personal', items: ['Balanza Digital Corporal', 'Tensiómetro Automático', 'Báscula de Cocina', 'Monitor de Actividad', 'Tensiómetro Automático', 'Sony ZV-E10', 'Fujifilm X-T5', 'Panasonic Lumix GH6'], iconRight: CategoriaCreatina  }
    ]
  },
  "Juguetes, Autos y Vehículos": {
    icon: JugueteIcon,
    color: '#D6E6A7',
    tipo: 'subCategorias', 
    subCategorias: {
      "Niño": { 
        columnas: [
          { titulo: 'Autos', items: ['LEGO City', 'Muñeca Barbie', 'Peluche Gigante', 'Juego de Té', 'Carritos Hot Wheels', 'Cubo Rubik'], iconRight: CategoriaAutos },
          { titulo: 'Vehículos a Control', items: ['Montessori Pack', 'Puzzle Madera 3D', 'Tablero de Actividades', 'Juego de Matemáticas', 'Lupa con Microscopio', 'Hisense ULED 4K'], iconRight: CategoriaVehiculos  },
          { titulo: 'Camas Saltarinas', items: ['Auto Jeep 12V', 'Moto Recargable', 'Dell XPS 13', 'Dell XPS 15', 'HP Spectre x360', 'Lenovo ThinkPad X1 Carbon'] , iconRight: CategoriasSaltarinas },
          { titulo: 'Pistas y trenes', items: ['Hot Wheels Loop', 'Circuito Scalextric', 'Hot Wheels Loop', 'Tren de Madera', 'Samsung Xpress M2020W'] , iconRight: CategoriaRiel},
          { titulo: 'Figuras de Colección ', items: ['Figura Spiderman', 'Dinosaurio Articulado', 'Héroes de Marvel', 'Miniaturas Star Wars', 'Héroes de Marvel', 'Sennheiser Momentum 4', 'JBL Live Pro 2'], iconRight: CategoriaFigura  },
        ]
      },
      "Niña": {
        columnas: [
          { titulo: 'Muñecas', items: ['Barbie Dreamhouse', 'LOL Surprise', 'Bebés Llorones', 'Nancy', 'Set de Maquillaje'], iconRight: CategoriaFigura },
          { titulo: 'Juegos de Cocina', items: ['Cocina de Juguete', 'Set de Té', 'Mini Electrodomésticos', 'Frutas y Verduras'], iconRight: CategoriaCocina },
          { titulo: 'Manualidades', items: ['Set de Pulseras', 'Plastilina Play-Doh', 'Pintura y Acuarelas', 'Cuentas para Planchar'], iconRight: CategoriaAdornos },
          { titulo: 'Peluches', items: ['Oso de Peluche Gigante', 'Unicornio', 'Personajes Disney', 'Ty Beanie Boos'], iconRight: CategoriaPerro}, 
          { titulo: 'Disfraces', items: ['Princesas Disney', 'Super heroínas', 'Animales', 'Accesorios Mágicos'], iconRight: CategoriaRopa }, 
        ]
      }
    }
  },
  
  "Decoración e Iluminación": {
    icon: DecoracionIcon,
    color: '#A7E6E6',
    columnas: [
      { titulo: 'Adornos', items: ['Lámpara Araña Moderna', 'Colgante Estilo Industrial', 'Lámpara LED Panel', 'Lámpara Vintage Edison', 'Plafón LED Circular', 'Colgante de Bambú'], iconRight: CategoriaAdornos },
      { titulo: 'Faroles y Candelabros', items: ['Lámpara de Escritorio LED', 'Lámpara con Base de Madera', 'Lámpara con Reloj Digital', 'Lámpara con Cargador Inalámbrico', 'Sharp Aquos', 'Vizio Quantum'], iconRight: CategoriaFaroles },
      { titulo: 'Floreros y Jarrones', items: ['Lámpara Arco', 'Lámpara Tripié Nórdica', 'Lámpara LED Regulable', 'Lámpara con Estante Incorporado', 'Lámpara Vintage de Metal', 'Lenovo ThinkPad X1 Carbon'], iconRight: CategoriaFloreros },
      { titulo: 'Cuadros y lienzos', items: ['Tríptico Abstracto', 'Lienzo Floral Minimalista', 'Cuadro con Frases Inspiradoras', 'Lienzo Estilo Boho', 'Samsung Xpress M2020W'], iconRight: CategoriaVelador },
      { titulo: 'Lámparas', items: ['Jarrón de Cerámica', 'Reloj de Pared Minimalista', 'Figuras Decorativas', 'Apple AirPods Pro (2da generación)', 'Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'], iconRight: CategoriaCinturon  },
      { titulo: 'Espejos', items: ['Espejo Redondo con Marco de Ratán', 'Espejo de Pie Estilo Nórdico', 'Espejo con Luces LED', 'Espejo Sol Dorado', 'Sony Alpha 7 IV', 'Sony ZV-E10', 'Fujifilm X-T5'], iconRight: CategoriaEspejos }
    ]
  },
  "Mascotas": {
    icon: MascotaIcon,
    color: '#E6A7A7',
    columnas: [
      { titulo: 'Camas y accesorios', items: ['Cama Acolchada Perro', 'Cueva para Gato', 'Cojín Antiestrés', 'Cama Tipo Donut', 'Cojín Antiestrés', 'Cama Impermeable'], iconRight: CategoriaHueso},
      { titulo: 'Alimentos', items: ['Fuente Automática', 'Comedero Doble Acero', 'Comedero Elevado', 'Bebedero de Botella','Plato Antivoracidad'], iconRight: CategoriaPerro },
      { titulo: 'Juguetes', items: ['Pelota Mordedora', 'Caña con Pluma para Gato', 'Juguete Dispensador de Premios', 'Sonajero', 'Juguete con Catnip'], iconRight: CategoriaHueso },
      { titulo: 'Higiene y limpieza', items: ['Champú Hipoalergénico', 'Toallitas Húmedas', 'Bandeja Sanitaria', 'Arena Aglomerante', 'Removedor de Olores'], iconRight: CategoriaHigiene },
      { titulo: 'Articulos', items: ['Correa Retráctil', 'Arnés Acolchado', 'Apple AirPods Pro', 'Transportadora Plegable', 'Jaula de Transporte', 'Cinturón de Seguridad Canino'], iconRight: CategoriaVehiculos },
      { titulo: 'Ropa y Accesorios', items: ['Chompa de Lana', 'Disfraz de Dinosaurio', 'Polera con Estampado', 'Traje de Navidad', 'Bufanda para Mascotas'], iconRight: CategoriaGato }
    ]
  },
  "Supermercado": {
    icon: SupermercadoIcon,
    color: '#A7E6A7',
    columnas: [
      { titulo: 'Vinos', items: ['Doritos Picante', 'Galletas Oreo', 'Sublime Clásico', 'Skittles', 'Pringles Original', 'Chocolate Costa', 'Galletas Casino'], iconRight: CategoriaDona},
      { titulo: 'Whisky', items: ['Inka Kola', 'Agua Cielo', 'Red Bull', 'Coca-Cola Sin Azúcar', 'Té helado San Luis'], iconRight: CategoriaWhisky },
      { titulo: 'Pisco', items: ['Sal Dos Anclas', 'Arroz Costeño', 'Fideos Nicolini', 'Lentejas'], iconRight: CategoriaEscoba },
      { titulo: 'Ron', items: ['Yogurt Gloria', 'Queso Andino', 'Leche Laive', 'Mantequilla Bonlé', 'Queso Edam'], iconRight: CategoriaRon },
      { titulo: 'Lácteos', items: ['Sony WH-1000XM5', 'Bose QuietComfort 45', 'Apple AirPods Pro', 'Apple AirPods Pro (2da generación)','Samsung Galaxy Buds2 Pro', 'Sennheiser Momentum 4', 'JBL Live Pro 2'], iconRight: CategoriaLacteos },
      { titulo: 'Despensa Básica', items: ['Shampoo Sedal', 'Jabón Dove', 'Cepillo de Dientes Colgate'], iconRight: CategoriaCreatina }
    ]
  },
  "Automotriz": {
    icon: LlantaIcon,
    color: '#E6A7A7',
    columnas: [
      { titulo: 'Motos Eléctricas', items: ['Kit Antipinchazo', 'Inflador Portátil', 'Rines de Aleación', 'Tapas de Válvula LED'], iconRight: CategoriaLlanta},
      { titulo: 'Autopartes ', items: ['Aceite 10W40 Shell', 'Llave Cruz', 'Grasa Multiusos','Aceite Sintético Mobil', 'Hisense ULED 4K'], iconRight: CategoriaCocina},
      { titulo: 'Accesorios de interior', items: ['Fundas para Asientos', 'Alfombra Antideslizante', 'Organizador de Asiento', 'Soporte', 'Dell XPS 15', 'HP Spectre x360'], iconRight: CategoriaLavado},
      { titulo: 'Herramientas', items: ['Gato hidráulico', 'Llave cruz', 'Juego de Llaves Allen', 'Compresor de Aire', 'Medidor de Aire', 'Bloqueador de Timon'], iconRight: CategoriaMartillo },
      { titulo: 'Aceite Cuidado exterior', items: ['Cubre asientos', 'Tapetes','Aceite 10W40 Shell', 'Llave Cruz', 'Grasa Multiusos'], iconRight: CategoriaBelleza },
    ]
  },
};

import { useTheme } from "../components/ThemeContext";
import ProductCardV2 from "../components/ProductCardV2";
import TechnicalSpecifications from "../components/TechnicalSpecifications";
import CustomerReview from "../components/CustomerReview";
import { useState } from "react";

export default function CarritoPage() {
  const { isLight } = useTheme();

  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/api/placeholder/300/300",
      discount: "-50%",
      label: "APPLE",
      title: "iPhone 15 Plus",
      price: "$3,250.00",
      oldPrice: "$6,500.00",
      rating: "4.9",
      liked: false,
      added: false
    },
    {
      id: 2,
      image: "/api/placeholder/300/300",
      discount: "-30%",
      label: "SAMSUNG",
      title: "Galaxy S24 Ultra",
      price: "$2,800.00",
      oldPrice: "$4,000.00",
      rating: "4.8",
      liked: false,
      added: false
    },
    {
      id: 3,
      image: "/api/placeholder/300/300",
      discount: "-25%",
      label: "XIAOMI",
      title: "Mi 13 Pro",
      price: "$1,500.00",
      oldPrice: "$2,000.00",
      rating: "4.7",
      liked: false,
      added: false
    },
    {
      id: 4,
      image: "/api/placeholder/300/300",
      discount: "-40%",
      label: "GOOGLE",
      title: "Pixel 8 Pro",
      price: "$1,800.00",
      oldPrice: "$3,000.00",
      rating: "4.6",
      liked: false,
      added: false
    }
  ]);

  const sampleSpecifications = [
    { label: "Condición de producto", value: "Nuevo" },
    { label: "Marca", value: "APPLE" },
    { label: "Modelo", value: "iPhone 15 Plus" },
    { label: "Material", value: "Aluminum/Glass" },
    { label: "País de origen", value: "China" },
    { label: "Composición", value: "Metal y cristal" },
    { label: "Pantalla", value: "6.7 pulgadas" },
    { label: "Almacenamiento", value: "128GB" }
  ];

  const extraSpecifications = [
    { label: "Fit", value: "Regular fit" },
    { label: "Tipo", value: "Abrigos" },
    { label: "Largo de mangas", value: "Manga larga" },
    { label: "Tipo de cierre", value: "No tiene" },
    { label: "Género", value: "Mujer" },
    { label: "Estilo de vestuario", value: "Casual" },
    { label: "Temporada", value: "Otoño" }
  ];

  // Datos para las reseñas
  const sampleReviews = [
    {
      reviewText: "Exelente, el producto llego en buen estado, y buena calidad.",
      rating: 5,
      images: [
      "/src/assets/imagenes/Reviews/IMGreview1.png",
      "/src/assets/imagenes/Reviews/IMGreview2.png",
      "/src/assets/imagenes/Reviews/IMGreview4.png"
      ],
      customerName: "Wade Warren",
      reviewDate: "2025",
      customerAvatar: "/src/assets/imagenes/Reviews/UserProfile.png"
    },
    {
      reviewText: "Muy buen producto, llegó rápido y en perfectas condiciones. Lo recomiendo.",
      rating: 4,
      images: [
      "/src/assets/imagenes/Reviews/IMGreview1.png",
      "/src/assets/imagenes/Reviews/IMGreview4.png"
      ],
      customerName: "María González",
      reviewDate: "2024",
      customerAvatar: "/src/assets/imagenes/Reviews/UserProfile.png"
    },
    {
      reviewText: "Producto de excelente calidad, superó mis expectativas. Muy satisfecho con la compra.",
      rating: 5,
      images: [
      "/src/assets/imagenes/Reviews/IMGreview1.png",
      "/src/assets/imagenes/Reviews/IMGreview2.png",
      "/src/assets/imagenes/Reviews/IMGreview3.png",
      "/src/assets/imagenes/Reviews/IMGreview4.png"
      ],
      customerName: "Carlos Rodríguez",
      reviewDate: "2025",
      customerAvatar: "/src/assets/imagenes/Reviews/UserProfile.png"
    }
  ];

  const handleLike = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, liked: !product.liked } : product
    ));
  };

  const handleAdd = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, added: !product.added } : product
    ));
  };

  const getBackgroundStyle = () => ({
    backgroundColor: isLight ? '#ffffff' : '#1a1a2e',
    color: isLight ? '#000000' : '#ffffff',
    minHeight: '100vh',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  });

  const getSectionStyle = (customBg = null) => {
    if (customBg) {
      return {
        backgroundColor: isLight ? customBg : 'rgba(16, 16, 30, 0.9)',
        color: isLight ? '#000000' : '#ffffff',
        transition: 'all 0.3s ease'
      };
    }
    return {
      backgroundColor: isLight ? '#ffffff' : 'rgba(16, 16, 30, 0.8)',
      color: isLight ? '#000000' : '#ffffff',
      transition: 'all 0.3s ease'
    };
  };

  const getTextStyle = () => ({
    color: isLight ? '#434651' : '#FFFFFF',
    transition: 'color 0.3s ease'
  });

  const getCardStyle = () => ({
    backgroundColor: isLight ? '#ffffffff' : '#292272',
    color: isLight ? '#000000' : '#ffffff',
    transition: 'all 0.3s ease'
  });

  const getButtonStyle = () => ({
    backgroundColor: isLight ? '#1C4390' : '#DFE162',
    color: isLight ? '#ffffff' : '#1C4390',
    transition: 'all 0.3s ease'
  });

  return (
    <div className="relative z-0" style={getBackgroundStyle()}>
      <div className="h-[0px]" />

      <section
        className="px-6 py-30 text-center"
        style={{
          background: isLight
            ? 'linear-gradient(to right, #B3C7FF, #DFE162)'
            : 'linear-gradient(to right, #2C509E, #87A922)',
          ...getSectionStyle()
        }}
      >
        <h1 className="text-4xl font-bold mb-4" style={getTextStyle()}>
          ¡Bienvenido al Carrito de OKEA!
        </h1>
        <p className="max-w-2xl mx-auto text-lg" style={{ color: isLight ? '#000000' : '#ffffff' }}>
          Tu plataforma digital para encontrar todo tipo de productos, desde los más simples hasta los más sofisticados
        </p>
      </section>

      <section className="px-6 py-12" style={getSectionStyle()}>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={getTextStyle()}>
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
            <ProductCardV2
              key={product.id}
              id={product.id}
              image={product.image}
              discount={product.discount}
              label={product.label}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              liked={product.liked}
              added={product.added}
              onLike={handleLike}
              onAdd={handleAdd}
              getCardStyle={getCardStyle}
              getTextStyle={getTextStyle}
            />
          ))}
        </div>
      </section>

      {/* Sección con dos tablas lado a lado con espaciado de 160px */}
      <section className="px-4 sm:px-8 lg:px-40 py-12" style={getSectionStyle()}> {/* px-40 = 160px */}
        <h2 className="text-3xl font-semibold mb-8 text-center" style={getTextStyle()}>
          Especificaciones Técnicas
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 justify-center"> {/* gap-8 = 32px entre tablas */}
          <div className="flex-1 max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-center" style={getTextStyle()}>
              Detalles del producto
            </h3>
            <TechnicalSpecifications specifications={sampleSpecifications} />
          </div>
          <div className="flex-1 max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-center" style={getTextStyle()}>
              Campos adicionales
            </h3>
            <TechnicalSpecifications specifications={extraSpecifications} />
          </div>
        </div>
      </section>

      {/* Nueva sección de reseñas de clientes */}
      <section className="px-6 py-12" style={getSectionStyle()}>
        <h2 className="text-3xl font-semibold mb-8 text-center" style={getTextStyle()}>
          Reseñas de Clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {sampleReviews.map((review, index) => (
            <CustomerReview
              key={index}
              reviewText={review.reviewText}
              rating={review.rating}
              images={review.images}
              customerName={review.customerName}
              reviewDate={review.reviewDate}
              customerAvatar={review.customerAvatar}
            />
          ))}
        </div>
      </section>

      <section className="px-6 py-12" style={getSectionStyle()}>
        <h2 className="text-2xl font-semibold mb-6" style={getTextStyle()}>
          ¿Por qué elegir OKEA?
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="p-6 rounded-xl shadow-sm" style={getCardStyle()}>
            Consectetur nisi, eu consectetur
          </li>
          <li className="p-6 rounded-xl shadow-sm" style={getCardStyle()}>
            Asl nisi consectetur
          </li>
          <li className="p-6 rounded-xl shadow-sm" style={getCardStyle()}>
            Nisi eu consectetur consectetur
          </li>
        </ul>
      </section>

      <section
        className="px-6 py-12"
        style={getSectionStyle(isLight ? '#FAFAFA' : '#16213e')}
      >
        <h2 className="text-xl font-semibold mb-4" style={getTextStyle()}>
          Contenido de ejemplo para scroll
        </h2>
        <div className="space-y-4 max-w-3xl" style={{ color: isLight ? '#666666' : '#cccccc' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>Phasellus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Morbi euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Vivamus euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Aliquam erat volutpat. Etiam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Sed euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Nam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Curabitur euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Donec euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
          <p>Proin euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p>
        </div>
      </section>

      <section
        className="px-6 py-12 text-center"
        style={{
          backgroundColor: isLight ? '#DFE162' : '#87A922',
          color: isLight ? '#000000' : '#ffffff',
          transition: 'all 0.3s ease'
        }}
      >
        <h2 className="text-2xl font-semibold mb-4" style={getTextStyle()}>
          ¿Listo para comenzar?
        </h2>
        <p className="mb-6" style={{ color: isLight ? '#000000' : '#ffffff' }}>
          Únete a la comunidad OKEA y mejora tu comodidad y experiencia.
        </p>
        <button
          className="px-6 py-3 rounded-full hover:opacity-80 transition"
          style={getButtonStyle()}
        >
          Crear cuenta
        </button>
      </section>
    </div>
  );
}
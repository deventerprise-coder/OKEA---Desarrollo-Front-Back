import iphoneImg from "../assets/imagenes/MarcasDestacadas/iphone.png";
import nikeImg from "../assets/imagenes/MarcasDestacadas/nike.png";
import samsungImg from "../assets/imagenes/MarcasDestacadas/samsung.png";
import bataImg from "../assets/imagenes/MarcasDestacadas/bata.png";
import xiaomiImg from "../assets/imagenes/MarcasDestacadas/xiaomi.png";
import { useState } from "react";
//marcas, se puede cambiar
const marcas = [
  { nombre: "iPhone", imagen: iphoneImg },
  { nombre: "Nike", imagen: nikeImg },
  { nombre: "Samsung", imagen: samsungImg },
  { nombre: "Bata", imagen: bataImg },
  { nombre: "Xiaomi", imagen: xiaomiImg }
];

export default function MarcasDestacadas() {
  return (
    <section style={{ width: "100%", background: "#fff", padding: "32px 0" }}>
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          color: "#434651",
          marginBottom: 32
        }}
      >
        Marcas destacadas
      </h2>
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        {marcas.map((marca, idx) => (
          <MarcaCard key={idx} imagen={marca.imagen} nombre={marca.nombre} />
        ))}
      </div>
    </section>
  );
}
function MarcaCard({ imagen, nombre }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 320,
        height: 400,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
        background: "#faf8ff",
        marginBottom: 12,
        cursor: "pointer"
      }}
    >
      <img
        src={imagen}
        alt={nombre}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(44, 80, 158, 0.2)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 2
        }}
      />
    </div>
  );
}
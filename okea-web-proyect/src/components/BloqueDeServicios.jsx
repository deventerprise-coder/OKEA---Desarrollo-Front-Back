import { useState } from "react";
import {
  TiendaIcon,
  SeguridadIcon,
  SeguimientoIcon,
  DevolucionesIcon
} from "../assets/iconos/Icons";

const servicios = [
  {
    Icon: DevolucionesIcon,
    titulo: "Devoluciones",
    descripcion: "En todas nuestras tiendas"
  },
  {
    Icon: TiendaIcon,
    titulo: "Tienda",
    descripcion: "Compra online y retira en tienda"
  },
  {
    Icon: SeguridadIcon,
    titulo: "Seguridad",
    descripcion: "Compra de manera segura"
  },
  {
    Icon: SeguimientoIcon,
    titulo: "Seguimiento",
    descripcion: "Fácil y rápido sólo con tu DNI"
  }
];

export default function BloqueDeServicios() {
  return (
    <section
      style={{
        width: "100%",
        background: "#fff",
        padding: "32px 0",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 32,
          width: "100%",
          maxWidth: 1200,
          justifyContent: "center"
        }}
      >
        {servicios.map((servicio, idx) => (
          <ServicioCard key={idx} {...servicio} />
        ))}
      </div>
    </section>
  );
}

function ServicioCard(props) {
  const { Icon, titulo, descripcion } = props;
  const [hovered, setHovered] = useState(false);

  const styles = {
    container: {
      background: hovered ? "#1C4390" : "#FAF8FF",
      borderRadius: 16,
      padding: "32px 24px",
      minWidth: 382,
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    icon: {
      color: hovered ? "#DAE2FF" : "#2C509E",
      transform: hovered ? "scale(1.2)" : "scale(1)",
      transition: "transform 0.3s ease, color 0.3s ease",
      marginBottom: 12
    },
    title: {
      margin: "0 0 8px 0",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: 20,
      color: hovered ? "#DAE2FF" : "#434651",
      textAlign: "left",
      transform: hovered ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.3s ease, color 0.3s ease"
    },
    description: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      color: hovered ? "#DAE2FF" : "#5A5D6A",
      textAlign: "left",
      transform: hovered ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.3s ease, color 0.3s ease"
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styles.container}
    >
      <Icon width={48} height={48} style={styles.icon} />
      <h3 style={styles.title}>{titulo}</h3>
      <p style={styles.description}>{descripcion}</p>
    </div>
  );
}
import { useState, useEffect } from "react";
import {
  TiendaIcon,
  SeguridadIcon,
  SeguimientoIcon,
  DevolucionesIcon,
} from "../assets/iconos/Icons";

const servicios = [
  {
    Icon: DevolucionesIcon,
    titulo: "Devoluciones",
    descripcion: "En todas nuestras tiendas",
  },
  {
    Icon: TiendaIcon,
    titulo: "Tienda",
    descripcion: "Compra online y retira en tienda",
  },
  {
    Icon: SeguridadIcon,
    titulo: "Seguridad",
    descripcion: "Compra de manera segura",
  },
  {
    Icon: SeguimientoIcon,
    titulo: "Seguimiento",
    descripcion: "Fácil y rápido sólo con tu DNI",
  },
];


const CARD_WIDTH = 382;
const CARD_HEIGHT = 220;
const GAP = 16;
const CONTAINER_MAX_WIDTH = 1576; 


const DESKTOP_BREAKPOINT = 1160; 
const TABLET_BREAKPOINT = 780; 
const MOBILE_BREAKPOINT = 400;  

export default function BloqueDeServicios() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || "light";
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(document.documentElement.getAttribute("data-theme") || "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const getColumns = () => {
    if (windowWidth < MOBILE_BREAKPOINT) {
      return 1;
    }

    if (windowWidth < TABLET_BREAKPOINT) {
        return 1; 
    }
    if (windowWidth < DESKTOP_BREAKPOINT) {
      return 2; 
    }
    return 4; 
  };

  const columns = getColumns();
  

  const actualColumns = columns === 4 ? 4 : (columns === 2 ? 2 : 1);

  const getSectionStyles = () => {
    return {
      width: "100%",
      background: theme === "dark" ? "#120F31" : "#fff",
      padding: actualColumns === 1 ? "24px 16px" : "32px 0",
      display: "flex",
      justifyContent: "center",
      transition: "background 0.3s ease",
    };
  };

  return (
    <section style={getSectionStyles()}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",

          gap: GAP, 
          width: "100%",

          maxWidth: CONTAINER_MAX_WIDTH,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {servicios.map((servicio, idx) => (
          <ServicioCard 
            key={idx} 
            {...servicio} 
            theme={theme} 
            columns={actualColumns} 
          />
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// ServicioCard 
// -------------------------------------------------------------

function ServicioCard(props) {
  const { Icon, titulo, descripcion, theme, columns } = props;
  const [hovered, setHovered] = useState(false);


  const getCardWidth = () => {

    if (columns === 1) {
      return "100%";
    }
    
    const totalGapSpace = (columns - 1) * GAP;

    return `min(
      ${CARD_WIDTH}px, 
      calc((100% - ${totalGapSpace}px) / ${columns})
    )`;
  };


  const getStyles = () => {
    const baseStyles = {
      container: {
        background: hovered ? (theme === 'dark' ? "#2D257D" : "#1C4390") : (theme === 'dark' ? "#1F1A57" : "#FAF8FF"),
        borderRadius: 16,

        padding: "32px", 

        width: getCardWidth(), 
        height: CARD_HEIGHT, 
        maxWidth: CARD_WIDTH, 
        minWidth: columns === 1 ? "auto" : 260, 
        minHeight: CARD_HEIGHT,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
        transition: "all 0.3s ease",
        cursor: "pointer",

        opacity: 1, 
      },

      icon: {
        transform: hovered ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s ease, color 0.3s ease",
        marginBottom: 12,
      },
      title: {
        margin: "0 0 8px 0",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: columns === 1 ? 18 : 20,
        textAlign: "left",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease, color 0.3s ease",
      },
      description: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        fontSize: columns === 1 ? 12 : 13,
        textAlign: "left",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease, color 0.3s ease",
      },
    };

    // Lógica de temas (dark/light)
    if (theme === "dark") {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          boxShadow: hovered
            ? "0 4px 8px 0 rgba(0,0,0,0.4)"
            : "0 1px 4px 0 rgba(0,0,0,0.3)",
        },
        icon: { ...baseStyles.icon, color: "#C6C4E3" },
        title: { ...baseStyles.title, color: hovered ? "#C3C7CB" : "#E5E2E1" },
        description: { ...baseStyles.description, color: hovered ? "#C3C7CB" : "#E5E2E1" },
      };
    } else {
      // Tema light (colores originales)
      return {
        ...baseStyles,
        icon: { ...baseStyles.icon, color: hovered ? "#DAE2FF" : "#2C509E" },
        title: { ...baseStyles.title, color: hovered ? "#DAE2FF" : "#434651" },
        description: { ...baseStyles.description, color: hovered ? "#DAE2FF" : "#5A5D6A" },
      };
    }
  };

  const styles = getStyles();

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
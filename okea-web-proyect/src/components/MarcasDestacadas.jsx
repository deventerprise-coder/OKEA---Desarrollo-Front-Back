import iphoneImg from "../assets/imagenes/MarcasDestacadas/iphone.png";
import nikeImg from "../assets/imagenes/MarcasDestacadas/nike.png";
import samsungImg from "../assets/imagenes/MarcasDestacadas/samsung.png";
import bataImg from "../assets/imagenes/MarcasDestacadas/bata.png";
import xiaomiImg from "../assets/imagenes/MarcasDestacadas/xiaomi.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const marcas = [
    { nombre: "iPhone", imagen: iphoneImg },
    { nombre: "Nike", imagen: nikeImg },
    { nombre: "Samsung", imagen: samsungImg },
    { nombre: "Bata", imagen: bataImg },
    { nombre: "Xiaomi", imagen: xiaomiImg }
];

const MOBILE_BREAKPOINT = 768; 

export default function MarcasDestacadas() {
    const [theme, setTheme] = useState(() => {
        return document.documentElement.getAttribute('data-theme') || 'light';
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getSectionStyles = () => {
        return {
            width: "100%",
            background: theme === 'dark' ? '#120F31' : '#fff',
            padding: "32px 0",
            transition: "all 0.3s ease"
        };
    };

    const getTitleStyles = () => {
        return {
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: 40,
            color: theme === 'dark' ? '#E5E2E1' : '#434651',
            marginBottom: 32,
            transition: "color 0.3s ease"
        };
    };

    const getGridStyles = () => {
        if (isMobile) {
            return {
                display: "grid",
                gridTemplateColumns: "1fr 1fr", 
                gap: 16, 
                maxWidth: 600, 
                margin: "0 auto",
                padding: "0 16px" 
            };
        } else {
            return {
                display: "flex",
                gap: 24,
                justifyContent: "center",
                flexWrap: "wrap",
                padding: "0 24px" 
            };
        }
    };

    const marcasAmostrar = isMobile ? marcas.slice(0, 4) : marcas; 

    return (
        <section style={getSectionStyles()}
        >
            <h2 style={getTitleStyles()}
            >
                Marcas destacadas
            </h2>
            <div style={getGridStyles()}>
                {marcasAmostrar.map((marca, idx) => ( 
                    <MarcaCard 
                        key={idx} 
                        imagen={marca.imagen} 
                        nombre={marca.nombre} 
                        theme={theme} 
                        isMobile={isMobile} 
                    />
                ))}
            </div>
        </section>
    );
}

function MarcaCard({ imagen, nombre, theme, isMobile }) { 
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const getCardStyles = () => {
        const cardWidth = isMobile ? "100%" : 320; 
        const cardHeight = isMobile ? 300 : 400; 

        return {
            position: "relative",
            width: cardWidth,
            height: cardHeight,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: theme === 'dark' 
                ? "0 1px 4px 0 rgba(0,0,0,0.3)" 
                : "0 1px 4px 0 rgba(44,80,158,0.04)",
            background: theme === 'dark' ? '#1F1A57' : '#faf8ff',
            marginBottom: isMobile ? 0 : 12, 
            cursor: "pointer",
            transition: "all 0.3s ease",
            alignSelf: "stretch", 
            justifySelf: "stretch"
        };
    };

    const getOverlayStyles = () => {
        return {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: theme === 'dark' 
                ? "rgba(7, 0, 71, 0.4)" 
                : "rgba(44, 80, 158, 0.2)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 2
        };
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={getCardStyles()}
            onClick={() => {nombre === "iPhone" ? navigate("/catalogo/tecnologia"): nombre === "Samsung" ? navigate("/catalogo/tecnologia") : nombre === "Xiaomi" ? navigate("/catalogo/tecnologia") : nombre === "Nike" ? navigate("/catalogo/calzado") : nombre === "Bata" ? navigate("/catalogo/calzado") : null}}
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
            <div style={getOverlayStyles()} />
        </div>
    );
}
import { useState, useEffect } from "react";
import { PreguntaIcon, ChevronDownIcon, MessageIcon } from "../assets/iconos/Icons";

const preguntas = [
    {
        pregunta: "¿Necesito una cuenta para comprar?",
        respuesta:
            "No es obligatorio crear una cuenta para realizar una compra. Puedes comprar como invitado, aunque recomendamos registrarte para seguir tus pedidos más fácilmente y acceder a promociones exclusivas.",
    },
    {
        pregunta: "¿Cuánto tarda en llegar mi pedido?",
        respuesta:
            "El tiempo de entrega depende de tu ubicación y el tipo de envío seleccionado. En general, los pedidos nacionales tardan entre 2 y 7 días hábiles. Recibirás un correo con el número de seguimiento una vez que tu pedido sea enviado.",
    },
    {
        pregunta: "¿Es seguro pagar en su sitio?",
        respuesta:
            "Sí, nuestro sitio utiliza protocolos de seguridad avanzados (SSL) para proteger tus datos personales y bancarios. Trabajamos con plataformas de pago confiables y tus transacciones están completamente encriptadas.",
    },
    {
        pregunta: "¿Qué métodos de pago aceptan?",
        respuesta:
            "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, PayPal y otros métodos locales dependiendo de tu país. Verás todas las opciones disponibles al finalizar tu compra.",
    },
    {
        pregunta: "¿Puedo modificar o cancelar mi pedido?",
        respuesta:
            "Sí, puedes modificar o cancelar tu pedido siempre que aún no haya sido enviado. Contáctanos lo antes posible a través de nuestro servicio al cliente con tu número de pedido. Una vez que el pedido esté en camino, ya no será posible hacer cambios.",
    },
];

const MOBILE_BREAKPOINT = 768;

export default function PreguntasFrecuentes() {
    const [abiertas, setAbiertas] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [theme, setTheme] = useState(() => {
        return document.documentElement.getAttribute("data-theme") || "light";
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

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
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const togglePregunta = (idx) => {
        setAbiertas((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };

    const getThemeColors = (isOpen, isHovered) => {
        if (theme === "dark") {
            if (isOpen) {
                return {
                    backgroundColor: "#2D257D",
                    textColor: "#C3C7CB",
                    iconColor: "#C3C7CB",
                    chevronColor: "#C3C7CB",
                };
            } else if (isHovered) {
                return {
                    backgroundColor: "#C6C4E3",
                    textColor: "#251F67",
                    iconColor: "#251F67",
                    chevronColor: "#251F67",
                };
            } else {
                return {
                    backgroundColor: "#1F1A57",
                    textColor: "#E5E2E1",
                    iconColor: "#E5E2E1",
                    chevronColor: "#E5E2E1",
                };
            }
        } else {
            const colorBase = "#434651";
            if (isOpen) {
                return {
                    backgroundColor: "#EEEDF4",
                    textColor: colorBase,
                    iconColor: colorBase,
                    chevronColor: colorBase,
                };
            } else if (isHovered) {
                return {
                    backgroundColor: "#2C509E",
                    textColor: "#fff",
                    iconColor: "#fff",
                    chevronColor: "#fff",
                };
            } else {
                return {
                    backgroundColor: "#FAF8FF",
                    textColor: "#434651",
                    iconColor: "#434651",
                    chevronColor: "#434651",
                };
            }
        }
    };

    const getSectionStyles = () => {
        return {
            width: "100%",
            background: theme === "dark" ? "#120F31" : "#fff",
            padding: "64px 0 32px 0",
            transition: "all 0.3s ease"
        };
    };

    const getTitleColor = () => {
        return theme === "dark" ? "#E5E2E1" : "#3A3D46";
    };

    const getResponseStyles = () => {
        if (theme === "dark") {
            return {
                marginTop: 5,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#C3C7CB",
                background: "#2D257D",
                borderRadius: 12,
                padding: "30px 35px",
                boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
            };
        } else {
            return {
                marginTop: 5,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#5A5D6A",
                background: "#EEEDF4",
                borderRadius: 12,
                padding: "30px 35px",
                boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
            };
        }
    };

    const iconSize = isMobile ? 30 : 50;
    
    const titleJustify = isMobile ? "flex-start" : "center";

    return (
        <section style={getSectionStyles()}>
            <h2
                style={{
                    textAlign: isMobile ? "left" : "center", 
                    maxWidth: 1062, 
                    margin: isMobile ? "0 20px 40px" : "0 auto 40px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: 36,
                    color: getTitleColor(),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: titleJustify, 
                    gap: 16,
                }}
            >
                <PreguntaIcon
                    width={iconSize}
                    height={iconSize}
                    style={{ color: getTitleColor() }}
                />
                Preguntas frecuentes
            </h2>
            <div
                style={{
                    maxWidth: 1062,
                    margin: isMobile ? "0 20px" : "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}
            >
                {preguntas.map((item, idx) => {
                    const isOpen = abiertas.includes(idx);
                    const isHovered = hovered === idx && !isOpen;
                    const colors = getThemeColors(isOpen, isHovered);
                    const itemPadding = isMobile ? "18px 20px" : "18px 32px";

                    return (
                        <div key={idx}>
                            <div
                                style={{
                                    background: colors.backgroundColor,
                                    borderRadius: 16,
                                    padding: itemPadding,
                                    minHeight: 72,
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
                                    transition: "background 0.2s",
                                }}
                                onClick={() => togglePregunta(idx)}
                                onMouseEnter={() => !isOpen && setHovered(idx)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {!isMobile && (
                                    <MessageIcon
                                        width={20}
                                        height={20}
                                        style={{
                                            color: colors.iconColor,
                                            marginRight: 30,
                                        }}
                                    />
                                )}
                                <span
                                    style={{
                                        flex: 1,
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 500,
                                        fontSize: 16,
                                        color: colors.textColor,
                                        transition: "color 0.2s",
                                    }}
                                >
                                    {item.pregunta}
                                </span>
                                <span
                                    style={{
                                        marginLeft: 16,
                                        transition:
                                            "transform 0.2s, color 0.2s",
                                        transform: isOpen ? "rotate(180deg)" : "none",
                                        color: colors.chevronColor,
                                    }}
                                >
                                    <ChevronDownIcon
                                        width={24}
                                        height={24}
                                        style={{ color: colors.chevronColor }}
                                    />
                                </span>
                            </div>

                            {isOpen && (
                                <div style={getResponseStyles()}>
                                    {item.respuesta}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
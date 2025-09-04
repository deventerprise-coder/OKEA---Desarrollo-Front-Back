import { useState } from "react";
import { PreguntaIcon, ChevronDownIcon, MessageIcon } from "../assets/iconos/Icons";

const preguntas = [
  {
    pregunta: "¿Necesito una cuenta para comprar?",
    respuesta: "No es obligatorio crear una cuenta para realizar una compra. Puedes comprar como invitado, aunque recomendamos registrarte para seguir tus pedidos más fácilmente y acceder a promociones exclusivas."
  },
  {
    pregunta: "¿Cuánto tarda en llegar mi pedido?",
    respuesta: "El tiempo de entrega depende de tu ubicación y el tipo de envío seleccionado. En general, los pedidos nacionales tardan entre 2 y 7 días hábiles. Recibirás un correo con el número de seguimiento una vez que tu pedido sea enviado."
  },
  {
    pregunta: "¿Es seguro pagar en su sitio?",
    respuesta: "Sí, nuestro sitio utiliza protocolos de seguridad avanzados (SSL) para proteger tus datos personales y bancarios. Trabajamos con plataformas de pago confiables y tus transacciones están completamente encriptadas."
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, PayPal y otros métodos locales dependiendo de tu país. Verás todas las opciones disponibles al finalizar tu compra."
  },
  {
    pregunta: "¿Puedo modificar o cancelar mi pedido?",
    respuesta: "Sí, puedes modificar o cancelar tu pedido siempre que aún no haya sido enviado. Contáctanos lo antes posible a través de nuestro servicio al cliente con tu número de pedido. Una vez que el pedido esté en camino, ya no será posible hacer cambios."
  }
];

export default function PreguntasFrecuentes() {
  const [abiertas, setAbiertas] = useState([]);
  const [hovered, setHovered] = useState(null);

  const togglePregunta = (idx) => {
    setAbiertas((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section style={{ width: "100%", background: "#fff", padding: "64px 0 32px 0" }}>
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 36,
          color: "#3A3D46",
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <PreguntaIcon width={36} height={36} style={{ color: "#3A3D46" }} />
        Preguntas frecuentes
      </h2>
      <div style={{ maxWidth: 1062, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {preguntas.map((item, idx) => {
          const isOpen = abiertas.includes(idx);
          const isHovered = hovered === idx && !isOpen;

          const backgroundColor = isOpen
            ? "#EEEDF4"
            : isHovered
            ? "#2C509E"
            : "#FAF8FF";

          const colorBase = "#434651";
          const colorTexto = isHovered ? "#fff" : isOpen ? colorBase : "#434651";
          const colorIcono = isHovered ? "#fff" : isOpen ? colorBase : "#434651";
          const colorChevron = isHovered ? "#fff" : isOpen ? colorBase : "#434651";

          return (
            <div key={idx}>
              {/* Pregunta */}
              <div
                style={{
                  background: backgroundColor,
                  borderRadius: 16,
                  padding: "18px 32px",
                  minHeight: 72,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)",
                  transition: "background 0.2s"
                }}
                onClick={() => togglePregunta(idx)}
                onMouseEnter={() => !isOpen && setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <MessageIcon
                  width={20}
                  height={20}
                  style={{ color: colorIcono, marginRight: 30 }}
                />
                <span
                  style={{
                    flex: 1,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    color: colorTexto,
                    transition: "color 0.2s"
                  }}
                >
                  {item.pregunta}
                </span>
                <span
                  style={{
                    marginLeft: 16,
                    transition: "transform 0.2s, color 0.2s",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    color: colorChevron
                  }}
                >
                  <ChevronDownIcon
                    width={24}
                    height={24}
                    style={{ color: colorChevron }}
                  />
                </span>
              </div>

              {/* Respuesta */}
              {isOpen && (
                <div
                  style={{
                    marginTop: 5,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#5A5D6A",
                    background: "#EEEDF4",
                    borderRadius: 12,
                    padding: "30px 35px",
                    boxShadow: "0 1px 4px 0 rgba(44,80,158,0.04)"
                  }}
                >
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
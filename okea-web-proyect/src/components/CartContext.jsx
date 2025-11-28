import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // 🧠 Recuperar carrito del localStorage al cargar
  useEffect(() => {
    const savedCart = localStorage.getItem("carrito");
    if (savedCart) {
      setCarrito(JSON.parse(savedCart));
    }
  }, []);

  // 💾 Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoAnterior) => {
      const yaExiste = carritoAnterior.findIndex(
        (articulo) => articulo.id === producto.id
      );
      if (yaExiste >= 0) {
        const carritoActualizado = [...carritoAnterior];
        carritoActualizado[yaExiste].cantidad += 1;
        return carritoActualizado;
      } else {
        return [...carritoAnterior, { ...producto, cantidad: 1 }];
      }
    });
  };

  // ✅ Cambia cantidad con mínimo 1
  const actualizarCantidad = (productoId, delta) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) =>
        producto.id === productoId
          ? {
              ...producto,
              cantidad: Math.max(
                1,
                (Number(producto.cantidad) || 1) + Number(delta)
              ),
            }
          : producto
      )
    );
  };

  const eliminarProducto = (productoId) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((producto) => producto.id !== productoId)
    );
  };

  // ✅ Aliases para tus componentes actuales
  const cambiarCantidad = (productoId, delta) =>
    actualizarCantidad(productoId, delta);
  const eliminarDelCarrito = (productoId) => eliminarProducto(productoId);

  // ✅ Subtotal derivado (número)
  const subtotal = carrito.reduce(
    (acc, p) => acc + Number(p.precio || 0) * Number(p.cantidad || 0),
    0
  );

  // ✅ Total de ítems (contador global)
  const totalItems = carrito.reduce(
    (acc, p) => acc + Number(p.cantidad || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
        // compat con tu dropdown:
        cambiarCantidad,
        eliminarDelCarrito,
        subtotal,
        totalItems, // 🔹 añadido
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

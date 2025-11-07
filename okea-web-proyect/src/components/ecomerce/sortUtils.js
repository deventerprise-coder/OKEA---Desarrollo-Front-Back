export const SORT_OPTIONS = [
  "Precio más bajo",
  "Precio más alto", 
  "Lo más vendido",
  "Lo más nuevo",
  "Mejor descuento",
];

export const sortProducts = (products, sortType) => {
  switch (sortType) {
    case "Precio más bajo":
      return [...products].sort((a, b) => a.precio - b.precio);
    case "Precio más alto":
      return [...products].sort((a, b) => b.precio - a.precio);
    case "Lo más vendido":
      return [...products].sort((a, b) => (b.ventas || 0) - (a.ventas || 0));
    case "Lo más nuevo":
      return [...products].sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0));
    case "Mejor descuento":
      return [...products].sort((a, b) => {
        const discountA = a.precioSinDescuento ? ((a.precioSinDescuento - a.precio) / a.precioSinDescuento) * 100 : 0;
        const discountB = b.precioSinDescuento ? ((b.precioSinDescuento - b.precio) / b.precioSinDescuento) * 100 : 0;
        return discountB - discountA;
      });
    default:
      return products;
  }
};
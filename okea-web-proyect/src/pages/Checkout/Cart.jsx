import React, { useState } from "react";
import { useCart } from "../../components/CartContext";
//import { FaTrashAlt } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";
import visa from "../../assets/iconos/VISAIcono.svg";
import mastercard from "../../assets/iconos/MCIcon.svg";
import logo_okea from "../../assets/iconos/okea_logo.svg";
import AMEXIcon from "../../assets/iconos/AMEXIcon.svg";
import yape from "../../assets/imagenes/yape-carrito.png";    
import mercadopagomobil from "../../assets/iconos/mercadopagomobil.svg";
import yapemobil from "../../assets/iconos/yapemobil.svg";
import Mercadodepago from "../../assets/iconos/Mercadodepago.svg";
import { Tag24Regular, ChevronLeftRegular, ChevronRightRegular , Password24Regular, CalendarClock24Regular, Calendar24Regular,  CardUi24Regular,  Delete24Regular, PersonCircle24Regular,  Person24Regular, Cart24Regular, Payment24Regular, VehicleTruckCheckmark24Regular, Edit16Filled
  
} from "@fluentui/react-icons";


const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const [paso, setPaso] = useState(1); // 1 = productos, 2 = formulario, 3 = métodos de pago

  const costoDeEnvio = 10;
  const subTotal = carrito.reduce((acc, producto) =>
    acc + producto.precio * producto.cantidad
  , 0);
  const total = subTotal + costoDeEnvio;

  const handleAumentarCantidad = (id) => actualizarCantidad(id, 1);
  const handleDisminuirCantidad = (id) => {
    const producto = carrito.find((item) => item.id === id);
    if (producto.cantidad > 1) actualizarCantidad(id, -1);
  };

//const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  
  return (
    <div
  className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-yellow-200 p-6
    max-[412px]:bg-white max-[412px]:bg-none max-[412px]:p-0"
>
  <div
    className="max-w-7xl mt-40 mx-auto rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4
      max-[412px]:max-w-full max-[412px]:mx-0 max-[412px]:rounded-none max-[412px]:shadow-none"
  >


        
        {/* Sidebar */}
{/* Sidebar */}
<aside
  className="
    bg-gray-100/60 p-6 flex flex-col items-start rounded-l-2xl
    col-span-1
    max-[1280px]:p-5 
    max-[1024px]:col-span-2
    max-[768px]:col-span-2 max-[768px]:items-center
    max-[412px]:p-3 max-[412px]:items-center
    max-[412px]:bg-white max-[412px]:rounded-none
    max-[412px]:-mt-33 max-[412px]:h-full
  "
>
  {/* Logo */}
  <img
    src={logo_okea}
    alt="Logo de Okea"
    className="
      w-32 mb-6 
      max-[768px]:w-28 
      max-[414px]:w-28 max-[412px]:mb-0
    "
  />
  {/* Botones — ocultos en pantallas <= 412px */}
  <div className="flex flex-col gap-2 mt-4 w-full items-start max-[768px]:items-center max-[412px]:hidden">
    <button
      className={`w-60 h-10 flex justify-between md:w-full md:min-w-52 lg:w-52 items-center px-4 py-2 rounded-2xl 
        ${paso >= 1 ? "bg-[#1C4390] text-white" : "hover:bg-gray-200"}
        max-[1280px]:w-52 max-[768px]:w-60 max-[412px]:w-full`}
    >
      <span className="text-xs flex items-center gap-x-3">
        <Cart24Regular className="flex-shrink-0" />
        Carrito de compras
      </span>
      <span className="text-xs">&gt;</span>
    </button>

    <button
      className={`w-60 h-10 flex justify-between md:w-full md:min-w-52 lg:w-52 items-center px-4 py-2 rounded-2xl 
        ${paso >= 2 ? "bg-[#1C4390] text-white" : "hover:bg-gray-200"}
        max-[1280px]:w-52 max-[768px]:w-60 max-[412px]:w-full`}
    >
      <span className="text-xs flex items-center gap-x-3">
        <VehicleTruckCheckmark24Regular className="flex-shrink-0" />
        Datos y entrega
      </span>
      <span className="text-xs">&gt;</span>
    </button>

    <button
      className={`w-60 h-10 flex justify-between md:w-full md:min-w-52 lg:w-52 items-center px-4 py-2 rounded-2xl 
        ${paso >= 3 ? "bg-[#1C4390] text-white" : "hover:bg-gray-200"}
        max-[1280px]:w-52 max-[768px]:w-60 max-[412px]:w-full`}
    >
      <span className="text-xs flex items-center gap-x-3">
        <Payment24Regular className="flex-shrink-0" />
        Métodos de pago
      </span>
      <span className="text-xs">&gt;</span>
    </button>
  </div>

  {/* Usuario — oculto en pantallas <= 412px */}
  <div className="mt-auto w-full flex items-center gap-3 pt-6 max-[768px]:justify-center max-[412px]:hidden">
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      <Person24Regular className="text-gray-500 w-6 h-6" />
    </div>
    <span className="text-gray-600 text-sm max-[412px]:text-xs">User Name</span>
  </div>
</aside>







        {/* Contenido central */}
        <main
  className=" 
    bg-gray-100/60 p-6 col-span-2
    max-[1280px]:col-span-3
    max-[1024px]:col-span-4
    max-[768px]:col-span-4
    max-[412px]:p-4
    max-[412px]:bg-white
    max-[412px]:-mt-16
    max-[412px]:-mb-4
  "
>

        {paso === 1 && (
  <>
    {/* Encabezado: Carrito + Botón */}
    <div
      className="flex items-center justify-between mb-4
        max-[412px]:flex-row max-[412px]:items-center max-[412px]:mb-3
      "
    >
      <h1
  className="text-3xl font-bold text-gray-900
    max-[768px]:text-2xl
    max-[412px]:text-2xl max-[412px]:font-semibold
  "
>
  Carrito
</h1>


      <button
  className="px-4 py-2 rounded-full bg-[#E6EA52] text-gray-800 hover:bg-yellow-400 transition text-xs
    max-[768px]:px-3 max-[768px]:py-2
    max-[412px]:w-[160px] max-[412px]:h-[37px] max-[412px]:text-[12px]"
>
  + Seguir Comprando
</button>

    </div>

    {/* Subtítulo */}
    <h2
      className="text-xl text-gray-800 mb-4
        max-[768px]:text-lg
        max-[412px]:text-base
      "
    >
      <span className="hidden max-[412px]:inline">
        {`Tienes ${carrito.length} producto${carrito.length !== 1 ? 's' : ''} en tu carrito`}
      </span>
      <span className="max-[412px]:hidden">
        productos pedidos
      </span>
    </h2>

    {/* Lista de productos */}
    <ul
  className="divide-y divide-gray-300 max-h-[500px] overflow-y-auto ocultar-scroll
    max-[1024px]:max-h-[440px]
    max-[768px]:max-h-[380px]
    max-[412px]:max-h-[480px]
  "
>


      {carrito.map((producto) => (
        <li
          key={producto.id}
          className="flex items-center justify-between pt-8 pb-3
            max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-3
            max-[412px]:relative
          "
        >
          {/* Imagen y descripción */}
          <div
            className="flex items-center gap-4 relative
              max-[412px]:gap-3
            "
          >
            {/* 🏷️ Nombre arriba de la imagen */}
            <p
  className="hidden max-[412px]:block absolute top-[-22px] left-[8px] text-[15px] font-semibold text-gray-800 transform max-[412px]:translate-y-[3px]"
>
  {producto.nombre}
</p>

            <img
  src={producto.imagen || 'https://via.placeholder.com/150'}
  alt={producto.nombre}
  className="w-38 h-30 object-cover rounded-lg
    max-[768px]:w-[120px] max-[768px]:h-[96px]
    max-[412px]:w-[155px] max-[412px]:h-[148px] max-[412px]:mt-3
  "
/>


            <div className="flex flex-col justify-start relative w-full">
              {/* Nombre solo escritorio */}
              <p className="font-medium text-gray-800 mb-2 max-[768px]:mb-1 max-[412px]:hidden">
  {producto.nombre}
</p>

<div
  className="max-[412px]:pt-2 max-[412px]:pb-2 max-[412px]:space-y-3 max-[412px]:relative max-[412px]:-translate-y-1.5"
>
  <p className="text-xs text-gray-500">
    {producto.descripcion}
  </p>

  <p className="text-xs text-gray-500 flex items-center gap-1">
    Stock disponible
  </p>

  <div className="flex items-center gap-1">
    <span className="text-red-500 font-medium text-sm">★</span>
    <span className="text-xs text-gray-700">4.9</span>
  </div>
</div>



              {/* 💰 Precio móvil (oculto en desktop) */}
              <p
                className="text-blue-800 font-medium hidden max-[412px]:block
                  max-[412px]:absolute max-[412px]:top-[-34px] max-[412px]:right-[-110px]
                "
              >
                S/ {producto.precio.toFixed(2)}
              </p>

              {/* 🗑️ Eliminar móvil (oculto en desktop) */}
              <button
                onClick={() => eliminarProducto(producto.id)}
                className="hidden max-[412px]:block absolute bottom-[-24px] right-[-110px]"
              >
                <Delete24Regular className="w-5 h-5 text-gray-700" />
              </button>

              {/* ➕➖ Cantidades móvil (oculto en desktop) */}
              <div
                className="hidden max-[412px]:flex items-center gap-1 absolute bottom-[-26px] right-[18px] w-[155px] justify-end
                "
              >
                <button
                  onClick={() => handleDisminuirCantidad(producto.id)}
                  className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-xs
                    max-[412px]:w-5 max-[412px]:h-
                  "
                >
                  –
                </button>

                <span
                  className="w-7 h-7 flex items-center justify-center border border-black rounded-md text-xs
                    max-[412px]:text-sm
                  "
                >
                  {producto.cantidad}
                </span>

                <button
                  onClick={() => handleAumentarCantidad(producto.id)}
                  className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-xs
                    max-[412px]:w-5 max-[412px]:h-5
                  "
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 💻 Precio, eliminar y cantidad (solo escritorio) */}
          <div
            className="flex flex-col items-end gap-3
              max-[768px]:w-full max-[768px]:items-start
              max-[412px]:hidden
            "
          >
            <p className="text-blue-800 font-medium">
              S/ {producto.precio.toFixed(2)}
            </p>

            <button onClick={() => eliminarProducto(producto.id)}>
              <Delete24Regular className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDisminuirCantidad(producto.id)}
                className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-xs
                  max-[412px]:w-6 max-[412px]:h-6
                "
              >
                –
              </button>
              <span
                className="w-7 h-7 flex items-center justify-center border border-black rounded-md text-xs
                  max-[412px]:w-8 max-[412px]:h-8
                "
              >
                {producto.cantidad}
              </span>
              <button
                onClick={() => handleAumentarCantidad(producto.id)}
                className="w-5 h-5 flex items-center justify-center border border-black rounded-full text-xs
                  max-[412px]:w-6 max-[412px]:h-6
                "
              >
                +
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </>
)}



        {paso === 2 && (
  <>
    <h1
  className="text-2xl font-bold text-gray-900 mb-6
    max-[768px]:text-xl
    max-[412px]:text-[1.9rem] max-[412px]:font-normal max-[412px]:mb-3
  "
>
  Datos del cliente y envío
</h1>


    {/* Contenedor con scroll */}
    <div
      className="max-h-[600px] overflow-y-auto space-y-6 ocultar-scroll
        max-[768px]:max-h-[520px]
        max-[412px]:max-h-[611px]
      "
    >
      {/* Bloque Datos del cliente */}
      <div
        className="bg-white p-6 rounded-xl shadow-sm mb-6
    max-[768px]:p-5
    max-[412px]:p-4 max-[412px]:mt-[-16px] max-[412px]:ml-[-12px]
    max-[412px]:bg-transparent max-[412px]:shadow-none max-[412px]:rounded-none
  "
      >
        <h2
          className="text-lg font-semibold text-gray-800 mb-4
            max-[412px]:text-base
          "
        >
          Datos de cliente
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4
            max-[1024px]:grid-cols-1
          "
        >
          <input
            type="text"
            placeholder="Nombre*"
            className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
          />
          <input
            type="text"
            placeholder="Apellido*"
            className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
          />
          <input
            type="email"
            placeholder="Correo electrónico*"
            className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
          />
          <input
            type="tel"
            placeholder="Celular*"
            className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
          />
          <select
            className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
          >
            <option>Tipo de documento*</option>
            <option>DNI</option>
            <option>Pasaporte</option>
            <option>Carnet de extranjería</option>
          </select>
          <input
            type="text"
            placeholder="Número de documento*"
            className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
          />
        </div>
      </div>

      {/* Bloque Dirección */}
      <div
  className="bg-white p-6 rounded-xl shadow-sm mb-6
    max-[768px]:p-5
    max-[412px]:p-4 
    max-[412px]:bg-transparent max-[412px]:shadow-none max-[412px]:rounded-none
    max-[412px]:mt-[-40px] max-[412px]:ml-[-12px]
  "
>

  <h2
    className="text-lg font-semibold text-gray-800 mb-4
      max-[412px]:text-base
    "
  >
    Completa tu dirección de entrega
  </h2>

  <div
    className="grid grid-cols-1 md:grid-cols-2 gap-4
      max-[1024px]:grid-cols-1
    "
  >
    <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
      <option>Departamento*</option>
    </select>
    <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
      <option>Provincia*</option>
    </select>
    <select className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600">
      <option>Distrito*</option>
    </select>
    <input
      type="text"
      placeholder="Dirección*"
      className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
    />
    <input
      type="text"
      placeholder="Número*"
      className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
    />
    <input
      type="text"
      placeholder="Referencia (opcional)"
      className="px-3 py-4 border border-gray-400 rounded-sm text-sm w-full text-gray-600"
    />
  </div>
</div>


      {/* Bloque Reserva de horario */}
      <div
  className="bg-white p-6 rounded-xl shadow-sm relative
    max-[768px]:p-5
    max-[412px]:p-4 
    max-[412px]:bg-transparent max-[412px]:shadow-none max-[412px]:rounded-none
    max-[412px]:mt-[-10px] max-[412px]:ml-[-6px]
  "
>
  <h2
    className="text-lg font-semibold text-gray-800 mb-4
      max-[412px]:text-base
      max-[412px]:relative max-[412px]:-translate-x-2 max-[412px]:-translate-y-1
      max-[412px]:mt-[-26px] 
    "
  >
    Reserva un horario para la entrega
  </h2>

  <div
  className="space-y-8 pl-4
    max-[412px]:pl-0
    max-[412px]:space-y-10
    max-[412px]:text-gray-500
  "
>
  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-2 text-gray-700 max-[412px]:text-gray-500">
      <input
        type="radio"
        name="horario"
        className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-300"
      />
      <span>Domingo, 3 ago. 2025</span>
    </div>
    <span className="text-gray-600 max-[412px]:text-gray-500">S/ 34.00</span>
  </label>

  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-2 text-gray-700 max-[412px]:text-gray-500">
      <input
        type="radio"
        name="horario"
        className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-300"
      />
      <span>Lunes, 4 ago. 2025</span>
    </div>
    <span className="text-gray-600 max-[412px]:text-gray-500">S/ 34.00</span>
  </label>

  <label className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-2 text-gray-700 max-[412px]:text-gray-500">
      <input
        type="radio"
        name="horario"
        className="h-4 w-4 text-yellow-400 border-gray-300 focus:ring-yellow-300"
      />
      <span>Martes, 5 ago. 2025</span>
    </div>
    <span className="text-gray-600 max-[412px]:text-gray-500">S/ 34.00</span>
  </label>
</div>


  {/* Input calendario */}
  <div className="mt-6 w-full">
    <input
      type="date"
      placeholder="Ver más fechas"
      className="w-full px-4 py-3 border rounded-lg text-gray-600 cursor-pointer [color-scheme:light]
        max-[412px]:py-2.5
      "
      onChange={(e) => {
        const fecha = new Date(e.target.value);
        const opciones = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        setFechaSeleccionada(fecha.toLocaleDateString('es-ES', opciones));
      }}
    />
  </div>

  {/* ✅ Nuevo label visible solo en <= 412px */}
   <label
  className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer
    hidden max-[412px]:flex max-[412px]:mt-10 max-[412px]:ml-3
  "
>
  <input
    type="radio"
    className="h-4 w-4 text-yellow-400 border-gray-400 focus:ring-yellow-300"
  />
  términos y condiciones
</label>
</div>

    </div>
  </>
)}


  {paso === 3 && (
  <>
    <h1
  className="text-2xl font-bold text-gray-900 mb-6
    max-[768px]:text-xl
    max-[412px]:text-lg max-[412px]:mb-1"
>
  Método de pago
</h1>


    <div className="p-3 rounded-xl mb-6 max-[412px]:p-2 max-[412px]:hidden">
      <div
        className="flex items-center justify-between mb-4
          max-[412px]:flex-col max-[412px]:items-start max-[412px]:gap-2"
      >
        <h2
          className="text-lg font-semibold text-gray-800
            max-[412px]:text-base"
        >
          productos pedidos
        </h2>

        <button
          className="px-3 py-2.5 text-xs border border-gray-300 rounded-full 
                     text-gray-600 hover:bg-gray-100 flex items-center justify-center gap-1.5 font-medium
                     max-[412px]:w-full"
        >
          <Edit16Filled className="flex-shrink-0 text-[14px]" />
          Editar pedido
        </button>
      </div>

      {/* Contenedor del scroll horizontal */}
      <div className="relative -ml-6">
  {/* Flecha izquierda */}
  <button
    onClick={() =>
      document
        .getElementById("productosScroll")
        .scrollBy({ left: -300, behavior: "smooth" })
    }
    className="absolute left-0 top-1/2 -translate-y-1/2 p-1 text-[#1C4390]
      max-[412px]:hidden transition hover:scale-110 z-10"
  >
    <ChevronLeftRegular className="w-6 h-6 text-gray-200" />

  </button>

  {/* Contenedor con scroll horizontal */}
  <div
    id="productosScroll"
    className="flex gap-4 overflow-x-auto scroll-smooth pl-8 pr-10 scrollbar-hide
      max-[412px]:pl-4 max-[412px]:pr-6"
    style={{
      scrollSnapType: "x mandatory",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      maxWidth: "561px", // 🔹 muestra 4 productos exactos con su espacio
    }}
  >
    {carrito.map((producto) => (
      <div
        key={producto.id}
        className="min-w-[120px] rounded-lg overflow-hidden shadow-sm bg-white flex flex-col scroll-snap-align-start
          max-[412px]:min-w-[100px]"
      >
        {/* Imagen con fondo gris */}
        <div className="bg-gray-200 flex items-center justify-center h-28
          max-[412px]:h-24"
        >
          <img
            src={producto.imagen || 'https://via.placeholder.com/100'}
            alt={producto.nombre}
            className="w-24 h-24 object-contain
              max-[412px]:w-20 max-[412px]:h-20"
          />
        </div>

        {/* Info del producto */}
        <div className="flex-1 bg-white text-left p-2 h-24
          max-[412px]:h-20"
        >
          <p className="text-[11px] font-medium text-gray-800 truncate">
            {producto.nombre}
          </p>
          <p className="text-[10px] text-gray-500">
            {producto.cantidad} unidades
          </p>
          <p className="text-[11px] font-semibold text-blue-600">
            S/ {(producto.precio * producto.cantidad).toFixed(2)}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Flecha derecha */}
  <button
    onClick={() =>
      document
        .getElementById("productosScroll")
        .scrollBy({ left: 300, behavior: "smooth" })
    }
    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#1C4390]
      max-[412px]:hidden transition hover:scale-110 z-10"
  >
    <ChevronRightRegular className="w-6 h-6" />
  </button>
</div>
    </div>

    {/* Métodos de pago */}
    <div
  className="bg-white p-6 rounded-xl shadow-sm
    max-[768px]:p-5
    max-[412px]:p-4 max-[412px]:rounded-none max-[412px]:shadow-none"
>

      {/* Encabezado */}
      <div
  className="flex justify-between items-center mb-4
    max-[412px]:flex-row max-[412px]:items-center max-[412px]:justify-between max-[412px]:w-full"
>
  <h2
    className="text-lg font-semibold text-gray-800
      max-[412px]:text-base"
  >
    Tarjeta de Crédito / Débito
  </h2>

  {/* Logos de tarjetas */}
  <div
    className="flex gap-1
      max-[412px]:ml-auto"
  >
    <img src={mastercard} alt="Mastercard" className="h-6" />
    <img src={visa} alt="Visa" className="h-6 w-auto" />
    <img src={AMEXIcon} alt="American Express" className="h-6 w-auto" />
  </div>
</div>


      {/* Inputs en grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4
          max-[1024px]:grid-cols-2
          max-[768px]:grid-cols-1"
      >
        {/* Fila 1 */}
        <div
          className="relative md:col-span-2
            max-[1024px]:col-span-2
            max-[768px]:col-span-1"
        >
          <CardUi24Regular className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Número de tarjeta"
            className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
          />
        </div>

        <div className="relative">
          <Calendar24Regular className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="MM/AA"
            className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
          />
        </div>

        {/* Fila 2 */}
        <div
          className="relative md:col-span-2
            max-[1024px]:col-span-2
            max-[768px]:col-span-1"
        >
          <PersonCircle24Regular className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Nombre del titular de la tarjeta"
            className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
          />
        </div>

        <div className="relative">
          <Password24Regular className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="CVV"
            className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700"
          />
        </div>

        {/* Fila 3 */}
        <div
          className="relative md:col-span-3
            max-[1024px]:col-span-2
            max-[768px]:col-span-1"
        >
          <CalendarClock24Regular className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <select className="pl-10 pr-3 py-4 border border-gray-400 rounded-md text-sm w-full text-gray-700">
            <option>¿En cuántas cuotas deseas pagar?</option>
            <option>1 cuota</option>
            <option>3 cuotas</option>
            <option>6 cuotas</option>
            <option>12 cuotas</option>
          </select>
        </div>
      </div>

      {/* Tipos de pago adicionales */}
      <div className="mt-6">
        <p
    className="text-xs text-gray-500 mb-2
      max-[412px]:hidden"
  >
    Tipos de pago admitidos:
  </p>

  <p
    className="hidden max-[412px]:block text-lg font-semibold text-black mb-2"
  >
    Otros medios de pago
  </p>

        <div
          className="flex items-center justify-between w-full
            max-[412px]:flex-col max-[412px]:items-start max-[412px]:gap-3"
        >
          {/* Grupo izquierdo */}
          <div
  className="flex items-center gap-1
    max-[412px]:hidden"
>
  <img src={mastercard} alt="Mastercard" className="h-6" />
  <img src={visa} alt="Visa" className="h-6 w-auto" />
  <img src={AMEXIcon} alt="American Express" className="h-6 w-auto" />
</div>


          {/* Grupo derecho */}
         <div
  className="flex items-center justify-between gap-4
    max-[412px]:flex-col max-[412px]:items-center max-[412px]:gap-3 max-[540px]:gap-1 max-[412px]:w-full max-[412px]:bg-transparent"
>
  {/* 🟡 Imagen MercadoPago Desktop (vuelve a tu diseño original) */}
  <img
    src={Mercadodepago}
    alt="Mercado Pago"
    className="h-13 w-33 object-cover rounded-full shadow-md max-[540px]:w-[70px] max-[540px]:h-[40px]
      max-[412px]:hidden max-[960px]:w-[110px]"
  />

  {/* 🟡 Imagen MercadoPago Mobile (sin bordes ni fondo) */}
  <img
    src={mercadopagomobil}
    alt="Mercado Pago Móvil"
    className="hidden max-[412px]:block w-[380px] h-[56px] object-cover bg-transparent"
  />

  {/* 🟣 Imagen Yape Desktop (vuelve a tu diseño original) */}
  <div className="w-[144px] h-[56px] rounded-full shadow-md bg-[#5F0672] flex items-center justify-center max-[412px]:hidden max-[960px]:w-[110px] max-[540px]:w-[70px] max-[540px]:h-[40px]">
    <img
      src={yape}
      alt="Yape"
      className="object-contain w-[40px] h-[42px] max-[540px]:w-[30px] max-[540px]:h-[32px]"
    />
  </div>

  {/* 🟣 Imagen Yape Mobile (sin bordes ni fondo) */}
  <img
    src={yapemobil}
    alt="Yape Móvil"
    className="hidden max-[412px]:block w-[380px] h-[56px] object-cover bg-transparent"
  />
  <div className="hidden max-[412px]:block h-8"></div>
</div>





        </div>

        <p
  className="text-xs text-gray-400 mt-2
    max-[412px]:hidden"
>
  Aplican términos y condiciones
</p>

      </div>
    </div>
  </>
)}
{/* Paso 4: Resumen de compra — solo 412px */}
{paso === 4 && window.innerWidth <= 412 && (
  <div className="p-4 bg-white rounded-none shadow-none">
    <h1 className="text-xl font-semibold text-gray-900 mb-4">
      Pago
    </h1>
 <div className="flex items-center justify-between mb-4">
  <p className="text-sm text-gray-500 max-[412px]:mb-4">
    Tienes {carrito.length} pedidos
  </p>

  <button
    className="px-3 py-2.5 text-xs border border-gray-300 rounded-full 
               text-gray-600 hover:bg-gray-100 flex items-center justify-center gap-1.5 font-medium
               shrink-0 self-start
               -mt-1 max-[412px]:-mt-3"  // 🔹 súbelo un poquito (menos en 412)
  >
    <Edit16Filled className="flex-shrink-0 text-[14px]" />
    Editar pedido
  </button>
  
</div>
<p className="text-lg font-semibold text-gray-800 mt-4 mb-6
        max-[768px]:text-base
        max-[412px]:mt-2 max-[412px]:mb-4
      ">
        Cupones
      </p>
      <div
  className="flex items-center
             max-[412px]:flex-row max-[412px]:items-center max-[412px]:gap-2 max-[412px]:mb-4"
>
  {/* Input: ligeramente más alto */}
  <div
    className="relative w-45
               max-[1280px]:w-[160px]
               max-[768px]:w-[180px]
               max-[412px]:flex-[1.2] max-[412px]:min-w-0"
  >
    <Tag24Regular className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
    <input
      type="text"
      placeholder="Cód. de cupón"
      className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-none text-xs
                 max-[412px]:py-3 max-[412px]:text-sm"
    />
  </div>

  {/* Botón: más grande y con separación */}
  <button
    className="px-5 py-3 bg-[#DFE162] text-gray-800 rounded-2xl hover:bg-yellow-400 transition text-xs
               max-[412px]:text-sm max-[412px]:h-11 max-[412px]:px-7
               max-[412px]:flex-[0.5] max-[412px]:w-auto max-[412px]:ml-2 max-[412px]:whitespace-nowrap"
  >
    Aplicar
  </button>
</div>






    {/* Totales */}
    <div className="pt-2 space-y-4 text-gray-700 max-[412px]:space-y-3"
      >

    
      <p className='text-lg font-semibold text-gray-800
        max-[768px]:text-base
      '>
        Resumen de la orden
      </p>

      <p className="flex justify-between text-sm">
        <span>Subtotal</span> <span>S/ {subTotal.toFixed(2)}</span>
      </p>
      
      <p className="flex justify-between text-sm">
        <span>Ahorro total</span> <span>S/ {costoDeEnvio.toFixed(2)}</span>
      </p>

      <p className="flex justify-between text-sm ">
        <span>Envío</span> <span>S/ {costoDeEnvio.toFixed(2)}</span>
      </p>

      <hr className="border-t border-gray-300 my-2 " />

      <p className="flex justify-between font-semibold text-lg
        max-[768px]:text-base 
      ">
        <span>Total</span> <span>S/ {total.toFixed(2)}</span>
      </p>
    </div>

    <div className="hidden max-[412px]:block h-67"></div>
    
  </div>
)}

        </main>



        {/* Resumen - NO SE TOCA */}
      <aside
  className={`bg-white rounded-r-3xl p-6 shadow-sm xl:col-span-1 flex flex-col
    max-[1279px]:col-span-6
    max-[1024px]:col-span-6
    max-[768px]:col-span-1
    max-[412px]:p-4 max-[412px]:rounded-none 
    max-[412px]:bg-transparent 
    max-[412px]:shadow-[0_-10px_20px_rgba(0,0,0,0.08)]
  `}
>
  <div>
    {/* 🔹 Ocultamos todo en móviles excepto resumen */}
    <div className="max-[412px]:hidden">
      <h2 className="text-xl font-bold text-gray-800 mb-6
        max-[768px]:text-lg
        max-[412px]:text-base max-[412px]:mb-4
      ">
        Detalles del pedido
      </h2>
      <p className="text-sm text-gray-500 mb-6
        max-[412px]:mb-4
      ">
        Tienes {carrito.length} productos en tu carrito
      </p>
      
      <hr className="border-t border-gray-300 my-6 max-[412px]:my-4" />
      <p className="text-lg font-semibold text-gray-800 mt-4 mb-6
        max-[768px]:text-base
        max-[412px]:mt-2 max-[412px]:mb-4
      ">
        Cupones
      </p>

      <div className="flex items-center gap-x-3
        max-[412px]:flex-col max-[412px]:items-stretch max-[412px]:gap-2 max-[412px]:mb-4
      ">
        <div className="relative w-45
          max-[1280px]:w-[160px]
          max-[768px]:w-[180px]
          max-[412px]:w-full
        ">
          <Tag24Regular className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Cód. de cupón"
            className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-none text-xs
              max-[412px]:py-2.5
            "
          />
        </div>

        <button className="px-4 py-3 bg-[#DFE162] text-gray-800 rounded-2xl hover:bg-yellow-400 transition text-xs
          max-[412px]:w-full max-[412px]:py-2.5
        ">
          Aplicar
        </button>
      </div>

      <hr className="border-t border-gray-300 my-6 max-[412px]:my-4" />
    </div>

    {/* 🔹 Resumen visible también en móviles */}
    <div
      className={`pt-2 space-y-4 text-gray-700 max-[412px]:space-y-3 ${
  paso === 2 || paso === 3 || paso === 4 ? "max-[412px]:hidden" : ""
}`}

    >
      <p className='text-lg font-semibold text-gray-800
        max-[768px]:text-base
      '>
        Resumen de la orden
      </p>

      <p className="flex justify-between text-sm">
        <span>Subtotal</span> <span>S/ {subTotal.toFixed(2)}</span>
      </p>
      
      <p className="flex justify-between text-sm">
        <span>Ahorro total</span> <span>S/ {costoDeEnvio.toFixed(2)}</span>
      </p>

      <p className="flex justify-between text-sm max-[412px]:hidden">
        <span>Envío</span> <span>S/ {costoDeEnvio.toFixed(2)}</span>
      </p>

      <hr className="border-t border-gray-300 my-2 max-[412px]:hidden" />

      <p className="flex justify-between font-semibold text-lg
        max-[768px]:text-base max-[412px]:hidden
      ">
        <span>Total</span> <span>S/ {total.toFixed(2)}</span>
      </p>
    </div>
  </div>

  {/* 🔹 Botón visible siempre */}
  <div className="mt-auto">
    <label className="flex items-center gap-2 text-sm text-gray-600 mb-6 cursor-pointer
      max-[412px]:hidden
    ">
      <input
        type="radio"
        className="h-4 w-4 text-yellow-400 border-gray-400 focus:ring-yellow-300"
      />
      términos y condiciones
    </label>

    <button
  onClick={() => {
    if (window.innerWidth <= 412) {
      if (paso === 3) {
        setPaso(4); // ➜ mostrar Paso 4 en móvil
        return;
      }
      if (paso === 4) {
        // Acción final de compra en móvil (cámbialo por tu lógica real)
        alert("✅ Compra confirmada");
        return;
      }
      setPaso(paso + 1);
    } else {
      setPaso((prev) => (prev === 3 ? 1 : prev + 1));
    }
  }}
  className="w-full py-3 bg-[#DFE162] text-gray-900 rounded-full font-medium text-xs hover:bg-yellow-400 transition
    max-[412px]:py-2.5"
>
  {window.innerWidth <= 412 && paso === 4
    ? "Confirmar compra"
    : window.innerWidth <= 412 && paso === 3
    ? "Realizar pago"
    : window.innerWidth <= 412 && paso === 1
    ? "Continuar con la compra"
    : "Continuar con los métodos de pago"}
</button>

  </div>
</aside>







      </div>
    </div>
  );
};

export default Cart;

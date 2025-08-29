//Este elemento sirve para desenfocar y oscurecer el fondo al clikear sobre un componente de la navbar

export default function ScreenDimmer({ onClick }) {
  return (
    <div
      className="fixed inset-0 min-h-screen bg-black/40 backdrop-blur-sm z-40"
      onClick={onClick}
    />
  );
}
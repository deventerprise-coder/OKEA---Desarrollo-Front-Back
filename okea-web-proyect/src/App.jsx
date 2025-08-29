import React from 'react';
import Navbar from './components/componentes/Navbar/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <div style={{ padding: '2rem', marginTop: '4rem' }}>
                <h1>¡Bienvenido a OKEA!</h1>
                <p>Este es La pagina de Inicio</p>
            </div>
        </>
    );
}

export default App;
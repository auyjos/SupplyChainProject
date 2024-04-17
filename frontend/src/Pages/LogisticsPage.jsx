import React from 'react';
import imagen from '../assets/imagen.jpeg';
import NavbarComponent from '../components/NavbarComponent';

const LogisticaPage = () => {
  return (
    <div className="container">
      <NavbarComponent />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Bienvenido a la Página de Logística</h1>      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Nuestros Servicios:</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Transporte de mercancías</li>
          <li>Almacenamiento y distribución</li>
          <li>Seguimiento en tiempo real</li>
          <li>Optimización de rutas</li>
        </ul>
      </div>
      <p className="text-lg text-gray-700 max-w-lg text-center">
        Aquí encontrarás información detallada sobre nuestras operaciones logísticas. Desde la gestión de inventario hasta la entrega puntual, estamos comprometidos con la eficiencia y la calidad.
      </p>
      <img src={imagen} alt="Logística" className="w-64 h-64 object-cover rounded-lg shadow-md mb-8" />

      

      </div>
    </div>
  );
};

export default LogisticaPage;

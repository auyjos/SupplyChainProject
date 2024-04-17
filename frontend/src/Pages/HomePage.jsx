// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';

const HomePage = () => {
  return (
    <div className="container">
        <NavbarComponent />
      <h1>¡Bienvenido a nuestra aplicación!</h1>
      <Link to="/logistica">Ver página de logística</Link>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CircularMenu.css';
import './menuwhat.css';
import Logo3 from './Imagenes/Valladolidencantar01.gif';

const PrincipalRecarga = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [Logo3];

  // Carrusel (aunque ahora solo tienes 1 imagen)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia cada 5s (ajústalo si quieres)

    return () => clearInterval(interval);
  }, [images.length]);

  // Redirigir después de 7 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // envía a la página inicial
    }, 5800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="contenedor">
      <div className="DivLogo">
        <img
          src={images[currentImageIndex]}
          alt={`Imagen ${currentImageIndex + 1}`}
          className="logo-image"
        />
      </div>

    </div>
  );
};

export default PrincipalRecarga;

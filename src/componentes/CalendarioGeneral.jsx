import React, { useState, useEffect } from 'react';
import './CircularMenu.css';


import Logo3 from './Imagenes/Valladolidencantar01.gif';

const CalendarioGeneral = () => {

     // Estado para las imágenes en el carrusel
     const [currentImageIndex, setCurrentImageIndex] = useState(0);

     // Lista de imágenes para el carrusel
     const images = [
         
         Logo3,
         
      
     ];
 
     // Efecto para cambiar imágenes automáticamente
     useEffect(() => {
         const interval = setInterval(() => {
             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
         }, 17000); // Cambia cada 20 segundos
 
         return () => clearInterval(interval); // Limpia el intervalo al desmontar
     }, [images.length]);

const [showMenu, setShowMenu] = useState(false);

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

export default CalendarioGeneral;

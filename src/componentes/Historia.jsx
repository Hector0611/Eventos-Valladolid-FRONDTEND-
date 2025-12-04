import React, { useState, useEffect } from 'react';
import './Historia.css';

import Logo1 from './Imagenes/ImagenesDescobere/Valladolid.png';
import Logo2 from './Imagenes/ImagenesDescobere/Cenote3.jpg';
import Logo3 from './Imagenes/ImagenesDescobere/Tradiciones.jpg';

const Historia = () => {
  const [historia, setHistoria] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fade, setFade] = useState(false);
  const imagenes = [Logo1, Logo2, Logo3];
  const [index, setIndex] = useState(0);

  // Cambia automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleLeerMas = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + historia.length) % historia.length);
      setFade(false);
    }, 300);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % historia.length);
      setFade(false);
    }, 100);
  };

  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/historia')
      .then((response) => response.json())
      .then((data) => setHistoria(data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [historia]);

  return (
    <div className="historia-container">
<div className='Separacion'></div>
<h1 className="titel111">Meet Valladolid, Yucatán, Mexico.</h1>
      <div 
  className="slider-full-container"
  onMouseMove={(e) => {
    const x = (e.clientX / window.innerWidth - 0.75) * 40;
    const y = (e.clientY / window.innerHeight - 0.75) * 40;
    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  }}
>
  <img
    src={imagenes[index]}
    alt="Slider Valladolid"
    className="slider-full-img"
  />

</div>
    <hr />
        <br />
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/iw5Ur7GW4Rk"
            title="Conoce a Valladolid, Yucatán. México"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* JSON-LD para SEO del video */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Conoce a Valladolid, Yucatán. México",
      "description": "Descubre Valladolid, Yucatán: su cultura, historia, cenotes y tradiciones en este video.",
      "thumbnailUrl": "https://img.youtube.com/vi/iw5Ur7GW4Rk/maxresdefault.jpg",
      "uploadDate": "2025-09-24",
      "duration": "PT3M20S",
      "embedUrl": "https://www.youtube.com/embed/iw5Ur7GW4Rk",
      "contentUrl": "https://visitavalladolidmx.com/"
    }
    `}
  </script>
    <br />

      <h1 className="titel111">Learn about the history of Valladolid, Yucatan, México</h1>

      <div className="historia-carrusel">
        {historia.map((item, index) => {
          let className = 'historia-item hidden';

          if (index === currentIndex) {
            className = 'historia-item current';
          } else if (index === (currentIndex + 1) % historia.length) {
            className = 'historia-item next';
          } else if (index === (currentIndex - 1 + historia.length) % historia.length) {
            className = 'historia-item prev';
          }

          return (
            <div key={index} className={`${className} ${fade ? 'fade-out' : 'fade-in'}`}>
              <img
                className="historia-fondo-imagen"
                src={`https://eventos-valladolid-backendt.onrender.com/${item.url_imagen}`}
                alt={item.titulo}
              />
              <div className="historia-overlay">
                <h2 className="titulo5">{item.titulo}</h2>
                <div className="historia-texto">

                  
                  <p>
                    {item.descripccion
                  ? item.descripccion.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
                  : 'Sin descripción'}
                  </p>
                  
                </div>
                <button className="historia-link" onClick={() => handleLeerMas(item)}>Read more</button>
              </div>
            </div>
          );
        })}

        <button className="nav-button_left" onClick={handlePrev}>❮</button>
        <button className="nav-button_right" onClick={handleNext}>❯</button>
      </div>

      {showModal && selectedItem && (
        <div className="modal-overlay11">
          <div className="modal-content11">
            <button className="close-button222 " onClick={() => setShowModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="xbutton" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
            <h2 className="titel111 tituls">{selectedItem.titulo}</h2>
            <img
              src={`https://eventos-valladolid-backendt.onrender.com/${selectedItem.url_imagen}`}
              alt={selectedItem.titulo}
              className="modal-image11"
            />
            <p className="texto-pre11" dangerouslySetInnerHTML={{ __html: selectedItem.descripccion }}></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historia;
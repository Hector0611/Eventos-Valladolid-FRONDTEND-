import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Historia.css';

import Logo1 from './Imagenes/ImagenesDescobere/Valladolid.png';
import Logo2 from './Imagenes/ImagenesDescobere/Cenote3.jpg';
import Logo3 from './Imagenes/ImagenesDescobere/Tradiciones.jpg';
import Logo4 from './Imagenes/ImagenesDescobere/Cenote4.jpg';
import Logo5 from './Imagenes/ImagenesDescobere/Cenote5.jpg';

const Historia = () => {
  const [historia, setHistoria] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fade, setFade] = useState(false);
  const [index, setIndex] = useState(0);

  const imagenes = useMemo(() => [Logo1, Logo2, Logo3, Logo4, Logo5], []);

  // Slider principal
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [imagenes.length]);

  const handleLeerMas = useCallback((item) => {
    setSelectedItem(item);
    setShowModal(true);
  }, []);

  const handlePrev = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + historia.length) % historia.length);
      setFade(false);
    }, 250);
  }, [historia.length]);

  const handleNext = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % historia.length);
      setFade(false);
    }, 250);
  }, [historia.length]);

  // Fetch solo una vez
  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/historia')
      .then((response) => response.json())
      .then((data) => setHistoria(data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  // Auto-carrusel historia
  useEffect(() => {
    if (historia.length === 0) return;

    const interval = setInterval(() => handleNext(), 10000);
    return () => clearInterval(interval);
  }, [historia.length, handleNext]);

  return (
    <div className="historia-container">
      <div className='Separacion'></div>
      <h1 className="titel111">Meet Valladolid, Yucatán, Mexico.</h1>

      {/* SLIDER DE PORTADA */}
      <div
        className="slider-full-container"
        onMouseMove={(e) => {
          const x = (e.clientX / window.innerWidth - 0.75) * 90;
          /* const y = (e.clientY / window.innerHeight - 0.75) * 90; */
          e.currentTarget.style.transform = `translate(${x}px)`;
        }}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(0px, 0px)')}
      >
        <img
          src={imagenes[index]}
          alt="Slider Valladolid"
          className="slider-full-img"
          loading="lazy"
        />
      </div>

      <hr />
      <br />

      {/* VIDEO 1 */}
      {/* VIDEO 1 */}
      <div className="video-info-section">
        <div className="video-box">
          <iframe
            src="https://www.youtube.com/embed/iw5Ur7GW4Rk"
            title="Conoce Valladolid, Yucatán"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-info">
          <h2>Discover Valladolid</h2>
          <p>
            This video introduces Valladolid, Yucatán — a magical town full of cenotes,
            colonial architecture, gastronomy, culture, and unforgettable experiences.
            Learn what to visit, where to go, and why Valladolid is one of Mexico’s most
            charming destinations.
          </p>
        </div>
      </div>


      <br />

      <h1 className="titel111">Learn about the history of Valladolid, Yucatan, México</h1>

      {/* CARRUSEL HISTORIA */}
      <div className="historia-carrusel">
        {historia.map((item, i) => {
          let className = "historia-item hidden";
          if (i === currentIndex) className = "historia-item current";
          else if (i === (currentIndex + 1) % historia.length) className = "historia-item next";
          else if (i === (currentIndex - 1 + historia.length) % historia.length) className = "historia-item prev";

          return (
            <div key={i} className={`${className} ${fade ? "fade-out" : "fade-in"}`}>
              <img
                className="historia-fondo-imagen"
                src={`https://eventos-valladolid-backendt.onrender.com/${item.url_imagen}`}
                alt={item.titulo}
                loading="lazy"
              />
              <div className="historia-overlay">
                <h2 className="titulo5">{item.titulo}</h2>

                <div className="historia-texto">
                  <p>
                    {item.descripccion
                      ? item.descripccion.replace(/<[^>]*>/g, "").slice(0, 150) + "..."
                      : "Sin descripción"}
                  </p>
                </div>

                <button className="historia-link" onClick={() => handleLeerMas(item)}>
                  Read more
                </button>
              </div>
            </div>
          );
        })}

        <button className="nav-button_left" onClick={handlePrev}>❮</button>
        <button className="nav-button_right" onClick={handleNext}>❯</button>
      </div>

      {/* VIDEO 2 */}
      {/* VIDEO 2 */}
      <div className="video-info-section reverse">
        <div className="video-info">
          <h2>Festivities & Traditions of Yucatán</h2>
          <p>
            Explore the vibrant traditions of Yucatán: religious celebrations,
            traditional dances, local fairs, music, and ancestral customs that define
            the Mayan and Yucatecan identity.
          </p>
        </div>

        <div className="video-box">
          <iframe
            src="https://www.youtube.com/embed/jbeHlcISQbQ"
            title="Fiestas y Tradiciones de Yucatán"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>


      {/* MODAL */}
      {showModal && selectedItem && (
        <div className="modal-overlay11">
          <div className="modal-content14">
            <button className="close-button222" onClick={() => setShowModal(false)}>
              ✖
            </button>

            <h2 className="titel111 tituls">{selectedItem.titulo}</h2>

            <img
              src={`https://eventos-valladolid-backendt.onrender.com/${selectedItem.url_imagen}`}
              alt={selectedItem.titulo}
              className="modal-image11"
              loading="lazy"
            />
  
            <p
              className="texto-pre11"
              dangerouslySetInnerHTML={{ __html: selectedItem.descripccion }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historia;

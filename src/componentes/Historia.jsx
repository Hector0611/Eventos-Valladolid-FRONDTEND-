import React, { useState, useEffect } from 'react';
import './Historia.css';

const Historia = () => {
  const [historia, setHistoria] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fade, setFade] = useState(false);

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
    fetch('http://localhost:3001/api/historia')
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
      <h1 className="titulo">Conoce La Historia de Valladolid Yucatán México</h1>

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
                src={`http://localhost:3001/${item.url_imagen}`}
                alt={item.titulo}
              />
              <div className="historia-overlay">
                <h2 className="titulo">{item.titulo}</h2>
                <div className="historia-texto">
                  <p>{item.descripccion.slice(0, 300)}...</p>
                  
                </div>
                <button className="historia-link" onClick={() => handleLeerMas(item)}>Leer más</button>
              </div>
            </div>
          );
        })}

        <button className="nav-button_left" onClick={handlePrev}>❮</button>
        <button className="nav-button_right" onClick={handleNext}>❯</button>
      </div>

      {showModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <h2 className="titulo">{selectedItem.titulo}</h2>
            <img
              src={`http://localhost:3001/${selectedItem.url_imagen}`}
              alt={selectedItem.titulo}
              className="modal-image"
            />
            <p className="modal-description">{selectedItem.descripccion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historia;

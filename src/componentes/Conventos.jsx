import React, { useState, useEffect } from 'react';
import './Historia.css';

const Conventos = () => {
  const [historia, setHistoria] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLeerMas = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/conventos')
      .then((response) => response.json())
      .then((data) => setHistoria(data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="historia-container">
      <h1 className="titel1">Conventos e Iglesias en Valladolid</h1>

      <div className="conventos-grid">
        {historia.map((item, index) => (
          <div key={index} className="convento-card">
            <img
              className="convento-imagen"
              src={`https://eventos-valladolid-backendt.onrender.com/${item.url_imagen}`}
              alt={item.titulo}
            />
            <div className="convento-overlay">
              <h2 className="titulo1">{item.titulo}</h2>
              <p>{item.descripccion.slice(0, 150)}...</p>
              <button className="historia-link" onClick={() => handleLeerMas(item)}>
                Leer más
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button1" onClick={() => setShowModal(false)}>X</button>
            <h2 className="titel1">{selectedItem.titulo}</h2>
            <img
              src={`https://eventos-valladolid-backendt.onrender.com/${selectedItem.url_imagen}`}
              alt={selectedItem.titulo}
              className="modal-image"
            />
            <p className="texto-pre" dangerouslySetInnerHTML={{ __html: selectedItem.descripccion }}></p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.latitud},${selectedItem.longitud}`}
              target="_blank"
              rel="noopener noreferrer"
              className="directions-button"
            >
              Indications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conventos;

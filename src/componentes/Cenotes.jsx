import React, { useState, useEffect } from 'react';
import './Historia.css';

const Cenotes = () => {
  const [cenotes, setCenotes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLeerMas = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/cenotes')
      .then((response) => response.json())
      .then((data) => {
        /* console.log("Cenotes recibidos:", data); */
        setCenotes(data);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="historia-container">
      <h1 className="titel1">Cenotes en Valladolid</h1>

      <div className="conventos-grid"> {/* 👈 mismo estilo de Conventos */}
        {cenotes.map((item, index) => (
          <div key={index} className="convento-card"> {/* 👈 misma tarjeta */}
            <img
              className="convento-imagen"
              src={`https://eventos-valladolid-backendt.onrender.com/${item.url_imagen}`}
              alt={item.titulo}
              onError={(e) => {
                console.error("Error cargando imagen:", item.url_imagen);
                e.target.src =
                  "https://via.placeholder.com/600x400?text=Sin+imagen";
              }}
            />
            <div className="convento-overlay">
              <h2 className="titulo1">{item.titulo}</h2>
              <p>{item.descripccion ? item.descripccion.slice(0, 150) : 'Sin descripción'}...</p>
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
            <button
              className="close-button1"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <h2 className="titel1">{selectedItem.titulo}</h2>
            <img
              src={`https://eventos-valladolid-backendt.onrender.com/${selectedItem.url_imagen}`}
              alt={selectedItem.titulo}
              className="modal-image"
            />
            <p className="texto-pre" dangerouslySetInnerHTML={{ __html: selectedItem.descripccion }}></p>

            {/* Botón de indicaciones, si tu API tiene latitud/longitud */}
            {selectedItem.latitud && selectedItem.longitud && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.latitud},${selectedItem.longitud}`}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-button"
              >
                Indications
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cenotes;

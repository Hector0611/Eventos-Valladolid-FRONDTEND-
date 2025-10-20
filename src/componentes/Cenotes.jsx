import React, { useState, useEffect } from 'react';
import './cenote.css';

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
    <div className="historia-container1">
      <h1 className="titel11">Cenotes in Valladolid</h1>

      <div className="conventos-grid1"> {/* 👈 mismo estilo de Conventos */}
        {cenotes.map((item, index) => (
          <div key={index} className="convento-card1"> {/* 👈 misma tarjeta */}
            <img
              className="convento-imagen1"
              src={`https://eventos-valladolid-backendt.onrender.com/${item.url_imagen}`}
              alt={item.titulo}
              onError={(e) => {
                console.error("Error cargando imagen:", item.url_imagen);
                e.target.src =
                  "https://via.placeholder.com/600x400?text=Sin+imagen";
              }}
            />
            <div className="convento-overlay1">
              <h2 className="titulo11">{item.titulo}</h2>
              <p>
                {item.descripccion
                  ? item.descripccion.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
                  : 'Sin descripción'}
              </p>

              <button className="historia-link1" onClick={() => handleLeerMas(item)}>
                More
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedItem && (
        <div className="modal-overlay1">
          <div className="modal-content1">
            <button
              className="close-button22"
              onClick={() => setShowModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="xbutton1" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
            <h2 className="titel11 tituls1">{selectedItem.titulo}</h2>
            <img
              src={`https://eventos-valladolid-backendt.onrender.com/${selectedItem.url_imagen}`}
              alt={selectedItem.titulo}
              className="modal-image1"
            />

            {/* Botón de indicaciones, si tu API tiene latitud/longitud */}
            {selectedItem.latitud && selectedItem.longitud && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.latitud},${selectedItem.longitud}`}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-button11"
              >
                Indications <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="iconmap1" viewBox="0 0 16 16">
                              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
              </a>
            )}
            <p className="texto-pres1" dangerouslySetInnerHTML={{ __html: selectedItem.descripccion }}></p>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default Cenotes;

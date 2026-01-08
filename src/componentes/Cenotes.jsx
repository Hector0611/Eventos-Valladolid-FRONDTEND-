import React, { useState, useEffect } from "react";
import "./cenote.css";

const Cenotes = () => {
  const [cenotes, setCenotes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleLeerMas = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setShowMap(false);
  };

  useEffect(() => {
    fetch("https://eventos-valladolid-backendt.onrender.com/api/cenotes")
      .then((res) => res.json())
      .then((data) => setCenotes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="historia-container1">
      <h1 className="titel11">Cenotes in Valladolid</h1>

      <div className="conventos-grid1">
        {cenotes.map((item, index) => (
          <div key={index} className="convento-card1">
            <img
              className="convento-imagen1"
              src={`https://eventos-valladolid-backendt.onrender.com/${item.url_imagen}`}
              alt={item.titulo}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/600x400?text=Sin+imagen")
              }
            />

            <div className="convento-overlay1">
              <h2 className="titulo11">{item.titulo}</h2>
              <p>
                {item.descripccion
                  ? item.descripccion.replace(/<[^>]*>/g, "").slice(0, 150) +
                    "..."
                  : "Sin descripción"}
              </p>

              <button
                className="historia-link1"
                onClick={() => handleLeerMas(item)}
              >
                More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selectedItem && (
        <div className="modal-overlay1">
          <div className="modal-content1">
            {/* ❌ CERRAR */}
            <button
              className="close-button22"
              onClick={() => {
                setShowModal(false);
                setShowMap(false);
              }}
            >
              ✕
            </button>

            <h2 className="titel11 tituls1">{selectedItem.titulo}</h2>

            {/* 🖼️ / 🗺️ SLIDER */}
            <div className="media-slider">
              <div className={`media-track ${showMap ? "show-map" : ""}`}>
                {/* IMAGEN */}
                <div className="media-panel image-panel">
                  <img
                    src={`https://eventos-valladolid-backendt.onrender.com/${selectedItem.url_imagen}`}
                    alt={selectedItem.titulo}
                  />
                </div>

                {/* MAPA */}
                <div className="media-panel map-panel">
                  <iframe
                    title="Ubicación"
                    src={`https://www.google.com/maps?q=${selectedItem.latitud},${selectedItem.longitud}&hl=es&z=16&output=embed`}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* BOTÓN */}
            {selectedItem.latitud && selectedItem.longitud && (
              <button
                className="view-map-btn"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "View image" : "View map"}
              </button>
            )}

            <p
              className="texto-pres1"
              dangerouslySetInnerHTML={{
                __html: selectedItem.descripccion,
              }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cenotes;

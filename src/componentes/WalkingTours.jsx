import React, { useEffect, useState } from "react";
import "./WalkingTours.css";

export default function WalkingTours() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://eventos-valladolid-backendt.onrender.com/api/walking_guides";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        //guardamos solo las guías activas
        const activos = data.filter((g) => g.activo === true);
        setGuides(activos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando guías:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="walking-loading">Cargando guías...</p>;
  }

  return (
    <div className="walking-container">
      <div className="Separacion"></div>

      <h2 className="walking-title">Walking Tours</h2>
      <p className="walking-subtitle">
        Explore the city with certified guides. Each tour is personalized to suit your interests.
      </p>

      <div className="walking-grid">
        {guides.map((guia) => (
          <div className="walking-card" key={guia.id}>
           

            <img
                src={`https://eventos-valladolid-backendt.onrender.com${
                guia.foto
                }`}
                alt={guia.lugar_nombre}
                className="walking-image"
            />
            <br />

            <div className="walking-content">
              <h3>{guia.nombre}</h3>

              <p className="walking-exp">{guia.experiencia}</p>

              <p className="walking-languages">
                <strong>Idiomas:</strong>{" "}
                {guia.idiomas
                  ? guia.idiomas
                  : "No especificado"}
              </p>

              <p className="walking-desc" dangerouslySetInnerHTML={{ __html: guia.descripcion }}></p>

              <div className="walking-footer">
                <span className="walking-price">
                  ${Number(guia.precio).toFixed(2)} MXN por persona
                </span>

                <a
                  href={`https://wa.me/52${guia.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="walking-btn"
                >
                  Contactar Guía
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

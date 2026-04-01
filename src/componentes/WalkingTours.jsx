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
                  {/* ${Number(guia.precio).toFixed(2)} MXN por persona */}
                  Contactar por WhatsApp: 
                </span>

                <a
                  href={`https://wa.me/52${guia.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="walking-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="ContacWhatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

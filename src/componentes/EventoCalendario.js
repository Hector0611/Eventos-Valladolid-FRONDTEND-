import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventoCalendario.css';

const EventoCalendario = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const dia_id = params.get('dia_id');
  const mes_id = params.get('mes_id');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const mesNombre = mes_id > 0 && mes_id <= 12 ? months[mes_id - 1] : "Invalid month";

  const [mensajes, setMensajes] = useState([]);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (dia_id && mes_id) {
      axios
        .get(`https://eventos-valladolid-backendt.onrender.com/api/mensajes?dia_id=${dia_id}&mes_id=${mes_id}`)
        .then(response => setMensajes(response.data))
        .catch(error => console.error('Error al cargar mensajes:', error));
    }
  }, [dia_id, mes_id]);

  const toggleVideoMap = () => setShowVideo(!showVideo);
  const irAHoteles = () => navigate('/hoteles');

  return (
    <div className="evento-calendario-container">
      <div className='Separacion'></div>
      <h1 className="titulo-evento">Events of {mesNombre} {dia_id}, 2025</h1>

      {mensajes.length > 0 ? (
        mensajes.map((mensaje) => (
          <div key={mensaje.id} className="card-evento">
            <h2 className="titulo-card">{mensaje.titulo}</h2>
            <p className="mensaje-card">{mensaje.mensaje}</p>

            <div className="media-wrapper">
              {mensaje.video && showVideo ? (
                <div className="video-container fade-in">
                  

                  <iframe
                    title="Ubicación del evento"
                    width="100%"
                    height="420"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${mensaje.latitud},${mensaje.longitud}&hl=es&z=16&output=embed`}
                  ></iframe>
                </div>
              ) : mensaje.latitud && mensaje.longitud ? (
                <div className="map-container fade-in">
                  <iframe
                    src={`${mensaje.video.replace("watch?v=", "embed/")}?autoplay=1`}
                    title="Event Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}
            </div>

            <div className="botones-accion">
              {mensaje.video && mensaje.latitud && mensaje.longitud && (
                <button className="btn-secundario" onClick={toggleVideoMap}>
                  {showVideo ? "Show Video" : "Show Location"}
                </button>
              )}
              {mensaje.latitud && mensaje.longitud && (
                <button
                  className="btn-principal"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${mensaje.latitud},${mensaje.longitud}`,
                      "_blank"
                    )
                  }
                >
                  📍 Go to Event Location
                </button>
              )}
              <button className="btn-secundario" onClick={irAHoteles}>
                🏨 Search Hotels
              </button>
            </div>

            <div className="descripcion-card" dangerouslySetInnerHTML={{ __html: mensaje.descripcion }}></div>
          </div>
        ))
      ) : (
        <p className="no-eventos">No events available for this day.</p>
      )}
    </div>
  );
};

export default EventoCalendario;

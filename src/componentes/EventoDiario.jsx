import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventoDiario.css';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import logo1 from './Imagenes/Videomapping01.png';
import logo2 from './Imagenes/Videomapping02.png';

const EventoDiario = () => {
    const [eventos, setEventos] = useState([]);
    const [showMapModal, setShowMapModal] = useState(false);
    const [eventoActual, setEventoActual] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    


    useEffect(() => {
        axios.get('http://localhost:3001/api/eventdiario')
            .then(response => setEventos(response.data))
            .catch(error => console.error('Error al cargar eventos diarios:', error));
    }, []);

    useEffect(() => {
    axios.get('http://localhost:3001/api/eventos_diarios2')
        .then(response => setImagenes(response.data))
        .catch(error => console.error('Error al cargar imágenes:', error));
}, []);



    const customIcon = new L.Icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23FF0000" className="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>',
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -30],
    });

    const abrirModalMapa = (evento) => {
        setEventoActual(evento);
        setShowMapModal(true);
    };

    const cerrarModalMapa = () => {
        setShowMapModal(false);
        setEventoActual(null);
    };


    return (
        <div className="eventodiario-container">
            {eventos.length > 0 ? (
                
                eventos.map(evento => {
    const imagenEvento = imagenes.find(img => img.id);

    return (
        <div key={evento.id_eventdiario} className="evento-card">
             <div className="evento-overlay">
              

                <div className="contenido-sobre-imagen">
                
                
                {/* <button
                    className="bottonEvent"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${evento.latitud},${evento.longitud}`, "_blank")}
                >
                    como llegar
                </button> */}
                
                </div>  
            </div> 
            <div className='Img-videoM'>
                    <img
                        src={logo2}
                        alt={`Yucatan`}
                        className="cartel-videoM"
                  
                  />
                </div>
            </div>

    );
})

            ) : (
                <p className="titelevent">Cargando eventos...</p>
            )}

            {/* Modal del mapa */}
            {showMapModal && eventoActual && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="cerrar-modal" onClick={cerrarModalMapa}>x</button>
                        <h2 className="titelevent">{eventoActual.titulo}</h2>
                        <div className="map-container">
                            <MapContainer
                                key={eventoActual.id_eventdiario}
                                center={[parseFloat(eventoActual.latitud), parseFloat(eventoActual.longitud)]}
                                zoom={18}
                                style={{ height: '800px', width: '100%' }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker
                                    position={[parseFloat(eventoActual.latitud), parseFloat(eventoActual.longitud)]}
                                    icon={customIcon}
                                >
                                    <Tooltip permanent>{eventoActual.titulo}</Tooltip>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventoDiario;


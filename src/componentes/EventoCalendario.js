import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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

    const mesNombre = mes_id > 0 && mes_id <= 12 ? months[mes_id - 1] : "Mes inválido";

    const [mensajes, setMensajes] = useState([]);
    const [showVideo, setShowVideo] = useState(true);
    

    useEffect(() => {
        if (dia_id && mes_id) {
            axios.get(`https://eventos-valladolid-backendt.onrender.com/api/mensajes?dia_id=${dia_id}&mes_id=${mes_id}`)
                .then(response => setMensajes(response.data))
                .catch(error => console.error('Error al cargar mensajes:', error));
        }
    }, [dia_id, mes_id]);

    const toggleVideoMap = () => setShowVideo(!showVideo);
    const irAHoteles = () => navigate('/hoteles');

    const customIcon = new L.Icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23FF0000" className="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>',
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -30],
    });

    return (
        
        <div className="containerr">
            <div className='Separacion'> 

              </div>
            <h1>{mesNombre} {dia_id} Events</h1>
            {mensajes.length > 0 ? (
                
                mensajes.map(mensaje => (
                    
                    <div key={mensaje.id} className="event-detail">
                        <p>{mensaje.mensaje}</p>

                        <div className="content-wrapper">
                            <center>
                                {mensaje.video && showVideo && (
                                    <div className="video-containe">
                                        <iframe
                                            width="100%"
                                            height="360px"
                                            src={`${mensaje.video.replace("watch?v=", "embed/")}?autoplay=1`}
                                            title="Video de evento"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                
                                {
                                mensaje.latitud && mensaje.longitud && !showVideo && (
                                    <div className="map-container fade-in">
                                        <MapContainer center={[mensaje.latitud, mensaje.longitud]} zoom={18} style={{ height: "400px", width: "100%" }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[mensaje.latitud, mensaje.longitud]} icon={customIcon}>
                                                <Tooltip permanent>{mensaje.mensaje}</Tooltip>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                )}
                            </center>
                        </div>
                        <button className="bottonEvent" onClick={toggleVideoMap}>
                            {showVideo ? "Cómo llegar?" : "Regresar al video"}
                        </button>
                        {/* <button 
                            className="bottonEvent" 
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`, "_blank")}
                        >
                            Indicaciones para llegar
                        </button> */}
                        <button className="bottonEvent" onClick={irAHoteles}>Buscar hoteles</button>
                        <br></br>
                        <br></br>
                        <p dangerouslySetInnerHTML={{ __html: mensaje.descripcion }}></p>
                        <br></br>
                        <h1>-------------------------------------------------------------------------------</h1>
                        <br></br>
                    </div>
                ))
            ) : (
                <p>No hay eventos disponibles para este día.</p>
            )}
        </div>
    );
};

export default EventoCalendario;

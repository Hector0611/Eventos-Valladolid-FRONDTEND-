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
            <br />
           
             <h1 className='titel1'>Daily Events</h1>

            <br />  
            <div className='Img-videoM'>
                    <img
                        src={logo2}
                        alt={`Yucatan`}
                        className="cartel-videoM"
                  
                  />
                </div>

                <div className="contenido-sobre-imagen1">
                
                
                <button
                    className="bottonEvent2"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=20.689720,-88.201669`, "_blank")}
                >
                    Indications

                </button>
                <button
                    className="bottonEvent2"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=20.686362823195388,-88.21000163440262`, "_blank")}
                >
                    Indications

                </button>
                
                </div>  
                <details>
                    <summary>Conoces Valladolid</summary>
                    <p>hola Valladolid</p>
                </details>
            </div>

    );
})

            ) : (
                <p className="titelevent">Cargando eventos...</p>
            )}

        </div>
    );
};

export default EventoDiario;


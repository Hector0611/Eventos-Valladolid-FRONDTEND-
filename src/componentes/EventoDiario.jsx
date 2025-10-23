import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventoDiario.css';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import logo1 from './Imagenes/Videomapping01.png';
import logo2 from './Imagenes/Videomapping02.png';

const EventoDiario = () => {
   

    return (
        <div className="evento-card">
            <br />
           
             <h1 className='texto_EVETODIARIO'>Daily Events</h1>

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
                    <p className='texto_indicaciones1'>Indications</p>

                </button>
                <button
                    className="bottonEvent22"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=20.686362823195388,-88.21000163440262`, "_blank")}
                >
                    <p className='texto_indicaciones'>Indications</p>

                </button>
                
                </div>  
               {/*  <details>
                    <summary>Conoces Valladolid</summary>
                    <p>hola Valladolid</p>
                </details> */}
            </div>

    );

};

export default EventoDiario;


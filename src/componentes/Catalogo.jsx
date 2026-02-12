import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Catalogo.css';

/* Feria */
import feriaPortada from './Imagenes/ImgTempo/FeriaPortada.jpeg';

import feria0 from './Imagenes/ImgTempo/Feria0.jpeg';
import feria011 from './Imagenes/ImgTempo/Feria1.1.jpeg'; /* Nuevo */
import feria1 from './Imagenes/ImgTempo/Feria1.2.jpeg'; /* Nuevo */
import feria2 from './Imagenes/ImgTempo/Feria1.3.jpeg'; /* Nuevo */
import feria3 from './Imagenes/ImgTempo/Feria1.4.jpeg'; /* Nuevo */
import Corrida from './Imagenes/ImgTempo/Feria3.5.png'; /* Nuevo */
import feria35 from './Imagenes/ImgTempo/Feria1.5.jpeg'; /* Nuevo */
import Corrida2 from './Imagenes/ImgTempo/Feria5.5.png'; /* Nuevo */
import feria4 from './Imagenes/ImgTempo/Feria1.6.jpeg'; /* Nuevo */
import Corrida3 from './Imagenes/ImgTempo/Feria10.png'; /* Nuevo */

/* ms y matute */
import bandaMS from './Imagenes/ImgTempo/Feria1.jpg'; /* MS */
import matute from './Imagenes/ImgTempo/Feria2.jpg'; /* Matute */

/* Carnaval */
import CarnavalPortada from './Imagenes/ImgTempo/CarnavalPortada.jpg';
import Carnaval1 from './Imagenes/ImgTempo/Carnaval1.jpg';
import Carnaval2 from './Imagenes/ImgTempo/Carnaval2.jpg';
import Carnaval3 from './Imagenes/ImgTempo/Carnaval3.jpg';

/* Xcopek */
import xcopek from './Imagenes/ImgTempo/Xcopek.jpg';

/* CristoBury */
import CristoBury from './Imagenes/ImgTempo/CristoBury.png';

/* San Roque */
import SanroquePortada from './Imagenes/MuseoSanRoque/Portada.jpeg';
import SanRoque1 from './Imagenes/MuseoSanRoque/1.jpeg';
import SanRoque2 from './Imagenes/MuseoSanRoque/2.jpeg';
import SanRoque3 from './Imagenes/MuseoSanRoque/3.jpeg';
import SanRoque4 from './Imagenes/MuseoSanRoque/4.jpeg';

/* TourParanormal */
import TourParanormal from './Imagenes/ImgTempo/TourParanormal.jpeg';

/* Murem */
import Murem from './Imagenes/ImgTempo/Murem.jpeg';

/* SanValetin */
import SanValentin from './Imagenes/ImgTempo/Salsa.jpeg';

/* TranportePrecio */
import TransportePrecio from './Imagenes/ImgTempo/TranportePrecio.png';
import { t } from 'i18next';

const Catalogo = () => {
  const [indice, setIndice] = useState(0);
  const [galeriaActual, setGaleriaActual] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showMap, setShowMap] = useState(false);

      const handleLeerMas = (item) => {
        setSelectedItem(item);
        setShowModal(true);
        setShowMap(false);
      };
  const carnavalImgs = [Carnaval1, Carnaval2, Carnaval3];
  const feriaImgs = [
     feria0, feria1, feria2, feria3,Corrida,
    feria35, Corrida2, feria4, Corrida3
  ];

  const sanRoqueImgs = [SanRoque1, SanRoque2, SanRoque3, SanRoque4];


  const abrirImagen = (galeria, index) => {
    setGaleriaActual(galeria);
    setIndice(index);
    setImagenSeleccionada(galeria[index]);
  };

  const cerrarImagen = () => setImagenSeleccionada(null);

  const siguiente = (e) => {
    e.stopPropagation();
    const nuevo = (indice + 1) % galeriaActual.length;
    setIndice(nuevo);
    setImagenSeleccionada(galeriaActual[nuevo]);
  };

  const anterior = (e) => {
    e.stopPropagation();
    const nuevo = (indice - 1 + galeriaActual.length) % galeriaActual.length;
    setIndice(nuevo);
    setImagenSeleccionada(galeriaActual[nuevo]);
  };

  return (
    <div className="catalogo-container container py-5">

      
      {/* 🖼️ / 🗺️ SLIDER */}
            <div className="media-slider1">
              <div className={`media-track1 ${showMap ? "show-map1" : ""}`}>
                {/* IMAGEN */}
                <div className="media-panel image-panel1">
                  <img
                  className='ImgX'
                    src={SanValentin}
                    alt='SanValentin'
                  />
                </div>

                {/* MAPA */}
                <div className="media-panel map-panel1">
                  <iframe
                      title="SanValentin Ubicación1"
                      src="https://www.google.com/maps?q=20.69023238257896, -88.20169384381701&hl=en&z=15&output=embed"
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                </div>
              </div>
            </div>

            {/* BOTÓN */}
            
              <button
                className="view-map-btn"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "View image" : "View map"}
              </button>


      <hr />

      {/* CARNAVAL */}
      <h3 className="text-center mb-4 display-5 fw-bold">Carnaval 2026</h3>

      <div className="folleto text-center mb-4">
        <img src={CarnavalPortada} className="folleto-img rounded shadow" alt='CarnavalPortada'/>
      </div>

      <div className="row g-4">
        {carnavalImgs.map((img, index) => (
          <div key={index} className="col-6 col-md-3">
            <div
              className="card shadow-sm border-0 h-100"
              onClick={() => abrirImagen(carnavalImgs, index)}
            >
              <img src={img} className="card-img-top img-hover" alt='Carnaval'/>
            </div>
          </div>
        ))}
      </div>

      <hr />

      


      {/* MODAL */}
      {imagenSeleccionada && (
        <div className="modal11" onClick={cerrarImagen}>
          <button className="anterior" onClick={anterior}>&#10094;</button>
          <img className="modal-content11" src={imagenSeleccionada} alt='SelectecIMG'/>
          <button className="siguiente" onClick={siguiente}>&#10095;</button>
        </div>
      )}

      <hr />
              
        {/* 🖼️ / 🗺️ SLIDER */}
            <div className="media-slider2">
              <div className={`media-track2 ${showMap ? "show-map1" : ""}`}>
                {/* IMAGEN */}
                <div className="media-panel image-panel2">
                  <img
                  className='ImgX'
                    src={SanroquePortada}
                    alt='Xcopek'
                  />
                </div>

                {/* MAPA */}
                <div className="media-panel map-panel2">
                  <iframe
                      title="Xcopek Ubicación1"
                      src="https://www.google.com/maps?q=20.689656488184507, -88.19957950501954&hl=en&z=15&output=embed"
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                </div>
              </div>
            </div>

            {/* BOTÓN */}
            <br />
              <button
                className="view-map-btn"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "View image" : "View map"}
              </button>
              
      <div className="row g-4">
        {sanRoqueImgs.map((img, index) => (
          <div key={index} className="col-6 col-md-3">
            <div
              className="card shadow-sm border-0 h-100"
              onClick={() => abrirImagen(sanRoqueImgs, index)}
            >
              <img src={img} className="card-img-top img-hover" alt='SanRoque'/>
            </div>
          </div>
        ))}
      </div>

      
      <p className='textosanroque'>
                <strong> SAN ROQUE REGIONAL MUSEUM </strong>
                 <br />
                Painting Exhibition: MAYAN ARCHITECTURE: STYLES AND CHRONOLOGY.
                <br />
                Come and see it.
                <br />
                Hours: <strong> Tuesday to Friday </strong>, 8:00 AM - 8:00 PM
                <strong> Saturday and Sunday</strong> , 9:00 AM - 5:00 PM 
                <br />
                <strong> Closed Mondays.</strong>
                <br />
                41st Street #193 x 38th Street
                Downtown. Postal Code 97780
                Valladolid, Yucatán.
                Paintings by Luis Pech Moo.
                </p>
<br />
      <hr />

       {/* 🖼️ / 🗺️ SLIDER */}
            <div className="media-slider1">
              <div className={`media-track1 ${showMap ? "show-map1" : ""}`}>
                {/* IMAGEN */}
                <div className="media-panel image-panel1">
                  <img
                  className='ImgX'
                    src={xcopek}
                    alt='Xcopek'
                  />
                </div>

                {/* MAPA */}
                <div className="media-panel map-panel1">
                  <iframe
                      title="Xcopek Ubicación1"
                      src="https://www.google.com/maps?q=20.678446329789576, -88.19658280868688&hl=en&z=15&output=embed"
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                </div>
              </div>
            </div>

            {/* BOTÓN */}
            
              <button
                className="view-map-btn"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "View image" : "View map"}
              </button>




{/* Tour Paranormal */}
              {/* 🖼️ / 🗺️ SLIDER */}
            <div className="media-slider1">
              <div className={`media-track1 ${showMap ? "show-map1" : ""}`}>
                {/* IMAGEN */}
                <div className="media-panel image-panel1">
                  <img
                  className='ImgX'
                    src={TourParanormal}
                    alt='TourParanormal'
                  />
                </div>

                {/* MAPA */}
                <div className="media-panel map-panel1">
                  <iframe
                      title="TourParanormal Ubicación"
                      src="https://www.google.com/maps?q=20.69691242106862, -88.21169642328422&hl=en&z=15&output=embed"
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                </div>
              </div>
            </div>

            {/* BOTÓN */}
            
              <button
                className="view-map-btn"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "View image" : "View map"}
              </button>


              

    </div>
  );
};

export default Catalogo;

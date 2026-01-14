import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Catalogo.css';

/* Feria */
import feria01 from './Imagenes/ImgTempo/Feria0.1.jpeg';
import feria0 from './Imagenes/ImgTempo/Feria0.jpeg';
import feria1 from './Imagenes/ImgTempo/Feria3.jpg';
import feria2 from './Imagenes/ImgTempo/Feria8.jpg';
import feria3 from './Imagenes/ImgTempo/Feria2.jpg';
import feria35 from './Imagenes/ImgTempo/Feria3.5.png';
import feria4 from './Imagenes/ImgTempo/Feria5.jpg';
import feria5 from './Imagenes/ImgTempo/Feria9.jpg';
import feria55 from './Imagenes/ImgTempo/Feria5.5.png';
import feria6 from './Imagenes/ImgTempo/Feria4.jpg';
import feria7 from './Imagenes/ImgTempo/Feria1.jpg';
import feria8 from './Imagenes/ImgTempo/Feria6.jpg';
import feria9 from './Imagenes/ImgTempo/Feria10.png';

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
    feria01, feria0, feria1, feria2, feria3,
    feria35, feria4, feria5, feria55, feria6,
    feria7, feria8, feria9
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

      <h2 className="folletos">Events Catalog</h2>
      <hr />

      {/* FERIA */}
      <h3 className="text-center mb-4 display-5 fw-bold">
        Expo Feria Valladolid 2026
      </h3>

      <div className="row g-4">
        {feriaImgs.map((img, index) => (
          <div key={index} className="col-6 col-md-3">
            <div
              className="card shadow-sm border-0 h-100"
              onClick={() => abrirImagen(feriaImgs, index)}
            >
              <img src={img} className="card-img-top img-hover" />
            </div>
          </div>
        ))}
      </div>

      <hr />

      {/* MAPA */}
       <div className="map-placeholder1">
        <iframe
          title="Ubicación Expo Feria Valladolid"
          src="https://www.google.com/maps?q=20.67112532591333,-88.2286181270485&hl=en&z=13&output=embed"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <hr />

      {/* CARNAVAL */}
      <h3 className="text-center mb-4 display-5 fw-bold">Carnaval 2026</h3>

      <div className="folleto text-center mb-4">
        <img src={CarnavalPortada} className="folleto-img rounded shadow" />
      </div>

      <div className="row g-4">
        {carnavalImgs.map((img, index) => (
          <div key={index} className="col-6 col-md-3">
            <div
              className="card shadow-sm border-0 h-100"
              onClick={() => abrirImagen(carnavalImgs, index)}
            >
              <img src={img} className="card-img-top img-hover" />
            </div>
          </div>
        ))}
      </div>

      <hr />

      {/* MODAL */}
      {imagenSeleccionada && (
        <div className="modal11" onClick={cerrarImagen}>
          <button className="anterior" onClick={anterior}>&#10094;</button>
          <img className="modal-content11" src={imagenSeleccionada} />
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
              <img src={img} className="card-img-top img-hover" />
            </div>
          </div>
        ))}
      </div>

      <p className='textosanroque'>
                SAN ROQUE REGIONAL MUSEUM
                Painting Exhibition: MAYAN ARCHITECTURE: STYLES AND CHRONOLOGY.
                <br />
                Come and see it.
                <br />
                Hours: Tuesday to Friday, 8:00 AM - 8:00 PM
                Saturday and Sunday, 9:00 AM - 5:00 PM
                Closed Mondays.
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

              {/* CristoBury */}
              <div className="media-slider1">
              <div className={`media-track1 ${showMap ? "show-map1" : ""}`}>
                {/* IMAGEN */}
                <div className="media-panel image-panel1">
                  <img
                  className='ImgX'
                    src={CristoBury}
                    alt='Xcopek'
                  />
                </div>

                {/* MAPA */}
                <div className="media-panel map-panel1">
                  <iframe
                      title="Xcopek Ubicación1"
                      src="https://www.google.com/maps?q=20.687623509132724, -88.20793254442528&hl=en&z=15&output=embed"
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

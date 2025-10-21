import React, { useState } from 'react';
import './Catalogo.css';

/* Español */
import logo1 from './Imagenes/ImgTempo/1.jpg';
import logo2 from './Imagenes/ImgTempo/2.jpg';
import logo3 from './Imagenes/ImgTempo/3.jpg';
import logo4 from './Imagenes/ImgTempo/4.jpg';
import logo5 from './Imagenes/ImgTempo/5.jpg';
import logo6 from './Imagenes/ImgTempo/6.jpg';
import logo7 from './Imagenes/ImgTempo/7.jpg';
import logo8 from './Imagenes/ImgTempo/8.jpg';

/* Inglés */
import logo11 from './Imagenes/ImgTempo/1.1.jpg';
import logo22 from './Imagenes/ImgTempo/2.2.jpg';
import logo33 from './Imagenes/ImgTempo/3.3.jpg';
import logo44 from './Imagenes/ImgTempo/4.4.jpg';
import logo55 from './Imagenes/ImgTempo/5.5.jpg';
import logo66 from './Imagenes/ImgTempo/6.6.jpg';
import logo77 from './Imagenes/ImgTempo/7.jpg';
import logo88 from './Imagenes/ImgTempo/8.8.jpg';

/* Folleto */
import logoDiaMuertos from './Imagenes/ImgTempo/DiaMuertos.jpg';

import LaVidayCeiba from './Imagenes/ImgTempo/LaVidayCeiba.jpeg';

import JuanBalam from './Imagenes/ImgTempo/JuanBalam.jpeg';

/* FIESTA DE MI PUEBLO */

import Fiesta1 from './Imagenes/ImgTempo/LaFiestaPueblo1.jpeg';

import Fiesta2 from './Imagenes/ImgTempo/LaFiestaPueblo2.jpeg';

import { img } from 'framer-motion/client';


const Catalogo = () => {
  const [idioma, setIdioma] = useState("es");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indice, setIndice] = useState(0);

  const imagenes = {
    es: [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8],
    en: [logo11, logo22, logo33, logo44, logo55, logo66, logo77, logo88]
  };

  const abrirImagen = (index) => {
    setIndice(index);
    setImagenSeleccionada(imagenes[idioma][index]);
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
  };

  const siguiente = () => {
    const nuevoIndice = (indice + 1) % imagenes[idioma].length;
    setIndice(nuevoIndice);
    setImagenSeleccionada(imagenes[idioma][nuevoIndice]);
  };

  const anterior = () => {
    const nuevoIndice =
      (indice - 1 + imagenes[idioma].length) % imagenes[idioma].length;
    setIndice(nuevoIndice);
    setImagenSeleccionada(imagenes[idioma][nuevoIndice]);
  };

  return (
    <div className="catalogo-container">
       {/*  <div className='Separacion'> 
        
                      </div> */}
      <h1 className="titel1">October Nights Catalog</h1>

      {/* Botones de idioma */}
      <div className="botones-idioma">
        <button
          className={idioma === "es" ? "activo" : ""}
          onClick={() => setIdioma("es")}
        >
          Español
        </button>
        <button
          className={idioma === "en" ? "activo" : ""}
          onClick={() => setIdioma("en")}
        >
          English
        </button>
      </div>

      {/* Galería de imágenes */}
      <div className="galeria">
        {imagenes[idioma].map((img, index) => (
          <div
            key={index}
            className="tarjeta"
            onClick={() => abrirImagen(index)}
          >
            <img src={img} alt={`catalogo-${index}`} />
          </div>
        ))}
      </div>
<hr />

<div className="folleto">
        <h1 className='titel1'>Juan Balam</h1>
        {/* poner img de folleto dia de muertos */}
        <img src={JuanBalam} alt="Folleto Dia de Muertos" className="folleto-img" />
       
      </div>
      <br />

      <div className="folleto">
        <h1 className='titel1'>The Festival of My Town</h1>
        {/* poner img de folleto dia de muertos */}
        <img src={Fiesta1} alt="Folleto Dia de Muertos" className="folleto-img" />
       
      </div>
      <br />

<div className="folleto">
        <h1 className='titel1'>The vine and the ceiba</h1>
        {/* poner img de folleto dia de muertos */}
        <img src={LaVidayCeiba} alt="Folleto Dia de Muertos" className="folleto-img" />
       
      </div>
      <br />

      <div className="folleto">
        <h1 className='titel1'>Dia de Muertos</h1>
        {/* poner img de folleto dia de muertos */}
        <img src={logoDiaMuertos} alt="Folleto Dia de Muertos" className="folleto-img" />
       
      </div>

      {/* Modal de imagen */}
      {imagenSeleccionada && (
        <div className="modal11" onClick={cerrarImagen}>
          <span className="cerrar">&times;</span>
          <button className="anterior" onClick={(e) => { e.stopPropagation(); anterior(); }}>
            &#10094;
          </button>
          <img className="modal-content1" src={imagenSeleccionada} alt="zoom" />
          <button className="siguiente" onClick={(e) => { e.stopPropagation(); siguiente(); }}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogo;

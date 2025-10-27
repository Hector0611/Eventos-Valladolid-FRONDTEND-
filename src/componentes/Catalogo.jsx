import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Catalogo.css';

/* Español */
/* import logo1 from './Imagenes/ImgTempo/1.jpg';
import logo2 from './Imagenes/ImgTempo/2.jpg';
import logo3 from './Imagenes/ImgTempo/3.jpg';
import logo4 from './Imagenes/ImgTempo/4.jpg';
import logo5 from './Imagenes/ImgTempo/5.jpg';
import logo6 from './Imagenes/ImgTempo/6.jpg';
import logo7 from './Imagenes/ImgTempo/7.jpg';
import logo8 from './Imagenes/ImgTempo/8.jpg'; */

/* Inglés */
/* import logo11 from './Imagenes/ImgTempo/1.1.jpg';
import logo22 from './Imagenes/ImgTempo/2.2.jpg';
import logo33 from './Imagenes/ImgTempo/3.3.jpg';
import logo44 from './Imagenes/ImgTempo/4.4.jpg';
import logo55 from './Imagenes/ImgTempo/5.5.jpg';
import logo66 from './Imagenes/ImgTempo/6.6.jpg';
import logo77 from './Imagenes/ImgTempo/7.jpg';
import logo88 from './Imagenes/ImgTempo/8.8.jpg'; */

/* Folletos */
import logoDiaMuertos from './Imagenes/ImgTempo/DiaMuertos.jpg';
import logoDiaMuertosingles from './Imagenes/ImgTempo/DiaMuertosIngles.jpg';
import LaVidayCeiba from './Imagenes/ImgTempo/LaVidayCeiba.jpeg';
import JuanBalam from './Imagenes/ImgTempo/JuanBalam.jpeg';
import Fiesta1 from './Imagenes/ImgTempo/LaFiestaPueblo1.jpeg';
import Fiesta2 from './Imagenes/ImgTempo/LaFiestaPueblo2.jpeg';
import sabores from './Imagenes/ImgTempo/EventosNoviembre.jpg';

const Catalogo = () => {
  /* const [idioma, setIdioma] = useState("es");
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

  const cerrarImagen = () => setImagenSeleccionada(null);

  const siguiente = (e) => {
    e.stopPropagation();
    const nuevoIndice = (indice + 1) % imagenes[idioma].length;
    setIndice(nuevoIndice);
    setImagenSeleccionada(imagenes[idioma][nuevoIndice]);
  };

  const anterior = (e) => {
    e.stopPropagation();
    const nuevoIndice = (indice - 1 + imagenes[idioma].length) % imagenes[idioma].length;
    setIndice(nuevoIndice);
    setImagenSeleccionada(imagenes[idioma][nuevoIndice]);
  }; */

  return (
    <div className="catalogo-container container py-5">
      {/* <h1 className="text-center mb-4 display-5 fw-bold ">
        October Nights Catalog
      </h1>

      <div className="text-center mb-5">
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${idioma === "es" ? "active" : ""}`}
            onClick={() => setIdioma("es")}
          >
            Español
          </button>
          <button
            className={`btn btn-outline-primary ${idioma === "en" ? "active" : ""}`}
            onClick={() => setIdioma("en")}
          >
            English
          </button>
        </div>
      </div>

      
      <div className="row g-4">
        {imagenes[idioma].map((img, index) => (
          <div key={index} className="col-6 col-md-3">
            <div className="card shadow-sm border-0 h-100" onClick={() => abrirImagen(index)}>
              <img src={img} alt={`catalogo-${index}`} className="card-img-top img-hover" />
            </div>
          </div>
        ))}
      </div> */}

      <hr className="my-5" />

      {/* Secciones Folletos */}
      {/* <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Juan Balam</h2>
        <img src={JuanBalam} alt="Juan Balam" className="folleto-img rounded shadow" />
      </div> */}

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">The Festival of My Town</h2>
        <img src={Fiesta1} alt="The Festival of My Town" className="folleto-img rounded shadow" />
      </div>

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">The Vine and The Ceiba</h2>
        <img src={LaVidayCeiba} alt="The Vine and The Ceiba" className="folleto-img rounded shadow" />
      </div>

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Hanal Pixán</h2>

        <p className='TextoHanal'>Hanal Pixán is a Mayan tradition from the Yucatán Peninsula celebrated from October 31st to November 2nd to honor the deceased. The name means "food of the souls" and involves preparing offerings with traditional food and altars to welcome the souls of ancestors, believing they return to visit their families during these days. Each day is dedicated to a different group of deceased: October 31st for children, November 1st for adults, and November 2nd for all deceased in general.</p>

        <img src={logoDiaMuertos} alt="Día de Muertos" className="folleto-img rounded shadow" />

        <img src={logoDiaMuertosingles} alt="Día de Muertos" className="folleto-img rounded shadow" />
      </div>

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Sabores del Mas Alla</h2>
        <img src={sabores} alt="The Vine and The Ceiba" className="folleto-img rounded shadow" />
      </div>

      {/* Modal de imagen */}
      {/* {imagenSeleccionada && (
        <div className="modal11" onClick={cerrarImagen}>
          <span className="cerrar">&times;</span>
          <button className="anterior" onClick={anterior}>
            &#10094;
          </button>
          <img className="modal-content1" src={imagenSeleccionada} alt="zoom" />
          <button className="siguiente" onClick={siguiente}>
            &#10095;
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Catalogo;

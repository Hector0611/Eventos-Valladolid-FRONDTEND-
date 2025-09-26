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
        <div className='Separacion'> 
        
                      </div>
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

      {/* Modal de imagen */}
      {imagenSeleccionada && (
        <div className="modal" onClick={cerrarImagen}>
          <span className="cerrar">&times;</span>
          <button className="anterior" onClick={(e) => { e.stopPropagation(); anterior(); }}>
            &#10094;
          </button>
          <img className="modal-content" src={imagenSeleccionada} alt="zoom" />
          <button className="siguiente" onClick={(e) => { e.stopPropagation(); siguiente(); }}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogo;

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

/* Feria */
import feria01 from './Imagenes/ImgTempo/Feria0.1.jpeg';/* 11 de enero */
import feria0 from './Imagenes/ImgTempo/Feria0.jpeg';/* 23 de enero */
import feria1 from './Imagenes/ImgTempo/Feria3.jpg';/* 24 de enero */
import feria2 from './Imagenes/ImgTempo/Feria8.jpg';/* 25 de enero */
import feria3 from './Imagenes/ImgTempo/Feria2.jpg';/* 31 de enero */
import feria35 from './Imagenes/ImgTempo/Feria3.5.png';/* 1 de enero */
import feria4 from './Imagenes/ImgTempo/Feria5.jpg';/* 1 de febrero */
import feria5 from './Imagenes/ImgTempo/Feria9.jpg';/* 1 de febrero */
import feria55 from './Imagenes/ImgTempo/Feria5.5.png';/* 2 de febrero */
import feria6 from './Imagenes/ImgTempo/Feria4.jpg';/* 2 de febrero */
import feria7 from './Imagenes/ImgTempo/Feria1.jpg';/* 6 de febrero */
import feria8 from './Imagenes/ImgTempo/Feria6.jpg';/* 7 de febrero */
import feria9 from './Imagenes/ImgTempo/Feria10.png';/* 8 de febrero */

/* Folletos */
import murem from './Imagenes/ImgTempo/Murem_exposicion.jpg';
import NavidasCon from './Imagenes/ImgTempo/NavidasCon.jpeg';
import Dance1 from './Imagenes/ImgTempo/Dance1.jpeg';
import cancelacion from './Imagenes/ImgTempo/12diciembre.png';
import cancelacion2 from './Imagenes/ImgTempo/24y31diceimbre.jpeg';
import perla from './Imagenes/ImgTempo/Perla.jpeg';
import coro from './Imagenes/ImgTempo/Coro.png';

/* ya pasaron */
/* import logoDiaMuertos from './Imagenes/ImgTempo/DiaMuertos.jpg';
import logoDiaMuertosingles from './Imagenes/ImgTempo/DiaMuertosIngles.jpg';
import JuanBalam from './Imagenes/ImgTempo/JuanBalam.jpeg';

import julieta from './Imagenes/ImgTempo/Julieta.jpg';
import sabores from './Imagenes/ImgTempo/EventosNoviembre.jpg';
import obrateatro from './Imagenes/ImgTempo/ObraTeatro.jpeg'; */


/* no an pasado */
/* import Fiesta1 from './Imagenes/ImgTempo/LaFiestaPueblo1.jpeg'; /* 28 de Noviembre 
import Fiesta2 from './Imagenes/ImgTempo/LaFiestaPueblo2.jpeg';  28 de Noviembre */ 
/* import LaVidayCeiba from './Imagenes/ImgTempo/LaVidayCeiba.jpeg';  *//* 29 de Noviembre */

const Catalogo = () => {
  const [idioma, setIdioma] = useState("es");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indice, setIndice] = useState(0);

  const imagenes = {
    es: [feria01, feria0, feria1, feria2, feria3, feria35, feria4, feria5, feria55, feria6, feria7, feria8, feria9],
    
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
  };

  return (
    <div className="catalogo-container container py-5">
      <br />

      <h2 className='folletos'>BROCHURES</h2>
      

      {/* <div className="text-center mb-5">
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
      </div> */}

      
      

      <hr/>

      {/* Secciones Folletos */}
      {/* <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Juan Balam</h2>
        <img src={JuanBalam} alt="Juan Balam" className="folleto-img rounded shadow" />
      </div> */}

      <div className="folleto text-center mb-5">
          <h2 className="fw-bold mb-3"></h2>
          {/* <img src={cancelacion} alt="The Festival of My Town" className="folleto-img rounded shadow" /> */}
          <img src={cancelacion2} alt="The Festival of My Town" className="folleto-img rounded shadow" />
        </div> 

    <div className="folleto text-center mb-5">
      <h2 className="fw-bold mb-3"> Exhibition "The Torchbearers" indefinite time</h2>
        <img
          src={murem}
          alt="The Festival of My Town"
          className="folleto-img rounded shadow"
          style={{ cursor: "pointer" }}
          onClick={() => {
            const confirmGo = window.confirm("Do you want to go to the location?");
            if (confirmGo) {
              window.open(
                "https://www.google.com/maps/place/Museo+de+Ropa+Etnica+de+Mexico+(MUREM)/@20.6835823,-88.2036704,17z/data=!3m1!4b1!4m6!3m5!1s0x8f510b7a6734d1d1:0x9379dd8fa52a7cb8!8m2!3d20.6835823!4d-88.2010955!16s%2Fg%2F11g0747__6?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoASAFQAw%3D%3D",
                "_blank"
              );
            }
          }}
        />
      </div>



      {/* <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Christmas Concert</h2>
        <img src={NavidasCon} alt="The Festival of My Town" className="folleto-img rounded shadow"  style={{ cursor: "pointer" }} onClick={() => {
            const confirmGo = window.confirm("Do you want to go to the location?");
            if (confirmGo) {
              window.open(
                "https://www.google.com/maps/place/Plaza+Casa+De+La+Cultura+Valladolid/@20.690064,-88.2012433,21z/data=!4m6!3m5!1s0x8f510ada12b80cb5:0x31656d2d56bdd2!8m2!3d20.6901533!4d-88.2011122!16s%2Fg%2F11ckd371_d?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoASAFQAw%3D%3D",
                "_blank"
              );
            }
          }}/>
      </div> */}

       <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Painting Exhibition</h2>
        <img src={perla} alt="The Festival of My Town" className="folleto-img rounded shadow"  style={{ cursor: "pointer" }} onClick={() => {
            const confirmGo = window.confirm("Do you want to go to the location?");
            if (confirmGo) {
              window.open(
                "https://www.google.com/maps/@20.6899157,-88.2010884,21z?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoASAFQAw%3D%3D",
                "_blank"
              );
            }
          }}/>
      </div>

       <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Christmas Choir</h2>
        <img src={coro} alt="The Festival of My Town" className="folleto-img rounded shadow"  style={{ cursor: "pointer" }} onClick={() => {
            const confirmGo = window.confirm("Do you want to go to the location?");
            if (confirmGo) {
              window.open(
                "https://www.google.com/maps/place/Casa+de+los+Venados/@20.6892118,-88.2008784,17z/data=!3m1!4b1!4m6!3m5!1s0x8f510ada18b2c4d9:0x9de0105da27f9bd!8m2!3d20.6892118!4d-88.2008784!16s%2Fg%2F1hc1vby3h?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
                "_blank"
              );
            }
          }}/>
      </div>

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Just Dance</h2>
        <img src={Dance1} alt="The Festival of My Town" className="folleto-img rounded shadow" style={{ cursor: "pointer" }} onClick={() => {
            const confirmGo = window.confirm("Do you want to go to the location?");
            if (confirmGo) {
              window.open(
                "https://www.google.com/maps/place/Teatro+Iturralde+Traconis/@20.6887049,-88.2024147,21z/data=!4m14!1m7!3m6!1s0x8f510ada12b80cb5:0x31656d2d56bdd2!2sPlaza+Casa+De+La+Cultura+Valladolid!8m2!3d20.6901533!4d-88.2011122!16s%2Fg%2F11ckd371_d!3m5!1s0x8f510ad985c302e3:0x44bdf8503030f4d1!8m2!3d20.6886537!4d-88.2023349!16s%2Fg%2F11c6vbbb9c?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoASAFQAw%3D%3D ",
                "_blank"
              );
            }
          }} />
      </div> 

     

      {/* <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Hanal Pixán</h2>

        <p className='TextoHanal'>Hanal Pixán is a Mayan tradition from the Yucatán Peninsula celebrated from October 31st to November 2nd to honor the deceased. The name means "food of the souls" and involves preparing offerings with traditional food and altars to welcome the souls of ancestors, believing they return to visit their families during these days. Each day is dedicated to a different group of deceased: October 31st for children, November 1st for adults, and November 2nd for all deceased in general.</p>

        <img src={logoDiaMuertos} alt="Día de Muertos" className="folleto-img rounded shadow" />

        <img src={logoDiaMuertosingles} alt="Día de Muertos" className="folleto-img rounded shadow" />
      </div>

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Sabores del Mas Alla</h2>
        <img src={sabores} alt="The Vine and The Ceiba" className="folleto-img rounded shadow" />
      </div> */}

      {/* <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Obra de teatro</h2>
        <img src={obrateatro} alt="The Vine and The Ceiba" className="folleto-img rounded shadow" />
      </div>

      <div className="folleto text-center mb-5">
        <h2 className="fw-bold mb-3">Julieta Venegas</h2>
        <img src={julieta} alt="The Vine and The Ceiba" className="folleto-img rounded shadow" />
      </div> */}

       {/* <div className="folleto text-center mb-5">
        <h2 className="text-center mb-4 display-5 fw-bold ">The Vine and The Ceiba</h2>
        <div
          style={{ cursor: "pointer" }}
        >
          <a
            href="https://www.lavidylaceiba.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}  
          >
            <img src={LaVidayCeiba} alt="The Vine and The Ceiba" className="folleto-img rounded shadow" />
          </a>
        </div>

        
      </div> */}

      <h3 className="text-center mb-4 display-5 fw-bold">
  Expo Feria Valladolid 2026
</h3> 

<div className="row g-4">
  {imagenes[idioma].map((img, index) => (
    <div key={index} className="col-6 col-md-3">
      <div className="card shadow-sm border-0 h-100" onClick={() => abrirImagen(index)}>
        <img src={img} alt={`catalogo-${index}`} className="card-img-top img-hover" />
      </div>
    </div>
  ))}
</div>
<hr />

<div className="map">
  <h3 className="map-title">
    🗺️ Location of the Valladolid Expo Feria 2026
  </h3>

  <div className="map-placeholder1">
    <iframe
      title="Ubicación Expo Feria Valladolid"
      src="https://www.google.com/maps?q=20.67112532591333,-88.2286181270485&hl=en&z=13&output=embed"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>

      <hr />

      {/* Modal de imagen */}
      {imagenSeleccionada && (
        <div className="modal11" onClick={cerrarImagen}>
          <span className="cerrar">&times;</span>
          <button className="anterior" onClick={anterior}>
            &#10094;
          </button>
          <img className="modal-content11" src={imagenSeleccionada} alt="zoom" />
          
          <button className="siguiente" onClick={siguiente}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogo;

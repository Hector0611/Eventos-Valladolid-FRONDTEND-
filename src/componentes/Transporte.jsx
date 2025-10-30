
import "./Transporte.css";
import React, { useState } from "react";

/* mapa */
import mapa from "./Imagenes/MapaTaxi/mapa2.png";

/* seccion del mapa */
import centro from "./Imagenes/MapaTaxi/centro.png";
import santalucia from "./Imagenes/MapaTaxi/santalucia.png";
import candelaria from "./Imagenes/MapaTaxi/cendelaria.png";
import bacalar from "./Imagenes/MapaTaxi/bacalar.png";
import crusverde from "./Imagenes/MapaTaxi/crusverde.png";
import sanjuan from "./Imagenes/MapaTaxi/sanjuan.png";
import oaxaqueña from "./Imagenes/MapaTaxi/oaxaqueña.png";
import militar from "./Imagenes/MapaTaxi/Militar.png";
import orquedeas from "./Imagenes/MapaTaxi/orquedeas.png";


export default function Transporte() {
  const taxis = [
    { nombre: "Taxi Valladolid", telefono: "999-123-4567", ubicacion: "Centro de Valladolid" },
    { nombre: "Radio Taxi Maya", telefono: "999-987-6543", ubicacion: "Estación de Autobuses" },
  ];

  const autobuses = [
    { nombre: "Autobuses Maya", telefono: "999-456-7890", ubicacion: "Terminal Central" },
    { nombre: "Autobuses del Sureste", telefono: "999-321-0987", ubicacion: "Plaza Principal" },
  ];
  
const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 20.689,  // Coordenadas de Valladolid
  lng: -88.201,
};

 const [modalInfo, setModalInfo] = useState(null);

  const lugares = [
    { nombre: "Centro Histórico (Cuadrante 1)", 
      img: centro, 
      clase: "centro", 
      info: "El cobro del taxi a cualquer cuadrante es de 40(MXN) </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 2", 
      img: santalucia, 
      clase: "santalucia", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD' " },

    { nombre: "Cuadrante 3", 
      img: candelaria, 
      clase: "candelaria", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 4", 
      img: bacalar, 
      clase: "bacalar", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 5", 
      img: crusverde, 
      clase: "crusverde", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 6", 
      img: sanjuan, 
      clase: "sanjuan", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 7", 
      img: oaxaqueña, 
      clase: "oaxaqueña", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 8", 
      img: militar, 
      clase: "militar", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },

    { nombre: "Cuadrante 9", 
      img: orquedeas, 
      clase: "orquedeas", 
      info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" },
  ];

  const [activoIndex, setActivoIndex] = useState(null);


  return (
    <div className="transporte-container">
           <div className='Separacion'> 
        
                      </div>
      <h1>Transporte en Valladolid</h1>

<div>
<div className="info-box">
        <h3>Información del mapa</h3>
        <p>Haz clic en una zona del mapa para ver más detalles.</p>
      </div>

<div className="mapadevalladolid">
        <img src={mapa} alt="Mapa de Valladolid" className="mapa-image" />

        {lugares.map((lugar, index) => (
          <img
            key={index}
            src={lugar.img}
            alt={lugar.nombre}
            title={lugar.nombre}
            className={`${lugar.clase} ${activoIndex === index ? "activo" : ""}`}
            onClick={() => {
              setModalInfo(lugar);       // Abre el modal
              setActivoIndex(index);     // Marca esta zona como activa
            }}
          />
        ))}
      </div>

      
      {modalInfo && (
        <div className="modal-overlay" onClick={() => setModalInfo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalInfo.nombre}</h2>
            <p dangerouslySetInnerHTML={{ __html: modalInfo.info }}></p>
            <button onClick={() => setModalInfo(null)}>Cerrar</button>
          </div>
        </div>
      )}

  
</div>

    </div>
  );
}

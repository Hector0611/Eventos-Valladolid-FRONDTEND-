import React from "react";
import "./Transporte.css";

export default function Transporte() {
  const taxis = [
    { nombre: "Taxi Valladolid", telefono: "999-123-4567", ubicacion: "Centro de Valladolid" },
    { nombre: "Radio Taxi Maya", telefono: "999-987-6543", ubicacion: "Estación de Autobuses" },
  ];

  const autobuses = [
    { nombre: "Autobuses Maya", telefono: "999-456-7890", ubicacion: "Terminal Central" },
    { nombre: "Autobuses del Sureste", telefono: "999-321-0987", ubicacion: "Plaza Principal" },
  ];

  return (
    <div className="transporte-container">
           <div className='Separacion'> 
        
                      </div>
      <h1>Transporte en Valladolid</h1>
      
      <section className="transporte-section">
        <h2>Taxis</h2>
        <div className="cards">
          {taxis.map((taxi, index) => (
            <div key={index} className="card">
              <h3>{taxi.nombre}</h3>
              <p>Teléfono: <a href={`tel:${taxi.telefono}`}>{taxi.telefono}</a></p>
              <p>Ubicación: {taxi.ubicacion}</p>
              <iframe
                title={`mapa-taxi-${index}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(taxi.ubicacion)}&output=embed`}
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </div>
      </section>

      <section className="transporte-section">
        <h2>Autobuses</h2>
        <div className="cards">
          {autobuses.map((bus, index) => (
            <div key={index} className="card">
              <h3>{bus.nombre}</h3>
              <p>Teléfono: <a href={`tel:${bus.telefono}`}>{bus.telefono}</a></p>
              <p>Ubicación: {bus.ubicacion}</p>
              <iframe
                title={`mapa-bus-${index}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(bus.ubicacion)}&output=embed`}
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

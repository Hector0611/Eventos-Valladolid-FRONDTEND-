import React, { useState } from "react";
import "./AgenciasTours.css";

import MexiGo from "./Imagenes/agencias/MexiGo.png";
import PremierAdventures from "./Imagenes/agencias/LogoPremierAdventures.png";

/* Datos de agencias */
const agenciasData = [
  {
    id: 1,
    nombre: "MexiGo Tours Valladolid",
    tipo: "Travel Agency and Tour Operator",
    descripcion:
      "MexiGo Tours is a local travel agency based in Valladolid, Yucatán, specializing in personalized and small-group tours to archaeological sites and natural wonders, such as Chichén Itzá, Ek Balam, cenotes, and Río Lagartos. The agency is known for its personalized service and expert local guides who share Mayan culture.",
    telefono: "+529858560777",
    email: "mexigotours@hotmail.com",
    web: "https://www.mexigotours.com",
    ubicacion: "Calle 41 #217 x 46 y 48, Centro, Valladolid, Yucatán",
    imagen: MexiGo,
    latitud: 20.68975678913676,
    longitud: -88.20579478159192,
  },
  {
    id: 2,
    nombre: "Premier Adventures",
    tipo: "Travel Agency and Tour Operator",
    descripcion:
      "Premier Adventures is a tour agency in Valladolid, Yucatán, specializing in ecotourism and Mayan culture. They offer visits to archaeological sites such as Chichén Itzá and Ek Balam, cenote tours, transportation services, and regional culinary experiences, distinguished by their personalized attention and high-quality guides.",
    telefono: "+529994819215",
    email: "ventas@premieradventures.com.mx",
    web: "https://premieradventures.com.mx",
    ubicacion: "Centro (Calle 39 #30), Calzada y Tren Maya. Valladolid, Yucatán",
    imagen: PremierAdventures,
    latitud: 20.69086657097511,
    longitud: -88.20179264426147,
  },
  /* {
    id: 3,
    nombre: "Viajes Valladolid",
    tipo: "Travel Agency",
    descripcion:
      "We purchase our services from wholesale agencies with whom we have agreements, allowing us to offer you the best prices on the market. We have tour packages to the main destinations in Mexico and abroad.",
    telefono: "+529994819215",
    email: "ventas@premieradventures.com.mx",
    web: "https://premieradventures.com.mx",
    ubicacion: "Centro (Calle 39 #30), Calzada y Tren Maya. Valladolid, Yucatán",
    imagen: PremierAdventures,
    latitud: 20.69086657097511,
    longitud: -88.20179264426147,
  }, */
];

const AgenciasTours = () => {
  const [busqueda, setBusqueda] = useState("");

  const agenciasFiltradas = agenciasData.filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="agencias-container">
      {/* 🌍 HERO + MAPA */}
      <div className="Separacion"></div>
      <div className="agencias-hero">
        <div className="hero-text">
          <h1>🌍 Travel Agencies & Tour Operators</h1>
          <p>
            Discover trusted agencies and tour operators to explore Valladolid
            and the Yucatán region with confidence.
          </p>

          <input
            type="text"
            placeholder="Search agency..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* 🗂️ GRID */}
      <div className="agencias-grid">
        {agenciasFiltradas.map((agencia) => (
          <div key={agencia.id} className="agencia-card">
            <img src={agencia.imagen} alt={agencia.nombre} />

            <div className="agencia-content">
              <h3>{agencia.nombre}</h3>
              <span className="agencia-tipo">{agencia.tipo}</span>

              <p>{agencia.descripcion}</p>

              <div className="agencia-info">
                <span>📍 {agencia.ubicacion}</span>
                <span>📞 {agencia.telefono}</span>
                <span>✉️ {agencia.email}</span>
                <div className="media-panel15">
                  <iframe
                      title="Modulo de Informacion Turistica"
                      src={`https://www.google.com/maps?q=${agencia.latitud}, ${agencia.longitud}&hl=en&z=15&output=embed`}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                </div>
                <hr />
              </div>

              <div className="agencia-actions">
                <a href={agencia.web} target="_blank" rel="noreferrer">
                  🌐 Website
                </a>
                <a href={`tel:${agencia.telefono}`}>📞 Call</a>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgenciasTours;

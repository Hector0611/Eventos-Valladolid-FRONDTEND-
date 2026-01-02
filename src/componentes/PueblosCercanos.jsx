import React, { useState } from "react";
import "./PueblosCercanos.css";

const pueblosData = [
  { 
    nombre: "Popolá", /* Ya esta */
    lat: 20.732804107412726, 
    lon: -88.23743513676239, 
    descripcion: "Popolá is a small town and police station located in the municipality of Valladolid, in the eastern part of the state of Yucatán, Mexico. It is located a few kilometers from the municipal seat, the historic city of Valladolid.",
    distancia: "10 minutes from Valladolid, at an average altitude of 30 meters above sea level.",
    actividades: ["Hiking", "Photography", "Local food"],
    lugares: ["Main church", "Central Park"],
    fiestas: {
      santo: "VIRGEN DE FÁTIMA",
      fecha: "May 07 - 18",
      descripcion: "The patron saint festivities include religious processions, gremios, vaquerías, traditional music, food stalls, and mechanical rides."
    }
  },

  { 
    nombre: "Kanxoc", /* Ya esta */
    lat: 20.616813239438272, 
    lon: -88.0982796370819, 
    descripcion: "Kanxoc (K'anxok, 'place of warriors') is a Mayan town of great historical and cultural importance.",
    distancia: "22 minutes from Valladolid",
    actividades: ["Handicrafts", "Maya culture"],
    lugares: ["Handicraft center"],
    fiestas: {
      santo: "SAN COSME Y SAN DAMIAN",
      fecha: "april 19 - may 12",
      descripcion: "Celebrations feature gremios, traditional dances, bullfighting events, and strong community participation."
    }
  },

  { 
    nombre: "Yalcobá", /* Ya esta */
    lat: 20.79088451479788, 
    lon: -88.03731988895876, 
    descripcion: "Yalcobá is a rural Mayan community known for its cenotes and traditional lifestyle.",
    distancia: "18 minutes from Valladolid",
    actividades: ["Cultural visit", "Architecture", "Gastronomy"],
    lugares: ["Main square", "Old church"],
    fiestas: {
      santo: "PATRONO NIÑO DIOS Y CRISTO RESUCITADO",
      fecha: "Dicember 20 - January 1",
      descripcion: "Festivities include masses, vaquerías, regional music, and food fairs."
    }
  },

  { 
    nombre: "Xocén", /* Ya esta */
    lat: 20.599118702169775,
    lon: -88.16337045901277,
    descripcion: "Xocén is considered the 'Center of the World' by its inhabitants.",
    distancia: "20 minutes from Valladolid",
    actividades: ["Spiritual tourism", "Maya ceremonies"],
    lugares: ["Ceremonial center", "Xocén Church"],
    fiestas: {
      santo: "Santa Cruz",
      fecha: "May 1 - 3",
      descripcion: "A unique celebration combining Catholic devotion with ancestral Mayan rituals and ceremonies."
    }
  },

  { 
    nombre: "Tesoco", /* Ya esta */
    lat: 20.721765389671624,
    lon: -88.15411447359732,
    descripcion: "Tesoco is a town whose name means 'here it ends' in the Mayan language.",
    distancia: "12 minutes from Valladolid",
    actividades: ["Hiking", "Rural life"],
    lugares: ["Park", "Town chapel"],
    fiestas: {
      santo: "SANTOS SAN LUCAS EVANGELISTA Y SAN LORENZO MÁRTIR",
      fecha: "MARCH 14 - 29",
      descripcion: "Celebration focused on agriculture, with blessings of the fields, processions, and communal meals."
    }
  },

  { 
    nombre: "Tikuch", /* Ya esta */
    lat: 20.702500398122268,
    lon: -88.11271614543378,
    descripcion: "Tikuch is a rural community strongly connected to Mayan traditions.",
    distancia: "14 minutes from Valladolid",
    actividades: ["Trails", "Local gastronomy"],
    lugares: ["Traditional kitchens", "Town center"],
    fiestas: {
      santo: "VIRGEN DE FÁTIMA",
      fecha: "April 19 - May 04",
      descripcion: "Includes religious ceremonies, vaquerías, popular dances, and local food fairs."
    }
  },

  { 
    nombre: "Dzitnup", /* Ya esta */
    lat: 20.647015722281402,
    lon: -88.24465470160732,
    descripcion: "Dzitnup is known for the famous cenotes Samulá and X'Kekén.",
    distancia: "12 minutes from Valladolid",
    actividades: ["Swimming in cenotes", "Photography", "Exploration"],
    lugares: ["Cenote Samulá", "Cenote X'Kekén"],
    fiestas: {
      santo: " SAN ANDRÉS APÓSTOL",
      fecha: "november 27 - january 30",
      descripcion: "Festivities include religious events, regional music, fairs, and family activities."
    }
  },

  { 
    nombre: "Tahmuy", /* Ya esta */
    lat: 20.75949905733302,
    lon: -88.14177916612304,
    descripcion: "Tahmuy is a quiet town reflecting the traditional rural life of Yucatán.",
    distancia: "10 minutes from Valladolid",
    actividades: ["Maya culture", "Landscapes"],
    lugares: ["Central park", "Church"],
    fiestas: {
      santo: "San MIGUEL ARCÁNGEL",
      fecha: "February 01 - 09",
      descripcion: "Features masses, community dances, fireworks, and popular celebrations."
    }
  },

  { 
    nombre: "Pixoy", /* Ya esta */
    lat: 20.7159794047854,
    lon: -88.26286021459926,
    descripcion: "Pixoy is named after the native Pixoy tree and preserves strong Mayan identity.",
    distancia: "10 minutes from Valladolid",
    actividades: ["Handicrafts", "Hiking"],
    lugares: ["Town center"],
    fiestas: {
      santo: "San SANTA ANA",
      fecha: "july 18 - 28",
      descripcion: "Religious processions, vaquerías, traditional music, and community fairs."
    }
  },

  {
    nombre: "Nohsuytun", /* Ya esta */
    lat: 20.435320260108373,
    lon: -88.09584988101533,
    descripcion: "Nohsuytun is a small Mayan community near Valladolid.",
    distancia: "15 minutes from Valladolid",
    actividades: ["Cultural immersion", "Nature walks"],
    lugares: ["Local church", "Community center"],
    fiestas: {
      santo: " VIRGEN DE ÁNGELA Y SAN ROMÁN",
      fecha: "March 15 - 23",
      descripcion: "Includes religious ceremonies, gremios, music, and community gatherings."
    }
  },

  { 
    nombre: "Ebtún", /* Ya esta */
    lat: 20.665682917935,
    lon: -88.26092570160516,
    descripcion: "Ebtún is recognized for its artisan tradition and historical importance.",
    distancia: "15 minutes from Valladolid",
    actividades: ["Maya culture", "History"],
    lugares: ["Ceremonial center", "Church"],
    fiestas: {
      santo: "SAN BARTOLOMÉ APÓSTOL",
      fecha: "Agust 14 - 24",
      descripcion: "Traditional festivities with dances, vaquerías, and regional gastronomy."
    }
  },

  { 
    nombre: "Xuilub", /* Ya esta */
    lat: 20.417623583921447,
    lon: -88.03007469314717,
    descripcion: "Xuilub is a small rural community with strong Mayan roots.",
    distancia: "35 minutes from Valladolid",
    actividades: ["Maya village experience", "Nature"],
    lugares: ["Rural area", "Local church"],
    fiestas: {
      santo: "LA VIRGEN DE LA ASUNCIÓN AND LA VIRGEN DE GADALUPE",
      fecha: "Dicember 02 - 08 and Dicember 06 - 12",
      descripcion: "Agricultural-focused celebration with religious services and local fairs."
    }
  },

  {
    nombre: "Yalcón", /* Ya esta */
    lat: 20.417623583921447,
    lon: -88.03007469314717,
    descripcion: "Yalcón is a small rural community with strong Mayan roots.",
    distancia: "35 minutes from Valladolid",
    actividades: ["Maya village experience", "Nature"],
    lugares: ["Rural area", "Local church"],
    fiestas: {
      santo: "SAN LUGAS",
      fecha: "October 11 - 21",
      descripcion: "Agricultural-focused celebration with religious services and local fairs."
    }
  },

  {
    nombre: "Tixhualactún", /* Ya esta */
    lat: 20.417623583921447,
    lon: -88.03007469314717,
    descripcion: "Tixhualactún is a small rural community with strong Mayan roots.",
    distancia: "35 minutes from Valladolid",
    actividades: ["Maya village experience", "Nature"],
    lugares: ["Rural area", "Local church"],
    fiestas: {
      santo: "CRISTO DE LA EXALTACIÓN",
      fecha: "February 28 - March 17",
      descripcion: "Agricultural-focused celebration with religious services and local fairs."
    }
  },
 
];


export default function PueblosCercanos() {
  const [modalData, setModalData] = useState(null);

  return (
    <div className="pueblos-container">
      <div className="Separacion"></div>
      <h2 className="pueblos-title">Towns Near Valladolid</h2>

      <div className="pueblos-grid">
        {pueblosData.map((pueblo) => (
          <div className="pueblo-card animate-fade-up" key={pueblo.nombre}>
            
            <h3>{pueblo.nombre}</h3>
            <p className="distancia">{pueblo.distancia}</p>
            <p>{pueblo.descripcion}</p>

            {/* Tourist icons */}
            <div className="iconos-turisticos">
              <span>🪶 Culture</span>
              <span>🌿 Nature</span>
              <span>🍽️ Gastronomy</span>
            </div>

            {/* Map */}
            <div className="map-placeholder animate-zoom">
              <iframe
                title={`Map of ${pueblo.nombre}`}
                src={`https://www.google.com/maps?q=${pueblo.lat},${pueblo.lon}&hl=en&z=15&output=embed`}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Directions button */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${pueblo.lat},${pueblo.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-direcciones"
            >
              How to get there 🚗
            </a>

            {/* More info button */}
            <button 
              className="btn-vermas"
              onClick={() => setModalData(pueblo)}
            >
              More information ➜
            </button>

          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
  <div className="modal-overlay22" onClick={() => setModalData(null)}>
    <div
      className="modal-content22"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 🌍 Halo decorativo */}
      <div className="modal-glow" />

      <h2 className="modal-title">{modalData.nombre}</h2>

      <p className="modal-description">
        {modalData.descripcion}
      </p>

      <h4>Recommended activities</h4>
      <ul className="modal-list">
        {modalData.actividades?.map((act, i) => (
          <li key={i}>⭐ {act}</li>
        ))}
      </ul>

      <h4>Places to visit</h4>
      <ul className="modal-list">
        {modalData.lugares?.map((lug, i) => (
          <li key={i}>📍 {lug}</li>
        ))}
      </ul>

      {/* 🎉 FIESTA PATRONAL */}
{modalData.fiestas && (
  <>
    <h4>Fiesta Patronal</h4>

    <ul className="modal-list">
      <li>🎉 <strong>Patron Saint:</strong> {modalData.fiestas.santo}</li>
      <li>📅 <strong>Date:</strong> {modalData.fiestas.fecha}</li>
      <li>📝 <strong>Description:</strong> {modalData.fiestas.descripcion}</li>
    </ul>
  </>
)}


      <button className="btn-cerrar22" onClick={() => setModalData(null)}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

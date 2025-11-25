import React, { useState } from "react";
import "./PueblosCercanos.css";

const pueblosData = [
  { 
    nombre: "Popolá", 
    lat: 20.732804107412726, 
    lon: -88.23743513676239, 
    descripcion: "Popolá is a small town and police station located in the municipality of Valladolid, in the eastern part of the state of Yucatán, Mexico. It is located a few kilometers from the municipal seat, the historic city of Valladolid, known as a 'Pueblo Mágico' (Magical Town).",
    distancia: "10 minutes from Valladolid, It is located in the eastern part of the Yucatan Peninsula, at an average altitude of 30 meters above sea level.",
    actividades: ["Hiking", "Photography", "Local food"],
    lugares: ["Main church", "Central Park"]
  },
  { 
    nombre: "Kanxoc", 
    lat: 20.616813239438272, 
    lon: -88.0982796370819, 
    descripcion: "Kanxoc (or K'anxok, meaning 'place of warriors' in Mayan) is another Mayan town and village of great historical and cultural importance, located in the municipality of Valladolid, in the eastern part of the state of Yucatán, Mexico. It is located about 13 to 16 km southeast of the city of Valladolid.",
    distancia: "22 minutes from Valladolid",
    actividades: ["Handicrafts", "Maya culture"],
    lugares: ["Handicraft center"]
  },
  { 
    nombre: "Yalcobá", 
    lat: 20.79088451479788, 
    lon: -88.03731988895876, 
    descripcion: "Yalcobá is a rural Mayan community that serves as a municipal subdivision of the municipality of Valladolid, Yucatán, Mexico. It is located approximately 25 kilometers from the city of Valladolid, on the highway leading to Cancún. It is known primarily for its natural resources, especially its cenotes, and for being an example of Yucatecan rural life.",
    distancia: "18 minutes from Valladolid",
    actividades: ["Cultural visit", "Architecture", "Gastronomy"],
    lugares: ["Main square", "Old church"]
  },
  { 
    nombre: "Xocén",
    lat: 20.599118702169775,
    lon: -88.16337045901277,
    descripcion: "Xocén is a Mayan community steeped in mysticism and tradition, considered by its inhabitants to be the 'Center of the World' (U chúumuk lu'um in Mayan). It is a subdivision of the municipality of Valladolid, located approximately 25 kilometers south of the city.",
    distancia: "20 minutes from Valladolid",
    actividades: ["Spiritual tourism", "Maya ceremonies"],
    lugares: ["Ceremonial center", "Xocén Church"]
  },
  { 
    nombre: "Tixhualactún",
    lat: 20.643234785989755,
    lon: -88.14276309682207,
    descripcion: "Tixhualactún is a picturesque and traditional Mayan community, also a subdivision of the municipality of Valladolid, in eastern Yucatán, Mexico. Its name in the Mayan language means 'standing stone.' It is located a short distance from the municipal seat, about 6 kilometers east of Valladolid, making it easily accessible.",
    distancia: "17 minutes from Valladolid",
    actividades: ["Photography", "History"],
    lugares: ["Local church", "Small archaeological site"]
  },
  { 
    nombre: "Tesoco",
    lat: 20.721765389671624,
    lon: -88.15411447359732,
    descripcion: "Tesoco is a town and police station in the municipality of Valladolid, in the state of Yucatán, Mexico. Its name in the Mayan language means 'here it ends' or 'up to here'.",
    distancia: "12 minutes from Valladolid",
    actividades: ["Hiking", "Rural life"],
    lugares: ["Park", "Town chapel"]
  },
  { 
    nombre: "Tikuch",
    lat: 20.702500398122268,
    lon: -88.11271614543378,
    descripcion: "Tikuch is a village belonging to the municipality of Valladolid, in the state of Yucatán, Mexico. It is a rural community that maintains a strong connection to Mayan culture and traditions.",
    distancia: "14 minutes from Valladolid",
    actividades: ["Trails", "Local gastronomy"],
    lugares: ["Traditional kitchens", "Town center"]
  },
  { 
    nombre: "Dzitnup",
    lat: 20.647015722281402,
    lon: -88.24465470160732,
    descripcion: "Dzitnup is a rural community and police station in the municipality of Valladolid, in the eastern part of the state of Yucatán, Mexico, known mainly for housing two of the most famous and visited cenotes in the region.",
    distancia: "12 minutes from Valladolid",
    actividades: ["Swimming in cenotes", "Photography", "Exploration"],
    lugares: ["Cenote Samulá", "Cenote X'Kekén"]
  },
  { 
    nombre: "Tahmuy",
    lat: 20.75949905733302,
    lon: -88.14177916612304,
    descripcion: "Tahmuy is a town and police station that is part of the municipality of Valladolid, in the state of Yucatán, Mexico. It is a small, quiet town that reflects the rural and traditional life of the eastern region of the peninsula.",
    distancia: "10 minutes from Valladolid",
    actividades: ["Maya culture", "Landscapes"],
    lugares: ["Central park", "Church"]
  },
  { 
    nombre: "Pixoy",
    lat: 20.7159794047854,
    lon: -88.26286021459926,
    descripcion: "Pixoy is a rural Mayan community and district within the municipality of Valladolid, in the state of Yucatán, Mexico, known for its strong cultural identity and remarkable colonial heritage. Its name comes from the tree of the same name (Guazuma ulmifolia), which is native to the region and has various local uses.",
    distancia: "10 minutes from Valladolid",
    actividades: ["Handicrafts", "Hiking"],
    lugares: ["Town center"]
  },
  { 
    nombre: "Ebtún",
    lat: 20.665682917935,
    lon: -88.26092570160516,
    descripcion: "Ebtún is a Mayan community and a district of the municipality of Valladolid, in the eastern part of the state of Yucatán, Mexico, recognized mainly for its rich artisan tradition and its historical importance documented in old colonial texts.",
    distancia: "15 minutes from Valladolid",
    actividades: ["Maya culture", "History"],
    lugares: ["Ceremonial center", "Church"]
  },
  { 
    nombre: "Xuilub",
    lat: 20.417623583921447,
    lon: -88.03007469314717,
    descripcion: "Xuilub is a town and rural district within the municipality of Valladolid, in the state of Yucatán, Mexico. It is a small community characterized by its tranquil atmosphere and strong connection to its Mayan roots.",
    distancia: "35 minutes from Valladolid",
    actividades: ["Maya village experience", "Nature"],
    lugares: ["Rural area", "Local church"]
  },
  { 
    nombre: "Yalcón",
    lat: 20.68017810486401,
    lon: -88.15847996092133,
    descripcion: "Yalcón is a small rural community and police station located in the municipality of Valladolid, in the state of Yucatán, Mexico. It is very close to the municipal seat, approximately 10 minutes by car, making it easily accessible.",
    distancia: "8 minutes from Valladolid",
    actividades: ["Photography", "Local life"],
    lugares: ["Chapel", "Town court"]
  },
  { 
    nombre: "Tekom",
    lat: 20.602762607497645,
    lon: -88.26440761449149,
    descripcion: "Tekom is a municipality and town in the state of Yucatán, Mexico. Unlike the towns mentioned above, which are subdivisions of Valladolid, Tekom is an independent municipality with its own municipal seat of the same name. It is located to the southeast of Valladolid and is known for its rich Mayan heritage and traditions.",
    distancia: "25 minutes from Valladolid",
    actividades: ["Maya culture", "Hiking"],
    lugares: ["Central square", "Tekom Church"]
  },
  { 
    nombre: "Chichimilá",
    lat: 20.63197587049082,
    lon: -88.21661200925173,
    descripcion: "Chichimilá is a free municipality and town in the state of Yucatán, Mexico, located in the eastern region of the state, about 157 kilometers east of the city of Mérida and a short distance from Valladolid. It is known for its rich Mayan culture and traditions, as well as for its natural beauty and archaeological sites.",
    distancia: "8 minutes from Valladolid",
    actividades: ["Local food", "History"],
    lugares: ["Main church", "Central park"]
  },
  { 
    nombre: "Temozón",
    lat: 20.80179746697523,
    lon: -88.20082689869277,
    descripcion: "Temozón is a free municipality and town in the state of Yucatán, Mexico. Its name in Mayan means 'place of the whirlpool' (Te = here, Mozón = whirlpool). Unlike the municipalities of Valladolid, Temozón is an autonomous entity and is a renowned destination for its gastronomy and natural attractions. ",
    distancia: "20 minutes from Valladolid",
    actividades: ["Gastronomy", "Handicraft shopping"],
    lugares: ["Meat workshops", "Ek Balam (nearby)"]
  }
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
          <div className="modal-content22" onClick={(e) => e.stopPropagation()}>
            <h2>{modalData.nombre}</h2>
            <p>{modalData.descripcion}</p>

            <h4>Recommended activities:</h4>
            <ul>
              {modalData.actividades?.map((act, i) => (
                <li key={i}>⭐ {act}</li>
              ))}
            </ul>

            <h4>Places to visit:</h4>
            <ul>
              {modalData.lugares?.map((lug, i) => (
                <li key={i}>📍 {lug}</li>
              ))}
            </ul>

            <button className="btn-cerrar22" onClick={() => setModalData(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

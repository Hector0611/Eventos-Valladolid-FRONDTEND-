import React from "react";
import { MapContainer, TileLayer, Marker,Tooltip, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TaxiAndToursValladolid.css";

// Fix icon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const iconoColor = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const sitiosTaxi = [
    {
    nombre: "Chichén Itzá",
    ubicacion: "Calle 46 x 37",
    coordenadas: [20.69080823575629, -88.20560333009726],
    color: "red",
    llevaA: ["Chichén Itzá", "Pisté","Cenote Ik kil","Cenote Tsukán"],
    costos: "",
  },
  {
    nombre: "Ek Balam, Cenotes y Más",
    ubicacion: "Zona Oriente de Valladolid",
    coordenadas: [20.691867890068227, -88.20317977568688],
    color: "green",
    llevaA: ["Ek Balam", "Cenote Xcanché", "Cenote Hubiku", "Cenote Chichikan"],
    costos: "",
  },
  {
    nombre: "X'kekén y Samulá | Selva Maya",
    ubicacion: "Calle 44 x 41 y 39",
    coordenadas: [20.690279347843784, -88.20362088421038],
    color: "blue",
    llevaA: [ "Selva Maya", "Samulá y X'kekén", "Cenote Saamal"],
    costos: "",
  },
  {/* Suytun */
        nombre: "Quintana Roo",
        ubicacion: "Calle 44 x 41 y 39",
        coordenadas: [20.689544112339142, -88.20030350336401],
        color: "orange",
        llevaA: ["Zona Arqueologica de Coba", "Suytun", "Cenote X'un ha", "Cenote Chunkum","Tulum"],
        costos: "",

  },
  /* Ado Valladolid */
  {
    nombre: "ADO",
    ubicacion: "Calle 44 x 41 y 39",
    coordenadas: [20.690830793343842, -88.20477729067018],
    color: "black",
    llevaA: ["Todos"],
    costos: "",
  },
  /* Tizimin */
    {
        nombre: "Tizimín",
        ubicacion: "Calle 44 x 41 y 39",
        coordenadas: [20.692285223936647, -88.20135904276857],
        color: "grey",
        llevaA: ["Tizimín", "Rio Lagartos","Coloradas", "San Felipe", "El Cuyo"],
        costos: "",
    },
    /* Turibus */
    {
        nombre: "Turibus",
        ubicacion: "Calle 44 x 41 y 39",
        coordenadas: [20.690728203605282, -88.20170427565566],
        color: "gold",
        llevaA: ["Recoridos por Valladolid"],
        costos: "",
    },
];

const TaxiAndToursValladolid = () => {
  return (
    <div className="taxi-container">
        <div className="Separacion"></div>
      <h1 className="taxi-title">
        🚕 Tourist Transport in Valladolid
      </h1>

      <p className="taxi-description">
        From these points you can take a taxi or public transport to visit
        cenotes, archaeological sites and nearby tourist destinations.
      </p>

      <div className="taxi-information">
        <p className="taxi-Informacion">
          <strong>📌CITY TAXIS:</strong> They are colored: "<strong className="am">YELLOW</strong>,<strong className="cf">BROWN</strong> and <strong className="na">ORANGE</strong>"
        </p>
        <p className="taxis-Informacion">
          <strong>📌 Price:</strong>  From the city center to any point in the city (Within the city) <strong>40 to 50MXN </strong> <br /> From outside the city, the cost depends on the distance <strong>60 to --- MXN</strong>
        </p>
      </div>

      {/* TARJETAS */}
       <div className="cards-grid">
        {sitiosTaxi.map((sitio, index) => (
          <div
            key={index}
            className="taxi-card"
            style={{ borderLeftColor: sitio.color }}
          >
            <span
              className="card-badge"
              style={{ backgroundColor: sitio.color }}
            >
              {sitio.nombre}
            </span>

            <p>
              <strong>📍 Location:</strong> {sitio.ubicacion}
            </p>

            <p>
              <strong>💰 Costos:</strong> {sitio.costos}
            </p>

            <div className="card-destinos">
              <strong>🚐 It can lead you to:</strong>
              <ul>
                {sitio.llevaA.map((destino, i) => (
                  <li key={i}>{destino}</li>
                ))}
              </ul>
            </div>

            {sitio.coordenadas && (
                     <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${sitio.coordenadas[0]},${sitio.coordenadas[1]}`}  
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-button"
                      style={{ backgroundColor: sitio.color }}
                    >
                      📍 View on Google Maps
                    </a>
                )
                }
          </div>
        ))}
      </div>

      {/* MAPA */}
      <div className="map-wrapper notranslate" translate="no">
        <MapContainer
          center={[20.691413010759458, -88.2018443295267]}
          zoom={17}
          scrollWheelZoom={false}
          className="map"
          preferCanvas={true} 
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {sitiosTaxi.map((sitio, index) => (
                <Marker
                    key={index}
                    position={sitio.coordenadas}
                    icon={iconoColor(sitio.color)}
                >
                    {/* 🏷️ TÍTULO PERMANENTE */}
                    <Tooltip
                    direction="top"
                    offset={[0, -35]}
                    opacity={1}
                    permanent
                    className="marker-tooltip"
                    >
                    {sitio.nombre}
                    </Tooltip>

                    {/* 📦 POPUP (solo al click) */}
                    <Popup className="taxi-popup">
                        <div className="popup-header">
                            🚕 {sitio.nombre}
                        </div>

                        <div className="popup-body">
                            <p>
                            <span className="icon">📍</span>
                            <strong>Location:</strong> {sitio.ubicacion}
                            </p>
                            <p>
                            <span className="icon">🚐</span>
                            <strong>Destinations:</strong> {sitio.llevaA.join(", ")}
                            </p>

                            <p>
                            <span className="icon">💰</span>
                            <strong>Cost:</strong>{" "}
                            {sitio.costos || "Consultar precio"}
                            </p>

                            <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${sitio.coordenadas[0]},${sitio.coordenadas[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="popup-map-link1"
                            >
                            🧭 How to get there
                            </a>
                        </div>
                        </Popup>
                </Marker>
                ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default TaxiAndToursValladolid;
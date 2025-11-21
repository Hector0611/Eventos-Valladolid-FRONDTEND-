import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./PueblosCercanos.css";


// Coordenadas aproximadas de cada pueblo
const pueblosData = [
  { nombre: "Popolá", lat: 20.689, lon: -88.143, descripcion: "Localidad perteneciente al municipio de Valladolid." },
  { nombre: "Kanxoc", lat: 20.773, lon: -88.053, descripcion: "Comunidad maya tradicional." },
  { nombre: "Yalcobá", lat: 20.792, lon: -88.187, descripcion: "Conocido por su arquitectura colonial y cultura viva." },
  { nombre: "Xocén", lat: 20.667, lon: -88.204, descripcion: "Lugar con fuerte tradición espiritual maya." },
  { nombre: "Tixhualactún", lat: 20.676, lon: -88.098, descripcion: "Pueblo con historia prehispánica." },
  { nombre: "Tesoco", lat: 20.684, lon: -88.258, descripcion: "Pequeña localidad de ambiente rural." },
  { nombre: "Tikuch", lat: 20.703, lon: -88.229, descripcion: "Lugar tranquilo y rodeado de naturaleza." },
  { nombre: "Dzitnup", lat: 20.676, lon: -88.217, descripcion: "Famoso por los cenotes Samulá y X'Kekén." },
  { nombre: "Tahmuy", lat: 20.696, lon: -88.247, descripcion: "Comunidad cercana a Valladolid." },
  { nombre: "Pixoy", lat: 20.684, lon: -88.309, descripcion: "Conocido por su tranquilidad y cultura maya." },
  { nombre: "Ebtún", lat: 20.735, lon: -88.273, descripcion: "Pueblo con raíces mayas profundas." },
  { nombre: "Xuilub", lat: 20.747, lon: -88.123, descripcion: "Localidad rural con tradiciones mayas." },
  { nombre: "Zodzilchén", lat: 20.767, lon: -88.257, descripcion: "Pequeño poblado con identidad maya." },
  { nombre: "San Isidro", lat: 20.750, lon: -88.215, descripcion: "Localidad pequeña y rodeada de vegetación." },
  { nombre: "Yalcón", lat: 20.654, lon: -88.142, descripcion: "Pequeño pueblo de Valladolid." },
  { nombre: "San Pedro Sula (localidad)", lat: 20.690, lon: -88.290, descripcion: "Comunidad menor perteneciente a Valladolid." },
  { nombre: "Koopchén", lat: 20.776, lon: -88.101, descripcion: "Localidad mencionada en documentos municipales." }
];

export default function PueblosCercanos() {
  const [puebloSeleccionado, setPuebloSeleccionado] = useState(null);

  return (
    <div className="pueblos-container"  >
        <div className="Separacion"></div>
      <h2 className="pueblos-title">Pueblos Cercanos a Valladolid</h2>

      <div className="pueblos-grid">
        {pueblosData.map((pueblo) => (
          <div
            key={pueblo.nombre}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer bg-white"
            onClick={() => setPuebloSeleccionado(pueblo)}
          >
            <h3 className="text-xl font-semibold">{pueblo.nombre}</h3>
            <p className="text-gray-600 text-sm">{pueblo.descripcion}</p>
          </div>
        ))}
      </div>

      {puebloSeleccionado && (
        <div className="pueblo-info">
          <h3 className="text-2xl font-semibold mb-2">{puebloSeleccionado.nombre}</h3>
          <p className="mb-4">{puebloSeleccionado.descripcion}</p>

          <MapContainer
            center={[puebloSeleccionado.lat, puebloSeleccionado.lon]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[puebloSeleccionado.lat, puebloSeleccionado.lon]}>
              <Popup>{puebloSeleccionado.nombre}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

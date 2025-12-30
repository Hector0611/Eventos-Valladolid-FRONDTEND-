import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./Destino.css";

import {
  MapContainer,
  TileLayer,
  Polygon,
  CircleMarker,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet-polylinedecorator";

/* ================================
   🔄 SUAVIZAR POLÍGONO (CHAIKIN)
================================ */
function suavizarPoligono(points, iteraciones = 2) {
  let resultado = points;

  for (let i = 0; i < iteraciones; i++) {
    const nuevo = [];

    for (let j = 0; j < resultado.length; j++) {
      const p0 = resultado[j];
      const p1 = resultado[(j + 1) % resultado.length];

      const q = [
        0.75 * p0[0] + 0.25 * p1[0],
        0.75 * p0[1] + 0.25 * p1[1],
      ];

      const r = [
        0.25 * p0[0] + 0.75 * p1[0],
        0.25 * p0[1] + 0.75 * p1[1],
      ];

      nuevo.push(q, r);
    }

    resultado = nuevo;
  }

  return resultado;
}

/* ================================
   ➡️ COMPONENTE FLECHA
================================ */
function Flecha({ from, to }) {
  const map = useMap();

  useEffect(() => {
    const line = L.polyline([from, to]);

    const decorator = L.polylineDecorator(line, {
      patterns: [
        {
          offset: "55%",
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 18,
            polygon: true,
            pathOptions: {
              color: "#000000ff",
              fillOpacity: 1,
              weight: 2,
            },
          }),
        },
      ],
    });

    decorator.addTo(map);

    return () => {
      map.removeLayer(decorator);
    };
  }, [map, from, to]);

  return (
    <Polyline
      positions={[from, to]}
      pathOptions={{
        color: "#000000ff",
        weight: 2,
        opacity: 0.85,
        dashArray: "6,6",
      }}
    />
  );
}

/* ================================
   🌎 COMPONENTE PRINCIPAL
================================ */
export default function Destino() {
  // 📍 Centro del mapa
  const center = [21.11331939368877, -88.1626618453165];

  // 🟦 Zona original
  const zonaValladolid = [
    [20.702772002119133, -88.63190007939542],
    [20.53880193075069, -88.57577304398018],
    [20.26731677277555, -88.25542456516203],
    [20.47305495637423, -87.6849300313554],
    [20.454126744489333, -87.6849300313554],
  
    [21.10489940848669, -87.8326594089877],
    
   
    [21.62931901364955, -87.92005997444824],
    [21.705641263256013, -88.15329503903311],
    [21.563555348665144, -88.24628523735772],
   
    [20.75514937901745, -88.51514239620812],
  ];

  // 🔵 Zona suavizada
  const zonaValladolidSuave = suavizarPoligono(zonaValladolid, 2);

  // 📌 Puntos de referencia
  const referencias = [
    { nombre: "Valladolid Centro", coords: [20.6897, -88.2017] },
    { nombre: "Chichén Itzá", coords: [20.6843, -88.5678] },
    { nombre: "Ek Balam", coords: [20.8923, -88.1365] },
    { nombre: "Las Coloradas", coords: [21.607725, -87.990538] },
    
    { nombre: "San\nFelipe", coords: [21.567061, -88.232159] },
    { nombre: "Río Lagartos", coords: [21.597284, -88.157927] },
    { nombre: "Cobá", coords: [20.493727963789087, -87.7358442070761] },
  ];

  const referencias1 = [
    { nombre: "Valladolid Centro", coords: [20.6897, -88.2017] },
    { nombre: "Chichén Itzá", coords: [20.6843, -88.5678] },
    { nombre: "Ek Balam", coords: [20.8923, -88.1365] },

    { nombre: "Río Lagartos", coords: [21.597284, -88.157927] },

     { nombre: "Cobá", coords: [20.493727963789087, -87.7358442070761] },
 
  ];

  // 📍 Origen (Valladolid)
  const origen = referencias.find(
    (r) => r.nombre === "Valladolid Centro"
  )?.coords;

  return (
    <div style={{ width: "100%", height: "920px" }}>
      <MapContainer
        center={center}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🟦 Área coloreada (SUAVE) */}
        <Polygon
          positions={zonaValladolidSuave}
          pathOptions={{
            color: "#ffffff0e",
            fillColor: "#91533aff",
            fillOpacity: 0.25,
            weight: 2,
          }}
        />

        {/* ➡️ Flechas desde Valladolid */}
        {origen &&
          referencias1
            .filter((r) => r.nombre !== "Valladolid Centro")
            .map((destino, i) => (
              <Flecha key={i} from={origen} to={destino.coords} />
            ))}

        {/* 🔵 Puntos con halo + nombre */}
        {referencias.map((ref, i) => (
          <React.Fragment key={i}>
            <CircleMarker
              center={ref.coords}
              radius={26}
              pathOptions={{
                color: "#ff1e1e",
                fillColor: "#ff1e1e",
                fillOpacity: 0.45,
                weight: 0,
              }}
            />

            <CircleMarker
              center={ref.coords}
              radius={16}
              pathOptions={{
                color: "#ff1e1eff",
                fillColor: "#ff1e1eff",
                fillOpacity: 0.55,
                weight: 0,
              }}
            />

            <CircleMarker
              center={ref.coords}
              radius={7}
              pathOptions={{
                color: "#1e90ff",
                fillColor: "#1e90ff",
                fillOpacity: 1,
                weight: 1,
              }}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -10]}
                className="label-referencia"
              >
                {ref.nombre}
              </Tooltip>
            </CircleMarker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

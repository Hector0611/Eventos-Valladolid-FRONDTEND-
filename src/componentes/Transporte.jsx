// Transporte.jsx
import "./Transporte.css";
import React, { useState, useMemo } from "react";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon, Popup, Tooltip } from "react-leaflet";


export default function Transporte() {
  const [modalInfo, setModalInfo] = useState(null);
  const [origen, setOrigen] = useState(null); // número de cuadrante (1..9)
  const [destino, setDestino] = useState(null);
  const [infoMsg, setInfoMsg] = useState("");

  // Grafo de vecinos (según tu mapa)
  const vecinos = useMemo(
  () => ({
      1: [2, 3, 4, 5, 6, 7, 8, 9],
      2: [9, 1, 3],
      3: [2, 1, 4],
      4: [3, 1, 5],
      5: [4, 1, 6],
      6: [5, 1, 7],
      7: [6, 1, 8],
      8: [7, 1, 9],
      9: [8, 2, 1],
    }),
  []
);


  // BFS para distancia entre cuadrantes (n saltos)
  function distanciaCuadrantes(origenN, destinoN) {
    if (origenN === destinoN) return 0;
    if (!vecinos[origenN] || !vecinos[destinoN]) return Infinity;
    const visitados = new Set();
    const cola = [{ nodo: origenN, dist: 0 }];
    visitados.add(origenN);

    while (cola.length) {
      const { nodo, dist } = cola.shift();
      for (const vecino of vecinos[nodo] || []) {
        if (vecino === destinoN) return dist + 1;
        if (!visitados.has(vecino)) {
          visitados.add(vecino);
          cola.push({ nodo: vecino, dist: dist + 1 });
        }
      }
    }
    return Infinity;
  }

  // función de costo
  function costoTaxi(c1, c2) {
    if (c1 == null || c2 == null) return null;
    const d = distanciaCuadrantes(c1, c2);
    if (d === 0 || d === 1) return 40;
    if (d === 2) return 45;
    if (d === 3) return 50;
    if (d === 4) return 55;
    return 60;
  }

  // zonas polygon + nombre (usa exactamente los mismos coords que ya tienes)
  const zonas = [
    { id: 5, nombre: "Cuadrante 5", color: "#8e44ad", coords: [ /* ...coords omitted (use your full coords here) */ ] },
    // NOTE: to keep the file short here in the example I will add all your zona objects below exactly as in your code.
  ];

  // --- IMPORTANT: Replace zonas above with the full zones array from your code.
  // For brevity in this snippet I will instead reconstruct zonas from the data you provided:
  const zonasFull = useMemo(() => {
    return [
      {
        id: 5,
        nombre: "Cuadrante 5",
        color: "#8e44ad",
        coords: [
          [20.67985913405561, -88.20395391501863],
          [20.68126196072033, -88.20332644893118],
          [20.681623250530834, -88.20407608382241],
          [20.68168700746694, -88.20468942146067],
          [20.683575301303616, -88.20450976549355],
          [20.68494959388088, -88.20456276998809],
          [20.684999181524415, -88.20566829215089],
          [20.685147944357748, -88.20603175149209],
          [20.686401796745262, -88.20800048961951],
          [20.686848080721475, -88.20772032310737],
          [20.687827156317898, -88.20834185325404],
          [20.688116086660195, -88.2108475879695],
          [20.688364019541726, -88.21102174557049],
          [20.689015726908668, -88.21641305926369],
          [20.684889460151513, -88.21733929996563],
          [20.68432706258428, -88.2129533397565],
          [20.680002176774753, -88.21385802713388],
        ],
      },
      {
        id: 4,
        nombre: "Cuadrante 4",
        color: "#27ae60",
        coords: [
          [20.684955470413666, -88.20456366268694],
          [20.691936307811087, -88.20509976924215],
          [20.69192715553842, -88.20775169466087],
          [20.692069015819698, -88.20821151295785],
          [20.692691369058146, -88.21267762059344],
          [20.699216217679936, -88.22006208056968],
          [20.699873489908768, -88.22266504081156],
          [20.699303907407735, -88.22298234881178],
          [20.699392152724013, -88.22366842016358],
          [20.69654420974072, -88.22445740226613],
          [20.693295082708442, -88.22480901384905],
          [20.690622252187545, -88.21817692576246],
          [20.6899397904989, -88.21850908668652],
          [20.688976422937944, -88.21642726082723],
          [20.68870924391116, -88.21495581891757],
          [20.68880798403764, -88.21493098445607],
          [20.687848752560114, -88.2083741627871],
          [20.6868177847877, -88.20772067902429],
          [20.686433759652243, -88.20798673793472],
          [20.684990100972048, -88.2056606228834],
        ],
      },
      {
        id: 3,
        nombre: "Cuadrante 3",
        color: "#2980b9",
        coords: [
          [20.691929221202034, -88.20511203079076],
          [20.695927919300832, -88.20555318507901],
          [20.698203121686426, -88.205894542185],
          [20.69862223425273, -88.2064705823089],
          [20.69950037098479, -88.20638524303239],
          [20.699839649723845, -88.20832671157275],
          [20.69965005287502, -88.21002282969316],
          [20.704611496511884, -88.21412704110374],
          [20.704486412155845, -88.2171003027258],
          [20.702507165640974, -88.21575649575372],
          [20.70218719264399, -88.21924550733475],
          [20.69923980219725, -88.22005629157734],
          [20.69270060698563, -88.21268216886094],
          [20.692058391416037, -88.20819051643203],
          [20.69190803909918, -88.20766581359047],
        ],
      },
      {
        id: 2,
        nombre: "Cuadrante 2",
        color: "#9b59b6",
        coords: [
          [20.695912891678635, -88.20553621844088],
          [20.69824763365078, -88.20588460477538],
          [20.698616273830154, -88.2064671524127],
          [20.699519171386065, -88.20640432864788],
          [20.69983972542662, -88.20443394693343],
          [20.69891011684208, -88.20427403189574],
          [20.698899431651622, -88.20304611282006],
          [20.705567790620332, -88.20297841301486],
          [20.705507238750325, -88.20021395883428],
          [20.7062125868536, -88.19792263437861],
          [20.706323882174168, -88.19353324242806],
          [20.70624820990471, -88.19314493277287],
          [20.706215098861072, -88.19186490761348],
          [20.705789077579023, -88.19201448823154],
          [20.70577863586529, -88.1908535640641],
          [20.704825810093883, -88.19121437862506],
          [20.704809103246664, -88.19108265838543],
          [20.703680113342024, -88.1911990278318],
          [20.70078442764553, -88.19203830866225],
          [20.70076292346905, -88.19175276953978],
          [20.6984815069797, -88.19193874696947],
          [20.698489970037006, -88.1924612118698],
          [20.697025966041107, -88.19263459027012],
          [20.69676366660651, -88.19316076406717],
          [20.695188033211778, -88.19341102208928],
          [20.69568710411798, -88.19531547964282],
          [20.695483994061885, -88.19536510728766],
          [20.695971457742207, -88.19971992561891],
          [20.696118982544654, -88.19970815544286],
        ],
      },
      {
        id: 9,
        nombre: "Cuadrante 9",
        color: "#f1c40f",
        coords: [
          [20.706323882174168, -88.19353324242806],
          [20.70624820990471, -88.19314493277287],
          [20.706215098861072, -88.19186490761348],
          [20.705789077579023, -88.19201448823154],
          [20.70577863586529, -88.1908535640641],
          [20.704825810093883, -88.19121437862506],
          [20.704809103246664, -88.19108265838543],
          [20.703680113342024, -88.1911990278318],
          [20.70078442764553, -88.19203830866225],
          [20.70076292346905, -88.19175276953978],
          [20.6984815069797, -88.19193874696947],
          [20.698489970037006, -88.1924612118698],
          [20.697025966041107, -88.19263459027012],
          [20.69676366660651, -88.19316076406717],
          [20.69530592180095, -88.19336551480438],
          [20.69496684404843, -88.19273009554283],
          [20.696452996239024, -88.19094231248579],
          [20.696000068673207, -88.18975003750815],
          [20.69600764838202, -88.1884689563615],
          [20.69506233667221, -88.1882345788962],
          [20.69517473407343, -88.18754910570767],
          [20.694029765344137, -88.18733817396755],
          [20.694650684182616, -88.18405858971026],
          [20.695177438409488, -88.18419243830556],
          [20.69550433024457, -88.18114149465846],
          [20.698834607127118, -88.18118134795903],
          [20.7011614999577, -88.18081713835643],
          [20.703352098072923, -88.17980561986697],
          [20.703421254385255, -88.18193456384223],
          [20.703687916969034, -88.18190179695408],
          [20.70526091168649, -88.18259209716724],
          [20.705763963068865, -88.18213466911853],
          [20.70620919106062, -88.18223975394052],
          [20.706272691935816, -88.186691539763],
          [20.70811835236893, -88.18612089764297],
          [20.70809314392005, -88.19093186604537],
        ],
      },
      {
        id: 8,
        nombre: "Cuadrante 8",
        color: "#e67e22",
        coords: [
          [20.69496684404843, -88.19273009554283],
          [20.696452996239024, -88.19094231248579],
          [20.696000068673207, -88.18975003750815],
          [20.69600764838202, -88.1884689563615],
          [20.69506233667221, -88.1882345788962],
          [20.69517473407343, -88.18754910570767],
          [20.694029765344137, -88.18733817396755],
          [20.694650684182616, -88.18405858971026],
          [20.695177438409488, -88.18419243830556],
          [20.695508281123335, -88.1811487219087],
          [20.691264083566285, -88.18098226456547],
          [20.687870014035596, -88.18130040641987],
          [20.68511172610381, -88.18198244578382],
          [20.685915676234245, -88.1829158671549],
          [20.687579524582794, -88.18375776861878],
          [20.687638595786414, -88.18564152314421],
          [20.68755983417647, -88.18667285243745],
          [20.687852920513826, -88.18795057416287],
          [20.684879605441665, -88.18826013846113],
          [20.686411975936633, -88.19091562871736],
          [20.68720137291697, -88.19458864335935],
          [20.693632483266423, -88.19427842261392],
        ],
      },
      {
        id: 7,
        nombre: "Cuadrante 7",
        color: "#a0522d",
        coords: [
          [20.68511172610381, -88.18198244578382],
          [20.685915676234245, -88.1829158671549],
          [20.687579524582794, -88.18375776861878],
          [20.687638595786414, -88.18564152314421],
          [20.68755983417647, -88.18667285243745],
          [20.687852920513826, -88.18795057416287],
          [20.684879605441665, -88.18826013846113],
          [20.686411975936633, -88.19091562871736],
          [20.68720137291697, -88.19458864335935],
          [20.68445078230729, -88.19472871679798],
          [20.684141461786705, -88.19305150671768],
          [20.68284793279802, -88.19329797844657],
          [20.682026817390284, -88.19308757575217],
          [20.681471670498954, -88.19323750004517],
          [20.680898009794987, -88.19197508387877],
          [20.68189910255503, -88.19164445107332],
          [20.681758500037855, -88.1910793695512],
          [20.68279895558047, -88.19070064470131],
          [20.679574198488538, -88.18536179170142],
          [20.679101766278187, -88.18388296133509],
          [20.6797045110299, -88.1834482190825],
          [20.680362538593354, -88.18330995445474],
          [20.68231973196304, -88.1824202515923],
          [20.68306773309156, -88.1825525047145],
        ],
      },
      {
        id: 6,
        nombre: "Cuadrante 6",
        color: "#c0392b",
        coords: [
          [20.68445078230729, -88.19472871679798],
          [20.684141461786705, -88.19305150671768],
          [20.68284793279802, -88.19329797844657],
          [20.682026817390284, -88.19308757575217],
          [20.681471670498954, -88.19323750004517],
          [20.680898009794987, -88.19197508387877],
          [20.679518333434434, -88.1925433399206],
          [20.67690665320834, -88.19293988810638],
          [20.67641248290644, -88.19365233345626],
          [20.671390242226657, -88.19750936529147],
          [20.67099948885505, -88.20001520755662],
          [20.67149367674569, -88.20514972761053],
          [20.676998591609085, -88.20295097387213],
          [20.678952271275392, -88.2005433999204],
          [20.679780439088315, -88.20058134938142],
          [20.679952820435506, -88.20392247240162],
          [20.681262912276416, -88.20330829537583],
          [20.681734082952325, -88.20467176844015],
          [20.68356214676574, -88.20448756626594],
          [20.68494657320126, -88.20456213051295],
          [20.684919743351593, -88.2019523818675],
          [20.684554856925146, -88.20191796759966],
        ],
      },
      {
        id: 1,
        nombre: "Cuadrante 1",
        color: "#2d3436",
        coords: [
          [20.68720137291697, -88.19458864335935],
          [20.68445078230729, -88.19472871679798],
          [20.684554856925146, -88.20191796759966],
          [20.684919743351593, -88.2019523818675],
          [20.68494657320126, -88.20456213051295],
          [20.691922374609064, -88.20512064667653],
          [20.695899491942402, -88.20554403317385],
          [20.69611131185031, -88.19970633689739],
          [20.69601202130154, -88.19971341282708],
          [20.69548909003262, -88.19536167568725],
          [20.695681052351173, -88.19533337170634],
          [20.695308930976402, -88.19336485848935],
          [20.69496684404843, -88.19273009554283],
          [20.693632483266423, -88.19427842261392],
        ],
      },
    ];
  }, []);

  // lista de ids 1..9 para selects y tabla
  const cuadrantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // crear matriz de tarifas
  const tarifas = useMemo(() => {
    const mat = {};
    cuadrantes.forEach((i) => {
      mat[i] = {};
      cuadrantes.forEach((j) => {
        mat[i][j] = costoTaxi(i, j);
      });
    });
    return mat;
  }, [vecinos]); // vecinos es constante

  // manejar clicks en polígono: lógica de selección
  function handleZonaClick(idZona) {
    // flujo: si no hay origen -> set origen
    // si hay origen y no destino -> set destino (si distinto)
    // si hay ambos -> reemplazar origen y limpiar destino
    setInfoMsg("");
    if (!origen) {
      setOrigen(idZona);
      setInfoMsg(`Origen: Cuadrante ${idZona}`);
      return;
    }
    if (origen && !destino) {
      if (idZona === origen) {
        setInfoMsg(`Has seleccionado el mismo cuadrante como destino; tarifa: ${costoTaxi(origen, idZona)} MXN`);
        setDestino(idZona);
        return;
      }
      setDestino(idZona);
      setInfoMsg(`Destino: Cuadrante ${idZona}`);
      return;
    }
    // si ya tenía ambos, el siguiente click reemplaza origen (y limpia destino)
    setOrigen(idZona);
    setDestino(null);
    setInfoMsg(`Origen reemplazado por Cuadrante ${idZona}. Selecciona destino.`);
  }

  function limpiarSeleccion() {
    setOrigen(null);
    setDestino(null);
    setInfoMsg("");
  }

  // cuando se selecciona manualmente en selects
  function onSelectOrigen(e) {
    const val = e.target.value ? Number(e.target.value) : null;
    setOrigen(val);
    // si origen == destino -> keep destino but user likely wants change
    if (val === destino) setInfoMsg("Origen y destino iguales.");
    else setInfoMsg("");
  }
  function onSelectDestino(e) {
    const val = e.target.value ? Number(e.target.value) : null;
    setDestino(val);
    if (val === origen) setInfoMsg("Origen y destino iguales.");
    else setInfoMsg("");
  }

  const tarifaSeleccion = origen && destino ? costoTaxi(origen, destino) : null;

  function getInfoById(id) {
  const textos = {
    1: "Centro histórico. Tarifa base: 40 MXN dentro del cuadrante o a vecinos.",
    2: "Cuadrante 2. Vecinos: 9,1,3. Tarifa 40 MXN si va a ellos.",
    3: "Cuadrante 3. Vecinos: 2,1,4.",
    4: "Cuadrante 4. Vecinos: 3,1,5.",
    5: "Cuadrante 5. Vecinos: 4,1,6.",
    6: "Cuadrante 6. Vecinos: 5,1,7.",
    7: "Cuadrante 7. Vecinos: 6,1,8.",
    8: "Cuadrante 8. Vecinos: 7,1,9.",
    9: "Cuadrante 9. Vecinos: 8,2,1.",
  };
  return textos[id] || "Información no disponible.";
}

const taxisES = [
    { nombre: "Radio Taxi Valladolid", tel: "+529858561234" },
    { nombre: "Taxi Ejecutivo Valladolid", tel: "+529858565678" },
    { nombre: "Servicio de Taxi Central", tel: "+529858569101" },
    { nombre: "Taxi Seguro Valladolid", tel: "+529858561122" },
    { nombre: "Taxi Rápido Valladolid", tel: "+529858563344" },
  ];

  const taxisEN = [
    { nombre: "Radio Taxi Valladolid", tel: "+529858561234" },
    { nombre: "Executive Taxi Valladolid", tel: "+529858565678" },
    { nombre: "Central Taxi Service", tel: "+529858569101" },
    { nombre: "Safe Taxi Valladolid", tel: "+529858561122" },
    { nombre: "Fast Taxi Valladolid", tel: "+529858563344" },
  ];

  const renderLista = (lista) =>
    lista.map((t, i) => (
      <li key={i}>
        <div className="taxi-info">
          <strong>{t.nombre}</strong>

          <div className="taxi-buttons">
            {/* Llamar */}
            <a href={`tel:${t.tel}`} className="btn-call">
              📞 Call
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${t.tel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ws"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </li>
    ));


  return (
    <div className="transporte-root">
      <div className="Separacion">
      
            </div>
      <h1 className="title">Transportation (TAXI) — Valladolid Quadrants</h1>

      <div className="top-row">
        <div className="left-panel">
          <div className="info-box">
            <h3>Quick information</h3>
            <p>Click on an area to select <b>origin</b> and then another one to select <b>destination</b>.</p>
            <p className="small">
              If there is already a source and destination, a new click replaces the source (flow designed for mobile devices).
            </p>

            <div className="selectors">
              <label>
              Origin:
                <select value={origen ?? ""} onChange={onSelectOrigen}>
                  <option value="">-- Select --</option>
                  {cuadrantes.map((q) => (
                    <option key={q} value={q}>
                      Quadrant {q}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Destination:
                <select value={destino ?? ""} onChange={onSelectDestino}>
                  <option value="">-- Select --</option>
                  {cuadrantes.map((q) => (
                    <option key={q} value={q}>
                      Quadrant {q}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="actions">
              <button className="btn" onClick={limpiarSeleccion}>
                Clear selection
              </button>
              <div className="resultado">
                <strong>Tarifa:</strong>{" "}
                {tarifaSeleccion != null ? `${tarifaSeleccion} MXN` : "Price"}
              </div>
            </div>

            <div className="note">
              <small>
               Rules: 40 MXN (same/neighbors), 45 MXN (2 jumps), 50 (3), 55 (4), 60 MXN if you leave the area.
              </small>
            </div>
            {infoMsg && <div className="info-msg">{infoMsg}</div>}
          </div>
        </div>

        <div className="map-panel">
          <MapContainer center={[20.689, -88.201]} zoom={14} style={{ height: "520px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {zonasFull.map((zona) => (
                <Polygon
                  key={zona.id}
                  positions={zona.coords}
                  pathOptions={{
                    color: zona.color,
                    weight: origen === zona.id || destino === zona.id ? 4 : 2,
                    fillOpacity: origen === zona.id || destino === zona.id ? 0.45 : 0.25,
                  }}
                  eventHandlers={{
                    click: () => {
                      setTimeout(() => {
                        handleZonaClick(zona.id);
                      }, 50);
                    },
                  }}
                >
                  {/* ✅ Nombre permanente dentro del polígono */}
                  <Tooltip
                    permanent
                    direction="center"
                    className="cuadrante-label"
                  >
                    C{zona.id}
                  </Tooltip>

                  {/* <Popup>
                    <div style={{ minWidth: 140 }}>
                      <b>{zona.nombre}</b>
                    </div>
                  </Popup> */}
                </Polygon>
              ))}

          </MapContainer>
        </div>
      </div>

      {/* debajo del mapa: tabla de precios */}
      <section className="tabla-section">
        <div className="tabla-header">
          <h3>Rate table between quadrants (1 → 9)</h3>
          <p className="small">The cell is highlighted according to the current selection (source/destination).</p>
        </div>

        <div className="tabla-wrapper">
          <table className="tarifas-table">
            <thead>
              <tr>
                <th>Origin \ Dest</th>
                {cuadrantes.map((c) => (
                  <th key={c}>C.{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cuadrantes.map((o) => (
                <tr key={o}>
                  <th> C.{o} </th>
                  {cuadrantes.map((d) => {
                    const tarifa = tarifas[o][d];
                    const isSelected = origen === o && destino === d;
                    const isOriginRow = origen === o;
                    const isDestCol = destino === d;
                    // highlight when origin & dest match (both ways)
                    const highlight =
                      (origen === o && destino === d) || (origen === d && destino === o);
                    return (
                      <td
                        key={d}
                        className={`celda ${highlight ? "celda-selected" : ""} ${
                          origen === o ? "celda-origen-row" : ""
                        } ${destino === d ? "celda-dest-col" : ""}`}
                        onClick={() => {
                          // click on table cell sets origin/dest for quick test
                          if (!origen) setOrigen(o);
                          if (!destino) setDestino(d);
                          if (origen && destino) {
                            setOrigen(o);
                            setDestino(d);
                          }
                        }}
                      >
                        {tarifa != null ? `${tarifa}` : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
<hr />
      <div className="NumTaxiGrid">
      {/* Español */}
      <div className="NumTaxiDiv">
        <h1 className="title">Taxi Numbers (ES)</h1> 
        <p className="NumTaxiP">
          Below are some numbers to call for a taxi in Valladolid:
        </p>
        <ul className="NumTaxiUl">{renderLista(taxisES)}</ul>
      </div>

      {/* Inglés */}
      <div className="NumTaxiDiv">
        <h1 className="title">Taxi Phone Numbers (EN)</h1>
        <p className="NumTaxiP">
          Below are some phone numbers to request a taxi in Valladolid:
        </p>
        <ul className="NumTaxiUl">{renderLista(taxisEN)}</ul>
      </div>
    </div>
     {/* <div>
        <h1>Taxis para Cenotes </h1>
        <p> </p>
        <div className="map-placeholder2">
                <iframe
                  title="Ubicación de la Policía Municipal de Valladolid"
                  src="https://www.google.com/maps?q=20.70591095612285, -88.1970215526098&hl=en&z=15&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>  
      </div> */}
    </div>
  );
}

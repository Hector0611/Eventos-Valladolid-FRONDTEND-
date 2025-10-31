
import "./Transporte.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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


 /* mapa */

 const zonas = [
  {
    nombre: "Cuadrante 5",
    color: "purple",
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
    info: "El cobro del taxi es: </br> 40 (MXN) para los cuadrantes que tiene alado </br> 45 (MXN) si pasa mas de dos cuadrantes </br> 50 (MXN) si pasa mas de 3 cuadrantes </br> 55 (MXN) si pasa mas de 4 cuadrantes </br></br> Nota: SI SE PASA DE LOS CUADRANTES PINTADOS EL COBRO ES DE 60 (MXN) 'SOLO SI SIGUE DENTRO DE LA CIUDAD'" ,
  },
  {
    nombre: "Cuadrante 4",
    color: "green",
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
    nombre: "Cuadrante 3",
    color: "blue",
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
    nombre: "Cuadrante 2",
    color: "black",
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
    nombre: "Cuadrante 9",
    color: "yellow",
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
    nombre: "Cuadrante 8",
    color: "orange",
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
    nombre: "Cuadrante 7",
    color: "brown",
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
    nombre: "Cuadrante 6",
    color: "red",
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
    nombre: "Centro Historico (Cuadrante 1)",
    color: "Violet",
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
  // agrega más zonas...
];

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

      <MapContainer center={[20.689, -88.201]} zoom={14} style={{ height: "500px", width: "80%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {zonas.map((zona, i) => (
        <Polygon key={i} positions={zona.coords} color={zona.color}>
          <Popup>{zona.nombre}</Popup>
        </Polygon>
      ))}
    </MapContainer>

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
        <div className="modal-overlay11" onClick={() => setModalInfo(null)}>
          <div className="modal-content11" onClick={(e) => e.stopPropagation()}>
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


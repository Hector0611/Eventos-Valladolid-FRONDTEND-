import React, { useEffect, useState } from 'react';  
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Hoteles.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import logo3 from './Imagenes/maps/Hospedaje.png';
import logo5 from './Imagenes/maps/Arqueologicas.png';
import logoCenote from './Imagenes/maps/Cenote.png';
import oficina from './Imagenes/maps/OFICINA_DE_TURISMO.png';


// ====================== ICONOS ============================
const hotelIcon = new L.Icon({ iconUrl: logo3, iconSize: [35, 45], iconAnchor: [20, 40] });
const sitioIcon = new L.Icon({ iconUrl: logo5, iconSize: [35, 45], iconAnchor: [20, 40] });
const cenoteIcon = new L.Icon({ iconUrl: logoCenote, iconSize: [35, 45], iconAnchor: [20, 40] });


// ====================== FLY TO ============================
const FlyToLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      const lat = parseFloat(location.latitud);
      const lng = parseFloat(location.longitud);
      if (!isNaN(lat) && !isNaN(lng)) map.flyTo([lat, lng], 18, { duration: 2.5 });
    }
  }, [location, map]);
  return null;
};


// ====================== COMPONENTE ============================
const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [sitios, setSitios] = useState([]);
  const [cenotes, setCenotes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openSection, setOpenSection] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [activeTooltip, setActiveTooltip] = useState(null);

const oficinaIcon = new L.Icon({
  iconUrl: oficina,
  iconSize: [35, 45],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

  // -------- Oficina de turismo (dato local) --------
  const oficinaTurismo = {
    id: "oficina_marker",
    type: "Oficina",
    nombre: "Tourist Office ",
    descripcion: "Visitor services, tourist information, maps, traveler support and cultural information.",
    latitud: 20.68977712995606,
    longitud: -88.20095224099595,
    localizacion: "Downtown Valladolid, Yucatán, Mexico ",
    telefono: "+52 985 856 1234",
    horario_abi: "08:00",
    horario_cer: "20:00",
    web: "https://visitvalladolid.com.mx/"
  };


  // ---------------- Tamaño pantalla ----------------
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // ---------------- Obtener APIs ----------------
  useEffect(() => {
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/hoteles').then(res => setHoteles(res.data));
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/sitios').then(res => setSitios(res.data));
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/cenote_mapa').then(res => setCenotes(res.data));
  }, []);


  // ---------------- Estrellas ----------------
  const renderStars = (estrellas) => {
    const full = Math.floor(estrellas);
    const half = estrellas % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <>
        {[...Array(full)].map((_, i) => <FaStar key={i} color="gold" />)}
        {half && <FaStarHalfAlt color="gold" />}
        {[...Array(empty)].map((_, i) => <FaRegStar key={i} color="gold" />)}
      </>
    );
  };


  // ---------------- BUSCADOR ----------------
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value.trim()) return setFilteredResults([]);

    const hotelMatches = hoteles.filter(h => h.hotel.toLowerCase().includes(value))
      .map(h => ({ type: 'visit', name: h.hotel, data: h }));

    const sitioMatches = sitios.filter(s => s.sitio_arqueologico.toLowerCase().includes(value))
      .map(s => ({ type: 'Sitio', name: s.sitio_arqueologico, data: s }));

    const cenoteMatches = cenotes.filter(c => c.cenote.toLowerCase().includes(value))
      .map(c => ({ type: 'Cenote', name: c.cenote, data: c }));

    const oficinaMatch =
      oficinaTurismo.nombre.toLowerCase().includes(value)
        ? [{ type: "Oficina", name: oficinaTurismo.nombre, data: oficinaTurismo }]
        : [];

    setFilteredResults([...hotelMatches, ...sitioMatches, ...cenoteMatches, ...oficinaMatch]);
  };


  // ---------------- Render PANEL ----------------
  const renderInfoPanel = (item, type) => {
    if (!item) return null;

    const nombreMostrar =
      type === 'visit' ? item.hotel :
      type === 'Sitio' ? item.sitio_arqueologico :
      type === 'Cenote' ? item.cenote :
      item.nombre;

    return (
  <div className="panel-content">
    {!isMobile && <button onClick={() => setSelectedItem(null)} className="close-button">✖</button>}

    <h4>{nombreMostrar}</h4>

    <p className='texto_item'>
      {item.descripcion?.slice ? item.descripcion.slice(0, 300) + "..." : item.descripcion}
    </p>

    <p>📍 {item.localizacion}</p>

    {item.web_hotel || item.web_sitio || item.web_cenote ? (
      <p>🌐 <a href={item.web_hotel || item.web_sitio || item.web_cenote} target="_blank" rel="noopener noreferrer">{item.web_hotel || item.web_sitio || item.web_cenote}</a></p>
    ) : null}

    {item.telefono && <p>📞 {item.telefono}</p>}

    {item.horario_abi && (
      <p>🕒 {item.horario_abi} - {item.horario_cer}</p>
    )}

    <div className="botones-hotel">
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitud},${item.longitud}`}
        target="_blank"
        rel="noopener noreferrer"
        className="info-button"
      >
        <p>Indications</p>
      </a>
    </div>
  </div>
);

    
  };

  // =====================================================
  // ====================== RETURN ========================
  // =====================================================
  return (
    <div>
      <div className="Separacion"></div>

      <div className="hoteles-container">

        {/* ------------------------------------------------
           SIDEBAR 
        ------------------------------------------------ */}
        <aside className="hotel-list scrollable-sidebar">
          <hr /><h3 className="tititulo">Search Places</h3><hr />

          {/* Buscador */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={searchTerm}
              className="search-input1"
            />
            {filteredResults.length > 0 && (
              <ul className="search-suggestions">
                {filteredResults.map((item, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => {
                      setSelectedItem(item);
                      setActiveTooltip(item.data.id);
                    }}
                  >

                    <strong>{item.name}</strong> <span className="search-type">{item.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
            <hr />
          {/* Oficina de Turismo */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setSelectedItem({ type: "Oficina", data: oficinaTurismo })}>
              🏢 Tourist Office 
            </h4>
              
         
          </div>


          


          {/* Sitios */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setOpenSection(openSection === 'sitios' ? null : 'sitios')}>
              🏛️ Archaeological Sites <span className={`arrow ${openSection === 'sitios' ? 'open' : ''}`}>▼</span>
            </h4>
            {openSection === 'sitios' && (
              <div className="grid-container scrollable-items">
                {sitios.map(s => (
                  <div key={s.id} onClick={() => setSelectedItem({ type: "Sitio", data: s })} className="grid-item">
                    <strong>{s.sitio_arqueologico}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Cenotes */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setOpenSection(openSection === 'cenotes' ? null : 'cenotes')}>
              🏞️ Cenotes <span className={`arrow ${openSection === 'cenotes' ? 'open' : ''}`}>▼</span>
            </h4>
            {openSection === 'cenotes' && (
              <div className="grid-container scrollable-items">
                {cenotes.map(c => (
                  <div key={c.id} onClick={() => setSelectedItem({ type: "Cenote", data: c })} className="grid-item">
                    <strong>{c.cenote}</strong>
                    <div className="estrellas">{renderStars(c.estrellas)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hoteles */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setOpenSection(openSection === 'hoteles' ? null : 'hoteles')}>
              🏨 visit places <span className={`arrow ${openSection === 'hoteles' ? 'open' : ''}`}>▼</span>
            </h4>
            {openSection === 'hoteles' && (
              <div className="grid-container scrollable-items">
                {hoteles.map(h => (
                  <div key={h.id} onClick={() => setSelectedItem({ type: "Hotel", data: h })} className="grid-item">
                    <strong>{h.hotel}</strong>
                    <div className="estrellas">{renderStars(h.estrellas)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </aside>
        {/* ------------------------------------------------
           MAPA
        ------------------------------------------------ */}
        <div className="map-wrapper">
          <MapContainer
            center={[20.69018, -88.201223]}
            zoom={9}
            style={{ height: isMobile ? '400px' : '600px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Hoteles */}
            {hoteles.map(h => (
              <Marker
                key={h.id}
                position={[parseFloat(h.latitud), parseFloat(h.longitud)]}
                icon={hotelIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedItem({ type: "Hotel", data: h });
                    setActiveTooltip(h.id);
                  } 
                }}
              >
                <Tooltip 
                  direction="top"
                  offset={[-2, -38]}
                  opacity={0.9}
                  permanent={activeTooltip === h.id}
                >
                  {h.id}-{h.hotel}
                </Tooltip>
              </Marker>

            ))}

            {/* Sitios */}
            {sitios.map(s => (
              <Marker
                  key={s.id}
                  position={[parseFloat(s.latitud), parseFloat(s.longitud)]}
                  icon={sitioIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedItem({ type: "Sitio", data: s });
                      setActiveTooltip(s.id);
                    }
                  }}
                >
                  <Tooltip 
                    direction="top"
                    offset={[-2, -38]}
                    opacity={0.9}
                    permanent={activeTooltip === s.id}
                  >
                    {s.sitio_arqueologico}
                  </Tooltip>
                </Marker>

            ))}

            {/* Cenotes */}
            {cenotes.map(c => (
              <Marker
                key={c.id}
                position={[parseFloat(c.latitud), parseFloat(c.longitud)]}
                icon={cenoteIcon}
                eventHandlers={{ 
                  click: () => {
                    setSelectedItem({ type: "Cenote", data: c });
                    setActiveTooltip(c.id);
                  }
                }}
              >
                <Tooltip 
                  direction="top"
                  offset={[-2, -38]}
                  opacity={0.9}
                  permanent={activeTooltip === c.id}
                >
                  {c.cenote}
                </Tooltip>
              </Marker>

            ))}

            {/* Oficina de Turismo */}
            <Marker
                key="oficina_marker"
                position={[oficinaTurismo.latitud, oficinaTurismo.longitud]}
                icon={oficinaIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedItem({ type: "Oficina", data: oficinaTurismo });
                    setActiveTooltip(oficinaTurismo.id);
                  }
                }}
              >
                <Tooltip 
                  direction="top"
                  offset={[-2, -38]}
                  opacity={0.9}
                  permanent={activeTooltip === "oficina_marker"}
                >
                  Tourist Office
                </Tooltip>
              </Marker>


            <FlyToLocation location={selectedItem?.data} />
          </MapContainer>


          {/* Panel info */}
          {/* PANEL DE INFORMACIÓN */}
          {isMobile ? (
            <div className="mobile-info-container">
              {selectedItem && renderInfoPanel(selectedItem.data, selectedItem.type)}
            </div>
          ) : (
            <div className={`side-panel ${selectedItem ? 'open' : ''}`}>
              <button className="close-button" onClick={() => setSelectedItem(null)}>✖</button>
              {selectedItem && renderInfoPanel(selectedItem.data, selectedItem.type)}
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Hoteles;

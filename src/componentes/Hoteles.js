import React, { useEffect, useState } from 'react';  
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Hoteles.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import logo3 from './Imagenes/Hotel.png';
import logo5 from './Imagenes/sitiosarque.png';
import logoCenote from './Imagenes/restaurante.png';

const hotelIcon = new L.Icon({ iconUrl: logo3, iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -40] });
const sitioIcon = new L.Icon({ iconUrl: logo5, iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -40] });
const cenoteIcon = new L.Icon({ iconUrl: logoCenote, iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -40] });

const FlyToLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location && map) {
      const lat = parseFloat(location.latitud);
      const lng = parseFloat(location.longitud);
      if (!isNaN(lat) && !isNaN(lng)) map.flyTo([lat, lng], 17, { duration: 2.5 });
    }
  }, [location, map]);
  return null;
};

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [sitios, setSitios] = useState([]);
  const [cenotes, setCenotes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // <- Un solo estado
  const [openSection, setOpenSection] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/hoteles').then(res => setHoteles(res.data));
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/sitios').then(res => setSitios(res.data));
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/cenote_mapa').then(res => setCenotes(res.data));
  }, []);

  const renderStars = (estrellas) => {
    const fullStars = Math.floor(estrellas);
    const hasHalfStar = estrellas % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={i} color="gold" />)}
        {hasHalfStar && <FaStarHalfAlt color="gold" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} color="gold" />)}
      </>
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value.trim()) return setFilteredResults([]);
    const hotelMatches = hoteles.filter(h => h.hotel.toLowerCase().includes(value))
      .map(h => ({ type: 'Hotel', name: h.hotel, data: h }));
    const sitioMatches = sitios.filter(s => s.sitio_arqueologico.toLowerCase().includes(value))
      .map(s => ({ type: 'Sitio', name: s.sitio_arqueologico, data: s }));
    const cenoteMatches = cenotes.filter(c => c.cenote.toLowerCase().includes(value))
      .map(c => ({ type: 'Cenote', name: c.cenote, data: c }));
    setFilteredResults([...hotelMatches, ...sitioMatches, ...cenoteMatches]);
  };

  const handleSelect = (type, data) => {
    setSelectedItem({ type, data });
    setSearchTerm(data.hotel || data.sitio_arqueologico || data.cenote);
    setFilteredResults([]);
  };

  const renderInfoPanel = (item, type) => {
    if (!item) return null;
    return (
      <div className={`hotel-info open ${isMobile ? 'mobile-info' : ''}`}>
        {!isMobile && <button onClick={() => setSelectedItem(null)} className="close-button">✖</button>}
        <h4>{type === 'Hotel' ? item.hotel : type === 'Sitio' ? item.sitio_arqueologico : item.cenote}</h4>
        <p className='texto_item'>{item.descripcion.slice(0, 300) + '...'}</p>
        <p>📍 {item.localizacion}</p>
        {item.web_hotel || item.web_sitio || item.web_cenote ? (
          <p>🌐 <a href={item.web_hotel || item.web_sitio || item.web_cenote} target="_blank" rel="noopener noreferrer">{item.web_hotel || item.web_sitio || item.web_cenote}</a></p>
        ) : null}
        {item.telefono && <p>📞 {item.telefono}</p>}
        {item.horario_abi && <p>🕒 {item.horario_abi} - {item.horario_cer}</p>}
        {item.precio && <p>💰 Price: ${item.precio} MX</p>}
        <div className="botones-hotel">
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitud},${item.longitud}`} target="_blank" rel="noopener noreferrer" className="info-button">
            <p> Indications </p>  
          </a>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="Separacion"></div>
      <div className="hoteles-container">
        <aside className="hotel-list scrollable-sidebar">
  <hr /><h3 className="tititulo">Search Places</h3><hr />
  <div className="search-container" style={{ position: 'relative' }}>
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
        <li key={idx} onClick={() => handleSelect(item.type, item.data)}>
          <strong>{item.name}</strong> <span className="search-type">{item.type}</span>
        </li>
      ))}
    </ul>
  )}
</div>


  {/* Hoteles */}
  <div className="accordion-section">
    <h4 className="titel4" onClick={() => setOpenSection(openSection === 'hoteles' ? null : 'hoteles')}>
      🏨 Hotels <span className={`arrow ${openSection === 'hoteles' ? 'open' : ''}`}>▼</span>
    </h4>
    {openSection === 'hoteles' && (
      <div className="grid-container scrollable-items">
        {hoteles.map(h => (
          <div key={h.id} onClick={() => handleSelect('Hotel', h)} className="grid-item">
            <strong>{h.hotel}</strong>
            <div className="estrellas">{renderStars(h.estrellas)}</div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Sitios */}
  <div className="accordion-section">
    <h4 className="titel4" onClick={() => setOpenSection(openSection === 'sitios' ? null : 'sitios')}>
      🏛️ Archaeological Sites <span className={`arrow ${openSection === 'sitios' ? 'open' : ''}`}>▼</span>
    </h4>
    {openSection === 'sitios' && (
      <div className="grid-container scrollable-items">
        {sitios.map(s => (
          <div key={s.id} onClick={() => handleSelect('Sitio', s)} className="grid-item">
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
          <div key={c.id} onClick={() => handleSelect('Cenote', c)} className="grid-item">
            <strong>{c.cenote}</strong>
            <div className="estrellas">{renderStars(c.estrellas)}</div>
          </div>
        ))}
      </div>
    )}
  </div>
</aside>
 


        <div className="map-wrapper">
          <MapContainer
            center={[20.69018, -88.201223]}
            zoom={9}
            style={{ height: isMobile ? '400px' : '600px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* Hoteles */}
            {hoteles.map(h => (
              <Marker
                key={h.id}
                position={[parseFloat(h.latitud), parseFloat(h.longitud)]}
                icon={hotelIcon}
                eventHandlers={{ click: () => handleSelect('Hotel', h) }}
              >
                <Tooltip direction="top" offset={[0, -35]} opacity={0.9} permanent={false}>
                  {h.hotel}
                </Tooltip>
              </Marker>
            ))}

            {/* Sitios */}
            {sitios.map(s => (
              <Marker
                key={s.id}
                position={[parseFloat(s.latitud), parseFloat(s.longitud)]}
                icon={sitioIcon}
                eventHandlers={{ click: () => handleSelect('Sitio', s) }}
              >
                <Tooltip direction="top" offset={[0, -35]} opacity={0.9} permanent={false}>
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
                eventHandlers={{ click: () => handleSelect('Cenote', c) }}
              >
                <Tooltip direction="top" offset={[0, -35]} opacity={0.9} permanent={false}>
                  {c.cenote}
                </Tooltip>
              </Marker>
            ))}

            <FlyToLocation location={selectedItem?.data} />
          </MapContainer>

          {/* Panel de información */}
          {isMobile ? (
            <div className="mobile-info-container">
              {selectedItem && renderInfoPanel(selectedItem.data, selectedItem.type)}
            </div>
          ) : (
            selectedItem && <div className="div_on">{renderInfoPanel(selectedItem.data, selectedItem.type)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hoteles;

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
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedSitio, setSelectedSitio] = useState(null);
  const [selectedCenote, setSelectedCenote] = useState(null);
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
    const hotelMatches = hoteles.filter(h => h.hotel.toLowerCase().includes(value)).map(h => ({ type: 'Hotel', name: h.hotel, data: h }));
    const sitioMatches = sitios.filter(s => s.sitio_arqueologico.toLowerCase().includes(value)).map(s => ({ type: 'Archaeological Site', name: s.sitio_arqueologico, data: s }));
    const cenoteMatches = cenotes.filter(c => c.cenote.toLowerCase().includes(value)).map(c => ({ type: 'Cenote', name: c.cenote, data: c }));
    setFilteredResults([...hotelMatches, ...sitioMatches, ...cenoteMatches]);
  };

  const renderInfoPanel = (item, type) => {
    if (!item) return null;
    return (
      <div className={`hotel-info open ${isMobile ? 'mobile-info' : ''}`}>
        {!isMobile && <button onClick={() => { type === 'Hotel' ? setSelectedHotel(null) : type === 'Sitio' ? setSelectedSitio(null) : setSelectedCenote(null); }} className="close-button">✖</button>}
        <h4>{type === 'Hotel' ? item.hotel : type === 'Sitio' ? item.sitio_arqueologico : item.cenote}</h4>
        <p>{item.descripcion}</p>
        <p>📍 {item.localizacion}</p>
        {item.web_hotel || item.web_sitio || item.web_cenote ? (
          <p>🌐 <a href={item.web_hotel || item.web_sitio || item.web_cenote} target="_blank" rel="noopener noreferrer">{item.web_hotel || item.web_sitio || item.web_cenote}</a></p>
        ) : null}
        {item.telefono && <p>📞 {item.telefono}</p>}
        {item.horario_abi && <p>🕒 {item.horario_abi} - {item.horario_cer}</p>}
        {item.precio && <p>💰 Price: ${item.precio} MX</p>}
        <div className="botones-hotel">
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitud},${item.longitud}`} target="_blank" rel="noopener noreferrer" className="info-button">
            Indications
          </a>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="Separacion"></div>
      <div className="hoteles-container">
        <aside className="hotel-list">
          <hr /><h3 className="tititulo">Search Places</h3><hr />
          <input type="text" placeholder="Search..." onChange={handleSearch} value={searchTerm} className="search-input1" />
          {filteredResults.length > 0 && (
            <ul className="search-suggestions">
              {filteredResults.map((item, idx) => (
                <li key={idx} onClick={() => { item.type === 'Hotel' ? setSelectedHotel(item.data) : item.type === 'Archaeological Site' ? setSelectedSitio(item.data) : setSelectedCenote(item.data); setFilteredResults([]); setSearchTerm(item.name); }}>
                  <strong>{item.name}</strong> <span className="search-type">{item.type}</span>
                </li>
              ))}
            </ul>
          )}
          {/* Hoteles */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setOpenSection(openSection === 'hoteles' ? null : 'hoteles')}>
              🏨 Hotels <span className={`arrow ${openSection === 'hoteles' ? 'open' : ''}`}>▼</span>
            </h4>
            {openSection === 'hoteles' && (
              <ul className="ul_hotel">{hoteles.map(h => <li key={h.id} onClick={() => setSelectedHotel(h)} className="list-item"><strong>{h.hotel}</strong><div className="estrellas">{renderStars(h.estrellas)}</div></li>)}</ul>
            )}
          </div>
          {/* Sitios */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setOpenSection(openSection === 'sitios' ? null : 'sitios')}>
              🏛️ Archaeological Sites <span className={`arrow ${openSection === 'sitios' ? 'open' : ''}`}>▼</span>
            </h4>
            {openSection === 'sitios' && (
              <ul className="ul_hotel">{sitios.map(s => <li key={s.id} onClick={() => setSelectedSitio(s)} className="list-item"><strong>{s.sitio_arqueologico}</strong></li>)}</ul>
            )}
          </div>
          {/* Cenotes */}
          <div className="accordion-section">
            <h4 className="titel4" onClick={() => setOpenSection(openSection === 'cenotes' ? null : 'cenotes')}>
              🏞️ Cenotes <span className={`arrow ${openSection === 'cenotes' ? 'open' : ''}`}>▼</span>
            </h4>
            {openSection === 'cenotes' && (
              <ul className="ul_hotel">{cenotes.map(c => <li key={c.id} onClick={() => setSelectedCenote(c)} className="list-item"><strong>{c.cenote}</strong><div className="estrellas">{renderStars(c.estrellas)}</div></li>)}</ul>
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
      eventHandlers={{ click: () => setSelectedHotel(h) }}
    >
      <Tooltip direction="top" offset={[0, -35]} opacity={0.9} permanent={false}>
        {h.hotel}
      </Tooltip>
    </Marker>
  ))}

  {/* Sitios arqueológicos */}
  {sitios.map(s => (
    <Marker
      key={s.id}
      position={[parseFloat(s.latitud), parseFloat(s.longitud)]}
      icon={sitioIcon}
      eventHandlers={{ click: () => setSelectedSitio(s) }}
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
      eventHandlers={{ click: () => setSelectedCenote(c) }}
    >
      <Tooltip direction="top" offset={[0, -35]} opacity={0.9} permanent={false}>
        {c.cenote}
      </Tooltip>
    </Marker>
  ))}

  <FlyToLocation location={selectedHotel || selectedSitio || selectedCenote} />
</MapContainer>


  {/* Panel de información: modal en PC, debajo del mapa en mobile */}
  {/* Panel de información: modal en PC, debajo del mapa en mobile */}
{isMobile ? (
  <div className="mobile-info-container">
    {selectedHotel && renderInfoPanel(selectedHotel, 'Hotel')}
    {selectedSitio && renderInfoPanel(selectedSitio, 'Sitio')}
    {selectedCenote && renderInfoPanel(selectedCenote, 'Cenote')}
  </div>
) : (
  <>
    {selectedHotel && <div className="div_on">{renderInfoPanel(selectedHotel, 'Hotel')}</div>}
    {selectedSitio && <div className="div_on">{renderInfoPanel(selectedSitio, 'Sitio')}</div>}
    {selectedCenote && <div className="div_on">{renderInfoPanel(selectedCenote, 'Cenote')}</div>}
  </>
)}

</div>

      </div>

     
    </div>
  );
};

export default Hoteles;

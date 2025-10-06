import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Hoteles.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { div } from 'framer-motion/client';

// Icono personalizado SVG
const hotelIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

// Componente para mover la vista del mapa
const FlyToHotel = ({ hotel }) => {
  const map = useMap();

  useEffect(() => {
    if (hotel && map) {
      const lat = parseFloat(hotel.latitud);
      const lng = parseFloat(hotel.longitud);
      if (!isNaN(lat) && !isNaN(lng)) {
        const offsetLng = lng - - 0.0017; // Ajusta este valor según lo necesites
        try {
          map.flyTo([lat,  offsetLng], 17, { duration: 3 });
        } catch (error) {
          console.error('Error flyTo:', error);
        }
      }
    }
  }, [hotel, map]);
  return null;
};


const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  
  const [hoveredHotel, setHoveredHotel] = useState(null);
  /* compoenetes para hotel y restaurantes informacion */
const [hotelInfo, setHotelInfo] = useState(null);
const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    axios.get('https://eventos-valladolid-backendt.onrender.com/api/hoteles')
      .then(response => setHoteles(response.data))
      .catch(error => console.error('Error al cargar hoteles:', error));
  }, []);

  const fetchHotelInfo = async (idHotel) => {
  try {
    const res = await axios.get('https://eventos-valladolid-backendt.onrender.com/api/hotsyrest_info');
    const match = res.data.find(item => item.id_hotel === idHotel);
    setHotelInfo(match);
    setShowInfoModal(true);
  } catch (err) {
    console.error('Error al obtener info extendida:', err);
  }
};

const [hotelInfoList, setHotelInfoList] = useState([]);

useEffect(() => {
  axios.get('https://eventos-valladolid-backendt.onrender.com/api/hotsyrest_info')
    .then(res => setHotelInfoList(res.data))
    .catch(err => console.error('Error al obtener info extendida:', err));
}, []);

  
  return (
    <div>
      <div className='Separacion'> 

              </div>
    <div className="hoteles-container">{/* aqui */}
      
      <aside className="hotel-list">
       < hr></hr>
        <h3 className="titel1">Search Places</h3>
       < hr></hr>
        {/* buscar hoteles por su nombre y si no busca que se reinice al borrar */}
        <input
          type="text"
          placeholder="Search for Tourist Places..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm) {
              setHoteles(hoteles.filter(hotel => hotel.hotel.toLowerCase().includes(searchTerm)));
            } else {
              axios.get('https://eventos-valladolid-backendt.onrender.com/api/hoteles')
                .then(response => setHoteles(response.data))
                .catch(error => console.error('Error al cargar hoteles:', error));
            }
          }}
          className="search-input1"
        />
        <div className="div_on">

        < hr></hr>
        <h3 className="titel4"></h3>
        <p className="content3">Select a location to see more details</p>

        <ul className='ul_hotel'>
          {hoteles.map(hotel => (
            <li
              key={hotel.id}
              onClick={() => setSelectedHotel(hotel)} 
              className='list-item'
            >
              <strong className="hotel-nombre">{hotel.hotel}</strong>
              <div className="estrellas">
                {(() => {
                  const fullStars = Math.floor(hotel.estrellas);
                  const hasHalfStar = hotel.estrellas % 1 >= 0.5;
                  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                  return (
                    <>
                      {[...Array(fullStars)].map((_, i) => (
                        <FaStar key={`full-${i}`} color="gold" size={16} />
                      ))}
                      {hasHalfStar && <FaStarHalfAlt key="half" color="gold" size={16} />}
                      {[...Array(emptyStars)].map((_, i) => (
                        <FaRegStar key={`empty-${i}`} color="gold" size={16} />
                      ))}
                    </>
                  );
                })()}
              </div>

              {/* <div className="precio">
                {hotel.precio_descuento ? (
                  <>
                    <span className="precio-original">
                      ${parseFloat(hotel.precio).toFixed(2)}
                    </span>
                    <span className="precio-descuento">
                      ${parseFloat(hotel.precio_descuento).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="precio-descuento">
                    ${parseFloat(hotel.precio).toFixed(2)}
                  </span>
                )}
              </div> */}
            </li>
          ))}
        </ul>

        </div>
        
      </aside>
  
      <div className="map-wrapper">
        <MapContainer center={[20.690180, -88.201223]} zoom={8} style={{ height: "100%", width: "100%", left: 0, top: 0 }} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {hoteles.map(hotel => {
          const info = hotelInfoList.find(i => i.id_hotel === hotel.id);
          const imgUrl = info?.img_resyhts
            ? `https://eventos-valladolid-backendt.onrender.com/${info.img_resyhts}`
            : null; 
  return (

    <Marker
  key={hotel.id}
  position={[parseFloat(hotel.latitud), parseFloat(hotel.longitud)]}
  icon={hotelIcon}
  eventHandlers={{
    mouseover: () => setHoveredHotel(hotel),
    mouseout: () => setHoveredHotel(null),
    click: () => setSelectedHotel(hotel),
  }}
>
  {(hoveredHotel?.id === hotel.id || selectedHotel?.id === hotel.id) && (
    <Tooltip
      direction="top"
      offset={[0, -40]}
      opacity={1}
      permanent={selectedHotel?.id === hotel.id}
      className='custom-tooltip'
    >
      <div
        className="tooltip-container"
        onClick={(e) => {
          e.stopPropagation(); // evita que el clic cierre el tooltip
          setSelectedHotel(hotel);
        }}
      >
        {imgUrl && (
            <img src={imgUrl} alt={hotel.hotel} className="modal-image1" />
          )}
        <br />
        <span className="tooltip-text">{hotel.hotel}</span>
      </div>
    </Tooltip>
  )}
</Marker>

    /* <Marker
      key={hotel.id}
      position={[parseFloat(hotel.latitud), parseFloat(hotel.longitud)]}
      icon={hotelIcon} // o el ícono rojo que ya tienes
      eventHandlers={{
        mouseover: () => setHoveredHotel(hotel),
        mouseout: () => setHoveredHotel(null),
        click: () => setSelectedHotel(hotel),
      }}
    >
      <Tooltip direction="top" offset={[0, -40]} opacity={1}>
        <div className="tooltip-container">
          {imgUrl && (
            <img src={imgUrl} alt={hotel.hotel} className="modal-image1" />
          )}
          <br />
          <span className="tooltip-text">{hotel.hotel}</span>
        </div>
      </Tooltip>
    </Marker> */
  );
})}

          <FlyToHotel hotel={selectedHotel} />
        </MapContainer>
      </div>

      {selectedHotel && (
        <div className="div_on">
          <div className="hotel-info open">
            <button onClick={() => setSelectedHotel(null)} className="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
            <h4 className="titel1">{selectedHotel.hotel}</h4>
            <div className='info_content'>

            <p className="content4"  > {selectedHotel.descripcion.slice(0, 200)}...</p>
            <p className="content4">Location: {selectedHotel.localizacion}</p>
            <p className="content4">Website: <a href={selectedHotel.web_hotel} target="_blank" rel="noopener noreferrer">{selectedHotel.web_hotel}</a> </p>
            <p className="content4">Phone: {selectedHotel.telefono.slice(0,100)}...</p>
            <p className="content41">Open: {selectedHotel.horario_abi} - Close: {selectedHotel.horario_cer}</p>

            </div  >
            <div className="botones-hotel">
            <button onClick={() => fetchHotelInfo(selectedHotel.id)} className="info-button" >
              More Information
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHotel.latitud},${selectedHotel.longitud}`}
              target="_blank"
              rel="noopener noreferrer"
              className="info-button"
            >
              Indications
            </a>
            </div>
          </div>
        </div>
      )}
     
      {showInfoModal && hotelInfo && selectedHotel &&(
        <div className="modal-overlay">
          <div className="modal-content">
                        
            <div className="contenedor2">
              <button onClick={() => setShowInfoModal(false)} className="close-button5" >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </button>
              <h3 className='titel1'>{selectedHotel.hotel}</h3>
             
              <div className="video-container8">
                <center>
              {hotelInfo.video && (
              
                <iframe
                  width="1120"
                  height="555"
                  
                  src={hotelInfo.video.replace("watch?v=", "embed/")}
                  title="Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  
                ></iframe>
             
            )}
            </center>
              </div>
              <div className="boton-centro"> 
                <div className='info_content1'>
                  <hr></hr>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHotel.latitud},${selectedHotel.longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-button1"
                >
                  Indications
                </a>
                <hr></hr>
                </div>
              </div>
              {/* {hotelInfo.img_resyhts && (
                <img
                  src={`https://eventos-valladolid-backendt.onrender.com/${hotelInfo.img_resyhts}`}
                  alt="Imagen del Hotel o Restaurante"
                  className="modal-image2"
                />
              )} */}
              <div className="caj2"> 
                <div className="info_content11">
                  <p className="descripcion11">{selectedHotel.descripcion}</p>
                  <hr />
                  <p className="descripcion11">{hotelInfo.nombre}</p>
                  <hr />

                  <p className="telefono11">📞 {selectedHotel.telefono}</p>
                  <hr />

                  <p className="servicios11">✨ {hotelInfo.descripcion}</p>
                  <hr />

                  <p className="precio11">💰 ${selectedHotel.precio} MX</p>
                  <hr />

                  <p className="menu11">🍽️ {hotelInfo.calle}</p>
                  <hr />

                  <p className="consejos11">💡 {hotelInfo.numerotelf}</p>
                </div>  
              </div>


              
            </div>
            
            
          </div>
        </div>
      )}


    </div>
    </div>
  );
};

export default Hoteles;




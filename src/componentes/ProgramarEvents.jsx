import './ProgramarEvents.css';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from "react-i18next";
import EventoDiario from './EventoDiario';


import { translateField } from '../utils/translateField';

import './CircularMenu.css';
import './Calendario.css';
import './menuwhat.css';

import Logo1 from './Imagenes/Iglesia.jpg';
import Logo2 from './Imagenes/cenotezaki.jpg';
import Logo3 from './Imagenes/fondo.gif';
// import Logo4 from './Imagenes/eventosdiarios.jpg';


const ProgramarEvents = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Logo1, Logo2, Logo3];
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();
  const [showMap, setShowMap] = useState(false);


  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [rotation, setRotation] = useState(currentMonth * 30);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => setRotation(selectedMonth * 30), [selectedMonth]);

  const [monthsData, setMonths] = useState([]);
  const [days, setDays] = useState([]);
  const [eventosSeleccionados, setEventosSeleccionados] = useState([]);
  const [currentYear] = useState(new Date().getFullYear());
  const today = new Date();

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // ===========================
  // 🔍 Buscar eventos por rango
  // ===========================
 const buscarEventosRango = async () => {
  if (!fechaInicio || !fechaFin) {
    alert("Por favor selecciona ambas fechas");
    return;
  }

  setLoading(true);
  try {
    let allEventos = [];
    const [anioI, mesI, diaI] = fechaInicio.split("-").map(Number);
    const [anioF, mesF, diaF] = fechaFin.split("-").map(Number);

    let dia = diaI;
    let mes = mesI;

    while (mes < mesF || (mes === mesF && dia <= diaF)) {
      const res = await axios.get(
        `https://eventos-valladolid-backendt.onrender.com/api/mensajes?dia_id=${dia}&mes_id=${mes}`
      );
      allEventos = [...allEventos, ...res.data];
      dia++;
      if (dia > 31) {
        dia = 1;
        mes++;
      }
    }

    setEventosSeleccionados(allEventos);
    setShowModal(true);
  } catch (error) {
    console.error("Error al buscar eventos en rango:", error);
  } finally {
    setLoading(false);
  }
};
  // ===========================
  // Cargar meses y días
  // ===========================
  useEffect(() => {
    axios
      .get('https://eventos-valladolid-backendt.onrender.com/api/meses')
      .then((res) => setMonths(res.data))
      .catch((err) => console.error('Error al cargar meses:', err));
  }, []);

  useEffect(() => {
    if (monthsData.length > 0) {
      axios
        .get(`https://eventos-valladolid-backendt.onrender.com/api/dias?mes_id=${selectedMonth + 1}`)
        .then((res) => setDays(res.data))
        .catch((err) => console.error('Error al cargar días:', err));
    }
  }, [selectedMonth, monthsData]);

  // ===========================
  // ✅ Calcular día inicial (lunes como primero)
  // ===========================
  const getFirstDayOfMonth = () => {
    let day = new Date(currentYear, selectedMonth, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const getDaysInMonth = () =>
    new Date(currentYear, selectedMonth + 1, 0).getDate();

  // ===========================
  // ✅ Crear días del calendario (siempre 42)
  // ===========================
  const createCalendarDays = () => {
    const firstDay = getFirstDayOfMonth();
    const totalDays = getDaysInMonth();
    const daysArray = Array.from({ length: firstDay }, () => null);
    for (let i = 1; i <= totalDays; i++) daysArray.push(i);
    while (daysArray.length < 42) daysArray.push(null);
    return daysArray;
  };

  const daysMemo = useMemo(() => createCalendarDays(), [selectedMonth, currentYear]);

  const getEventForDay = (day) => {
    if (!day) return null;
    const event = days.find(
      (d) => d.dia === day && d.mes_id === selectedMonth + 1
    );
    return event ? event.evento || event.mensaje || "Daily Events" : null;
  };

  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() === selectedMonth &&
    today.getFullYear() === currentYear;

 const handleDayClick = async (day) => {
  try {
    const res = await axios.get(
      `https://eventos-valladolid-backendt.onrender.com/api/mensajes?dia_id=${day}&mes_id=${selectedMonth + 1}`
    );

    const data = res.data;

    // 🔥 Traducir cada mensaje según el idioma activo
    const traducidos = await Promise.all(
      data.map(async (item) => ({
        ...item,
        mensaje: await translateField(item.mensaje),
        descripcion: await translateField(item.descripcion || ""),
      }))
    );

    setEventosSeleccionados(traducidos);
    setShowModal(true);

  } catch (error) {
    console.error("Error cargando eventos:", error);
  }
};


  // ===========================
  // 🧩 Render principal
  // ===========================
  return (
    <div className="programar-events">
      <div className="Separacion">

      </div>
      <div className="caja3">
        <h1 className="titutulo">See the Event Programs During Your Stay in Valladolid</h1>
        <hr />
        <div className='color_fondo'>
        <h2 className="calendario1">
               {monthsData[selectedMonth]?.nombre || months[selectedMonth]} {currentYear} Calendar
                </h2>
        <div className="container1">
          {/* 🔹 Selección de rango y mes */}
          
          <div className="NoesNada">
      
            <hr />
            <h3 className="fecha-texto1">Select the days you will be in Valladolid</h3>

            <div className="fecha-inputs"> 
              <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              <span className="fecha-separador"> to </span>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscarEventosRango()}
              />
              <button
                  className={`fecha-boton ${loading ? "loading" : ""}`}
                  onClick={buscarEventosRango}
                  disabled={loading}
                >
                  {loading ? <div className="spinner"></div> : "Search events"}
                </button>
            </div>

            <hr />
            <p className="fecha-texto">
              Select the month by clicking or tapping <br />
              this will update the calendar
            </p>

            <div className="circular-menu">
              <div className="center-circle"></div>
              <div className="message">MONTH<span className="flecha">→</span></div>
              <div className="outer-circle" style={{ transform: `rotate(${rotation}deg)` }}>
                {months.map((month, index) => (
                  <div
                    key={index}
                    className={`month ${selectedMonth === index ? "selected" : ""}`}
                    onClick={() => setSelectedMonth(index)}
                  >
                    <span>{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />

          {/* ✅ Calendario corregido */}
          <div className="right">
            <div className="div_calendario">

              <table key={`${selectedMonth}-${currentYear}`} className="calendar-table">
                <thead>
                  <tr>
                    <th className='dias'>Monday</th> 
                    <th className='dias'>Tuesday</th> 
                    <th className='dias'>Wedsday</th> 
                    <th className='dias'>Thursday</th> 
                    <th className='dias'>Friday</th> 
                    <th className='dias'>Saturday</th>
                    <th className='dias'>Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, rowIndex) => (
                    <tr key={`row-${currentYear}-${selectedMonth}-${rowIndex}`}>
                      {daysMemo
                        .slice(rowIndex * 7, (rowIndex + 1) * 7)
                        .map((day, colIndex) => {
                          const key = day
                            ? `day-${currentYear}-${selectedMonth}-${day}`
                            : `empty-${currentYear}-${selectedMonth}-${rowIndex}-${colIndex}`;
                          const hasEvent = getEventForDay(day);
                          return (
                            <td
                              key={key}
                              className={`day ${hasEvent ? "day-with-event" : ""} ${isToday(day) ? "today" : ""}`}
                              onClick={day ? () => handleDayClick(day) : undefined}
                            >
                              {day ? (
                                <>
                                  <div>{day}</div>
                                  {hasEvent && <div className="message-popup">{hasEvent}</div>}
                                </>
                              ) : (
                                <div className="empty-day"></div>
                              )}  
                            </td>
                          );
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* aqui */}
</div>
      </div>  

      {/* Modal de eventos */}
      {showModal &&  (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="xbutton" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>

            {eventosSeleccionados.length === 0 ? (
              <div className="no-events">
            
                <p className="titulo1"></p>
              </div>


            ) : (
              eventosSeleccionados.map((evento) => (
                <div key={evento.id} className="evento-if">
                  <div className="caj">
                    <br />
                    <h1 className="fecha">{monthsData[selectedMonth]?.nombre || months[selectedMonth]} {evento.dia_id}, 2025</h1>
                    <div className='cajaMensaje'>
                      
                      <h2 className="titel66">Events: {evento.titulo}</h2>
                      <p className="TextoMens">{evento.mensaje}</p>
                    
                    <hr />
                    <h3 className="horacolor">
                      Event Date: {evento.dia_id}/{evento.mes_id}/2025 From {evento.hora_inicial} to {evento.hora_final}
                    </h3>
                    </div>
                    <br />
                    {evento.video && (
                        <p className="evento-enlace">
                          🌐 Website:{' '}
                          <a
                            href={evento.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="enlace-web"
                          >
                            Visit page
                          </a>
                        </p>
                      )}
                    <center>

                    {/* quiero hacer que dias muestre las imagenes que tiene para correspondeer al mensaje evento */}

                       <iframe
                    title="Ubicación del evento"
                    width="100%"
                    height="420"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${evento.latitud},${evento.longitud}&hl=en&z=16&output=embed`}
                  ></iframe>

                  <hr />
                      {/* <button
                        className="boton-ver-eventos"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${evento.latitud},${evento.longitud}`,
                            "_blank"
                          )
                        }
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="currentColor123" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                        Location
                      </button> */}

                      

                    </center>
                    <div
                      className="texto-pre61"
                      dangerouslySetInnerHTML={{ __html: evento.descripcion }}
                    ></div>
                    
                  </div>
                </div>
              )
            
            )
            )
            }
            
             {/* Aqui eventos diarios que se repiten en todos los eventos */}
            
                    <div className="evento-info1">
                      <hr />
                <h2 className='titel11'>Daily Events</h2>

                 <p className="info-text">
                    Valladolid, Yucatán, offers daily cultural and traditional activities,including video mapping at the Convent of San Bernardino de Siena (evenings),tours along the Calzada de los Frailes, visits to the Cathedral of San Servasi,and the culinary experience at the Municipal Market. In February 2026, the highlight will be the Valladolid Expo Fair with the Magna Vaquería.
                  </p>

                  <ul className="info-list">
                    <strong className="info-title">
                      Featured events and activities in Valladolid:
                    </strong>

                    <li> <strong>Video Mapping:</strong> Evening performances in the Church of San Servacio and the Convent of San Bernardino de Siena, narrating local history.</li>
                    <li> <strong>Expo Feria Valladolid 2026:</strong> Amusement rides, cultural events, traditional food, circus, etc... <strong>(It starts at 6 PM.)</strong></li>
                    <li> <strong>Culture and Tradition:</strong> Visits to the House of the Deer, a walk along the Street of the Friars and a tour of the main park Francisco Cantón Rosado.</li>
                    <li><strong>Nature:</strong> Daily visits to Chichen Itza, Ek Balam, cenotes, parks, towns and beaches.</li>
                    <li><strong>Gastronomy:</strong> Breakfast and typical meals at the Municipal Market or in its different restaurants in the main square.</li>
                    <hr />
                  </ul>

                <hr />
                
                  <div className="evento-container11">
                    
                    
                    {/* Columna izquierda: eventos diarios */}
                    <EventoDiario />
                    
                    <div className='cajadiario'>
                        <p>For more information, follow us on: </p>
                        <div className="links_F-I-Y">

              <a href="https://www.facebook.com/ByVisitValladolidMX/" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/valladolidmx_/" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UC6XMBvFAR4mRgJE_oqQ1iDA" target="_blank" rel="noreferrer">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Youtube" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                </svg>
              </a>
            </div>
                    </div>
                  </div>
             
              </div>

                  {/*  */}
          </div>
         
        </div>
      )}
    </div>
  );
};

export default ProgramarEvents;

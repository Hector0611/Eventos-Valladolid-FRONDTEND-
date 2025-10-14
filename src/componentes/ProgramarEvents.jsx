import './ProgramarEvents.css';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './CircularMenu.css';
import './Calendario.css';
import './menuwhat.css';

import Logo1 from './Imagenes/Iglesia.jpg';
import Logo2 from './Imagenes/cenotezaki.jpg';
import Logo3 from './Imagenes/fondo.gif';

const ProgramarEvents = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Logo1, Logo2, Logo3];

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
  const navigate = useNavigate();

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
      setEventosSeleccionados(res.data);
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
      <div className="Separacion"></div>
      <div className="caja3">
        <h1 className="titel1">See the Event Programs During Your Stay in Valladolid</h1>
        <hr />

        <div className="container1">
          {/* 🔹 Selección de rango y mes */}
          <div className="left">
            <h3 className="calendar1">Choose Month</h3>
            <hr />
            <h1 className="fecha-texto">Select the days you will be in Valladolid</h1>

            <div className="fecha-inputs">
              <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              <span className="fecha-separador"> to </span>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscarEventosRango()}
              />
              <button className="fecha-boton" onClick={buscarEventosRango}>Search events</button>
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

          {/* ✅ Calendario corregido */}
          <div className="right">
            <div className="div_calendario">
              <center>
                <h1 className="calendar1">
               {monthsData[selectedMonth]?.nombre || months[selectedMonth]} {currentYear} Calendar
                </h1>
                <hr />
              </center>

              <table key={`${selectedMonth}-${currentYear}`} className="calendar-table">
                <thead>
                  <tr>
                    <th>Monday</th><th>Tuesday</th><th>Wednesday</th>
                    <th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th>
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
      </div>

      {/* Modal de eventos */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="xbutton" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>

            {eventosSeleccionados.length === 0 ? (
              <div className="evento-info">
                
                  <div className="evento-container1">
                    {/* Columna izquierda: eventos diarios */}
                    <div className="eventoDiario11">
                      <p>Every day there is video mapping in the center and Sisal</p>
                      <p>The schedule is from 9:00 p.m. "Spanish"</p>
                      <p>The schedule is from 9:20 p.m. "English"</p>

                      <button
                        className="bottonEvents1"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=20.689720,-88.201669`,
                            "_blank"
                          )
                        }
                      >
                        Indications "Centro"
                      </button>

                      <button
                        className="bottonEvents1"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=20.686362823195388,-88.21000163440262`,
                            "_blank"
                          )
                        }
                      >
                        Indications "Sisal"
                      </button>
                    </div>

                    {/* Columna derecha: botón de hoteles */}
                    <div className="hoteles-section1">
                      <h3>¿Buscas hoteles?</h3>
                      <button
                        className="bottonEvents1"
                        onClick={() => window.open(`${process.env.PUBLIC_URL}/pdfs/Hoteles.pdf`, "_blank")}
                      >
                        📄 Ver Hoteles
                      </button>
                    </div>
                  </div>
             
              </div>

            ) : (
              eventosSeleccionados.map((evento) => (
                <div key={evento.id} className="evento-if">
                  <div className="caj">
                    <br />
                    <h1 className="fecha">{monthsData[selectedMonth]?.nombre || months[selectedMonth]} {evento.dia_id}, 2025</h1>
                    <h1 className="titel1">Events: {evento.titulo}</h1>
                    <h3 className="titel5">{evento.mensaje}</h3>
                    <hr />
                    <h3 className="horacolor">
                      Event Date: {evento.dia_id}/{evento.mes_id}/2025 From {evento.hora_inicial} to {evento.hora_final}
                    </h3>
                    <center>
                      <button
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
                        Go to Event Location
                      </button>
                    </center>
                    <div className="texto-pre">
                      <div dangerouslySetInnerHTML={{ __html: evento.descripcion }}></div>
                      
                    </div>
                    <div className="evento-info">
                
                  <div className="evento-container1">
                    {/* Columna izquierda: eventos diarios */}
                    <div className="eventoDiario11">
                      <p>Every day there is video mapping in the center and Sisal</p>
                      <p>The schedule is from 9:00 p.m. "Spanish"</p>
                      <p>The schedule is from 9:20 p.m. "English"</p>

                      <button
                        className="bottonEvents1"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=20.689720,-88.201669`,
                            "_blank"
                          )
                        }
                      >
                        Indications "Centro"
                      </button>

                      <button
                        className="bottonEvents1"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=20.686362823195388,-88.21000163440262`,
                            "_blank"
                          )
                        }
                      >
                        Indications "Sisal"
                      </button>
                    </div>

                    {/* Columna derecha: botón de hoteles */}
                    <div className="hoteles-section1">
                      <h3>¿Buscas hoteles?</h3>
                      <button
                        className="bottonEvents1"
                        onClick={() => window.open(`${process.env.PUBLIC_URL}/pdfs/Hoteles.pdf`, "_blank")}
                      >
                        📄 Ver Hoteles
                      </button>
                    </div>
                  </div>
             
              </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramarEvents;

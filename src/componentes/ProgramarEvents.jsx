import './ProgramarEvents.css';
import React, { useState, useEffect } from 'react';
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
            setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [rotation, setRotation] = useState(currentMonth * 30);
    const [showMessage, setShowMessage] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => setRotation(selectedMonth * 30), [selectedMonth]);
    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const [monthsData, setMonths] = useState([]);
    const [days, setDays] = useState([]);
    const [eventosSeleccionados, setEventosSeleccionados] = useState([]);
    const [currentYear] = useState(new Date().getFullYear());
    const today = new Date();
    const navigate = useNavigate();

    // NUEVO: Fechas seleccionadas para estancia
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

   const buscarEventosRango = async () => {
  if (!fechaInicio || !fechaFin) {
    alert("Por favor selecciona ambas fechas");
    return;
  }

  try {
    let allEventos = [];

    // Desestructuramos en AAAA-MM-DD
    const [anioI, mesI, diaI] = fechaInicio.split("-").map(Number);
    const [anioF, mesF, diaF] = fechaFin.split("-").map(Number);

    // Variables de control
    let dia = diaI;
    let mes = mesI;

    console.log("Rango inicial:", diaI, mesI, " → ", diaF, mesF);

    while (mes < mesF || (mes === mesF && dia <= diaF)) {
      const res = await axios.get(
        `https://eventos-valladolid-backendt.onrender.com/api/mensajes?dia_id=${dia}&mes_id=${mes}`
      );

      allEventos = [...allEventos, ...res.data];

      // Avanzar día
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



    useEffect(() => {
        axios.get('https://eventos-valladolid-backendt.onrender.com/api/meses')
            .then(res => setMonths(res.data))
            .catch(err => console.error('Error al cargar meses:', err));
    }, []);

    useEffect(() => {
        if (monthsData.length > 0) {
            axios.get(`https://eventos-valladolid-backendt.onrender.com/api/dias?mes_id=${selectedMonth + 1}`)
                .then(res => setDays(res.data))
                .catch(err => console.error('Error al cargar días:', err));
        }
    }, [selectedMonth, monthsData]);

    const getFirstDayOfMonth = () => new Date(currentYear, selectedMonth, 1).getDay();
    const getDaysInMonth = () => new Date(currentYear, selectedMonth + 1, 0).getDate();

    const createCalendarDays = () => {
        const firstDay = getFirstDayOfMonth();
        const totalDays = getDaysInMonth();
        const daysArray = Array.from({ length: firstDay }, () => null);
        for (let i = 1; i <= totalDays; i++) daysArray.push(i);
        return daysArray;
    };

    const getEventForDay = (day) => {
        const dayData = days.find(d => d.dia === day && d.mes_id === selectedMonth + 1);
        return dayData ? dayData.evento : null;
    };

    const isToday = (day) => (
        today.getDate() === day &&
        today.getMonth() === selectedMonth &&
        today.getFullYear() === currentYear
    );

    // NUEVO: Al hacer click en un día → ver eventos de ese día
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

    

    return (
        <div className='programar-events'>
            <div className='Separacion'> 
            
                          </div>
            <div className='caja3'>
                <h1 className='titel1'>See the Event Programs During Your Stay in Valladolid</h1>

                


                <div className="container1">
                    <div className="left">
                       
                        <br />
                        
                      <h3 className="nombrefecha1">Choose Month</h3>
                        <hr />
                        <div className="circular-menu">
                            <div className="center-circle"></div>
                            {showMessage && <div className="message">Mes actual</div>}
                            <div className="outer-circle" style={{ transform: `rotate(${rotation}deg)` }}>
                                {months.map((month, index) => (
                                    <div
                                        key={index}
                                        className={`month ${selectedMonth === index ? 'selected' : ''}`}
                                        onClick={() => setSelectedMonth(index)}
                                    >
                                        <span>{month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />
                        {/* NUEVO: Espacio debajo del título */}
                            <h1 className="fecha-texto">Select the days you will be in Valladolid</h1>
                
                            <div className="fecha-inputs">
                                
                                <input 
                                type="date" 
                                value={fechaInicio} 
                                onChange={(e) => setFechaInicio(e.target.value)} 
                                />
                                <span className="fecha-separador"> to </span>
                                <input 
                                type="date" 
                                value={fechaFin} 
                                onChange={(e) => setFechaFin(e.target.value)} 
                                onKeyDown={(e) => e.key === "Enter" && buscarEventosRango()}
                                />
                                <button className="fecha-boton" onClick={buscarEventosRango}>
                                Search events
                                </button>
                            </div>
                            <hr />
                    </div>

                    <div className="right">
                        <div className='div_calendario'>
                            <center>
                                <h1 className="calendar1">
                                    Calendar {monthsData[selectedMonth]?.nombre} {currentYear}
                                </h1>
                                <hr />
                            </center>
                            
    
            <br />

                            <table className="calendar-table">
                                <thead>
                                    <tr>
                                        <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th>
                                        <th>Fri</th><th>Sat</th><th>Sun</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {createCalendarDays().slice(rowIndex * 7, (rowIndex + 1) * 7).map((day, index) => {
                                                const hasEvent = getEventForDay(day);
                                                return (
                                                    <td
                                                        key={index}
                                                        className={`day ${hasEvent ? 'day-with-event' : ''} ${isToday(day) ? 'today' : ''}`}
                                                        onClick={day ? () => handleDayClick(day) : null}
                                                    >
                                                        {day ? (
                                                            <>
                                                                <div>{day}</div>
                                                                {hasEvent && <div className="message-popup">{hasEvent}</div>}
                                                            </>
                                                        ) : <div className="empty-day"></div>}
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

            {/* MODAL DE EVENTOS */}
            {showModal && (
  <div className="modal-overlay">
    <div className="modal-content"> 
      <button className="cerrar-modal" onClick={() => setShowModal(false)}>x</button>

      {eventosSeleccionados.length === 0 ? (
        <div className="evento-info">
            <center>
          <h2 className='titel1'>First you must select the days to show you the events</h2>
          </center>
        </div>
      ) : (
        eventosSeleccionados.map((evento) => (
          <div key={evento.id} className="evento-info">
            <div className="caja"> 
                <br />
                <h1 className='titel1'>Events: {evento.titulo}</h1>
                <h3 className='titel1'>{evento.mensaje}</h3>
                <h3 className='horacolor'>Fecha del Evento: {evento.mes_id}/{evento.dia_id}/2025 ---- ---- De {evento.hora_inicial} a {evento.hora_final}</h3>

                <center>
                                    {/* <button className="boton-ver-eventos" onClick={irAHoteles}>Lugares Turisticos</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                        <button 
                                            className="boton-ver-eventos" 
                                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${evento.latitud},${evento.longitud}`, "_blank")}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="currentColor123" viewBox="0 0 16 16">
                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                            </svg> Go to Event Location   
                                    </button>
                                    </center>
                                    {evento.video && (
                                <div className="video-container1">
                                    <iframe
                                    src={evento.video.replace("watch?v=", "embed/")}
                                    title="Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    ></iframe>
                                    
                                </div>
                                )}
            

                <div className="">
            
                    
                    <div className="texto-pre"> <h3 className='titel1'></h3>{evento.descripcion} <h3 className='titel1'></h3></div>
            
                </div>
                <br />
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

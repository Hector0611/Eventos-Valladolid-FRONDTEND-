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

    useEffect(() => {
        setRotation(selectedMonth * 30);
    }, [selectedMonth]);

    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleMonthClick = (index) => setSelectedMonth(index);

    const [monthsData, setMonths] = useState([]);
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [eventosSeleccionados, setEventosSeleccionados] = useState([]);
    const [currentYear] = useState(new Date().getFullYear());
    const today = new Date();
    const navigate = useNavigate();

    const irAHoteles = () => navigate('/hoteles');

    useEffect(() => {
        axios.get('http://localhost:3001/api/meses')
            .then(res => setMonths(res.data))
            .catch(err => console.error('Error al cargar meses:', err));
    }, []);

    useEffect(() => {
        if (monthsData.length > 0) {
            axios.get(`http://localhost:3001/api/dias?mes_id=${selectedMonth + 1}`)
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

    const handleDaySelection = async (day) => {
        const isSelected = selectedDays.some(d => d.day === day && d.month === selectedMonth + 1);
        const updatedDays = isSelected
            ? selectedDays.filter(d => !(d.day === day && d.month === selectedMonth + 1))
            : [...selectedDays, { day, month: selectedMonth + 1 }];
        setSelectedDays(updatedDays);

        try {
            const requests = updatedDays.map(d =>
                axios.get(`http://localhost:3001/api/mensajes?dia_id=${d.day}&mes_id=${d.month}`)
            );
            const responses = await Promise.all(requests);
            const allEventos = responses.flatMap(r => r.data);
            setEventosSeleccionados(allEventos);
        } catch (error) {
            console.error('Error al cargar eventos:', error);
        }
    };

    const isSelected = (day) =>
        selectedDays.some(d => d.day === day && d.month === selectedMonth + 1);

    // --- dentro de ProgramarEvents.jsx --- 

        const [alertExpanded, setAlertExpanded] = useState(true); // al entrar aparece expandido
        const [alertHover, setAlertHover] = useState(false);

        useEffect(() => {
        const timer = setTimeout(() => setAlertExpanded(false), 7000); // a los 7s se compacta
        return () => clearTimeout(timer);
        }, []);

        // Función para abrir el modal directo con los eventos de HOY
        const handleAlertClick = async () => {
        try {
            const res = await axios.get(
            `http://localhost:3001/api/mensajes?dia_id=${today.getDate()}&mes_id=${today.getMonth() + 1}`
            );
            setEventosSeleccionados(res.data);
            setShowModal(true);
        } catch (error) {
            console.error("Error cargando eventos de hoy:", error);
        }
        };


    return (
        <div className='programar-events'>
            {/* Donde LLEVA */}
              <div className='Separacion'> 

              </div>
            <div className='caja3'>
                <h1 className='titel1'>See the Event Programs During Your Stay in Valladolid</h1>

                <div className="container1">
                    <div className="left">
                    <div className='Separacion1'> 
                    
                                  </div>
                        <h3 className="nombrefecha1">Choose Month</h3>

                        <p className='textevento1'>Select the month to see the events</p>
                        
                        <div className="circular-menu">
                            <div className="center-circle"></div>
                            {showMessage && (
                                <div className="message" >
                                    Mes actual
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                    </svg>
                                </div>
                            )}
                            <div className="outer-circle" style={{ transform: `rotate(${rotation}deg)` }}>
                                {months.map((month, index) => (
                                    <div
                                        key={index}
                                        className={`month ${selectedMonth === index ? 'selected' : ''}`}
                                        onClick={() => handleMonthClick(index)}
                                        title="Haz clic apra seleccionar el mes"
                                    >
                                        <span>{month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="boton-ver-eventos"
                                            >
                                                View events 
                                            </button>
                                        </div>
                    </div>

                    <div className="right">
                        <div className='div_calendario'>
                            <center>
                                <h1 className="calendar1">
                                    Calendar {monthsData[selectedMonth]?.nombre} {currentYear}
                                </h1>
                                <p className='textcalendar'>Select the days you will be in Valladolid</p>
                            </center>

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
                                                        className={`day ${hasEvent ? 'day-with-event' : ''} ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected1' : ''}`}
                                                        onClick={day ? () => handleDaySelection(day) : null}
                                                        title="Haz clic para seleccionar el día"
                                                    >
                                                        {day ? (
                                                            <>
                                                                <div>{day}</div>
                                                                {hasEvent && (
                                                                    <div className="message-popup">{hasEvent}</div>
                                                                )}
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
                
                       {/*  {eventosSeleccionados.length > 0 && (
                                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                                <button
                                                    onClick={() => setShowModal(true)}
                                                    className="boton-ver-eventos"
                                                >
                                                    Ver eventos 
                                                </button>
                                            </div>
                                        )} */}
             
            </div>
            {/* aqui los cambios ya mensionados  */}
            <div
                    className={`AlertEvents-botton ${alertExpanded || alertHover ? 'expanded' : 'collapsed'}`}
                    onMouseEnter={() => setAlertHover(true)}
                    onMouseLeave={() => setAlertHover(false)}
                    onClick={handleAlertClick}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className='AlertEvents' viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                    </svg>
                    <span className="alert-text">See Today's Events</span>
                </div>


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
            
                    
                    <p className="texto-pre"> <h3 className='titel1'></h3>{evento.descripcion} <h3 className='titel1'></h3></p>
            
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

import './ProgramarEvents.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CircularMenu.css';
import './Calendario.css';
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

    return (
        <div className='programar-events'>
            
            <div className='caja3'>
                <h1 className='titel1'>Ve Los Programas De Eventos Durente Tu Estadia En Valladolid</h1>
                <div className="container1">
                    <div className="left">
                        <br /><br />
                        <h3 className="nombrefecha1">Choose Month</h3>
                        <p className='textevento'>Selecciona el mes para ver los eventos</p>

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
                    </div>

                    <div className="right">
                        <div className='div_calendario'>
                            <center>
                                <h1 className="calendar1">
                                    Calendar {monthsData[selectedMonth]?.nombre} {currentYear}
                                </h1>
                                <p className='textcalendar'>Selecciona los días que vas a estar en Valladolid</p>
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
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="boton-ver-eventos"
                                            >
                                                Ver eventos 
                                            </button>
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

            {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="cerrar-modal" onClick={() => setShowModal(false)}>x</button>

      {eventosSeleccionados.length === 0 ? (
        <div className="evento-info">
            <center>
          <h2>No hay eventos seleccionados</h2>
          </center>
        </div>
      ) : (
        eventosSeleccionados.map((evento) => (
          <div key={evento.id} className="evento-info">
            <h1 className='titel1'>{evento.titulo}</h1>
            <h5 className='titel2'>{evento.mensaje}</h5>
            <h3 className='horacolor'>Fecha del Evento: {evento.mes_id}/{evento.dia_id}/2025</h3>
            <h3 className='horacolor'>{evento.hora_inicial} a {evento.hora_final}</h3>

            <div className="contenedor1">
              <div className="caja">
                <p>{evento.descripcion}</p>
              </div>

              <div className="caja">
                {typeof evento.video === 'string' && evento.video.includes('watch?v=') && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={evento.video.replace("watch?v=", "embed/")}
                    title="Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>

            <hr />
            <center>
              <button className="bottonEvent" onClick={irAHoteles}>hoteles o restaurantes</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button 
                className="bottonEvent" 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${evento.latitud},${evento.longitud}`, "_blank")}
              >
                como llegar
              </button>
            </center>
            <hr />
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

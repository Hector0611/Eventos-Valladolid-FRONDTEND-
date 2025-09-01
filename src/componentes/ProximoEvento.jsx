import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProximoEvento.css";



const ProximoEvento = () => {
  const [eventos, setEventos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [pagina, setPagina] = useState(0); // Estado para la paginación
  const eventosPorPagina = 5; // Cantidad de eventos visibles por página
  const [currentYear] = useState(new Date().getFullYear());

  const navigate = useNavigate();

  useEffect(() => {
    const fechaActual = new Date();

    axios
      .get("http://localhost:3001/api/meses")
      .then((response) => setMeses(response.data))
      .catch((error) => console.error("Error al cargar meses:", error));

    Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        axios.get(`http://localhost:3001/api/dias?mes_id=${i + 1}`)
      )
    )
      .then((responses) => {
        const eventosFiltrados = responses
          .flatMap((res) => res.data)
          .filter(
            (dia) =>
              dia.evento !== '' && /* poner null para railway y para localhost '' */
              new Date(fechaActual.getFullYear(), dia.mes_id - 1, dia.dia) >=
                fechaActual
          )
          .sort((a, b) => {
            const fechaA = new Date(
              fechaActual.getFullYear(),
              a.mes_id - 1,
              a.dia
            );
            const fechaB = new Date(
              fechaActual.getFullYear(),
              b.mes_id - 1,
              b.dia
            );
            return fechaA - fechaB;
          });

        setEventos(eventosFiltrados);
      })
      .catch((error) =>
        console.error("Error al cargar días con eventos:", error)
      );
  }, []);

  const handleEventClick = (diaId, mesId) => {
    navigate(`/calendario/evento/detalle?dia_id=${diaId}&mes_id=${mesId}`);
  };

  const eventosVisibles = eventos.slice(
    pagina * eventosPorPagina,
    (pagina + 1) * eventosPorPagina
  );

  

  return (
    <div>
      <h2 className="eventtitel2">Proximos Eventos</h2>
    <div className="proximos-eventos-container">
      
      {eventos.length > 0 ? (
        <>
          <div className="eventos-tira">
            
          <button className="navegacion-eventos"
              disabled={pagina === 0}
              onClick={() => setPagina(pagina - 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
              </svg>
            </button>
            {eventosVisibles.map((evento, index) => {
                const mes = meses.find((m) => m.id === evento.mes_id)?.nombre || "";
                return (
                  <div key={`${evento.dia}-${evento.mes_id}`}> {/* key única aquí */}
                  <div className="evento-overlay">
                    <button
                      className="ver-detalle-boton"
                      onClick={() => handleEventClick(evento.dia, evento.mes_id)}
                    >
                      <div className="evento-item">
                       
                        
                        {evento.imagenes && evento.imagenes.length > 0 ? (
                            <img
                              className="imagen-fondo"
                              src={`http://localhost:3001${evento.imagenes[0].imagen_url}`}
                              alt={evento.evento}
                            />
                          ) : (
                            <div className="sin-imagen">Sin imagen</div>
                          )}
                          <div className="contenido-sobre-imagen">
                            <h5>{evento.evento}</h5>
                            {mes} / {evento.dia} / {currentYear}
                        </div>
                      </div>
                    </button>
                    </div>
                  </div>
                );
              })}

            <button className="navegacion-eventos"
              disabled={(pagina + 1) * eventosPorPagina >= eventos.length}
              onClick={() => setPagina(pagina + 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
              </svg>
            </button>
          </div>
        </>
      ) : (
        <p className="NEvent">No hay eventos próximos.</p>
      )}
    </div>
    <br />
    <br />  
    </div>
  );
};

export default ProximoEvento;


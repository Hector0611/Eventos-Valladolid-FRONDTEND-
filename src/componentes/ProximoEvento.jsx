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
      .get("https://eventos-valladolid-backendt.onrender.com/api/meses")
      .then((response) => setMeses(response.data))
      .catch((error) => console.error("Error al cargar meses:", error));

    Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        axios.get(`https://eventos-valladolid-backendt.onrender.com/api/dias?mes_id=${i + 1}`)
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
                       
                        {/* aqui debe mostrar la imagen */}
                        {evento.imagenes && evento.imagenes.length > 0 ? (
                            <img
                              className="imagen-fondo"
                              src={`https://eventos-valladolid-backendt.onrender.com/${evento.imagenes[0].imagen_url}`}
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


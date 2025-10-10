import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProximoEvento.css";

const ProximoEvento = () => {
  const [eventos, setEventos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [currentYear] = useState(new Date().getFullYear());

  const navigate = useNavigate();

  useEffect(() => {
    const fechaActual = new Date();
    const hoyDia = fechaActual.getDate();
    const hoyMes = fechaActual.getMonth() + 1;

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
          .filter((dia) => dia.evento && dia.evento.trim() !== "")
          .sort((a, b) => {
            const fechaA = new Date(fechaActual.getFullYear(), a.mes_id - 1, a.dia);
            const fechaB = new Date(fechaActual.getFullYear(), b.mes_id - 1, b.dia);
            return fechaA - fechaB;
          });

        // Filtramos eventos desde HOY hacia adelante (incluye el día actual)
        const proximos = eventosFiltrados.filter(
          (evento) =>
            new Date(currentYear, evento.mes_id - 1, evento.dia + 1) >= fechaActual
        );

        setEventos(proximos);
      })
      .catch((error) => console.error("Error al cargar días con eventos:", error));
  }, []);

  const handleEventClick = (diaId, mesId) => {
    navigate(`/calendario/evento/detalle?dia_id=${diaId}&mes_id=${mesId}`);
  };

  const fechaActual = new Date();
  const diaHoy = fechaActual.getDate();
  const mesHoy = fechaActual.getMonth() + 1;

  return (
    <div className="proximos-eventos-container">
      <h2 className="eventtitel2">Upcoming Events</h2>
      {eventos.length > 0 ? (
        <div className="eventos-tira">
          {eventos.map((evento) => {
            const mes = meses.find((m) => m.id === evento.mes_id)?.nombre || "";
            const esHoy = evento.dia === diaHoy && evento.mes_id === mesHoy;

            return (
              <div
                key={`${evento.dia}-${evento.mes_id}`}
                className={`transparent ${esHoy ? "evento-hoy" : ""}`}
              >
                <button
                  className={`ver-detalle-boton ${esHoy ? "boton-hoy" : ""}`}
                  onClick={() => handleEventClick(evento.dia, evento.mes_id)}
                >
                  <div className="evento-item">
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
            );
          })}
        </div>
      ) : (
        <p className="NEvent">No hay eventos próximos.</p>
      )}
    </div>
  );
};

export default ProximoEvento;

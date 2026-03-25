import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AnunciosModal1.css";

const BASE_URL = "https://eventos-valladolid-backendt.onrender.com";
const SLIDE_INTERVAL = 5000;
const MAX_ANUNCIOS = 5;

const AnunciosModal = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(false);

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const intervalRef = useRef(null);

  // Swipe táctil
  const touchStartX = useRef(null);

  // ──────────────────────────────────────────
  // Fetch con allSettled (tolerante a fallos)
  // ──────────────────────────────────────────
useEffect(() => {
  // No mostrar si ya se vio en esta sesión
  if (sessionStorage.getItem("anuncioVisto")) return;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // 🔥 importante (evita problema de horas)

  Promise.allSettled(
    Array.from({ length: 12 }, (_, i) =>
      axios.get(`${BASE_URL}/api/dias?mes_id=${i + 1}`)
    )
  )
    .then((results) => {
      const eventos = results
        .filter((r) => r.status === "fulfilled")
        .flatMap((r) => r.value.data)
        .filter((e) => e.evento && e.evento.trim() !== "")
        .sort((a, b) => {
          const fa = new Date(currentYear, a.mes_id - 1, a.dia);
          const fb = new Date(currentYear, b.mes_id - 1, b.dia);

          const hoyStr = hoy.toDateString();
          const esHoyA = fa.toDateString() === hoyStr;
          const esHoyB = fb.toDateString() === hoyStr;

          // 🔥 Prioriza HOY
          if (esHoyA) return -1;
          if (esHoyB) return 1;

          return fa - fb;
        });

      // ✅ SOLO desde hoy en adelante (incluye hoy)
      const proximosEventos = eventos
        .filter((e) => {
          const fechaEvento = new Date(currentYear, e.mes_id - 1, e.dia);
          return fechaEvento >= hoy;
        })
        .slice(0, MAX_ANUNCIOS); // 🔥 máximo 5

      setAnuncios(proximosEventos);

      if (proximosEventos.length > 0) {
        setVisible(true);
      }
    })
    .catch(() => setError("Could not load announcements."))
    .finally(() => setLoading(false));
}, [currentYear]);

  // ──────────────────────────────────────────
  // Carrusel automático con pausa
  // ──────────────────────────────────────────
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % anuncios.length);
  }, [anuncios.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + anuncios.length) % anuncios.length);
  }, [anuncios.length]);

  useEffect(() => {
    if (anuncios.length === 0 || paused) return;
    intervalRef.current = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [anuncios.length, paused, goNext]);

  // ──────────────────────────────────────────
  // Cerrar
  // ──────────────────────────────────────────
  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("anuncioVisto", "true");
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) handleClose();
  };

  // ──────────────────────────────────────────
  // Swipe mobile
  // ──────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  // ──────────────────────────────────────────
  // Formato de fecha legible
  // ──────────────────────────────────────────
  const formatFecha = (dia, mes_id) => {
    const fecha = new Date(currentYear, mes_id - 1, dia);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
    }).format(fecha);
  };

  // ──────────────────────────────────────────
  // Guards de render
  // ──────────────────────────────────────────
  if (!visible || loading || error || anuncios.length === 0) return null;

  const evento = anuncios[currentIndex];

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div
        className="modal-contenido"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Botón cerrar */}
        <button className="cerrar-btn" onClick={handleClose}>

          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="cerrar_icon" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>

        </button>

        <h2>Announcements</h2>

        {/* Barra de progreso */}
        <div className="progress-bar-wrap">
          <div
            key={currentIndex}
            className="progress-bar-fill"
            style={{ animationDuration: `${SLIDE_INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }}
          />
        </div>

        {/* Slide único */}
        <div className="anuncios-lista">
          <div className="anuncio-card active">
            {evento.imagenes?.length > 0 ? (
              <img
                src={`${BASE_URL}/${evento.imagenes[0].imagen_url}`}
                alt={evento.evento}
                loading="lazy"
              />
            ) : (
              <div className="sin-imagen">📅 No image available</div>
            )}

            <div className="anuncio-info">
              <h4>{evento.evento}</h4>
              <p className="fecha-legible">📅 {formatFecha(evento.dia, evento.mes_id)}</p>

              <button onClick={() => navigate(`/calendario/evento/detalle?dia_id=${evento.dia}&mes_id=${evento.mes_id}`)}>
                See more
              </button>
            </div>
          </div>
        </div>

        {/* Controles de navegación */}
        {anuncios.length > 1 && (
          <div className="nav-controls">
            <button className="nav-btn" onClick={goPrev}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
            </button>

            <div className="dots">
              {anuncios.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button className="nav-btn" onClick={goNext}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Contador */}
        <p className="slide-counter">{currentIndex + 1} / {anuncios.length}</p>
      </div>
    </div>
  );
};

// Función fuera del componente (no depende de estado)
function handleVerMas(dia, mes) {
  // useNavigate no funciona fuera del componente, así que se pasa como prop o se usa dentro
}

export default AnunciosModal;
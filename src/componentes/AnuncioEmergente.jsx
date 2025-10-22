// src/components/AnuncioEmergente.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AnuncioEmergente() {
  const [anuncios, setAnuncios] = useState([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const response = await axios.get(
          "https://eventos-valladolid-backendt.onrender.com/api/anuncios"
        );
        if (response.data.length > 0) {
          setAnuncios(response.data);
          setIndex(0);
          setVisible(true);
        }
      } catch (err) {
        console.error("Error al obtener los anuncios:", err);
      }
    };
    fetchAnuncios();
  }, []);

  // Cambiar anuncio cada 5 minutos
  useEffect(() => {
    if (anuncios.length === 0) return;

    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % anuncios.length);
      setVisible(true); // vuelve a mostrar el toast si se cerró
    }, 5000); // 5 minutos = 300000 ms

    return () => clearInterval(interval);
  }, [anuncios]);

  if (anuncios.length === 0 || !visible) return null;

  const anuncio = anuncios[index];

  return (
    <div 
      className="toast show position-fixed bottom-0 end-0 m-2" 
      role="alert" 
      style={{ minWidth: "300px", zIndex: 9999 }}
    >
      <div className="toast-header">
        <strong className="me-auto">📢 {anuncio.titulo}</strong>
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => setVisible(false)}
        ></button>
      </div>
      <div className="toast-body">
        {anuncio.imagen_url && (
          <img 
            src={`https://eventos-valladolid-backendt.onrender.com${anuncio.imagen_url}`} 
            alt={anuncio.titulo} 
            className="img-fluid mb-2" 
          />
        )}
        <p>{anuncio.descripcion}</p>
        {anuncio.enlace && (
          <a href={anuncio.enlace} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
            🔗 Más info
          </a>
        )}
      </div>
    </div>
  );
}

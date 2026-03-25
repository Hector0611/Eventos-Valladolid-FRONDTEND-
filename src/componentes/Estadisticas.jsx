import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './estadiscas.css';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

/* Rutas */
import Ruta1 from './Imagenes/Rutas/RUTAS_01.webp';
import Ruta2 from './Imagenes/Rutas/RUTAS-02.webp';
import Ruta3 from './Imagenes/Rutas/RUTAS-03.webp';
import Ruta4 from './Imagenes/Rutas/RUTAS-04.webp';
import Ruta5 from './Imagenes/Rutas/RUTAS-05.webp';
import Ruta6 from './Imagenes/Rutas/RUTAS-06.webp';
import Ruta7 from './Imagenes/Rutas/RUTAS-07.webp';
import Ruta8 from './Imagenes/Rutas/RUTAS-08.webp';
import Ruta9 from './Imagenes/Rutas/RUTAS-09.webp';
import Ruta10 from './Imagenes/Rutas/RUTAS-10.webp';
import Ruta11 from './Imagenes/Rutas/RUTAS-11.webp';
import Ruta12 from './Imagenes/Rutas/RUTAS-12_1.webp';
import Ruta13 from './Imagenes/Rutas/RUTAS-13_1.webp';

/* Mapas */
import Mapa from './Imagenes/Rutas/VISTA01.png';
import Mapa2 from './Imagenes/Rutas/VISTA02.png';

const rutasData = [
  { id: 1, img: Ruta1, titulo: "Ruta 1" },
  { id: 2, img: Ruta2, titulo: "Ruta 2" },
  { id: 3, img: Ruta3, titulo: "Ruta 3" },
  { id: 4, img: Ruta4, titulo: "Ruta 4" },
  { id: 5, img: Ruta5, titulo: "Ruta 5" },
  { id: 6, img: Ruta6, titulo: "Ruta 6" },
  { id: 7, img: Ruta7, titulo: "Ruta 7" },
  { id: 8, img: Ruta8, titulo: "Ruta 8" },
  { id: 9, img: Ruta9, titulo: "Ruta 9" },
  { id: 10, img: Ruta10, titulo: "Ruta 10" },
  { id: 11, img: Ruta11, titulo: "Ruta 11" },
  { id: 12, img: Ruta12, titulo: "Ruta 12" },
  { id: 13, img: Ruta13, titulo: "Ruta 13" }
];

/* PDF worker */
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Estadisticas = () => {

  const [pdfs, setPdfs] = useState([]);
  const [rutaActiva, setRutaActiva] = useState(null);

  // 👉 swipe
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const [zoomActivo, setZoomActivo] = useState(false);

  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/estadisticas')
      .then(res => res.json())
      .then(data => setPdfs(data))
      .catch(err => console.error(err));
  }, []);

  /* ======================
     FUNCIONES
  ====================== */

  const siguienteRuta = (ruta) => {
    const i = rutasData.findIndex(r => r.id === ruta.id);
    return rutasData[(i + 1) % rutasData.length];
  };

  const anteriorRuta = (ruta) => {
    const i = rutasData.findIndex(r => r.id === ruta.id);
    return rutasData[(i - 1 + rutasData.length) % rutasData.length];
  };

  const getIndex = (ruta) =>
    rutasData.findIndex(r => r.id === ruta.id);

  /* ======================
     SWIPE
  ====================== */

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      setRutaActiva(prev => siguienteRuta(prev));
    }

    if (diff < -50) {
      setRutaActiva(prev => anteriorRuta(prev));
    }
  };

  /* ======================
     DESCARGAR MAPAS
  ====================== */

  const descargarMapas = () => {
    [Mapa, Mapa2].forEach((url, i) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `mapa-${i + 1}.png`;
      link.click();
    });
  };

  return (
    <div>

      <div className="Separacion"></div>
      <br />

      {/* MAPAS */}
      <h4 className="rutas-title">🗺️ Mapa De Valladolid</h4>

      <div className="mapa-section">
        <img src={Mapa} alt="Mapa 1" className="mapa-img" />
        <img src={Mapa2} alt="Mapa 2" className="mapa-img" />
      </div>

      <div className="mapa-download">
        <button onClick={descargarMapas}>Descargar mapas</button>
      </div>

      {/* =====================
          RUTAS
      ===================== */}
      <div className="rutas-section">

        <h4 className="rutas-title">🗺️ Rutas de Valladolid</h4>

        {/* GRID */}
        <div className="rutas-grid">
          {rutasData.map((ruta) => (
            <div
              className="ruta-card"
              key={ruta.id}
              onClick={() => setRutaActiva(ruta)}
            >
              <img src={ruta.img} alt={ruta.titulo} />
            </div>
          ))}
        </div>

        {/* VISOR */}
        {rutaActiva && (
          <div
            className="ruta-viewer"
            onClick={() => setRutaActiva(null)}
          >

            {/* INDICADOR */}
            <div className="ruta-indicador">
              {getIndex(rutaActiva) + 1} / {rutasData.length}
            </div>

            {/* BOTONES */}
            <button
              className="nav-btn1 prev"
              onClick={(e) => {
                e.stopPropagation();
                setRutaActiva(prev => anteriorRuta(prev));
              }}
            >‹</button>

            <button
              className="nav-btn1 next"
              onClick={(e) => {
                e.stopPropagation();
                setRutaActiva(prev => siguienteRuta(prev));
              }}
            >›</button>

            <button
              className="close-btn1"
              onClick={(e) => {
                e.stopPropagation();
                setRutaActiva(null);
              }}
            >✕</button>

            {/* ZOOM + SWIPE */}
            <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={4}
                onZoomStop={(ref) => {
                  setZoomActivo(ref.state.scale > 1);
                }}
                onPanningStop={(ref) => {
                  setZoomActivo(ref.state.scale > 1);
                }}
              >
                <TransformComponent>
                  <img
                    src={rutaActiva.img}
                    alt={rutaActiva.titulo}
                    className="ruta-viewer-img"
                    onClick={(e) => e.stopPropagation()}

                    /* 👇 swipe SOLO si NO hay zoom */
                    onTouchStart={!zoomActivo ? handleTouchStart : null}
                    onTouchMove={!zoomActivo ? handleTouchMove : null}
                    onTouchEnd={!zoomActivo ? handleTouchEnd : null}
                  />
                </TransformComponent>
              </TransformWrapper>

          </div>
        )}

      </div>

      {/* =====================
          PDFs
      ===================== */}
      <div className="pdf-list">
        {pdfs.map(pdf => (
          <div key={pdf.id} className="pdf-item">
            <h2 className="titel">{pdf.titulo}</h2>

            <a
              href={`https://eventos-valladolid-backendt.onrender.com/${pdf.ubicacion}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pdf-cover">
                <Document file={`https://eventos-valladolid-backendt.onrender.com/${pdf.ubicacion}`}>
                  <Page
                    pageNumber={1}
                    width={550}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            </a>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Estadisticas;
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './estadiscas.css';

/* Rutas del 1 al 13 */
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

/* Siguiente y anterior  para la imagen */
const siguienteRuta = (ruta) => {
  const currentIndex = rutasData.findIndex(r => r.id === ruta.id);
  const nextIndex = (currentIndex + 1) % rutasData.length;
  return rutasData[nextIndex];
};

const anteriorRuta = (ruta) => {
  const currentIndex = rutasData.findIndex(r => r.id === ruta.id);
  const prevIndex = (currentIndex - 1 + rutasData.length) % rutasData.length;
  return rutasData[prevIndex];
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Estadisticas = () => {
  const [pdfs, setPdfs] = useState([]);
  const [rutaActiva, setRutaActiva] = useState(null);

  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/estadisticas')
      .then(response => response.json())
      .then(data => setPdfs(data))
      .catch(error => console.error('Error al cargar los PDFs:', error));
  }, []);

  return (
    <div>
      <div className="Separacion"></div>

      {/* =====================
          SECCIÓN RUTAS
      ===================== */}
      <div className="rutas-section">
        <h1 className="rutas-title">🗺️ Rutas de Valladolid</h1>

        <div className="rutas-grid">
          {rutasData.map((ruta) => (
            <div
              className="ruta-card"
              key={ruta.id}
              onClick={() => setRutaActiva(ruta)}
            >
              <img
                src={ruta.img}
                alt={ruta.titulo}
                className="ruta-img"
              />

              <div className="ruta-overlay">
                <span>{ruta.titulo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================
          MODAL RUTA
      ===================== */}
      {rutaActiva && (
        <div
          className="ruta-modal-backdrop"
          onClick={() => setRutaActiva(null)}
        >
          <div
            className="ruta-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="ruta-modal-close"
              onClick={() => setRutaActiva(null)}
            >
              ✕
            </button>
            <button
              className="ruta-modal-prev"
              onClick={() => setRutaActiva(anteriorRuta(rutaActiva))}
            >
              &lt;
            </button>
            <button
              className="ruta-modal-next"
              onClick={() => setRutaActiva(siguienteRuta(rutaActiva))}
            >
              &gt;
            </button>
            

            <h2>{rutaActiva.titulo}</h2>

            <img
              src={rutaActiva.img}
              alt={rutaActiva.titulo}
              className="ruta-modal-img"
            />
          </div>
        </div>
      )}

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
                <Document
                  file={`https://eventos-valladolid-backendt.onrender.com/${pdf.ubicacion}`}
                  loading={<p>Loading cover...</p>}
                >
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

      <br />
    </div>
  );
};

export default Estadisticas;

import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './estadiscas.css';

// Configurar el worker del PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Estadisticas = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetch('https://eventos-valladolid-backendt.onrender.com/api/estadisticas')
      .then(response => response.json())
      .then(data => setPdfs(data))
      .catch(error => console.error('Error al cargar los PDFs:', error));
  }, []);

  return (
    <div>
      <div className="Separacion"></div>

      <div className="pdf-list">
        {pdfs.map(pdf => (
          <div key={pdf.id} className="pdf-item">
            <h2 className="titel">{pdf.titulo}</h2>

            {/* Portada generada automáticamente */}
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

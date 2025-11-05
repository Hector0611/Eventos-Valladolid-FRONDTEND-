import React from "react";
import "./Estadisticas2025.css"; // CSS opcional

export default function Estadisticas2025() {
  const meses = [
    { nombre: "Enero", pdf: "/pdfs/2025/" },
    { nombre: "Febrero", pdf: "/pdfs/2025/" },
    { nombre: "Marzo", pdf: "/pdfs/2025/" },
    { nombre: "Abril", pdf: "/pdfs/2025/" },
    { nombre: "Mayo", pdf: "/pdfs/2025/" },
    { nombre: "Junio", pdf: "/pdfs/2025/" },
    { nombre: "Julio", pdf: "/pdfs/2025/" },
    { nombre: "Agosto", pdf: "/pdfs/2025/AGOSTO_PDF.pdf" },
    { nombre: "Septiembre", pdf: "/pdfs/2025/SEPTIEMBRE_PDF.pdf" },
    { nombre: "Octubre", pdf: "/pdfs/2025/OCTUBRE_PDF.pdf" },
    { nombre: "Noviembre", pdf: "/pdfs/2025/" },
    { nombre: "Diciembre", pdf: "/pdfs/2025/" },
  ];

  return (
    <div className="estadisticas-container">
        <div className="Separacion"></div>
      <h1 className="titulo-estadisticas">Statistics 2025</h1>
      <p className="subtitulo-estadisticas">DIRECTORATE OF ECONOMIC AND TOURISM DEVELOPMENT</p>

      <table className="tabla-estadisticas">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Reporte PDF</th>
          </tr>
        </thead>
        <tbody>
          {meses.map((m, i) => (
            <tr key={i}>
              <td>{m.nombre}</td>
              <td>
                <a href={m.pdf} target="_blank" rel="noopener noreferrer" className="btn-pdf">
                  Ver PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

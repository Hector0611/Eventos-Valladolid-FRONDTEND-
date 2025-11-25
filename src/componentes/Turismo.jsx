import React, { useState } from "react";
import "./Estadisticas2025.css";

export default function Estadisticas2025() {

  const PASSWORD = "Valla2025!"; // ← Cambia aquí la contraseña

  const [pdfToOpen, setPdfToOpen] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

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

  const abrirConPassword = (pdf) => {
    setPdfToOpen(pdf);
  };

  const validarPassword = () => {
    if (passwordInput === PASSWORD) {
      window.open(pdfToOpen, "_blank");
      setPasswordInput("");
      setPdfToOpen(null);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="estadisticas-container">
      <div className="Separacion"></div>

      <h1 className="titulo-estadisticas">Statistics 2025</h1>
      <p className="subtitulo-estadisticas">
        DIRECTORATE OF ECONOMIC AND TOURISM DEVELOPMENT
      </p>

      <table className="tabla-estadisticas">
        <thead>
          <tr>
            <th>Month</th>
            <th>PDF Report</th>
          </tr>
        </thead>

        <tbody>
          {meses.map((m, i) => (
            <tr key={i}>
              <td>{m.nombre}</td>
              <td>
                <button
                  className="btn-pdf"
                  onClick={() => abrirConPassword(m.pdf)}
                >
                  View PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DE CONTRASEÑA */}
      {pdfToOpen && (
        <div className="modal-overlay-stats" onClick={() => setPdfToOpen(null)}>
          <div className="modal-stats" onClick={(e) => e.stopPropagation()}>
            <h3>Enter password</h3>

            <input
              type="password"
              className="input-pass"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
            />

            {error && <p className="error-pass">{error}</p>}

            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setPdfToOpen(null)}>
                Cancel
              </button>
              <button className="btn-open" onClick={validarPassword}>
                Open PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

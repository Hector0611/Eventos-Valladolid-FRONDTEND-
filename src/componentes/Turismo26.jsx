import React, { useState } from "react";
import "./Estadisticas2025.css";

export default function Turismo26() {

  const PASSWORD = "Valla2026!"; // ← Contraseña para 2026

  const [pdfToOpen, setPdfToOpen] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  // LISTA DE PDFs DEL 2026
  const meses = [
    { nombre: "Enero", pdf: "/pdfs/2026/ENERO_2026.pdf" },
    { nombre: "Febrero", pdf: "/pdfs/2026/FEBRERO_2026.pdf" },
    { nombre: "Marzo", pdf: "/pdfs/2026/MARZO_2026.pdf" },
    { nombre: "Abril", pdf: "/pdfs/2026/ABRIL_2026.pdf" },
    { nombre: "Mayo", pdf: "/pdfs/2026/MAYO_2026.pdf" },
    { nombre: "Junio", pdf: "/pdfs/2026/JUNIO_2026.pdf" },
    { nombre: "Julio", pdf: "/pdfs/2026/JULIO_2026.pdf" },
    { nombre: "Agosto", pdf: "/pdfs/2026/AGOSTO_2026.pdf" },
    { nombre: "Septiembre", pdf: "/pdfs/2026/SEPTIEMBRE_2026.pdf" },
    { nombre: "Octubre", pdf: "/pdfs/2026/OCTUBRE_2026.pdf" },
    { nombre: "Noviembre", pdf: "/pdfs/2026/NOVIEMBRE_2026.pdf" },
    { nombre: "Diciembre", pdf: "/pdfs/2026/DICIEMBRE_2026.pdf" },
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
     

      <h1 className="titulo-estadisticas">Statistics 2026</h1>
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

      {/* MODAL PARA CONTRASEÑA */}
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

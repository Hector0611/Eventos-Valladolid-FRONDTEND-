import React from "react";
import "./Policia.css";

export default function Policia() {
  const contacts = [
    {
      id: 1,
      title: "Policía",
      description: "Atención 24/7 — Respuesta inmediata",
      phone: "+52 985 856 1234",
      whatsapp: "+52 985 856 1234",
      badge: "EMERGENCIA",
      hours: "24 horas",
    },
    {
      id: 2,
      title: "Secretaría de Seguridad",
      description: "Línea para denuncias y seguimiento de reportes",
      phone: "+5219982345678",
      whatsapp: "+5219982345678",
      badge: "DENUNCIAS",
      hours: "Lun–Dom: 06:00–24:00",
    },
    {
      id: 3,
      title: "Atención Ciudadana",
      description: "Consultas, orientación y vinculación con servicios",
      phone: "+52 985 106 4327",
      whatsapp: "+52 985 106 4327",
      badge: "INFORMACION",
      hours: "9:00–18:00",
    },
  ];

  return (
    <div className="policia-page">
        <div className='Separacion'> 
        
                      </div>
      {/* Header */}
      <header className="policia-header">
        <div className="header-content1">
          <div className="header-left">
            <div className="header-icon">📍</div>
            <div>
              <h1>Policía Municipal - Valladolid</h1>
              <p>Contacto y líneas de atención</p>
            </div>
          </div>

          <div className="header-buttons">
            <a href="tel:+52985 856 1234" className="btn-call">
              📞 Llamar a emergencias
            </a>
            <a
              href="https://wa.me/52985 856 1234"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="policia-main">
        <section className="main-grid">
          {/* Contactos */}
          <div className="contact-section">
            <div className="card">
              <h2>Líneas de contacto</h2>
              <p className="text-muted">
                Si hay una emergencia, favor de llamar al número principal o usar el botón de WhatsApp.
              </p>

              <div className="contact-list">
                {contacts.map((c) => (
                  <div key={c.id} className="contact-item">
                    <div className="contact-info">
                      <div className="contact-badge">{c.badge}</div>
                      <div className="texto">
                        <h3>{c.title}</h3>
                        <p>{c.description}</p>
                        <p className="hours">Horario: {c.hours}</p>
                      </div>
                    </div>
                    <div className="contact-buttons">
                      <a href={`tel:${c.phone}`} className="btn-call-small">
                        📞 Llamar
                      </a>
                      <a
                        href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-whatsapp-small"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario de reporte */}
            {/* <div className="card">
              <h2>Reportar un incidente</h2>
              <p className="text-muted">
                Rellena los campos y la policía se pondrá en contacto. En caso de emergencia, llama directamente.
              </p>

              <form className="report-form">
                <input placeholder="Tu nombre" />
                <input placeholder="Teléfono" />
                <input placeholder="Ubicación (dirección o referencia)" />
                <textarea rows="4" placeholder="Describe el incidente"></textarea>

                <label className="consent">
                  <input type="checkbox" /> Autorizo el seguimiento de mi reporte
                </label>

                <button type="button" className="btn-submit">
                  Enviar reporte
                </button>
              </form>
            </div> */}
          </div>

          {/* Aside */}
          <aside className="aside-section">
            <div className="card">
              <h3>Atención rápida</h3>
              <ul>
                <li>Policía local: <strong>+52 985 856 1234</strong></li>
                <li>Bomberos: <strong>+52 985 856 12 34</strong></li>
                <li>Ambulancias: <strong>+52 --- --- -- --</strong></li>
                <li>Denuncia anónima: <strong>--- --- -- --</strong></li>
              </ul>
            </div>

            <div className="card">
              <h3>Ubicación</h3>
              <p className="text-muted">Oficina principal — Valladolid</p>
              <div className="map-placeholder">[Mapa integrado aquí]</div>
            </div>

            <div className="card">
              <h3>Horarios de atención</h3>
              <p>Oficina administrativa: Lun–Vie 9:00–18:00</p>
            </div>
          </aside>
        </section>
      </main>

      <footer className="policia-footer">
        <p>© {new Date().getFullYear()} Policía Municipal — Valladolid</p>
        <p>
          📧 <a href="mailto:info@policia.valladolid.mx">info@policia.valladolid.mx</a> |{" "}
          <a href="#">Política de privacidad</a>
        </p>
      </footer>
    </div>
  );
}

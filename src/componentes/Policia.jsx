import React from "react";
import "./Policia.css";

export default function Policia() {
  const contacts = [
    {
      id: 1,
      title: "Police",
      description: "24/7 Support — Immediate Response",
      phone: "+52 985 856 12 34",
      whatsapp: "+52 985 856 21 00", /* quitar */
      badge: "EMERGENCY",
      hours: "24 hours",
    },
    /* {
      id: 2,
      title: "Secretariat of Security 'Num. 060'",
      description: "Line for reporting and follow-up of reports   ",
      phone: "930 32 00",
      whatsapp: "+5219982345678", /* quitar
      badge: "COMPLAINTS",
      hours: "Mon–Sun: 06:00–24:00",
    }, */
    {
      id: 3,
      title: "Citizen Attention",
      description: "Consultations, guidance and linkage to services",
      phone: "+52 985 106 4327",
      whatsapp: "+52 985 106 4327",
      badge: "INFORMATION",
      hours: "9:00–18:00",
    },
  ];

  return (
    <div className="policia-page">
      <br />
        <div className='Separacion'> 
        
                      </div>
      {/* Header */}
      <header className="policia-header">
        <div className="header-content1">
          <div className="header-left">
            <div className="header-icon">📍</div>
            <div>
              <h1>Municipal Police - Valladolid</h1>
              <p1>Contact and help lines</p1>
            </div>
          </div>

          <div className="header-buttons">
            <a href="tel:+52 985 856 21 00" className="btn-call">
              📞 Call emergency services
            </a>
            {/* <a
              href="https://wa.me/52985 856 1234"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              💬 WhatsApp
            </a> */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="policia-main">
        <section className="main-grid">
          {/* Contactos */}
          <div className="contact-section">
            <div className="card">
              <h2>Lines of contact</h2>
              <p className="text-muted">
                If there is an emergency, please call the main number or use the WhatsApp button.
              </p>

              <div className="contact-list">
                {contacts.map((c) => (
                  <div key={c.id} className="contact-item">
                    <div className="contact-info">
                      <div className="contact-badge">{c.badge}</div>
                      <div className="texto">
                        <h3>{c.title}</h3>
                        <p>{c.description}</p>
                        <p className="hours">Schedule: {c.hours}</p>
                      </div>
                    </div>
                    <div className="contact-buttons">
                      <a href={`tel:${c.phone}`} className="btn-call-small">
                        📞 Call
                      </a>
                      {/* <a
                        href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-whatsapp-small"
                      >
                        💬 WhatsApp
                      </a> */}
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
              <h3>Quick attention</h3>
              <ul>
                <li>Local police: <strong>+52 985 856 12 34</strong></li>
                <li>Firefighters: <strong>+52 985 856 12 34</strong></li>
                <li>Cruz Roja: <strong>+52 985 856 24 13</strong></li>
                <li>Anonymous complaint: <strong>089</strong></li>
              </ul>
            </div>

            <div className="card">
              <h3>Location</h3>
              <p className="text-muted">Main Office — Valladolid</p>
              <div className="map-placeholder">
                <iframe
                  title="Ubicación de la Policía Municipal de Valladolid"
                  src="https://www.google.com/maps?q=20.70591095612285,-88.1970215526098&hl=en&z=15&output=embed"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="card">
              <h3>Opening hours</h3>
              <p>Administrative office: Mon–Fri 9:00–18:00</p>
            </div>
          </aside>
        </section>
      </main>

    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./contactanos.css";

const Contactanos = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", form);
    alert("¡Gracias por contactarnos! Te responderemos pronto.");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div>
      {/* <div className="Separacion"></div> */}

      <div className="contact-main">
        {/* Sección del formulario */}
        <div className="contact-card">
          <h2>Contáctanos</h2>
          <p>Envíanos un mensaje y te responderemos lo antes posible.</p>

          <form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Mensaje</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>

            <button type="submit">Enviar mensaje</button>
          </form>

          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>

          <div className="contact-info">
            <p><FaPhoneAlt /> +52 999 123 4567</p>
            <p><FaEnvelope /> contacto@valladolidmx.com</p>
          </div>

          <button className="back-btn" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>

        {/* Sección del mapa */}
        <div className="contact-map">
          <h3>¿Dónde estamos?</h3>
          <iframe
            title="Ubicación Valladolid"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.7780165189987!2d-88.201182824118!3d20.68969899941171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f518b6aa2e9cd47%3A0xa05bfc7cfb2b4c0a!2sValladolid%2C%20Yucat%C3%A1n!5e0!3m2!1ses!2smx!4v1715647320982!5m2!1ses!2smx"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;

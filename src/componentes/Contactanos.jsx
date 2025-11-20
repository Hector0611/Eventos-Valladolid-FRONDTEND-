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
      <div className="Separacion"></div>

      <div className="contact-main">
        {/* Sección del formulario */}
        <div className="contact-card">
          <h2>Contact us</h2>
          <p>Send us a message and we'll get back to you as soon as possible.</p>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Message</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>

            <button type="submit">Send message</button>
          </form>

          {/* <button className="back-btn" onClick={() => navigate("/")}>Volver al inicio</button> */}
        </div>

        {/* Sección del mapa */}
        <div className="contact-map">
          <h2>Follow us on: </h2>
           <div className="socials">
              
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" ><FaFacebook className="Facebook"/></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="Instagram"/></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="Youtube"/></a>
          </div>

           <div className="contact-info">
            <p><FaPhoneAlt /> +52 985 856 25 51</p>
            <p> Ext:114 </p>
            <p><FaEnvelope />visitavalladolidmx@gmail.com</p>
          </div>
          <h3>Where are we?</h3>
          <iframe
            title="Ubicación Valladolid"
            src="https://www.google.com/maps?q=20.689706468240633,-88.20104897181673&hl=es&z=16&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>


        </div>
      </div>
    </div>
  );
};

export default Contactanos;

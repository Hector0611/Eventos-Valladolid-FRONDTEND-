import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CircularMenu.css";
import "./menuwhat.css";
import Video1 from "./Imagenes/Valladolidencantar01.mp4";   // versión PC
import Video2 from "./Imagenes/Valladolidencantar011.mp4";  // versión móvil
import { Helmet } from "react-helmet-async";

const PrincipalRecarga = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil o pantalla pequeña
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // puedes ajustar el ancho según necesites
    };

    checkScreenSize(); // Ejecutar al montar
    window.addEventListener("resize", checkScreenSize); // Detectar cambio de tamaño

    // Animación de salida
    const fadeTimer = setTimeout(() => setFadeOut(true), 5500);

    // Redirección
    const navTimer = setTimeout(() => navigate("/home"), 6000);

    // Limpiar efectos
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [navigate]);

  return (
<>  {/* 🔹 SEO SOLO PARA /home */}
      <Helmet>
        <title>Visit Valladolid | Tourism in Yucatán</title>
        <link
          rel="canonical"
          href="https://visitavalladolidmx.com/"
        />
      </Helmet>
    <div className={`contenedor-video ${fadeOut ? "fade-out" : ""}`}>
      <video
        className="video-fondo"
        src={isMobile ? Video2 : Video1}  /* ✅ cambia automáticamente */
        autoPlay
        muted
        playsInline
        loop
      ></video>
    </div>
  </>
  );
};

export default PrincipalRecarga;

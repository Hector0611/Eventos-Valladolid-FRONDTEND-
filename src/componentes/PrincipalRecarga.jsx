import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CircularMenu.css";
import "./menuwhat.css";
import Logo3 from "./Imagenes/Valladolidencantar01.mp4";

const PrincipalRecarga = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Activa la animación de salida después de 5 segundos
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5500);

    // Redirige al home después de 6 segundos
    const navTimer = setTimeout(() => {
      navigate("/home");
    }, 6000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`contenedor-video ${fadeOut ? "fade-out" : ""}`}>
      <video
        className="video-fondo"
        src={Logo3}
        autoPlay
        muted
        playsInline
        loop
      ></video>
    </div>
  );
};

export default PrincipalRecarga;

import { Helmet } from "react-helmet-async";

import Header from "../componentes/Header";
import LanguageSwitcher from "../componentes/LanguageSwitcher";
import ProgramarEvents from "../componentes/ProgramarEvents";
import Cenotes from "../componentes/Cenotes";
import Catalogo from "../componentes/Catalogo";
import EventoDiario from "../componentes/EventoDiario";
import ProximoEvento from "../componentes/ProximoEvento";
import Footer from "../componentes/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";


export default function Home() {


 useEffect(() => {
  const seen = sessionStorage.getItem("splash_seen");
  if (!seen) {
    sessionStorage.setItem("splash_seen", "true");
    window.location.replace("/loading");
  }
}, []);

  return (
    <>
      {/* 🔹 SEO SOLO PARA /home */}
      <Helmet>
        <title>Visit Valladolid | Tourism in Yucatán</title>
        <meta
          name="description"
          content="Discover Valladolid, Yucatán: cenotes, culture, hotels and unforgettable experiences."
        />
        <link
          rel="canonical"
          href="https://visitavalladolidmx.com/"
        />
      </Helmet>

      {/* 🔹 Contenido visible */}
      <Header />
      <LanguageSwitcher />
      <ProgramarEvents />
      <Cenotes />
      <Catalogo />
      <EventoDiario />
      <ToastContainer />
      <ProximoEvento />
      <Footer />
    </>
  );
}

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
import ChatBot from "../componentes/ChatBot";


export default function Home() {


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
          href="https://visitavalladolidmx.com/home"
        />
      </Helmet>

      {/* 🔹 Contenido visible */}
      <Header /> {/* nohay */}
      <LanguageSwitcher />  {/* nohay */}
      <ProgramarEvents /> {/* nohay */}
      <Cenotes /> {/* nohay */}
      <Catalogo /> {/* Listo */}
      <EventoDiario /> {/* nohay */}
      <ToastContainer />
      <ProximoEvento /> {/* nohay */}
      <Footer /> {/* nohay */}
      <ChatBot /> {/* nohay */} 
    </>
  );
}

import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HelmetProvider } from "react-helmet-async";

import Header from './componentes/Header';
import EventoCalendario from './componentes/EventoCalendario';
import Hoteles from './componentes/Hoteles';
import Footer from './componentes/Footer';
import Historia from './componentes/Historia';
import Catalogo from './componentes/Catalogo';
import Estadisticas from './componentes/Estadisticas';
import Header2 from './componentes/Header2';
import ProximoEvento from './componentes/ProximoEvento';
import ProgramarEvents from './componentes/ProgramarEvents';
import EventoDiario from './componentes/EventoDiario';

import ScrollToTop from './componentes/ScrollToTop';
import PrincipalRecarga from './componentes/PrincipalRecarga';
import Conventos from './componentes/Conventos';
import Cenotes from './componentes/Cenotes';
import Contactanos from './componentes/Contactanos';
import PoliciaPage from './componentes/Policia';  
import Transporte from './componentes/Transporte';
import Turismo from './componentes/Turismo';
import Destinos from './componentes/Destinos';
import PueblosCercanos from './componentes/PueblosCercanos';
import LanguageSwitcher from './componentes/LanguageSwitcher';
import Turismo26 from './componentes/Turismo26';
import Destino from './componentes/Destino';
import AgenciasTours from './componentes/AgenciasTours';
import WalkingTours from './componentes/WalkingTours';
import TaxiAndToursValladolid from './componentes/TaxiAndToursValladolid';
import ChatBot from './componentes/ChatBot';

/* Pages */
import Home from "./pages/Home";
import Seo from './pages/Seo';

const App = () => {

  // Ejemplo de notificación al cargar la página
  useEffect(() => {
    // 🔔 Toastify (dentro de la web)
    toast.info("🎉 New event recently added", {
      position: "top-right",
      autoClose: 4000,
      theme: "colored",
    });

    // Al inicio de tu App.js o componente principal

  

   /*  // 🔔 Notificación nativa del navegador
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("🎉 Hay nuevos eventos disponibles en la página!");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("🎉 Notificaciones activadas. Te avisaremos de lo nuevo!");
          }
        });
      }
    } */
  }, []);





  
  return (
    <HelmetProvider>
    <Router>
      <ScrollToTop />
      <div>
        <main className='main-container'>
          <center>
            <Routes>
              {/* Splash */}
                <Route path="/" element={
                  <>
                
                    <Header2 />
                    <PrincipalRecarga />
                  </>
                } />

                {/* HOME REAL */}
                <Route path="/home" element={<Home />} />


              <Route 
                path="/calendario/evento/:mensaje" 
                element={
                  <>
                   
                    <Header />
                    <LanguageSwitcher />
                    <EventoCalendario />

                  </>
                } 
              />
              <Route 
                path="/policia" 
                element={
                  <>
                    <Seo title="Policia" description="Contacto de la policia en Valladolid" canonical="https://visitavalladolidmx.com/policia"/>
                   
                    <Header />
                    <PoliciaPage />
                    {/* Footer global */}
     {/*      <ProximoEvento /> */}
         
          <Footer />
                  </>
                } 
              />
              <Route 
                path="/transporte"
                element={
                  <>
                    <Seo title="Transporte" description="Información sobre transporte en Valladolid" canonical="https://visitavalladolidmx.com/transporte"/>
                  
                    <Header />
                    <LanguageSwitcher />
                    {<TaxiAndToursValladolid/>}
                    {/* <Transporte /> */}
                    
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                  </>
                } 
              />

              <Route path="/mapasin" element={
                <>
                 
                
                 
                  <Destino />

                  {/* Footer global */}
          <ProximoEvento />
         
 
                </>
              } />


              <Route 
                path="/mapa" 
                element={
                  <>

                  <Seo
                      title="Hotels and Map | Visit Valladolid"
                      description="Find hotels, locations and routes in Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/mapa"
                    />
                
                    <Header />
                    <LanguageSwitcher />
                    <Hoteles />
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                  </>
                } 
              />

              <Route 
                path="/lugares-turisticos"
                element={
                  <>
                    <Seo
                      title="Tourist Places | Visit Valladolid"
                      description="Explore top tourist attractions in Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/lugares-turisticos"
                    />
                 
                    <Header />  
                    <LanguageSwitcher />
                     {/* <LanguageSwitcher /> */}
                    <Historia />
                    
                    {/* <Conventos /> */}
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                    
                  </>
                }
              /> 

              <Route 
                path="/programarevents"
                element={
                  <>
                    <Seo
                      title="Event Schedule | Visit Valladolid"
                      description="Check out the event schedule in Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/programarevents"
                    />
            
                    <Header />
                    <LanguageSwitcher />
                    <ProgramarEvents />
                    <Catalogo />
                    <EventoDiario />
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                  </>
                }
              />

              <Route path="/historia" element={
                <>  
                <Seo
                      title="Historia | Visit Valladolid"
                      description="Descubre la historia de Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/historia"
                    />

                  <Header />
                  <LanguageSwitcher />
                 
                   <Historia />
                    <Conventos />
                    <Cenotes />
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/catalogo" element={
                <>
                <Seo
                      title="Catalogo | Visit Valladolid"
                      description="Descubre el catalogo de eventos en Valladolid."
                      canonical="https://visitavalladolidmx.com/catalogo"
                    />

                  <Header />
                  <LanguageSwitcher />
                  <Catalogo />
                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/rutas" element={
                <>
                <Seo
                      title="Rutas | Visit Valladolid"
                      description="Descubre las rutas turísticas en Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/rutas"
                    />
             
                  <Header />
                  <LanguageSwitcher />
                  <Estadisticas />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/turismo" element={
                <>
                <Seo
                      title="Turismo | Visit Valladolid"
                      description="Información turística de Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/turismo"
                    />
             
                  <Header />
                  <LanguageSwitcher />
                  <Turismo />
                  <Turismo26 />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              
              
              <Route path="/contacto" element={
                <>
                <Seo
                      title="Contacto | Visit Valladolid"
                      description="Contáctanos para más información sobre Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/contacto"
                    />
                 
                  <Header />
                  <LanguageSwitcher />
                  <Contactanos />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/destinos" element={
                <>
                <Seo
                      title="Destinos | Visit Valladolid"
                      description="Descubre los destinos cercanos a Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/destinos"
                    />
                
                  <Header />
                  <LanguageSwitcher />
                  <Destinos />

                  {/* Footer global */}
          <ProximoEvento />
          
            <Footer />
                  </>
                } />
              <Route path="/puebloscercanos" element={
                <>
                <Seo
                      title="Pueblos Cercanos | Visit Valladolid"
                      description="Explora los pueblos cercanos a Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/puebloscercanos"
                    />
               
                  <Header />
                  <LanguageSwitcher />
                  <PueblosCercanos />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />

                </>
              } />  
              <Route path="/agencias" element={
                <>
                <Seo
                      title="Agencias y Tours | Visit Valladolid"
                      description="Descubre las agencias y tours disponibles en Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/agencias"
                    />
                    
               
                  <Header />
                  <LanguageSwitcher />
                  <AgenciasTours />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />

                </>
              } />
              <Route path="/walkingtours" element={
                <>
                <Seo
                      title="Walking Tours | Visit Valladolid"
                      description="Explore walking tours with local guides in Valladolid, Yucatán."
                      canonical="https://visitavalladolidmx.com/walkingtours"
                    />
                    
               
                  <Header />
                  <LanguageSwitcher />
                  <WalkingTours />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />

                </>
              } />

              {/* Redirección por defecto a /home */}
              <Route path="*" element={<Navigate to="/home" replace />} />


            </Routes>
          </center>

          
        </main>
      </div>
    </Router>
    </HelmetProvider>
  );
};

export default App;

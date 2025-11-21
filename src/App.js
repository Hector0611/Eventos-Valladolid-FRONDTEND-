import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import Headercopia from './componentes/Headercopia';
import Headercopia2 from './componentes/Headercopia2';
import ScrollToTop from './componentes/ScrollToTop';
import PrincipalRecarga from './componentes/PrincipalRecarga';
import Conventos from './componentes/Conventos';
import Cenotes from './componentes/Cenotes';
import Contactanos from './componentes/Contactanos';
import PoliciaPage from './componentes/Policia';
import Transporte from './componentes/Transporte';
import AnuncioEmergente from './componentes/AnuncioEmergente';
import Turismo from './componentes/Turismo';
import Destinos from './componentes/Destinos';
import PueblosCercanos from './componentes/PueblosCercanos';

const App = () => {

  // Ejemplo de notificación al cargar la página
  useEffect(() => {
    // 🔔 Toastify (dentro de la web)
    toast.info("🎉 New event recently added", {
      position: "top-right",
      autoClose: 4000,
      theme: "colored",
    });

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
    
    <Router>
      <ScrollToTop />
      <div>
        <main className='main-container'>
          <center>
            <Routes>
              {/* Si alguien entra en "/" lo mando al splash */}
              <Route path="/" element={<Navigate to="/loading" />} />

              {/* Splash Screen */}
              <Route path="/loading" element={
                <>
                <Header2 />
                <PrincipalRecarga />
                </>} />

              {/* Página principal real */}
              <Route 
                path="/home" 
                element={
                  <>
                    <Header2 />
                    <Header />
                    <ProgramarEvents />
                    <Catalogo />
                    <EventoDiario />
                   <ToastContainer />
                   {/*  <AnuncioEmergente /> */}
                   {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                  </>
                } 
              />  

              <Route 
                path="/calendario/evento/:mensaje" 
                element={
                  <>
                    <Header2 />
                    <Header />
                    <EventoCalendario />

                  </>
                } 
              />
              <Route 
                path="/policia" 
                element={
                  <>
                    <Header2 />
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
                    <Header2 />
                    <Header />
                    <Transporte />
                    
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                  </>
                } 
              />

              <Route 
                path="/mapa" 
                element={
                  <>
                    <Header2 />
                    <Header />
                    <Hoteles />
                    {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                  </>
                } 
              />

              <Route 
                path="/LugaresTuristicos"
                element={
                  <>
                    <Header2 />
                    <Header />  
                    <Historia />
                    <Cenotes />
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
                    <Header2 />
                    <Header />
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
                  <Header2 />
                  <Header />
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
                  <Header2 />
                  <Header />
                  <Catalogo />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/estadisticas" element={
                <>
                  <Header2 />
                  <Header />
                  <Estadisticas />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/turismo" element={
                <>
                  <Header2 />
                  <Header />
                  <Turismo />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              
              
              <Route path="/contacto" element={
                <>
                  <Header2 />
                  <Header />
                  <Contactanos />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/destinos" element={
                <>
                  <Header2 />
                  <Header />
                  <Destinos />

                  {/* Footer global */}
          <ProximoEvento />
          
            <Footer />
                  </>
                } />
              <Route path="/puebloscercanos" element={
                <>
                  <Header2 />
                  <Header />
                  <PueblosCercanos />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />  
            </Routes>
          </center>

          
        </main>
      </div>
    </Router>
  );
};

export default App;

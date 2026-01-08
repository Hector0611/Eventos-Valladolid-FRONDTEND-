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
import LanguageSwitcher from './componentes/LanguageSwitcher';
import Turismo26 from './componentes/Turismo26';
import Destino from './componentes/Destino';
import MapaSin from './componentes/MapaSin';

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
                
                    <Header />
                    <LanguageSwitcher />
                    <ProgramarEvents />

        

                    <Cenotes />
                    
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
                  
                    <Header />
                    <LanguageSwitcher />
                    <Transporte />
                    
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
               
                  <Header />
                  <LanguageSwitcher />
                  <Catalogo />

                  {/* Footer global */}
          <ProximoEvento />
         
          <Footer />
                </>
              } />

              <Route path="/estadisticas" element={
                <>
             
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
               
                  <Header />
                  <LanguageSwitcher />
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

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
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

const App = () => {
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
                    <Headercopia2 />
                    <Headercopia />
                    <ProgramarEvents />
                   
                  </>
                } 
              />

              <Route 
                path="/calendario/evento/:mensaje" 
                element={
                  <>
                    <Headercopia2 />
                    <Headercopia />
                    <EventoCalendario />
                  </>
                } 
              />

              <Route 
                path="/hoteles" 
                element={
                  <>
                    <Headercopia2 />
                    <Headercopia />
                    <Hoteles />
                  </>
                } 
              />

              <Route 
                path="/calenYcirc"
                element={
                  <>
                    <Headercopia2 />
                    <Headercopia />  
                    <EventoDiario />
                  </>
                }
              />

              <Route 
                path="/programarevents"
                element={
                  <>
                    <Headercopia2 />
                    <Headercopia />
                    <ProgramarEvents />
                  </>
                }
              />

              <Route path="/historia" element={
                <>  
                  <Headercopia2 />
                  <Headercopia />
                   <Historia />
                    <Conventos />
                    <Cenotes />
                </>
              } />

              <Route path="/catalogo" element={
                <>
                  <Headercopia2 />
                  <Headercopia />
                  <Catalogo />
                </>
              } />

              <Route path="/estadisticas" element={
                <>
                  <Headercopia2 />
                  <Headercopia />
                  <Estadisticas />
                </>
              } />
            </Routes>
          </center>

          {/* Footer global */}
          <ProximoEvento />
          <Footer />
        </main>
      </div>
    </Router>
  );
};

export default App;

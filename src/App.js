import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './componentes/Header';
import EventoCalendario from './componentes/EventoCalendario';
import CalendarioGeneral from './componentes/CalendarioGeneral';
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
import Cenotes from './componentes/Cenotes';
import Conventos from './componentes/Conventos';
import ScrollToTop from './componentes/ScrollToTop';


const App = () => {
    return (
        <Router>
            {<ScrollToTop />} {/* Componente para desplazar hacia arriba al cambiar de ruta */}
            <div>
                
                <main className='main-container'>
                    <center>
                        
                        {/* Renderiza el CircularMenu solo en la ruta principal */}
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <>
                                        <Header2 />
                                        <Header/>
                                       <CalendarioGeneral />
                                       
                                       <Historia />
                                       <Cenotes />
                                        <Conventos />
                                       
                                        
                                    </>
                                } 
                            />
                            
                            <Route 
                                path="/calendario/evento/:mensaje" 
                                element={
                                    <>
                                        <Headercopia2 />
                                        <Headercopia /> {/* Renderiza el Headercopia aquí */}
                                        <EventoCalendario />
                                        
                                    </>
                                } 
                            />
                            <Route 
                                path="/hoteles" 
                                element={
                                    <>
                                    <Headercopia2 />
                                        <Headercopia /> {/* Renderiza el Headercopia aquí */}
                                    <Hoteles />
                                    
                                        
                                    </>
                            } 
                            />
                            <Route 
                                path="/calenYcirc"
                                element={
                                <>
                                    
                                    <Headercopia2 />
                                    <Headercopia /> {/* Renderiza el Headercopia aquí */}  
                                    <EventoDiario />
                                    
                                    {/* <CalenYcirc />  */}
                                    
                                </>
                            }
                            />
                            <Route 
                                path="/programarevents"
                                element={
                                    <>
                                        <Headercopia2 />
                                        <Headercopia /> {/* Renderiza el Headercopia aquí */}
                                        <ProgramarEvents />
                                    </>
                                }
                            />
                            <Route path="/historia" element={
                                <>  
                                    <Headercopia2 />
                                    <Headercopia /> {/* Renderiza el Headercopia aquí */}
                                <Historia /> 
                                </>
                            } 
                            />
                            <Route path="/catalogo" element={
                                <>
                                    <Headercopia2 />
                                    <Headercopia /> {/* Renderiza el Headercopia aquí */}
                                <Catalogo />
                                </>
                                } />
                            <Route path="/estadisticas" element={
                                <>
                                    <Headercopia2 />
                                    <Headercopia /> {/* Renderiza el Headercopia aquí */}
                                <Estadisticas />
                                        </>
                                } />
                        </Routes>
                    </center>
                   {/* Renderiza el Footer aquí */}
                   <ProximoEvento />
                <Footer />
                </main>

                
            </div>
        </Router>
    );
};

export default App;


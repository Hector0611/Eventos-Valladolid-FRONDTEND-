import React from "react";
import { useLocation, Link } from "react-router-dom";
import './Header2.css'; // Asegúrate de tener el CSS adecuado para este componente
import logo1 from './Imagenes/LOGOPUEBLOMAGICOBLANCO_Mesadetrabajo1.png';
import logo2 from './Imagenes/LOGOPUEBLOMAGCONEGRO_Mesadetrabajo1.png';
import logo3 from './Imagenes/pngegg.png';
import logo4 from './Imagenes/unnamed.png';
import logo5 from './Imagenes/LOGOOFICIAL.png';


const Header2 = () => {
  const location = useLocation();

  // Obtiene la ruta actual y la convierte en un formato legible
  const getPageName = () => {
    const path = location.pathname.split("/").filter((segment) => segment);
    return path.map((segment, index) => (
      <span key={index}>
        {index > 0 && " / "}
        <Link to={`/${path.slice(0, index + 1).join("/")}`}>{segment}</Link>
      </span>
    ));
  };

  return (
    <header className="header-container">
      
      <div className="header-content">
        <div>
            <div className='LogoNeutro2'>
                <img
                        src={logo5}
                        alt={`Yucatan`}
                        className="logo-Yucatan"
                  
                  />
                 
                  <img
                        src={logo4}
                        alt={`Yucatan`}
                        className="logo-Yucatan"
                  
                  />
                   <img
                        src={logo3}
                        alt={`Yucatan`}
                        className="logo-Yucatan"
                  />
                  </div>
          
        </div>
<br />
      </div>
      
    
    </header>
  );
};

export default Header2;

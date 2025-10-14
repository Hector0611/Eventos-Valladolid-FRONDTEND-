import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import './Header2.css';
import logo3 from './Imagenes/pngegg.png';
import logo4 from './Imagenes/unnamed.png';
import logo5 from './Imagenes/LOGOOFICIAL.png';
import logo6 from './Imagenes/LogosValladolid.png';

const Header2 = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Efecto: Detectar scroll y ocultar o mostrar el header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Bajando
        setShowHeader(false);
      } else {
        // Subiendo
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <header className={`header-container ${showHeader ? "visible" : "hidden"}`}>
      <div className="header-content">
        <div className='LogoNeutro2'>
          <img src={logo6} alt="Yucatan" className="logo-Yucatan" />
          {/* <img src={logo4} alt="Yucatan" className="logo-Yucatan" />
          <img src={logo3} alt="Yucatan" className="logo-Yucatan" /> */}
        </div>
      </div>
    </header>
  );
};

export default Header2;

import React from "react";
import "./LanguageSwitcher.css";
import GoogleTranslate from "./GoogleTranslate"; // Importa el nuevo componente

export default function LanguageSwitcher() {
  

  return (
    <div className="traduccion">
      <div className="translate-wrapper">
            <GoogleTranslate />
          </div>
    </div>
  );
}
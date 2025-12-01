import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="traduccion">
      <select 
        onChange={handleChange} 
        value={i18n.language}

      >
        <option value="es">🇲🇽 Español</option>
        <option value="en">🇺🇸 English</option>
        {/* <option value="fr">🇫🇷 Français</option>
        <option value="de">🇩🇪 Deutsch</option>
        <option value="it">🇮🇹 Italiano</option>
        <option value="pt">🇧🇷 Português</option> */}
      </select>
    </div>
  );
}

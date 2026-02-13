// GoogleTranslate.js
import React, { useEffect, useState } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("preferredLanguage") || "en"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  // Cargar script Google
  useEffect(() => {
    if (window.googleTranslateScriptLoaded) return;
    window.googleTranslateScriptLoaded = true;

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,it,de,pt",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo");
          if (select) {
            select.value = currentLang;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }, 1200);
      } catch (err) {
        console.warn("Google Translate init blocked:", err);
      }
    };

    document.body.appendChild(script);
  }, []);

  // Cambiar idioma
  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem("preferredLanguage", lang);

    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setShowDropdown(false);
  };

  const languages = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    pt: "🇵🇹",
  };

  return (
    <>
      <div className="language-selector">
        <button
          className="language-btn"
          onClick={() => setShowDropdown(!showDropdown)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 180)}
        >
          {languages[currentLang]} <span className="arrow">▼</span>
        </button>

        {showDropdown && (
          <div className="dropdown">
            {Object.entries(languages).map(([code, label]) => (
              <button
                key={code}
                className={`dropdown-item ${
                  currentLang === code ? "active" : ""
                }`}
                onMouseDown={() => changeLanguage(code)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Elemento que Google usa */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default GoogleTranslate;

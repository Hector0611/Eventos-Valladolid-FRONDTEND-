// GoogleTranslate.js
import React, { useEffect, useState } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("preferredLanguage") || "en"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  // -------------------------
  // CARGAR SCRIPT DE GOOGLE SOLO UNA VEZ
  // -------------------------
  useEffect(() => {
    if (window.googleTranslateScriptLoaded) return;
    window.googleTranslateScriptLoaded = true;

    // Crear script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    // Callback global requerido por Google
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

        // Aplicar idioma guardado
        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo");
          if (select) {
            select.value = currentLang;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }, 1200);
      } catch (err) {
        console.warn("Google Translate initialization blocked:", err);
      }
    };

    document.body.appendChild(script);

    return () => {};
  }, []);

  // -------------------------
  // CAMBIAR IDIOMA
  // -------------------------
  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem("preferredLanguage", lang);

    // Cookie requerida por Google
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    setShowDropdown(false);
  };

  // -------------------------
  // OCULTAR ELEMENTOS DE GOOGLE
  // -------------------------
  useEffect(() => {
    const hide = () => {
      const selectors = [
        ".goog-te-banner-frame",
        ".goog-logo-link",
        ".goog-te-gadget",
        ".goog-te-menu-value",
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((e) => {
          e.style.display = "none";
          e.style.visibility = "hidden";
        });
      });

      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.style.opacity = "0";
        combo.style.position = "absolute";
        combo.style.left = "-9999px";
      }
    };

    const interval = setInterval(hide, 800);
    return () => clearInterval(interval);
  }, []);

  const languages = {
    en: "🇺🇸 English",
    es: "🇪🇸 Español",
    fr: "🇫🇷 Français",
    de: "🇩🇪 Deutsch",
    it: "🇮🇹 Italiano",
    pt: "🇵🇹 Português",
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

      {/* Elemento oculto requerido por Google */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default GoogleTranslate;

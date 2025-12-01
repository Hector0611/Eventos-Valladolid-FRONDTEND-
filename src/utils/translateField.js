import { i18n } from "../i18n";

export async function translateField(text) {
  if (!text) return text;

  // Idioma actual (reactivo)
  const currentLang = i18n.resolvedLanguage || i18n.language;

  // Si estamos en inglés NO traducimos (tus textos vienen en inglés)
  if (currentLang === "en") return text;

  // Si ya está traducido en memoria
  if (i18n.hasResource(currentLang, "translation", text)) {
    return i18n.t(text);
  }

  // Traducir automáticamente
  const translated = await autoTranslate(text, currentLang);

  // Guardarlo en memoria
  i18n.addResource(currentLang, "translation", text, translated);

  return translated;
}

async function autoTranslate(text, lang) {
  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",  // datos vienen en inglés
      target: lang,  // idioma elegido
    }),
  });

  const data = await res.json();
  return data.translatedText;
}

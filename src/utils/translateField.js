import { i18n } from "../i18n";

export async function translateField(text) {
  // Si el texto NO existe, regresarlo tal cual
  if (!text) return text;

  // Si el idioma actual es español, no traducir
  if (i18n.language === "es") return text;

  // Intentar traducir usando recursos ya cargados
  const hasTranslation = i18n.exists(text);
  if (hasTranslation) return i18n.t(text);

  // Traducción automática temporal (sin tocar la base de datos)
  const translated = await autoTranslate(text, i18n.language);

  // Guardar la traducción para reuso, sin DB
  i18n.addResource(i18n.language, "translation", text, translated);

  return translated;
}

// Traducción automática (LibreTranslate)
async function autoTranslate(text, lang) {
  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "es",
      target: lang,
    }),
  });

  const data = await res.json();
  return data.translatedText;
}

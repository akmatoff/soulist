import ru from "./locales/ru.json";
import en from "./locales/en.json";
import kg from "./locales/kg.json";

const LANGUAGE = {
  ru,
  en,
  kg,
};

export let currentLanguage =
  new URLSearchParams(window.location.search).get("lang") ||
  localStorage.getItem("language") ||
  "ru";

export function getCurrentLanguageFromParams() {
  return (
    new URLSearchParams(window.location.search).get("lang") ||
    localStorage.getItem("language") ||
    "ru"
  );
}

function getNestedTranslation(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => acc && acc[key], obj);
}

export async function loadLanguage(language) {
  try {
    const data = LANGUAGE[language];

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = getNestedTranslation(data, key);

      if (translation) {
        element.textContent = translation;
      }
    });
  } catch (e) {
    console.log(e);
    console.error("Ошибка при загрузке языка");
  }
}

export function translate(key) {
  const translation = getNestedTranslation(LANGUAGE[currentLanguage], key);

  if (!translation) return "";

  return translation;
}

export function createTranslationKey(...args) {
  return args.filter(Boolean).join(".");
}

export function switchLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("language", language);

  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
  window.location.reload();

  loadLanguage(language);
}

import { loadLanguage, currentLanguage, switchLanguage } from "./i18n";
import "./style.css";

const cuisineMenuButton = document.querySelector(".cuisine");
const barMenuButton = document.querySelector(".bar");
const scrollTopButton = document.querySelector("#scrollTopButton");

const languageSelectors = document.querySelectorAll(".language-select");

cuisineMenuButton.addEventListener("click", () => {
  window.location.href = "/cuisine.html";
});

barMenuButton.addEventListener("click", () => {
  window.location.href = "/bar.html";
});

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLanguage);
  updateLanguageSelectors();

  document.addEventListener("scrollend", () => {
    if (window.scrollY < 500) {
      scrollTopButton.classList.remove("opacity-100", "pointer-events-auto");
      scrollTopButton.classList.add("opacity-0", "pointer-events-none");
    } else {
      scrollTopButton.classList.remove("pointer-events-none");
      scrollTopButton.classList.add("opacity-100", "pointer-events-auto");
    }
  });
});

languageSelectors.forEach((selector) => {
  const language = selector.getAttribute("data-lang");

  selector.addEventListener("click", () => {
    switchLanguage(language);
    loadLanguage(language);

    updateLanguageSelectors();
  });
});

export function updateLanguageSelectors() {
  languageSelectors.forEach((selector) => {
    const language = selector.getAttribute("data-lang");

    if (currentLanguage === language) {
      selector.classList.add("border-[0.5px]");
    } else {
      selector.classList.remove("border-[0.5px]");
    }
  });
}

import { BAR_CATEGORIES_COLORS } from "./constants";
import { barCategories } from "./data/categories";
import { currentLanguage, loadLanguage } from "./i18n";
import "./style.css";

const barCategoriesSelector = document.querySelector("#barCategoriesSelector");
const barCategoriesSection = document.querySelector("#barCategoriesContent");
const burgerMenuButton = document.querySelector(".burger-menu");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalCategories");
const modalCloseButton = document.querySelector(".close-menu");
const modalOverlay = document.querySelector("#overlay");

document.addEventListener("DOMContentLoaded", () => {
  displayCategories();
  handleModal();
  loadLanguage(currentLanguage);
});

function createCategoryElement(category) {
  const categoryElement = document.createElement("a");
  categoryElement.setAttribute("href", `#${category}`);
  categoryElement.setAttribute("data-i18n", `bar_categories.${category}`);
  categoryElement.classList.add("category");

  return categoryElement;
}

export function displayCategories() {
  barCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    categoryElement.addEventListener("click", (e) => {
      console.log(e.target);
      e.preventDefault();

      const section = document.querySelector(`#${category}`);

      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const categorySection = document.createElement("div");
    categorySection.classList.add("category-section");
    categorySection.setAttribute("id", category);

    const header = document.createElement("div");
    header.classList.add("flex", "items-center", "gap-[12px]");

    const line = document.createElement("div");
    line.classList.add("h-[1.5px]", "md:h-[2.8px]", "w-full", "flex-1");
    line.style.backgroundColor = BAR_CATEGORIES_COLORS[category];

    const line2 = document.createElement("div");
    line2.classList.add("h-[1.5px]", "md:h-[2.8px]", "w-full", "flex-1");
    line2.style.backgroundColor = BAR_CATEGORIES_COLORS[category];

    const title = document.createElement("h1");
    title.setAttribute("data-i18n", `bar_categories.${category}`);
    title.classList.add("category-section-title");
    title.style.color = BAR_CATEGORIES_COLORS[category];

    header.appendChild(line);
    header.appendChild(title);
    header.appendChild(line2);

    categorySection.appendChild(header);

    barCategoriesSelector.appendChild(categoryElement);

    barCategoriesSection.appendChild(categorySection);
  });
}

function handleModal() {
  burgerMenuButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  modalCloseButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modalOverlay.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  barCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    categoryElement.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modalContent.appendChild(categoryElement);
  });
}

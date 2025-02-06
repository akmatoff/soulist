import { cousineCategoriesContent, cousineCategories } from "./data/categories";
import { currentLanguage, loadLanguage } from "./i18n";
import { COUSINE_CATEGORIES_COLORS } from "./constants";

// Selectors
const cousineCategoriesSelector = document.querySelector(
  "#cousineCategoriesSelector"
);
const cousineCategoriesSection = document.querySelector(
  "#cousineCategoriesContent"
);

const burgerMenuButton = document.querySelector(".burger-menu");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalCategories");
const modalCloseButton = document.querySelector(".close-menu");
const modalOverlay = document.querySelector("#overlay");

// Listeners
document.addEventListener("DOMContentLoaded", () => {
  displayCousineCategories();
  handleModal();

  loadLanguage(currentLanguage);
});

function displayCousineCategories() {
  // Category selector
  cousineCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    cousineCategoriesSelector.appendChild(categoryElement);
  });

  // Category section with products
  cousineCategoriesContent.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("category-section");
    categorySection.setAttribute("id", category);

    const header = document.createElement("div");
    header.classList.add("flex", "items-center", "gap-[12px]");

    const line = document.createElement("div");
    line.classList.add("h-[1.5px]", "md:h-[2.8px]", "w-full", "flex-[1_1_0%]");
    line.style.backgroundColor = COUSINE_CATEGORIES_COLORS[category];

    const line2 = document.createElement("div");
    line2.classList.add(
      "h-[1.5px]",
      "md:h-[2.8px]",
      "w-full",
      "flex-[4_1_10%]"
    );
    line2.style.backgroundColor = COUSINE_CATEGORIES_COLORS[category];

    const title = document.createElement("h1");
    title.setAttribute("data-i18n", `cousine_categories.${category}`);
    title.classList.add("category-section-title");
    title.style.color = COUSINE_CATEGORIES_COLORS[category];

    header.appendChild(line);
    header.appendChild(title);
    header.appendChild(line2);

    categorySection.appendChild(header);

    cousineCategoriesSection.appendChild(categorySection);
  });
}

function createCategoryElement(category) {
  const categoryElement = document.createElement("a");
  categoryElement.setAttribute("href", `#${category}`);
  categoryElement.setAttribute("data-i18n", `cousine_categories.${category}`);
  categoryElement.classList.add("category");

  return categoryElement;
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

  cousineCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    categoryElement.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modalContent.appendChild(categoryElement);
  });
}

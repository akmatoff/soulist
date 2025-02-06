import { cuisineCategoriesContent, cuisineCategories } from "./data/categories";
import { currentLanguage, loadLanguage } from "./i18n";
import { CUISINE_CATEGORIES_COLORS } from "./constants";

// Selectors
const cuisineCategoriesSelector = document.querySelector(
  "#cuisineCategoriesSelector"
);
const cuisineCategoriesSection = document.querySelector(
  "#cuisineCategoriesContent"
);

const burgerMenuButton = document.querySelector(".burger-menu");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalCategories");
const modalCloseButton = document.querySelector(".close-menu");
const modalOverlay = document.querySelector("#overlay");

// Listeners
document.addEventListener("DOMContentLoaded", () => {
  displaycuisineCategories();
  handleModal();

  loadLanguage(currentLanguage);
});

function displaycuisineCategories() {
  // Category selector
  cuisineCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    cuisineCategoriesSelector.appendChild(categoryElement);
  });

  // Category section with products
  cuisineCategoriesContent.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("category-section");
    categorySection.setAttribute("id", category);

    const header = document.createElement("div");
    header.classList.add("flex", "items-center", "gap-[12px]");

    const line = document.createElement("div");
    line.classList.add("h-[1.5px]", "md:h-[2.8px]", "w-full", "flex-[1_1_0%]");
    line.style.backgroundColor = CUISINE_CATEGORIES_COLORS[category];

    const line2 = document.createElement("div");
    line2.classList.add(
      "h-[1.5px]",
      "md:h-[2.8px]",
      "w-full",
      "flex-[4_1_10%]"
    );
    line2.style.backgroundColor = CUISINE_CATEGORIES_COLORS[category];

    const title = document.createElement("h1");
    title.setAttribute("data-i18n", `cuisine_categories.${category}`);
    title.classList.add("category-section-title");
    title.style.color = CUISINE_CATEGORIES_COLORS[category];

    header.appendChild(line);
    header.appendChild(title);
    header.appendChild(line2);

    categorySection.appendChild(header);

    cuisineCategoriesSection.appendChild(categorySection);
  });
}

function createCategoryElement(category) {
  const categoryElement = document.createElement("a");
  categoryElement.setAttribute("href", `#${category}`);
  categoryElement.setAttribute("data-i18n", `cuisine_categories.${category}`);
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

  cuisineCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    categoryElement.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modalContent.appendChild(categoryElement);
  });
}

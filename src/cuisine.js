import { cuisineCategoriesContent, cuisineCategories } from "./data/categories";
import { currentLanguage, loadLanguage } from "./i18n";
import { CUISINE_CATEGORIES_COLORS } from "./constants";
import "./style.css";
import { createProductsList } from "./products/products-ui";

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
    header.classList.add("flex", "items-center", "gap-[12px]", "relative");

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

    const serviceFee = document.createElement("div");
    serviceFee.classList.add("service-fee");
    serviceFee.setAttribute("data-i18n", "serviceFee");
    serviceFee.style.color = CUISINE_CATEGORIES_COLORS[category];

    if (["cold_snacks", "hot_snacks"].includes(category)) {
      serviceFee.classList.add("md:top-8");
    }

    const categoryProducts = document.createElement("div");
    categoryProducts.classList.add("mt-4");

    header.appendChild(line);
    header.appendChild(title);
    header.appendChild(line2);
    header.appendChild(serviceFee);

    categorySection.appendChild(header);

    const productsList = createProductsList(category);

    if (productsList) {
      productsList.forEach((product) => categoryProducts.appendChild(product));
    }

    categorySection.appendChild(categoryProducts);

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

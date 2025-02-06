import { BAR_CATEGORIES_COLORS } from "./constants";
import { barCategories } from "./data/categories";
import { currentLanguage, loadLanguage } from "./i18n";

const barCategoriesSelector = document.querySelector("#barCategoriesSelector");
const barCategoriesSection = document.querySelector("#barCategoriesContent");

export function displayCousineCategories() {
  barCategories.forEach((category) => {
    const categoryElement = document.createElement("a");
    categoryElement.setAttribute("href", `#${category}`);
    categoryElement.setAttribute("data-i18n", `bar_categories.${category}`);
    categoryElement.classList.add("category");

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

document.addEventListener("DOMContentLoaded", () => {
  displayCousineCategories();
  loadLanguage(currentLanguage);
});

import { CUISINE_CATEGORIES_COLORS } from "../constants";
import { cuisineProducts } from "../data/cusine_products";
import { getCurrentLanguageFromParams } from "../i18n";

export function createDefaultPriceSection(category, product) {
  const categoryColor = CUISINE_CATEGORIES_COLORS[category];

  const priceSection = document.createElement("div");
  priceSection.classList.add("w-fit", "mb-2");

  const line = document.createElement("div");
  line.classList.add("h-[1px]");
  line.style.backgroundColor = categoryColor;

  const weight = document.createElement("span");
  weight.classList.add("text-[10px]", "md:text-[14px]", "pl-2");
  weight.innerText = product.weight + "г.";

  const price = document.createElement("span");
  price.classList.add("text-[12px]", "md:text-[18px]", "ml-2", "pr-2");
  price.innerText = product.price + " с.";

  priceSection.appendChild(weight);
  priceSection.appendChild(price);
  priceSection.appendChild(line);

  return priceSection;
}

export function createDefaultTitle(value) {
  const title = document.createElement("h1");
  title.classList.add("text-[12px]", "md:text-[20px]", "uppercase");
  title.innerText = value;

  return title;
}

export function createDefaultImage(product) {
  const currentLanguage = getCurrentLanguageFromParams();

  const image = document.createElement("img");
  image.classList.add("md:max-w-[408px]");
  image.setAttribute("src", `/cuisine/${product.title?.ru}.png`);
  image.setAttribute("alt", product.title?.[currentLanguage]);

  return image;
}

export function displayHosperGrill() {
  const currentLanguage = getCurrentLanguageFromParams();

  const product = cuisineProducts["hosper"].find(
    (product) => product.title.ru === "Хоспер Гриль"
  );

  const section = document.createElement("div");
  section.classList.add("flex", "flex-col", "items-center", "p-4");

  const priceSection = createDefaultPriceSection("hosper", product);

  const title = createDefaultTitle(product.title[currentLanguage]);

  const description = document.createElement("div");
  description.classList.add(
    "text-center",
    "text-[6px]",
    "md:text-[12px]",
    "uppercase",
    "flex",
    "flex-col",
    "gap-5"
  );
  description.innerHTML = product.description[currentLanguage];

  const image = document.createElement("img");
  image.classList.add("mt-4");
  image.src = "/cuisine/Хоспер гриль.png";

  section.appendChild(priceSection);
  section.appendChild(title);
  section.appendChild(description);

  section.appendChild(image);

  return section;
}

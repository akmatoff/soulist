import { CUISINE_CATEGORIES_COLORS } from "../constants";
import { cuisineProducts } from "../data/cusine_products";
import {
  createDefaultImage,
  createDefaultPriceSection,
  createDefaultTitle,
} from "./components";
import { getCurrentLanguageFromParams } from "../i18n";

export function createProductsList(category) {
  const currentLanguage = getCurrentLanguageFromParams();

  if (!cuisineProducts[category]) return;

  return cuisineProducts[category].map((product, index) => {
    if (product.exclude) return document.createElement("div");

    const isIndexEven = index % 2 === 0;

    const section = document.createElement("div");
    section.classList.add("flex", "items-center", "justify-between");

    if (!isIndexEven) {
      section.classList.add("flex-row-reverse");
    }

    const image = document.createElement("div");
    image.style.backgroundImage = `url('/cuisine/${product.title?.ru}.png')`;

    image.classList.add(
      "flex-[1_1_60%]",
      "aspect-[6/5]",
      "w-full",
      "bg-contain",
      "bg-center",
      "bg-no-repeat"
    );

    if (["sushi"].includes(category)) {
      image.classList.add("max-h-[142px]");
    }

    const infoSection = document.createElement("div");
    infoSection.classList.add("flex-[1_1_40%]", "pr-4");

    if (!isIndexEven) {
      infoSection.classList.add("pl-4", "pr-0");
    }

    if (["sets"].includes(category)) {
      infoSection.classList.add("max-w-[300px]", "mx-6");
    }

    const title = createDefaultTitle(product.title?.[currentLanguage]);

    const description = document.createElement("p");
    description.classList.add(
      "text-[6px]",
      "md:text-[11px]",
      "text-[#e4e4e4]",
      "font-normal",
      "mt-1",
      "uppercase"
    );
    description.innerText = product.description?.[currentLanguage];

    const priceSection = createDefaultPriceSection(category, product);

    section.appendChild(image);

    infoSection.appendChild(priceSection);

    infoSection.appendChild(title);

    if (product.description) {
      infoSection.appendChild(description);
    }

    section.appendChild(infoSection);

    return section;
  });
}

export function createSteaksList() {
  const currentLanguage = getCurrentLanguageFromParams();

  return cuisineProducts["steaks"].map((product) => {
    const categoryColor = CUISINE_CATEGORIES_COLORS["steaks"];

    const section = document.createElement("div");
    section.classList.add("grid", "p-3", "gap-1", "place-items-center");

    const image = createDefaultImage(product);
    image.classList.add("w-full", "h-auto");

    const infoSection = document.createElement("div");
    infoSection.classList.add("max-w-[250px]", "md:max-w-[400px]");

    const titleSection = document.createElement("div");
    titleSection.classList.add("flex", "items-center", "gap-2");

    const title = document.createElement("h1");
    title.classList.add("text-[12px]", "md:text-[20px]", "uppercase");
    title.innerText = product.title?.[currentLanguage];

    const description = document.createElement("p");
    description.classList.add(
      "text-[8px]",
      "md:text-[11px]",
      "font-normal",
      "mt-1",
      "uppercase"
    );
    description.innerText = product.description?.[currentLanguage];

    const priceSection = document.createElement("div");
    priceSection.classList.add("w-fit", "mb-2", "relative");

    const line = document.createElement("div");
    line.classList.add("h-[1px]");
    line.style.backgroundColor = categoryColor;

    const weight = document.createElement("span");
    weight.classList.add("text-[10px]", "md:text-[14px]");
    weight.innerText = product.weight + "г.";

    const price = document.createElement("span");
    price.classList.add("text-[12px]", "md:text-[18px]", "ml-2");
    price.innerText = product.price + " с.";

    const flame = document.createElement("img");
    flame.src = "/cuisine/flame.png";
    flame.classList.add("absolute", "top-0", "-right-12");

    titleSection.append(title);

    if (product.title.ru === "Стейк из языка") {
      priceSection.appendChild(flame);
    }

    section.appendChild(image);

    priceSection.appendChild(weight);
    priceSection.appendChild(price);
    priceSection.appendChild(line);

    infoSection.appendChild(priceSection);

    infoSection.appendChild(titleSection);

    if (product.description) {
      infoSection.appendChild(description);
    }

    section.appendChild(infoSection);

    return section;
  });
}

export function createBreadOrGarnishList(category) {
  const currentLanguage = getCurrentLanguageFromParams();

  return cuisineProducts[category]?.map((product) => {
    const section = document.createElement("div");
    section.classList.add("flex", "justify-between");

    const title = document.createElement("h1");
    title.classList.add("text-[12px]", "md:text-[20px]", "uppercase");
    title.innerText = product.title?.[currentLanguage];

    const priceSection = document.createElement("div");
    priceSection.classList.add("flex", "gap-5");

    const line = document.createElement("div");
    line.classList.add("border-r-[0.8px]");
    line.style.background = CUISINE_CATEGORIES_COLORS[category];
    line.style.borderColor = CUISINE_CATEGORIES_COLORS[category];

    const weight = document.createElement("span");
    weight.classList.add("text-[12px]", "md:text-[18px]", "font-normal");
    weight.innerText = product.weight + "г.";

    const price = document.createElement("span");
    price.classList.add("text-[12px]", "md:text-[18px]");
    price.innerText = product.price + " с.";

    priceSection.appendChild(weight);
    priceSection.appendChild(line);
    priceSection.appendChild(price);

    section.appendChild(title);
    section.appendChild(priceSection);

    return section;
  });
}

export function createDessertsList() {
  const currentLanguage = getCurrentLanguageFromParams();

  return cuisineProducts["desserts"]
    .filter((dessert) => !["Фруктовое ассорти"].includes(dessert.title.ru))
    .map((dessert) => {
      const section = document.createElement("div");
      section.classList.add("flex", "flex-col", "items-center", "h-auto");

      const priceSection = createDefaultPriceSection("desserts", dessert);

      const title = createDefaultTitle(dessert.title?.[currentLanguage]);
      title.classList.add("text-center");

      const image = createDefaultImage(dessert);
      image.classList.add(
        "object-contain",
        "h-auto",
        "max-h-[170px]",
        "w-full",
        "flex-shrink-1"
      );

      section.appendChild(image);
      section.appendChild(priceSection);
      section.appendChild(title);

      return section;
    });
}

export function createSingleDessert(value) {
  const currentLanguage = getCurrentLanguageFromParams();

  const dessert = cuisineProducts["desserts"].find(
    (dessert) => dessert.title.ru === value
  );

  const section = document.createElement("div");
  section.classList.add("flex", "flex-col", "items-center");

  const priceSection = createDefaultPriceSection("desserts", dessert);

  const title = createDefaultTitle(dessert.title?.[currentLanguage]);

  const image = createDefaultImage(dessert);
  image.classList.add(
    "object-contain",
    "w-full",
    "h-auto",
    "max-h-[200px]",
    "md:max-h-[400px]",
    "flex-shrink-1"
  );

  section.appendChild(image);
  section.appendChild(priceSection);
  section.appendChild(title);

  return section;
}

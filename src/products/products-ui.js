import { CUISINE_CATEGORIES_COLORS } from "../constants";
import { cuisineProducts } from "../data/cusine_products";
import { currentLanguage } from "../i18n";

export function createProductsList(category) {
  if (!cuisineProducts[category]) return;

  return cuisineProducts[category].map((product, index) => {
    const isIndexEven = index % 2 === 0;

    const categoryColor = CUISINE_CATEGORIES_COLORS[category];

    const section = document.createElement("div");
    section.classList.add("flex", "items-center", "justify-between", "p-3");

    if (!isIndexEven) {
      section.classList.add("flex-row-reverse");
    }

    const image = document.createElement("img");
    image.classList.add("max-w-[220px]", "md:max-w-[388px]", "object-cover");
    image.setAttribute("src", `/cuisine/${product.title?.ru}.png`);
    image.setAttribute("alt", product.title?.[currentLanguage]);

    const infoSection = document.createElement("div");

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
    priceSection.classList.add("w-fit", "mb-2");

    const line = document.createElement("div");
    line.classList.add("h-[1px]");
    line.style.backgroundColor = categoryColor;

    const weight = document.createElement("span");
    weight.classList.add("text-[10px]", "md:text-[14px]");
    weight.innerText = product.weight + "г.";

    const price = document.createElement("span");
    price.classList.add("text-[12px]", "md:text-[18px]", "ml-2");
    price.innerText = product.price + " с.";

    section.appendChild(image);

    priceSection.appendChild(weight);
    priceSection.appendChild(price);
    priceSection.appendChild(line);

    infoSection.appendChild(priceSection);

    infoSection.appendChild(title);
    infoSection.appendChild(description);

    section.appendChild(infoSection);

    return section;
  });
}

import { currentLanguage, getCurrentLanguageFromParams } from "../i18n";

export function DrinkComponent(drink, wrapper) {
  const section = document.createElement("div");
  section.classList.add("flex", "justify-between", "items-center", "gap-4");

  const priceSection = document.createElement("div");
  priceSection.classList.add("flex", "gap-2");

  const amount = document.createElement("div");
  amount.classList.add("text-[10px]", "md:text-[18px]", "font-light");

  if (typeof drink.amount === "string") {
    amount.innerText = drink.amount;
  } else {
    if (drink.amount < 10) {
      amount.innerText = drink.amount + "л.";
    } else {
      amount.innerText = drink.amount + "мл.";
    }
  }

  const price = document.createElement("div");
  price.classList.add("text-[12px]", "md:text-[20px]");

  if (typeof drink.price === "string") {
    price.innerText = drink.price;
  } else {
    price.innerText = drink.price + "с.";
  }

  const title = document.createElement("h1");
  title.classList.add("text-[12px]", "md:text-[16px]", "uppercase");
  title.innerText = drink.title[currentLanguage] ?? drink.title.ru;

  const titleContainer = document.createElement("div");

  titleContainer.appendChild(title);

  if (wrapper) {
    wrapper.appendChild(section);
  }

  const TYPE = {
    kg: {
      Сухое: "Кургак",
      Полусладкое: "Жарым таттуу",
      Полусухое: "Жарым кургак",
    },
    ru: {
      Сухое: "Сухое",
      Полусладкое: "Полусладкое",
      Полусухое: "Полусухое",
    },
  };

  if (drink.type) {
    const type = document.createElement("p");
    type.classList.add(
      "text-[10px]",
      "md:text-[12px]",
      "font-light",
      "uppercase"
    );
    type.innerText = `(${TYPE[currentLanguage][drink.type]})`;

    titleContainer.appendChild(type);
  }

  if (drink.variants) {
    const variantEl = document.createElement("span");
    variantEl.classList.add("text-[10px]", "font-light");

    const text = `(${drink.variants.join(", ")})`;

    variantEl.innerText = text;

    titleContainer.appendChild(variantEl);
  }

  section.appendChild(titleContainer);

  drink.amount && priceSection.appendChild(amount);
  priceSection.appendChild(price);

  section.appendChild(priceSection);

  return section;
}

export function RuleComponent(drink, wrapper) {
  const currentLanguage = getCurrentLanguageFromParams();

  const section = document.createElement("div");
  section.classList.add("flex", "justify-between", "items-center", "gap-4");

  const priceSection = document.createElement("div");
  priceSection.classList.add("flex", "gap-2");

  const amount = document.createElement("div");
  amount.classList.add("text-[10px]", "md:text-[18px]", "font-light");

  if (typeof drink.amount === "string") {
    amount.innerText = drink.amount;
  } else {
    if (drink.amount < 10) {
      amount.innerText = drink.amount + "л.";
    } else {
      amount.innerText = drink.amount + "мл.";
    }
  }

  const price = document.createElement("div");
  price.classList.add("text-[12px]", "md:text-[20px]");

  if (typeof drink.price === "string") {
    price.innerText = drink.price;
  } else {
    price.innerText = drink.price + "с.";
  }

  const title = document.createElement("h1");
  title.classList.add("text-[12px]", "md:text-[16px]", "uppercase");
  title.innerText = drink.title[currentLanguage];

  const titleContainer = document.createElement("div");

  titleContainer.appendChild(title);

  if (wrapper) {
    wrapper.appendChild(section);
  }

  if (drink.type) {
    const type = document.createElement("p");
    type.classList.add(
      "text-[10px]",
      "md:text-[12px]",
      "font-light",
      "uppercase"
    );
    type.innerText = `(${drink.type})`;

    titleContainer.appendChild(type);
  }

  section.appendChild(titleContainer);

  drink.amount && priceSection.appendChild(amount);
  priceSection.appendChild(price);

  section.appendChild(priceSection);

  return section;
}

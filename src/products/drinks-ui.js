import { barDrinks, PARTY_MIX } from "../data/bar_drinks";
import { getCurrentLanguageFromParams } from "../i18n";
import { getBarCategoryImage } from "../utils";
import { DrinkComponent, RuleComponent } from "./bar-components";

export function createDrinksList(category) {
  if (!barDrinks[category]) return;

  return barDrinks[category]?.map((drink) => DrinkComponent(drink));
}

export function createDrinksListWithCountries(category) {
  if (!barDrinks[category]) return;

  const currentLanguage = getCurrentLanguageFromParams();

  return barDrinks[category]?.map((drinks) => {
    const data = drinks.data;

    const wrapper = document.createElement("div");

    const country = document.createElement("h1");
    country.classList.add("uppercase", "mb-2");
    country.innerText = drinks.country?.[currentLanguage];

    wrapper.appendChild(country);

    data.map((drink) => DrinkComponent(drink, wrapper));

    return wrapper;
  });
}

export function createDrinksListWithCategories(category, className) {
  if (!barDrinks[category]) return;

  const currentLanguage = getCurrentLanguageFromParams();

  return barDrinks[category]?.map((drinks) => {
    const data = drinks.data;

    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col", "gap-2");

    if (drinks.category.ru === "НАЦИОНАЛЬНЫЕ НАПИТКИ") {
      wrapper.classList.add("md:col-span-2", "md:justify-self-center");
    }

    if (className) {
      wrapper.classList.add(...className);
    }

    const categoryEl = document.createElement("h1");
    categoryEl.classList.add("uppercase", "mb-2", "font-black");
    categoryEl.innerText = drinks.category?.[currentLanguage];

    wrapper.appendChild(categoryEl);

    data.map((drink) => DrinkComponent(drink, wrapper));

    return wrapper;
  });
}

export function createCocktails(category) {
  if (!barDrinks[category]) return;

  const cocktails = barDrinks[category].data.map((cocktail) =>
    DrinkComponent(cocktail)
  );

  const glenlivet_cocktails = barDrinks[category].glenlivet_cocktails.map(
    (cocktail) => DrinkComponent(cocktail)
  );

  return {
    cocktails,
    glenlivet_cocktails,
  };
}

export function createWhiskey(category) {
  if (!barDrinks[category]) return;

  const currentLanguage = getCurrentLanguageFromParams();

  const whiskey = barDrinks[category][0];

  const data = whiskey.data;

  const wrapper = document.createElement("div");
  wrapper.classList.add("flex", "flex-col", "w-full");

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "grid",
    "md:grid-cols-2",
    "gap-x-12",
    "gap-y-4",
    "w-full"
  );

  const categoryDisplay = document.createElement("h1");
  categoryDisplay.classList.add(
    "uppercase",
    "mb-2",
    "font-black",
    "text-start",
    "w-full"
  );
  categoryDisplay.innerText = whiskey.category?.[currentLanguage];

  wrapper.appendChild(categoryDisplay);

  data.map((whiskey) => DrinkComponent(whiskey, drinksContainer));

  wrapper.appendChild(drinksContainer);

  const image = getBarCategoryImage(category);
  image.classList.add("max-w-[497px]", "mx-auto", "w-full");

  wrapper.appendChild(image);

  const rest = barDrinks[category].slice(1).map((whiskey) => {
    const data = whiskey.data;

    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col", "mb-10", "w-full");

    const drinksContainer = document.createElement("div");
    drinksContainer.classList.add("grid", "gap-x-12", "gap-y-2");

    const categoryDisplay = document.createElement("h1");
    categoryDisplay.classList.add("uppercase", "mb-2", "font-black");
    categoryDisplay.innerText = whiskey.category?.[currentLanguage];

    wrapper.appendChild(categoryDisplay);

    data.map((whiskey) => DrinkComponent(whiskey, drinksContainer));

    wrapper.appendChild(drinksContainer);

    return wrapper;
  });

  return [wrapper, ...rest];
}

export function createBarRule(category) {
  if (!barDrinks[category]) return;

  const currentLanguage = getCurrentLanguageFromParams();

  return barDrinks[category]?.map((drinks) => {
    const data = drinks.data;

    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col", "gap-5");

    const category = document.createElement("h1");
    category.classList.add("uppercase", "mb-2", "font-black");
    category.innerText = drinks.category?.[currentLanguage];

    wrapper.appendChild(category);

    data.map((drink) => RuleComponent(drink, wrapper));

    return wrapper;
  });
}

export function createPartyMix() {
  const currentLanguage = getCurrentLanguageFromParams();

  return PARTY_MIX.map((mix) => {
    const drinks = mix.drinks;

    const wrapper = document.createElement("div");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("w-full");

    if (mix.image) {
      const image = document.createElement("img");
      image.classList.add(
        "mx-auto",
        "aspect-[1/1]",
        "h-auto",
        "w-full",
        "object-contain"
      );
      image.src = mix.image;

      imageContainer.appendChild(image);

      wrapper.appendChild(imageContainer);
    }

    const titleSection = document.createElement("div");
    titleSection.classList.add("flex", "items-center", "justify-between");

    const title = document.createElement("h1");
    title.classList.add(
      "uppercase",
      "font-black",
      "text-[12px]",
      "md:text-[24px]"
    );
    title.innerText = mix.title?.ru;

    const price = document.createElement("p");
    price.classList.add("text-[12px]", "md:text-[24px]");
    price.innerText = mix.price + "с.";

    titleSection.appendChild(title);
    titleSection.appendChild(price);

    wrapper.appendChild(titleSection);

    drinks.forEach((drink) => {
      const drinkData = document.createElement("div");
      drinkData.classList.add("flex", "justify-between", "items-center");

      const drinkTitle = document.createElement("h1");
      drinkTitle.classList.add("text-[10px]", "md:text-[16px]");
      drinkTitle.innerText = drink.title?.[currentLanguage];

      const amount = document.createElement("p");
      amount.classList.add("text-[12px]", "md:text-[16px]", "font-light");
      amount.innerText = drink.amount + "л.";

      drinkData.appendChild(drinkTitle);
      drinkData.appendChild(amount);

      wrapper.appendChild(drinkData);
    });

    if (mix.description) {
      const description = document.createElement("p");
      description.classList.add("text-[8px]", "md:text-[10px]", "font-light");
      description.innerText = mix.description;

      wrapper.appendChild(description);
    }

    return wrapper;
  });
}

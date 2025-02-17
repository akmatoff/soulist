import { BAR_CATEGORIES_COLORS } from "./constants";
import { barCategories } from "./data/categories";
import {
  currentLanguage,
  getCurrentLanguageFromParams,
  loadLanguage,
} from "./i18n";
import {
  createBarRule,
  createCocktails,
  createDrinksList,
  createDrinksListWithCategories,
  createDrinksListWithCountries,
  createPartyMix,
  createWhiskey,
} from "./products/drinks-ui";
import "./style.css";
import { displayBarCategoriesById, getBarCategoryImage } from "./utils";

const barCategoriesSelector = document.querySelector("#barCategoriesSelector");
const barCategoriesSection = document.querySelector("#barCategoriesContent");
const burgerMenuButton = document.querySelector(".burger-menu");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalCategories");
const modalCloseButton = document.querySelector(".close-menu");
const modalOverlay = document.querySelector("#overlay");

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("bar")) {
    displayCategories();
    handleModal();
    loadLanguage(currentLanguage);

    scrollTopButton.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }
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

    barCategoriesSelector.appendChild(categoryElement);

    displayBarCategoriesById(category);
  });
}

export function displayDefaultBarCategory(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "px-6",
    "flex",
    "flex-col",
    "gap-[28px]",
    "py-10"
  );

  const drinksList = createDrinksList(category);

  if (drinksList) {
    drinksList.forEach((drink) => drinksContainer.appendChild(drink));
  }

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("flex", "flex-col", "items-center");

  const image = getBarCategoryImage(category);

  categorySection.appendChild(drinksContainer);

  if (image) {
    imageContainer.appendChild(image);

    categorySection.appendChild(imageContainer);
  }

  barCategoriesSection.appendChild(categorySection);
}

export function displayWhiskey(category) {
  const { categorySection } = displayCategorySectionHeaders(category);
  categorySection.classList.add("w-full", "py-0");

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add("px-4", "w-full", "pt-6", "grid");

  const lowerDrinksContainer = document.createElement("div");
  lowerDrinksContainer.classList.add(
    "grid",
    "md:grid-cols-2",
    "gap-x-12",
    "w-full",
    "px-6"
  );

  const [whiskey, ...rest] = createWhiskey(category);

  drinksContainer.appendChild(whiskey);

  if (rest) {
    rest.forEach((drink) => lowerDrinksContainer.appendChild(drink));
  }

  categorySection.appendChild(drinksContainer);

  categorySection.appendChild(lowerDrinksContainer);

  barCategoriesSection.appendChild(categorySection);
}

export function displayBarCard(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "px-6",
    "w-full",
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "gap-x-12",
    "gap-y-10",
    "pt-6",
    "relative",
    "z-10"
  );

  const drinksList = createDrinksListWithCategories(category);

  const image = getBarCategoryImage(category);
  image.classList.add(
    "absolute",
    "-right-20",
    "bottom-0",
    "-z-10",
    "opacity-30"
  );

  const vodkaImage = document.createElement("img");
  vodkaImage.src = "/bar/Водка.png";
  vodkaImage.classList.add(
    "absolute",
    "-z-10",
    "right-[5dvw]",
    "top-10",
    "md:left-10",
    "md:mx-auto",
    "md:ml-20"
  );

  drinksContainer.appendChild(vodkaImage);

  if (drinksList) {
    [...drinksList.slice(0, -1), image, ...drinksList.slice(11)].forEach(
      (drink) => drinksContainer.appendChild(drink)
    );
  }

  categorySection.appendChild(drinksContainer);

  barCategoriesSection.appendChild(categorySection);
}

export function displayNonAlcoholicDrinks(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "px-6",
    "w-full",
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "gap-x-14",
    "gap-y-20",
    "py-10"
  );

  const drinksList = createDrinksListWithCategories(category);

  if (drinksList) {
    drinksList.forEach((drink) => {
      drinksContainer.appendChild(drink);
    });
  }

  categorySection.appendChild(drinksContainer);

  barCategoriesSection.appendChild(categorySection);
}

export function displayCocktails(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "px-6",
    "w-full",
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "gap-x-10",
    "gap-y-4",
    "py-10"
  );

  const { cocktails, glenlivet_cocktails } = createCocktails(category);

  if (cocktails) {
    cocktails.forEach((cocktail) => drinksContainer.appendChild(cocktail));
  }

  const image = getBarCategoryImage(category);
  image.classList.add("m-auto");

  categorySection.appendChild(drinksContainer);

  if (image) {
    categorySection.appendChild(image);
  }

  const glenlivetCocktails = document.createElement("div");
  glenlivetCocktails.classList.add(
    "w-full",
    "md:w-[70%]",
    "px-4",
    "mt-6",
    "mx-auto"
  );
  glenlivet_cocktails.forEach((cocktail) =>
    glenlivetCocktails.appendChild(cocktail)
  );

  categorySection.appendChild(glenlivetCocktails);

  barCategoriesSection.appendChild(categorySection);
}

export function displayWinesWithCountries(category) {
  const { categorySection } = displayCategorySectionHeaders(category);
  categorySection.classList.add(
    "relative",
    "flex",
    "flex-col",
    "justify-center"
  );

  if (category === "pink_wines") {
    categorySection.classList.add("min-h-[400px]");
  }

  const image = getBarCategoryImage(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "px-6",
    "flex",
    "flex-col",
    "my-auto",
    "gap-[28px]",
    "py-10"
  );

  if (image) {
    drinksContainer.classList.add("md:w-[70%]");
  }

  const drinksList = createDrinksListWithCountries(category);

  if (drinksList) {
    drinksList.forEach((drink) => drinksContainer.appendChild(drink));
  }

  categorySection.appendChild(drinksContainer);

  if (image) {
    image.classList.add(
      "absolute",
      "right-0",
      "bottom-10",
      "opacity-30",
      "md:opacity-100",
      "max-w-[140px]",
      "md:max-w-full"
    );
    drinksContainer.appendChild(image);
  }

  barCategoriesSection.appendChild(categorySection);
}

export function displayWinesWithCategories(category) {
  const { categorySection } = displayCategorySectionHeaders(category);
  categorySection.classList.add("relative");

  const image = getBarCategoryImage(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "px-6",
    "flex",
    "flex-col",
    "gap-[28px]",
    "py-10"
  );

  if (image) {
    drinksContainer.classList.add("md:w-[70%]");
  }

  const drinksList = createDrinksListWithCategories(category);

  if (drinksList) {
    drinksList.forEach((drink) => drinksContainer.appendChild(drink));
  }

  if (image) {
    image.classList.add(
      "absolute",
      "right-0",
      "bottom-0",
      "opacity-30",
      "md:opacity-100",
      "max-w-[200px]",
      "md:max-w-full",
      "-z-10"
    );

    drinksContainer.appendChild(image);
  }
  categorySection.appendChild(drinksContainer);

  barCategoriesSection.appendChild(categorySection);
}

export function displaySoulistRules(category) {
  const currentLanguage = getCurrentLanguageFromParams();

  const { categorySection } = displayCategorySectionHeaders(category);

  const rulesContainer = document.createElement("div");
  rulesContainer.classList.add("px-4", "flex", "flex-col", "gap-20", "py-10");

  const rulesList = createBarRule(category);

  if (rulesList) {
    rulesList.forEach((rule) => rulesContainer.appendChild(rule));
  }

  const footerContent = {
    ru: `
    <div>Данное меню является рекламным материалом. С контрольным меню можно ознакомится с администратором. Цены указаны в сомах, НДС не облагается</div>
    <p>ОБСЛУЖИВАНИЕ 15%</p>
    <p class="font-normal">@SOULIST_BISHKEK</p>
    `,
    kg: `
       <div>Бул меню жарнамалык материал болуп саналат. Негизги меню үчүн администратор менен байланышыныз. Баалар сом менен көрсөтүлгөн, КНС алынбайт.</div>
    <p>тейлөө 15%</p>
    <p class="font-normal">@SOULIST_BISHKEK</p>
    `,
  };

  const footer = document.createElement("footer");
  footer.classList.add(
    "flex",
    "flex-col",
    "gap-10",
    "mt-12",
    "text-[14px]",
    "md:text-[18px]",
    "uppercase",
    "px-6"
  );
  footer.innerHTML = footerContent[currentLanguage];

  categorySection.appendChild(rulesContainer);

  categorySection.appendChild(footer);

  barCategoriesSection.appendChild(categorySection);
}

export function displayPartyMix(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const drinksContainer = document.createElement("div");
  drinksContainer.classList.add(
    "drinks-container",
    "grid",
    "grid-cols-2",
    "mt-10",
    "px-6",
    "gap-x-14",
    "gap-y-16"
  );

  const partyMix = createPartyMix();

  partyMix.forEach((mix) => drinksContainer.appendChild(mix));

  const adSection = document.createElement("div");
  adSection.classList.add(
    "mt-20",
    "pb-40",
    "w-full",
    "min-h-[900px]",
    "flex",
    "flex-col",
    "gap-4"
  );

  /* html */
  const adSectionHtml = `
    <div class="relative flex flex-col">
      <div class="absolute top-0 px-6 uppercase">
        <img src="/bar/brancott-estate.png" class="w-full h-auto max-w-[68px] md:max-w-[144px]">

        <h1 class="text-[16px]/[16px] md:text-[35px]/[35px] font-bold mt-8 md:mt-14">при покупке<br>
        <span class="font-normal">бутылки вина</span></h1>
        <h2 class="mt-2 text-[16px]/[16px] md:text-[35px]/[35px] font-bold text-[#ED3046]">скидка 40% на <br> сырное ассорти!</h2>
        <p class="text-[9px] md:text-[18px] mt-[20px] md:mt-[36px] font-medium normal-case">1 бутылка <span class="font-normal">вина Brancott Estate Sauvignon<br> Blanc или Brancott Estate Pinot Noir<br>
        + сырная тарелка</span></p>

        <div class="text-[8px] md:text-[16px] font-normal mt-5 md:mt-10 lowercase border-white border-l-[1.5px] pl-3">дорблю, камамбер, <br>
        чеддер, пармезан, <br>
        клубника, виноград, <br>
        орехи, мед</div>
      </div>

      <div class="relative -z-10">
        <img class="w-full h-auto" src="/bar/ad-section.png">
      </div>
    </div>
    <div class="relative flex flex-col">
      <div class="absolute top-0 px-6 uppercase self-end flex flex-col text-end">
        <img src="/bar/glenlivet-logo.png" class="w-full h-auto max-w-[68px] md:max-w-[144px] self-end">

        <h1 class="text-[16px]/[16px] md:text-[35px]/[35px] font-bold mt-8 md:mt-14">при покупке<br>
        2-х порций из <br>
        <span class="font-normal">коллекции<br>THE GLENLIVET</span></h1>
        <h2 class="mt-2 text-[16px]/[16px] md:text-[35px]/[35px] font-bold text-[#10A0A8]">скидка 30% на<br> фруктовое<br> ассорти</h2>
        <div class="text-[8px] md:text-[16px] font-medium mt-5 md:mt-10 lowercase border-white border-r-[1.5px] pr-3 text-end">
          2 порции виски на выбор: <br>
          <span class="font-normal">The Glenlivet 12 y.o / <br>
          The Glenlivet 15 y.o / <br>
          The Glenlivet Founder's Reserve <br>
          + фруктовое ассорти</span>
        </div>
      </div>

      <div class="relative -z-10 left-4 top-[120px]">
        <img class="w-full h-auto" src="/bar/ad-section-2.png">
      </div>
    </div>
  `;

  adSection.innerHTML = adSectionHtml;

  categorySection.appendChild(drinksContainer);
  categorySection.appendChild(adSection);

  barCategoriesSection.appendChild(categorySection);
}

export function displayCategorySectionHeaders(category) {
  if (!category) throw new Error("No category provided");

  const categorySection = document.createElement("div");
  categorySection.classList.add("category-section", "bg-none");
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

  return {
    categorySection,
  };
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

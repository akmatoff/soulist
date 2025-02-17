import { cuisineCategoriesContent, cuisineCategories } from "./data/categories";
import {
  currentLanguage,
  getCurrentLanguageFromParams,
  loadLanguage,
} from "./i18n";
import { CUISINE_CATEGORIES_COLORS } from "./constants";
import "./style.css";
import {
  createBreadOrGarnishList,
  createDessertsList,
  createProductsList,
  createSingleDessert,
  createSteaksList,
} from "./products/products-ui";
import { displayCategoriesById } from "./utils";
import { displayHosperGrill } from "./products/components";

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
  if (window.location.href.includes("cuisine")) {
    displayCuisineCategories();
    handleModal();

    loadLanguage(currentLanguage);

    scrollTopButton.addEventListener("click", () => {
      burgerMenuButton.scrollIntoView({ behavior: "smooth", block: "center" });
      window.scrollTo(0, 0);
    });
  }
});

function displayCuisineCategories() {
  // Category selector
  cuisineCategories.forEach((category) => {
    const categoryElement = createCategoryElement(category);

    cuisineCategoriesSelector.appendChild(categoryElement);
  });

  // Category section with products
  cuisineCategoriesContent.forEach((category) => {
    displayCategoriesById(category);
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

export function displayCategorySectionHeaders(category) {
  const categorySection = document.createElement("div");
  categorySection.classList.add("category-section");
  categorySection.setAttribute("id", category);

  const header = document.createElement("div");
  header.classList.add(
    "flex",
    "items-center",
    "gap-[12px]",
    "relative",
    "mb-8"
  );

  const line = document.createElement("div");
  line.classList.add("h-[1.5px]", "md:h-[2.8px]", "w-full", "flex-[1_1_0%]");
  line.style.backgroundColor = CUISINE_CATEGORIES_COLORS[category];

  const line2 = document.createElement("div");
  line2.classList.add("h-[1.5px]", "md:h-[2.8px]", "w-full", "flex-[4_1_20%]");
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

  header.appendChild(line);
  header.appendChild(title);
  header.appendChild(line2);
  header.appendChild(serviceFee);

  categorySection.appendChild(header);

  return {
    categorySection,
  };
}

export function displayDefaultCategory(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const categoryProducts = document.createElement("div");
  categoryProducts.classList.add("mt-4");

  const productsList = createProductsList(category);

  if (productsList) {
    productsList.forEach((product) => categoryProducts.appendChild(product));
  }

  categorySection.appendChild(categoryProducts);

  if (category === "hosper") {
    const grill = displayHosperGrill();

    categorySection.appendChild(grill);
  }

  cuisineCategoriesSection.appendChild(categorySection);
}

export function displaySteaksCategory(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const categoryProducts = document.createElement("div");
  categoryProducts.classList.add("grid", "grid-cols-2", "px-4");

  const steaksList = createSteaksList();

  steaksList.forEach((steak) => categoryProducts.appendChild(steak));

  categorySection.appendChild(categoryProducts);

  cuisineCategoriesSection.appendChild(categorySection);
}

export function displayBreadAndGarnishCategories(category) {
  const { categorySection } = displayCategorySectionHeaders(category);

  const categoryProducts = document.createElement("div");
  categoryProducts.classList.add(
    "flex",
    "flex-col",
    "items-between",
    "gap-5",
    "px-4"
  );

  const productsList = createBreadOrGarnishList(category);

  if (productsList) {
    productsList.forEach((product) => categoryProducts.appendChild(product));
  }

  categorySection.appendChild(categoryProducts);

  if (category === "bread") {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("flex", "justify-center");

    const breadImage = document.createElement("img");
    breadImage.src = "/cuisine/Хлеб.png";
    breadImage.classList.add("self-center");

    imageDiv.appendChild(breadImage);
    categorySection.appendChild(imageDiv);
  }

  cuisineCategoriesSection.appendChild(categorySection);
}

export function displayDessertsCategory(category) {
  const currentLanguage = getCurrentLanguageFromParams();

  const categoryColor = CUISINE_CATEGORIES_COLORS[category];

  const { categorySection } = displayCategorySectionHeaders(category);

  const categoryProducts = document.createElement("div");
  categoryProducts.classList.add(
    "grid",
    "grid-cols-3",
    "gap-4",
    "px-4",
    "mt-10"
  );

  const dessertsList = createDessertsList();

  dessertsList.forEach((dessert) => {
    categoryProducts.appendChild(dessert);
  });

  const fruitContainer = document.createElement("div");

  const fruitAssorty = createSingleDessert("Фруктовое ассорти");

  const textContainer = document.createElement("div");
  textContainer.classList.add(
    "flex",
    "gap-2",
    "justify-between",
    "md:justify-start",
    "md:gap-32",
    "mt-8",
    "px-4"
  );

  const desserts = {
    ru: {
      title: "Итальянское\nмороженое",
      data: [
        "Пломбир",
        "Шоколадный",
        "Маракуйя",
        "Киндер буэно",
        "Ферреро Рошэ",
        "Фисташковый",
      ],
      sorbet: ["Клубника", "Манго"],
    },
    kg: {
      title: "ИТАЛИЯ БАЛМУЗДагы",
      data: [
        "Пломбир",
        "Шоколад менен",
        "Маракуйя",
        "Киндер буэно",
        "Ферреро Рошэ",
        "Мисте менен",
      ],
      sorbet: ["Кулпунай", "Манго"],
    },
  };

  textContainer.innerHTML = `
    <div>
      <div class="inline-block">
        <div class="inline-flex gap-2 items-center">
          <div class="text-[10px] md:text-[14px]">150 г.</div>
          <div class="text-[12px] md:text-[18px]">350 с.</div>
        </div>
        <div class="h-[1px] w-full" style="background: ${categoryColor}"></div>
      </div>
      <h1 class="uppercase mt-2">${desserts[currentLanguage]?.title}</h1>
      <ul class="list-disc list-inside text-[11px] font-normal uppercase">
        <li>${desserts[currentLanguage]?.data[0]}</li>
        <li>${desserts[currentLanguage]?.data[1]}</li>
        <li>${desserts[currentLanguage]?.data[2]}</li>
        <li>${desserts[currentLanguage]?.data[3]}</li>
        <li>${desserts[currentLanguage]?.data[4]}</li>
        <li>${desserts[currentLanguage]?.data[5]}</li>
      </ul>
    </div>

    <div>
      <div class="flex flex-col grow-0">
        <div class="inline-flex gap-2 items-center">
          <div class="text-[10px] md:text-[14px]">150 г.</div>
          <div class="text-[12px] md:text-[18px]">350 с.</div>
        </div>
        <div class="h-[1px]" style="background: ${categoryColor}"></div>
      </div>
      <h1 class="uppercase mt-2">Сорбет</h1>
      <ul class="list-disc list-inside text-[11px] font-normal uppercase">
        <li>${desserts[currentLanguage]?.sorbet[0]}</li>
        <li>${desserts[currentLanguage]?.sorbet[1]}</li>
      </ul>
    </div>
  `;

  fruitContainer.appendChild(fruitAssorty);

  categorySection.appendChild(categoryProducts);

  categorySection.appendChild(fruitContainer);

  categorySection.appendChild(textContainer);

  cuisineCategoriesSection.appendChild(categorySection);
}

export function displayMichelleDessertsCategory() {
  const currentLanguage = getCurrentLanguageFromParams();

  const categoryColor = CUISINE_CATEGORIES_COLORS["michelle_desserts"];

  const { categorySection } =
    displayCategorySectionHeaders("michelle_desserts");

  const michelle = {
    ru: `
    <div class="flex items-center mt-4">
      <div class="px-4">
        <h1>ДЕСЕРТЫ ОТ MICHELLE ГОТОВЯТСЯ:</h1>

        <ul class="list-disc list-inside text-[8px] md:text-[18px] font-normal mt-[30px]">
          <li>ИЗ НАТУРАЛЬНЫХ ИНГРЕДИЕНТОВ</li>
          <li>БЕЗ МАРГАРИНА</li>
          <li>БЕЗ РАСТИТЕЛЬНЫХ ТРАНСЖИРОВ</li>
          <li>БЕЗ ПАЛЬМОВОГО МАСЛА</li>
          <li>БЕЗ КРАСИТЕЛЕЙ</li>
          <li>ИСПОЛЬЗУЮТ В ПРИГОТОВЛЕНИИ ТОЛЬКО 33% СЛИВКИ</li>
          <li>БЕЛЬГИЙСКИЙ ШОКОЛАД</li>
          <li>ГОЛЛАНДСКИЙ ТВОРОЖНЫЙ СЫР</li>
        </ul>
      </div>

      <div>
        <img src="/cuisine/Десерты Michelle.png" class="shrink-1">
      </div>
    </div>
    <div class="flex flex-col gap-10">
        <h1 class="text-center">ТАКЖЕ ВЫ МОЖЕТЕ ЗАКАЗАТЬ НАШИ ФИРМЕННЫЕ ТОРТЫ!</h1>

      <div class="flex items-center justify-between">

        <div class="flex-1 px-4">
          <h1>НАЧИНКА НА ВЫБОР:</h1>

          <h1 class="mt-10 text-[8px] md:text-[18px] font-normal">С ОБМАЗКОЙ И ОФОРМЛЕНИЕМ</h1>

          <ul class="list-disc list-inside text-[8px] md:text-[18px] font-normal mt-2">
            <li>СНИКЕРС</li>
            <li>БАРХАТ</li>
            <li>МЕДОВЫЙ</li>
            <li>КЛУБНИЧНЫЙ</li>
            <li>МОРКОВНЫЙ</li>
          </ul>

           <h1 class="mt-10 text-[8px] md:text-[18px] font-normal">БЕЗ ОБМАЗКИ, С ДЕКОРАЦИЕЙ</h1>

          <ul class="list-disc list-inside text-[8px] md:text-[18px] font-normal mt-2">
            <li>НАПОЛЕОН</li>
            <li>БЛИННЫЙ</li>
          </ul>

          <h1 class="mt-5">ЦЕНА: 1КГ - 2000 СОМ</h1>

        </div>

        <div class="relative flex-shrink flex-1">
          <img src="/cuisine/Ellipse 6.png" class="shrink-1 w-full h-auto">
          <img src="/cuisine/Ellipse 7.png" class="absolute top-2 right-6 w-full h-auto">
        </div>
      </div>

          <p class="uppercase text-center text-[12px] md:text-[20px] font-light">Только лучшее для Вас!<br>Отдел Заботы кондитерского цеха Michelle</p>

    </div>`,
    kg: `
        <div class="flex items-center uppercase mt-4">
      <div class="px-4">
        <h1>MICHELLE десерттери төмөнкү ингредиенттерден жасалат:</h1>

        <ul class="list-disc list-inside text-[8px] md:text-[18px] font-normal mt-[30px]">
          <li>табигый ингредиенттерден</li>
          <li>маргарин жок</li>
          <li>өсүмдүк транс майлары жок</li>
          <li>пальма майы жок</li>
          <li>боектор жок</li>
          <li>33% гана каймак менен</li>
          <li>бельгиялык шоколад менен</li>
          <li>голландиялык быштак сыры менен</li>
        </ul>
      </div>

      <div>
        <img src="/cuisine/Десерты Michelle.png" class="shrink-1">
      </div>
    </div>
    <div class="flex flex-col gap-10">
        <h1 class="text-center">Ошондой эле, биз фирмалык тортторго заказ кабыл алабыз!</h1>

      <div class="flex items-center justify-between">

        <div class="flex-1 px-4">
          <h1>СИЗ ТАНДАГАН ТОЛТУРУУ:</h1>

          <h1 class="mt-10 text-[8px] md:text-[18px] font-normal">ШЫБОО ЖАНА ЖАСАЛАЛГАЛОО МЕНЕН</h1>

          <ul class="list-disc list-inside text-[8px] md:text-[18px] font-normal mt-2">
            <li>СНИКЕРС</li>
            <li>БАРХАТ</li>
            <li>БАЛ МЕНЕН</li>
            <li>КУЛПУНАЙ МЕНЕН</li>
            <li>САБИЗ МЕНЕН</li>
          </ul>

           <h1 class="mt-10 text-[8px] md:text-[18px] font-normal">ШЫБАК ЖОК, ДЕКОРАЦИЯ МЕНЕН</h1>

          <ul class="list-disc list-inside text-[8px] md:text-[18px] font-normal mt-2">
            <li>НАПОЛЕОН</li>
            <li>КУЙМАК ТОРТ</li>
          </ul>

          <h1 class="mt-5">БААСЫ: 1КГ - 2000 СОМ</h1>

        </div>

        <div class="relative flex-shrink flex-1">
          <img src="/cuisine/Ellipse 6.png" class="shrink-1">
          <img src="/cuisine/Ellipse 7.png" class="absolute top-2 right-6">
        </div>
      </div>

          <p class="uppercase text-center text-[12px] md:text-[20px] font-light">сиз үчүн эң жакшысы!<br>Кондитердик цехтин камкордук бөлүмү.</p>

    </div>`,
  };

  const section = document.createElement("div");
  section.classList.add("flex", "flex-col", "gap-8");
  section.innerHTML = michelle[currentLanguage];

  categorySection.appendChild(section);

  cuisineCategoriesSection.appendChild(categorySection);
}

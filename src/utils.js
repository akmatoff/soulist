import {
  displayBreadAndGarnishCategories,
  displayDefaultCategory,
  displayDessertsCategory,
  displayMichelleDessertsCategory,
  displaySteaksCategory,
} from "./cuisine";

import {
  displayBarCard,
  displayCocktails,
  displayDefaultBarCategory,
  displayNonAlcoholicDrinks,
  displaySoulistRules,
  displayWhiskey,
  displayWinesWithCategories,
  displayWinesWithCountries,
  displayPartyMix,
} from "./bar";

export function displayCategoriesById(category) {
  switch (category) {
    case "steaks":
      displaySteaksCategory(category);
      break;
    case "bread":
      displayBreadAndGarnishCategories(category);
      break;
    case "garnish":
      displayBreadAndGarnishCategories(category);
      break;
    case "desserts":
      displayDessertsCategory(category);
      break;
    case "michelle_desserts":
      displayMichelleDessertsCategory();
      break;
    default:
      displayDefaultCategory(category);
  }
}

export function displayBarCategoriesById(category) {
  switch (category) {
    case "party_mix":
      displayPartyMix(category);
      break;
    case "white_wines":
      displayWinesWithCountries(category);
      break;
    case "red_wines":
      displayWinesWithCountries(category);
      break;
    case "pink_wines":
      displayWinesWithCountries(category);
      break;
    case "glass_wines":
      displayWinesWithCategories(category);
      break;
    case "cocktails":
      displayCocktails(category);
      break;
    case "whiskey":
      displayWhiskey(category);
      break;
    case "bar_card":
      displayBarCard(category);
      break;
    case "non_alcoholic_drinks":
      displayNonAlcoholicDrinks(category);
      break;
    case "soulist_rules":
      displaySoulistRules(category);
      break;
    default:
      displayDefaultBarCategory(category);
  }
}

export function getBarCategoryImage(category) {
  const image = document.createElement("img");

  switch (category) {
    case "champagne":
      image.src = "/bar/Шампанское.png";

      return image;
    case "sparkling_wines":
      image.src = "/bar/Игристые вина.png";

      return image;
    case "red_wines":
      image.src = "/bar/Красные вина.png";

      return image;
    case "pink_wines":
      image.classList.add("mr-10", "top-20");
      image.src = "/bar/Розовые вина.png";

      return image;
    case "white_wines":
      image.src = "/bar/Белые вина.png";

      return image;
    case "cocktails":
      image.src = "/bar/Glenlivet Cocktails.png";

      return image;
    case "whiskey":
      image.src = "/bar/Виски.png";

      return image;

    case "bar_card":
      image.src = "/bar/Разливное пиво.png";

      return image;

    case "glass_wines":
      image.classList.add("mr-10");
      image.src = "/bar/Вина по бокалам.png";

      return image;
    default:
      return null;
  }
}

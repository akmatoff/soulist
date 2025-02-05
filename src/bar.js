import { barCategories } from "./data/categories"
import { currentLanguage, loadLanguage } from "./i18n"

const barCategoriesDiv = document.querySelector('#barCategories')

export function displayCousineCategories() {
  barCategories.forEach((category) => {

    const categoryElement = document.createElement('div')
    categoryElement.setAttribute('data-i18n', `bar_categories.${category}`)
    categoryElement.classList.add('category')

    barCategoriesDiv.appendChild(categoryElement);
  })
}

document.addEventListener('DOMContentLoaded', () => {
    displayCousineCategories()
    loadLanguage(currentLanguage)
})
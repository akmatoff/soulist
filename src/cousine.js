import { cousineCategories } from "./data/categories"
import { currentLanguage, loadLanguage } from "./i18n"

const cousineCategoriesDiv = document.querySelector('#cousineCategories')

export function displayCousineCategories() {
  cousineCategories.forEach((category) => {

    const categoryElement = document.createElement('div')
    categoryElement.setAttribute('data-i18n', `cousine_categories.${category}`)
    categoryElement.classList.add('category')

    cousineCategoriesDiv.appendChild(categoryElement);
  })
}

document.addEventListener('DOMContentLoaded', () => {
    displayCousineCategories()
    loadLanguage(currentLanguage)
})
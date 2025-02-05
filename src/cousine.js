import { cousineCategories } from "./data/categories"
import { currentLanguage, loadLanguage } from "./i18n"

// Selectors
const cousineCategoriesSelector = document.querySelector('#cousineCategoriesSelector')
const cousineCategoriesSection = document.querySelector('#cousineCategoriesContent')

// Listeners
document.addEventListener('DOMContentLoaded', () => {
  displayCousineCategoriesSelector()
  loadLanguage(currentLanguage)
})

// Functions
function displayCousineCategoriesSelector() {
  cousineCategories.forEach((category) => {

    const categoryElement = document.createElement('a')
    categoryElement.setAttribute('href', `#${category}`)
    categoryElement.setAttribute('data-i18n', `cousine_categories.${category}`)
    categoryElement.classList.add('category')

    cousineCategoriesSelector.appendChild(categoryElement);

    const categorySection = document.createElement('div')
    categorySection.classList.add('category-section')
    categorySection.setAttribute('id', category)

    const title = document.createElement('h1')
    title.setAttribute('data-i18n', `cousine_categories.${category}`)
    title.classList.add('uppercase', 'text-[18px]', 'md:text-[35px]')

    categorySection.appendChild(title)

    cousineCategoriesSection.appendChild(categorySection);
  })
}



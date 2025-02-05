import { barCategories } from "./data/categories"
import { currentLanguage, loadLanguage } from "./i18n"

const barCategoriesSelector = document.querySelector('#barCategoriesSelector')
const barCategoriesSection = document.querySelector('#barCategoriesContent')

export function displayCousineCategories() {
  barCategories.forEach((category) => {

    const categoryElement = document.createElement('a')
    categoryElement.setAttribute('href', `#${category}`)
    categoryElement.setAttribute('data-i18n', `bar_categories.${category}`)
    categoryElement.classList.add('category')

    barCategoriesSelector.appendChild(categoryElement);


    const categorySection = document.createElement('div')
    categorySection.classList.add('category-section')
    categorySection.setAttribute('id', category)

    const title = document.createElement('h1')
    title.setAttribute('data-i18n', `bar_categories.${category}`)
    title.classList.add('uppercase', 'text-[18px]', 'md:text-[35px]')

    categorySection.appendChild(title)



    barCategoriesSection.appendChild(categorySection)

  })
}

document.addEventListener('DOMContentLoaded', () => {
    displayCousineCategories()
    loadLanguage(currentLanguage)
})
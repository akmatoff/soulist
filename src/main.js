import { loadLanguage, currentLanguage, switchLanguage } from './i18n';
import './style.css'

const cousineMenuButton = document.querySelector('.cousine')
const barMenuButton = document.querySelector('.bar')

const languageSelectors = document.querySelectorAll('.language-select')

cousineMenuButton.addEventListener('click', () => {
  window.location.href = '/cousine.html'
})

barMenuButton.addEventListener('click', () => {
  window.location.href = '/bar.html'
})

document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(currentLanguage)
  updateLanguageSelectors()
})

languageSelectors.forEach((selector) => {

  const language = selector.getAttribute("data-lang")

  selector.addEventListener('click', () => {
    switchLanguage(language)
    loadLanguage(language)

    updateLanguageSelectors()
    
  })
})

export function updateLanguageSelectors() {
  languageSelectors.forEach((selector) => {
  const language = selector.getAttribute("data-lang")
    
    
    if (currentLanguage === language) {
      selector.classList.add('border-[0.5px]')
    } else {
      selector.classList.remove('border-[0.5px]');
    }
  })
}


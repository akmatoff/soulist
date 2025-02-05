import { loadLanguage } from './i18n';
import './style.css'

const cousineMenuButton = document.querySelector('.cousine')
const barMenuButton = document.querySelector('.bar')

cousineMenuButton.addEventListener('click', () => {
  window.location.href = '/cousine.html'
})

barMenuButton.addEventListener('click', () => {
  window.location.href = '/bar.html'
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')
  loadLanguage('ru')
})


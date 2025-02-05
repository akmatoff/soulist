import ru from './locales/ru.json';

const LANGUAGE = {
    ru,
}

const currentLanguage = localStorage.getItem("language") || "ru";

function getNestedTranslation(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

export async function loadLanguage(language) {
    try {
        const data = LANGUAGE[language];

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            const translation = getNestedTranslation(data, key);

            if (translation) {
                element.textContent = translation;
            }
        })
    } catch (e) {
        console.log(e);
        console.error('Ошибка при загрузке языка')
    }
}
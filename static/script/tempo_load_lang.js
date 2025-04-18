let storedLang = localStorage.getItem('preferredLang');
let currentLanguage = storedLang || 'en';


async function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLang', lang);

    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();
    updateText(translations);
}

function updateText(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
       const keyPath = element.getAttribute('data-translate');
       const translation = getNestedValue(translations, keyPath);
       if (translation) {
         element.textContent = translation;
       }
    });
}

function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}


setLanguage(currentLanguage).then(() => {
    updateFlagIcon(currentLanguage);
});
let currentLanguage = 'fr';

async function setLanguage(lang) {
    currentLanguage = lang;
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

// use a keyPath string like "nav.contact" and create an array ["nav", "contact"] then iterate on the array with
// reduce to find the needed value. obj then obj["nav"] then obj["nav"]["contact"] and return the value found.
function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

setLanguage(currentLanguage);

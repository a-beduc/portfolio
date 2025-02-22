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

// use a keyPath string like "nav.contact" and create an array ["nav", "contact"] then iterate on the array with
// reduce to find the needed value. obj then obj["nav"] then obj["nav"]["contact"] and return the value found.
function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

setLanguage(currentLanguage).then(() => {
    updateFlagIcon(currentLanguage);
});

const flagMap = {
    fr: { src: "images/fr.svg", alt: "French flag", formPlaceholder: "Écrivez votre message ici." },
    es: { src: "images/es.svg", alt: "Spanish flag", formPlaceholder: "xxx" },
    en: { src: "images/gb.svg", alt: "English flag", formPlaceholder: "Type your message here." }
}

function updateFlagIcon(lang) {
    const details = document.querySelector('.language-picker');
    const summaryImg = details.querySelector('summary img');
    const formPlaceholder = document.getElementById('formMessage');
    if (flagMap[lang]) {
        summaryImg.src = flagMap[lang].src;
        summaryImg.alt = flagMap[lang].alt;
        formPlaceholder.placeholder = flagMap[lang].formPlaceholder;
    } else {
        summaryImg.src = flagMap["en"].src;
        summaryImg.alt = flagMap["en"].alt;
        formPlaceholder.placeholder = flagMap["en"].formPlaceholder;
    }
}

document.querySelectorAll('.language-picker .flag-options li').forEach(li => {
    li.addEventListener('click', function() {
        const selectedLang = this.dataset.lang;
        const details = this.closest('details');
        details.open = false;

        setLanguage(selectedLang);
        updateFlagIcon(selectedLang)
    });
});

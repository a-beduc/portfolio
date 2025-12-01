let currentLanguage = localStorage.getItem('preferredLang') || 'en';
let flashedMessage = null;

async function initLanguage() {
    flashedMessage = document.getElementById('msgBox');

    document.querySelectorAll('.language-picker__item').forEach(li => {
        li.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            const details = this.closest('details');
            details.open = false;

            setLanguage(selectedLang);
            updateFlagIcon(selectedLang)
        });
    });

    await setLanguage(currentLanguage);
    updateFlagIcon(currentLanguage);
}

async function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLang', lang);

    if (flashedMessage) {
        flashedMessage.innerText = "";
    }

    const response = await fetch(`${basePath}lang/${lang}.json`);
    const translations = await response.json();
    updateText(translations);
}

function updateText(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
       const keyPath = element.getAttribute('data-translate');
       const translation = getNestedValue(translations, keyPath);
       if (translation !== undefined && translation !== null) {
         element.textContent = translation;
       }
    });

    document.querySelectorAll('[data-translate-skill]').forEach(ul => {
        const keyPath = ul.getAttribute('data-translate-skill');
        const items = getNestedValue(translations, keyPath);

        ul.innerHTML = "";

        if (!Array.isArray(items)) {
            console.warn("Expected array, but got:", items)
            return
        }

        items.forEach(text => {
            const li = document.createElement('li');
            li.className = 'text-container__abilities__item';
            li.textContent = text;
            ul.appendChild(li);
        });
    });

    document.querySelectorAll('[data-translate-card-img]').forEach(img => {
        const keyPath = img.getAttribute("data-translate-card-img");
        const altText = getNestedValue(translations, keyPath);
        if (altText) {
            img.alt = altText
        }
    });
}

// use a keyPath string like "nav.contact" and create an array ["nav", "contact"] then iterate on the array with
// reduce to find the needed value. obj then obj["nav"] then obj["nav"]["contact"] and return the value found.
function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

function updateFlagIcon(lang) {
    const summaryImg = document.getElementById('selected-flag');
    const formPlaceholder = document.getElementById('message');
    if (!summaryImg) return;

    const flagMap = {
        fr: {
            src: `${basePath}static/images/fr.svg`,
            alt: "French flag",
            formPlaceholder: "Écrivez votre message ici." },
        en: {
            src: `${basePath}static/images/gb.svg`,
            alt: "English flag",
            formPlaceholder: "Type your message here." }
    }

    const cfg = flagMap[lang] || flagMap.en

    summaryImg.src = cfg.src;
    summaryImg.alt = cfg.alt;
    if (formPlaceholder) {
        formPlaceholder.placeholder = flagMap[lang].formPlaceholder;
    }
}

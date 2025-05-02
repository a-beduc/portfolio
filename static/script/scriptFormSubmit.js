const endpoint = "https://script.google.com/macros/s/AKfycbxhAM2jIlNpYfDgWc90Cae5T-6QTs1s_8qqvSrq0ckMQoXCOF2BoJJ5hfzNsGWwiV_GaA/exec"

let lang = localStorage.getItem("preferredLang") || 'en';
const flashText = {
    en: {
        ok: 'message sent!',
        ko: 'An error occurred!',
        invalid: 'is invalid',
        tooLong: 'is too long, character limit'
    },
    fr: {
        ok: 'message envoyé!',
        ko: "Erreur!",
        invalid: 'est invalide',
        tooLong: 'est trop long, limite de caractère'
    }
};

const form = document.getElementById('contactForm');
const msgBox = document.getElementById('msgBox');
const submitButton = document.getElementById('submitButton');

const fields = {
    first_name : document.getElementById('first_name'),
    last_name : document.getElementById('last_name'),
    email : document.getElementById('email'),
    company : document.getElementById('company'),
    message : document.getElementById('message'),
};

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    lang = localStorage.getItem("preferredLang") || 'en';
    e.preventDefault();
    msgBox.textContent = "";

    const errors = validate();
    if (errors.length) {
        return flash(errors.join(", "))
    }

    const fData = new FormData(form);
    for (const [k, v] of fData) {
        fData.set(k, v.trim());
    }

    try {
        toggle(false);
        const request = await fetch(endpoint, {method: 'POST', body: fData});
        if (!request.ok) {
            throw new Error(`HTTP ${request.status}`);
        }
        form.reset();
        flash(flashText[lang].ok);
    } catch (err) {
        flash(flashText[lang].ko);
    } finally {
        toggle(true);
    }
}

function validate() {
    const valErrors = [];
    valErrors.push(...verifyInput('first_name'));
    valErrors.push(...verifyInput('last_name'));
    valErrors.push(...verifyInput('email'));
    valErrors.push(...verifyInput('company'));
    valErrors.push(...verifyInput('message', 20000));
    return valErrors;
}

function verifyInput(inputKey, maxLength= 1000) {
    const errorList = [];
    const input = fields[inputKey];
    const label = document.getElementById(inputKey + "_label").textContent;
    const value = input.value.trim();

    if (!value && inputKey !== 'company') {
        errorList.push(`${label} ${flashText[lang].invalid}`);
    }
    if (value && value.length > maxLength) {
        errorList.push(`${label} ${flashText[lang].tooLong}: ${maxLength}`);
    }
    return errorList;
}

function flash(text) {
    msgBox.textContent = text;
}

function toggle(enabled) {
    submitButton.disabled = !enabled;
}

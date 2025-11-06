function revealLetters(elem, delay=40, dur=260) {
    if (!elem || elem.dataset.reavealed === "1") return;
    const text = (elem.textContent || '').trim();
    if (!text) return;

    elem.dataset.revealed = '1';
    elem.classList.add('reveal-letters');
    elem.textContent = '';

    console.log(text)
    console.log(elem)

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'reveal-char';
        span.textContent = text[i];
        span.style.animationDelay = (i * delay) + 'ms';
        elem.appendChild(span);
    }
}



// 'i18n:applied' is a custom event sent after LanguageSwitch is pressed
document.addEventListener('i18n:applied', () => {
    const elem = document.querySelector('[data-translate="index.banner.greeting"]');
    revealLetters(elem);
}, { once: true });
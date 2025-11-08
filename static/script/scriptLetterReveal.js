function revealLetters(elem, speed=50, startDelay=750, commaPause=350) {
    if (!elem || elem.dataset.revealed === "1") return;
    const text = (elem.textContent || '').trim();
    if (!text) return;

    elem.dataset.revealed = '1';
    elem.classList.add('reveal-letters');
    elem.textContent = '';

    setTimeout(() => {
        let delay = 0;
        for (let i = 0; i < text.length; i++) {
            const character = text[i]
            const span = document.createElement('span');
            span.className = 'reveal-char';
            span.textContent = character;
            span.style.animationDelay = `${delay}ms`;
            elem.appendChild(span);
            delay += speed;
            if (character === ',') delay += commaPause;
        }
    }, startDelay);
}


// 'i18n:applied' is a custom event sent after LanguageSwitch is pressed
document.addEventListener('i18n:applied', () => {
    const elem = document.querySelector('[data-translate="index.banner.greeting"]');
    revealLetters(elem);
}, { once: true });

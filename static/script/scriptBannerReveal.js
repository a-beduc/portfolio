// wait function that create a Promise to wait for ms (milli seconds)
// source: https://stackoverflow.com/questions/64387549/
function wait(ms) {
   return new Promise(resolve => {
      setTimeout(resolve, ms);
   });
}

// extract text in banner
function extractText(elem, css) {
    let dict = {};
    dict.text = (elem.textContent || '').trim();
    elem.classList.add(css);
    elem.textContent = '';
    dict.elem = elem;
    return dict
}

// reveal 'Hello, my name is' string
async function revealGreeting(obj, speed=50, startDelay=750, commaPause=350) {
    if (!obj.elem || obj.elem.dataset.revealed === "1") return;
    if (!obj.text) return;

    obj.elem.dataset.revealed = '1';

    await wait(startDelay);

    for (let i = 0; i < obj.text.length; i++) {
        const character = obj.text[i]
        const span = document.createElement('span');
        span.className = 'banner-reveal-char';
        span.textContent = character;
        obj.elem.appendChild(span);

        await wait(speed);
        if (character === ',') {
            await wait(commaPause);
        }
    }
}

// Reveal name
async function revealWord(obj, speed=600) {
    if (!obj.elem || obj.elem.dataset.revealed === "1") return;
    if (!obj.text) return;

    obj.elem.dataset.revealed = '1';

    const wordWrap = document.createElement('span');
    wordWrap.className = 'name-word';

    const word = obj.text;
    const step = speed / Math.max(1, word.length);

    let lastSpan = null;
    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.className = 'banner-reveal-char';
        span.textContent = word[i];
        span.style.animationDelay = `${i * step}ms`;
        wordWrap.appendChild(span);
        if (i === word.length - 1) lastSpan = span;
    }

    obj.elem.appendChild(wordWrap);
}


async function revealInfo (obj, speed=600) {
    if (!obj.elem || obj.elem.dataset.revealed === "1") return;
    if (!obj.text) return;

    obj.elem.dataset.revealed = '1';

    const span = document.createElement('span');
    span.className = 'banner-reveal-char';
    span.textContent = obj.text;
    span.style.animationDelay = `${speed}ms`;
    span.style.animationDuration = `${speed}ms`;
    obj.elem.appendChild(span);
}

async function revealArrow(arrow) {
    if (!arrow) return;
    arrow.classList.add('arrow-intro');

    await new Promise(resolve => {
        arrow.addEventListener('animationend', resolve, { once: true });
    });

    arrow.style.opacity = '1';
    arrow.classList.remove('arrow-intro');
    void arrow.offsetWidth;
    arrow.classList.add('arrow-bounce');
}

// 'i18n:applied' is a custom event sent after LanguageSwitch is pressed
document.addEventListener('i18n:applied', async () => {
    const greeting = document.querySelector('[data-translate="index.banner.greeting"]');
    const firstName = document.querySelector('[data-translate="index.banner.firstName"]');
    const lastName = document.querySelector('[data-translate="index.banner.lastName"]');
    const information = document.querySelector('[data-translate="index.banner.information"]');
    const arrow = document.querySelector('.banner__arrow')

    arrow.style.opacity = '0'

    const gre = extractText(greeting, 'banner-reveal-letters');
    const fst = extractText(firstName, 'name-reveal-letters');
    const lst = extractText(lastName, 'name-reveal-letters');
    const inf = extractText(information, 'banner-reveal-letters');

    await revealGreeting(gre);
    await wait(300);
    await Promise.all([revealWord(fst, 600),  revealWord(lst, 600)]);
    await wait(300);
    await revealInfo(inf)
    await wait(1500);
    await revealArrow(arrow)

}, { once: true });

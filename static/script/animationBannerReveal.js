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

function guardRails(htmlObj) {
    if (!htmlObj.elem
        || htmlObj.elem.dataset.revealed === "1"
        || !htmlObj.text) return false;
    htmlObj.elem.dataset.revealed = '1';
    return true;
}

function revealElements(htmlObj, arrayOfElements, step,
                        offset=0,
                        cls='banner-reveal-char') {
    for (let i = 0; i < arrayOfElements.length; i++) {
        const span = document.createElement('span');
        span.className = cls;
        span.textContent = arrayOfElements[i];
        span.style.animationDelay = `${offset + i * step}ms`
        htmlObj.appendChild(span);
    }
    return offset + arrayOfElements.length * step
}

// reveal 'Hello, my name is' string
function revealGreeting(obj, stepSpeed=50, startDelay=750, commaPause=350) {
    if (!guardRails(obj)) return;

    const s = obj.text.trim();
    const i = s.indexOf(',');
    const left = Array.from(s.slice(0, i + 1));
    const right = Array.from(s.slice(i + 1));

    const leftAnimationEndDelay = revealElements(obj.elem, left, stepSpeed,
        startDelay)
    return revealElements(obj.elem, right, stepSpeed,
        leftAnimationEndDelay + commaPause)
}

// Reveal name
function revealWords(obj, wordSpeed=600, offset=0, cls='banner-reveal-char') {
    if (!guardRails(obj)) return;

    const words = obj.text.trim().split(' ');
    let outputDelay = 0

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const char = Array.from(word);

        const wrap = document.createElement('span');
        wrap.className = 'name-word';

        obj.elem.appendChild(wrap);

        const stepSpeed = wordSpeed / Math.max(1, char.length);

        outputDelay = revealElements(wrap, char, stepSpeed, offset, cls);

        if (i < words.length - 1) {
            obj.elem.appendChild(document.createTextNode(' '));
        }
    }
    return outputDelay
}

// Reveal block text
function revealBlock (obj, speed=50) {
    if (!guardRails(obj)) return;
    return revealElements(obj.elem, [obj.text], speed, 0, 'banner-reveal-char long');
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

async function BannerAnimation() {
    const greeting = document.querySelector('[data-translate="index.banner.greeting"]');
    const name = document.querySelector('[data-translate="index.banner.name"]');
    const information = document.querySelector('[data-translate="index.banner.information"]');
    const arrow = document.querySelector('.banner__arrow')

    arrow.style.opacity = '0'


    const gre = extractText(greeting, 'banner-reveal-letters');
    const nam = extractText(name, 'banner-reveal-letters');
    const inf = extractText(information, 'banner-reveal-letters');

    const greetAnimationEndDelay = revealGreeting(gre);
    await wait(500 + greetAnimationEndDelay);

    const nameAnimationEndDelay= revealWords(nam);
    await wait(300 + nameAnimationEndDelay);

    const infoAnimationEndDelay = revealBlock(inf)
    await wait(1000 + infoAnimationEndDelay);

    const navbar = document.querySelector('.nav-bar');
    navbar.classList.remove('nav-bar__hidden');
    await revealArrow(arrow)
}

// BANNER ANIMATION
// 'i18n:applied' is a custom event sent after LanguageSwitch is pressed
document.addEventListener('i18n:applied', async () => {
    await BannerAnimation()
}, { once: true });

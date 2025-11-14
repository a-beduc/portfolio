// reveal `<li> class="text-container__abilities__item"`
function revealTags(tagElements, step = 150, baseDelay = 0, cls = 'card-reveal-block') {
    let currentDelay = baseDelay;

    tagElements.forEach((li) => {
        if (li.dataset.revealed === "1") return;
        li.dataset.revealed = "1";

        li.classList.remove("card-elem-hide");
        li.classList.add(cls);
        li.style.animationDelay = `${currentDelay}ms`;

        currentDelay += step
    });
}

// reveal `<li> class="text-container__body"`
function revealBody(bodyElement, animationDuration = 1500, cls = 'card-reveal-block') {
    if (bodyElement.dataset.revealed === "1") return;
    bodyElement.dataset.revealed = "1";

    bodyElement.classList.remove("card-elem-hide")
    bodyElement.classList.add(cls);
    bodyElement.style.animationName = "card-block-reveal-long";
    bodyElement.style.animationDuration = `${animationDuration}ms`;
}

// Hide text then
// Add Observer to each .project-card
// When user see 50% of the card, text animation trigger (once per load)
function cardAnimationObserver() {
    const cards = document.querySelectorAll(".project-card");
    for (const card of cards) {
        const title = card.querySelector(".text-container__title");
        const abilities = card.querySelectorAll('.text-container__abilities__item');
        const body = card.querySelector('.text-container__body');

        title.classList.add('card-elem-hide');
        abilities.forEach(ability => ability.classList.add('card-elem-hide'));
        body.classList.add('card-elem-hide');
    }

    const cardObserver = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                console.log('triggered:', entry.target.id);
                await animateCard(entry.target);
                cardObserver.unobserve(entry.target);
            }
        }
    }, {
        threshold: 0.5
    });

    cards.forEach(card => cardObserver.observe(card));
}

// Card text animation
// "revealWords", "extractText", "wait" are implemented in .scriptBannerReveal
async function animateCard(cardObj) {
    const title = cardObj.querySelector(".text-container__title");
    const tags = cardObj.querySelectorAll('.text-container__abilities__item');
    const body = cardObj.querySelector('.text-container__body');

    const tit = extractText(title, 'banner-reveal-letters');
    title.classList.remove('card-elem-hide');

    const titleEnd = revealWords(tit, 600, 0, 'card-reveal-char');
    await wait(titleEnd);
    revealTags(tags);
    revealBody(body);
}

// wait for text before animating, event triggered in .scriptLanguageSwitch
document.addEventListener('i18n:applied', cardAnimationObserver, { once: true });

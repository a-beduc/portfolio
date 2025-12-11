// reveal `<li> class="text-container__abilities__item"`
function revealTags(tagElements, step = 150, baseDelay = 0, cls = 'reveal-block') {
    let currentDelay = baseDelay;

    tagElements.forEach((li) => {
        if (li.dataset.revealed === "1") return;
        li.dataset.revealed = "1";

        li.classList.remove("elem-hide");
        li.classList.add(cls);
        li.style.animationDelay = `${currentDelay}ms`;

        currentDelay += step
    });
}

// reveal `<li> class="text-container__body"`
function revealBody(bodyElement, animationDuration = 1500, cls = 'reveal-block') {
    if (bodyElement.dataset.revealed === "1") return;
    bodyElement.dataset.revealed = "1";

    bodyElement.classList.remove("elem-hide")
    bodyElement.classList.add(cls);
    bodyElement.style.animationDuration = `${animationDuration}ms`;
}

// Hide text then
// Add Observer to each .project-card
// When user see 50% of the card, text animation trigger (once per load)
function cardAnimationObserver() {
    const cards = document.querySelectorAll(".project-card");

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
    const tagContainer = cardObj.querySelector(".text-container__abilities");
    const tags = cardObj.querySelectorAll('.text-container__abilities__item');
    const body = cardObj.querySelector('.text-container__body');

    const tit = extractText(title, 'banner-reveal-letters');
    title.classList.remove('elem-hide');

    const titleEnd = revealWords(tit, 600, 0, 'card-reveal-char');
    await wait(titleEnd);

    tagContainer.classList.remove("elem-hide")
    revealTags(tags);
    revealBody(body);
}

// wait for text before animating, event triggered in .scriptLanguageSwitch
document.addEventListener('init:applied', cardAnimationObserver, { once: true });

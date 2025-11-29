const visible = new Set();
let observer = null;

function translationLimit(value, bot, top) {
    if (value > top) return top;
    if (value < bot) return bot;
    return value;
}

let lastScroll = window.scrollY;

function onScroll() {
    const currentY = window.scrollY;
    const dy = currentY - lastScroll;
    lastScroll = currentY;
    const speed = 0.03;
    const botDrift = -20;
    const topDrift = 20;


    visible.forEach(function (element) {
        const cs = getComputedStyle(element).getPropertyValue('--parallax-y').trim();
        const current = parseFloat(cs) || 0;

        let next = current - (dy * speed);
        next = translationLimit(next, botDrift, topDrift);

        element.style.setProperty('--parallax-y', next.toFixed(3) + '%');
    });
}

function initParallax() {
    const elements = document.querySelectorAll('.text-container.parallax');
    if (!elements.length) return;

    if (!observer) {
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                const element = entry.target;
                if (entry.isIntersecting) {
                    visible.add(element);
                } else {
                    visible.delete(element);
                    element.style.setProperty('--parallax-y', '0%');
                }
            });
        });
    }

    elements.forEach(function(element) {
        observer.observe(element);
    });

    onScroll();
}

window.addEventListener('scroll', onScroll, { passive: true });

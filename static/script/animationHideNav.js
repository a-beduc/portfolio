let lastScrollTop = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.classList.add('nav-bar__hidden');
    } else {
        navbar.classList.remove('nav-bar__hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

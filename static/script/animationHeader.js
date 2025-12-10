function initHeaderAnimation() {
    const navbar = document.querySelector('.nav-bar');
    const menuButton = document.getElementById("menu-button");
    const menuBlock = document.getElementById("menu");

    if (!navbar || !menuButton || !menuBlock) {
        console.warn("Header elements not found, animation.");
        return;
    }

    if (typeof basePath !== "undefined" && basePath !== "") {
        navbar.classList.remove('nav-bar__hidden');
    }

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            navbar.classList.add('nav-bar__hidden');
        } else {
            navbar.classList.remove('nav-bar__hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    const menuIcons = {
        close: `${basePath}static/images/menu-svgrepo-com.svg`,
        open: `${basePath}static/images/cross-svgrepo-com.svg`,
    };

    menuButton.addEventListener("click", () => {
        const isOpen = menuBlock.classList.toggle("is-open");
        menuButton.querySelector("img").src = isOpen ? menuIcons.open : menuIcons.close;
    });
}

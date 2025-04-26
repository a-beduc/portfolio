const menuButton = document.getElementById("menu-button");
const menuBlock = document.getElementById("menu");
const menuIcons = {
    close: 'static/images/menu-svgrepo-com.svg',
    open: 'static/images/cross-svgrepo-com.svg',
};

menuButton.addEventListener("click", () => {
    const isOpen = menuBlock.classList.toggle("is-open");
    menuButton.querySelector("img").src = isOpen ? menuIcons.open : menuIcons.close;
})

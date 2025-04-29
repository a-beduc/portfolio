const menuButton = document.getElementById("menu-button");
const menuBlock = document.getElementById("menu");

function getBasicLocation() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts.length <= 2 ? "" : "../../";
}

const basicPath = getBasicLocation();

const menuIcons = {
    close: `${basicPath}static/images/menu-svgrepo-com.svg`,
    open: `${basicPath}static/images/cross-svgrepo-com.svg`,
};

menuButton.addEventListener("click", () => {
    const isOpen = menuBlock.classList.toggle("is-open");
    menuButton.querySelector("img").src = isOpen ? menuIcons.open : menuIcons.close;
})

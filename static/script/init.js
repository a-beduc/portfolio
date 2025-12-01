let basePath = "";


function getBaseLocation() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts.length <= 2 ? "" : "../";
}


function getProjectCardKeys() {
    const container = document.getElementById("projects-card-container");
    if (!container) return [];

    const attr = container.getAttribute("data-project-keys");
    if (!attr) return [];

    return attr.split(",").map(k => k.trim()).filter(Boolean);
}


async function initPage() {
    basePath = getBaseLocation();

    await Promise.all(
        [
            loadHeader(),
            loadFooter()
        ]
    );

    initHeaderAnimation();
    initTheme();

    const projectKeys = getProjectCardKeys()
    await loadProjectsCards(projectKeys);

    await initLanguage();

    // when cards + text init add Parallax effect.
    initParallax();

    // send event to allow animations to start
    document.dispatchEvent(new CustomEvent('init:applied'));
}

document.addEventListener('DOMContentLoaded', initPage);

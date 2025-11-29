let basePath = "";

function getBaseLocation() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts.length <= 2 ? "" : "../../";
}


async function initPage() {
    basePath = getBaseLocation();

    const container = document.getElementById("projects-card-container");
    let projectKeys = [];
    if (container) {
        const attr = container.getAttribute("data-project-keys");
        if (attr) {
            projectKeys = attr.split(",");
            projectKeys = projectKeys.map(k => k.trim());
            projectKeys = projectKeys.filter(Boolean);

        }
    }

    await loadProjectsCards(projectKeys);
    await setLanguage(currentLanguage);
    updateFlagIcon(currentLanguage);

    // when cards + text init add Parallax effect.
    initParallax();

    // send event to allow animations to start
    document.dispatchEvent(new CustomEvent('i18n:applied'));
}

document.addEventListener('DOMContentLoaded', initPage);

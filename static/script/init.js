let basePath = "";


function getBaseLocation() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts.length <= 2 ? "" : "../";
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

    await loadProjectsCards();
    await initLanguage();

    // when cards + text init add Parallax effect.
    initParallax();

    // send event to allow animations to start
    document.dispatchEvent(new CustomEvent('init:applied'));
}

document.addEventListener('DOMContentLoaded', initPage);

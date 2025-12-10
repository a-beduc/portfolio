async function ensureCardTemplateLoaded() {
    if (document.getElementById('project-card-template')) return;

    const res = await fetch(`${basePath}static/templates/project-card-template.html`);
    const html = await res.text();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();

    const tpl = wrapper.firstElementChild;
    if (tpl && tpl.tagName.toLowerCase() === 'template') {
        document.body.appendChild(tpl);
    }
}


function getProjectCardKeys() {
    const container = document.getElementById("projects-card-container");
    if (!container) return [];

    const attr = container.getAttribute("data-project-card-keys");
    if (!attr) return [];

    return attr.split(",").map(k => k.trim()).filter(Boolean);
}


function cardKeyPath(keyName, keyAttribute) {
    return `project.${keyName}.card.${keyAttribute}`
}


async function loadProjectsCards() {
    const container = document.getElementById("projects-card-container");
    if (!container) return;

    let projectKeys = getProjectCardKeys()
    if (!Array.isArray(projectKeys) || projectKeys.length === 0) return;

    const showDetailLink = container.getAttribute("data-show-detail-link") !== "false";

    await ensureCardTemplateLoaded();
    const tpl = document.getElementById("project-card-template");
    if (!tpl) return;

    const res = await fetch(`${basePath}data/projects-card.json`);
    const projects = await res.json();

    for (const key of projectKeys) {
        const project = projects[key]

        // if bad project key ignore and continue
        if (!project) continue;

        const clone = tpl.content.cloneNode(true);
        const card = clone.querySelector(".project-card");

        card.id = project.id;

        const imgLink = clone.querySelector(".card-link-img");
        const githubLink = clone.querySelector(".card-link-github");
        const detailLink = clone.querySelector(".card-link-detail");
        const productionLink = clone.querySelector(".production-link");

        const img = clone.querySelector(".image-container__image");
        const title = clone.querySelector(".text-container__title");
        const content = clone.querySelector(".text-container__content");
        const skills = clone.querySelector(".text-container__abilities");

        const githubLogo = clone.querySelector(".card-link-github img");
        const detailLogo = clone.querySelector(".card-link-detail img");
        const productionLogo = clone.querySelector(".production-link img");

        const keyName = project.keyName

        img.src = `${basePath}${project.imageSrc}`;
        img.dataset.translateCardImg = cardKeyPath(keyName, "imageAlt");

        title.dataset.translate = cardKeyPath(keyName, "title");
        content.dataset.translate = cardKeyPath(keyName, "content");
        skills.dataset.translateSkill = cardKeyPath(keyName, "skill");

        githubLink.href = project.githubUrl;
        githubLogo.src = `${basePath}static/images/github-svgrepo-com.svg`

        // add link to detail view in case of card in page index
        if (showDetailLink && detailLink && detailLogo) {
            imgLink.href = `${basePath}${project.projectUrl}`;
            detailLink.href = `${basePath}${project.projectUrl}`;
            detailLogo.src = `${basePath}static/images/arrow-down-right-svgrepo-com.svg`;
        } else if (detailLink) {
            card.classList.add("project-card--detail")
            detailLink.remove();
            img.style.opacity = "1.0";
            imgLink.classList.add('link-disabled');
        }

        if (project.productionUrl && productionLink && productionLogo) {
            productionLink.href = project.productionUrl;
            productionLink.target = "_blank";
            productionLogo.src = `${basePath}static/images/link-external-svgrepo-com.svg`;
        } else if (productionLink) {
            productionLink.remove();
        }

        container.appendChild(clone);
    }
}

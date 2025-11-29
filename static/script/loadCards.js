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

async function loadProjectsCards(projectKeys) {
    const container = document.getElementById("projects-card-container");
    if (!container) return;
    if (!Array.isArray(projectKeys) || projectKeys.length === 0) return;

    const showDetailLink = container.getAttribute("data-show-detail-link") !== "false";
    console.log(showDetailLink)

    await ensureCardTemplateLoaded();
    const tpl = document.getElementById("project-card-template");
    if (!tpl) return;

    const res = await fetch(`${basePath}static/data/projects.json`);
    const projects = await res.json();

    for (const key of projectKeys) {
        const project = projects[key]

        // if wrong project key ignore and continue
        if (!project) continue;

        const clone = tpl.content.cloneNode(true);
        const card = clone.querySelector(".project-card");

        card.id = project.id;

        const imgLink = clone.querySelector(".card-link-img");
        const githubLink = clone.querySelector(".card-link-github");
        const detailLink = clone.querySelector(".card-link-detail");

        const img = clone.querySelector(".image-container__image");
        const title = clone.querySelector(".text-container__title");
        const content = clone.querySelector(".text-container__content");
        const skills = clone.querySelector(".text-container__abilities");

        const githubLogo = clone.querySelector(".card-link-github img");
        const detailLogo = clone.querySelector(".card-link-detail img");

        img.src = `${basePath}${project.imageSrc}`;
        img.alt = project.imageAlt;

        title.dataset.translate = project.titleKey;
        content.dataset.translate = project.contentKey;
        skills.dataset.translateSkill = project.skillsKey;

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

        container.appendChild(clone);
    }
}

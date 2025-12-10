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
        const img = clone.querySelector(".image-container__image");
        const title = clone.querySelector(".text-container__title");
        const content = clone.querySelector(".text-container__content");
        const skills = clone.querySelector(".text-container__abilities");

        const keyName = project.keyName

        img.src = `${basePath}${project.imageSrc}`;
        img.dataset.translateCardImg = cardKeyPath(keyName, "imageAlt");

        title.dataset.translate = cardKeyPath(keyName, "title");
        content.dataset.translate = cardKeyPath(keyName, "content");
        skills.dataset.translateSkill = cardKeyPath(keyName, "skill");

        // disable image link to detail page on detail page
        if (showDetailLink && project.projectUrl) {
            imgLink.href = `${basePath}${project.projectUrl}`;
        } else {
            card.classList.add("project-card--detail")
            img.style.opacity = "1.0";
            imgLink.classList.add('link-disabled');
        }

        const iconContainer = clone.querySelector(".text-container__icon");
        const linkTemplate = iconContainer.querySelector(".card-link-template");

        linkTemplate.remove();
        const links = [];

        if (project.githubUrl) {
            links.push({
                type: "github",
                url: project.githubUrl,
                icon: `${basePath}static/images/github-svgrepo-com.svg`,
                alt: "Logo of GitHub",
                target: "_blank"
            });
        }

        if (showDetailLink && project.projectUrl) {
            links.push({
                type: "detail",
                url: `${basePath}${project.projectUrl}`,
                icon: `${basePath}static/images/arrow-down-right-svgrepo-com.svg`,
                alt: "Internal link to project",
                target: "_self"
            });
        }

        if (project.extraLinks && Array.isArray(project.extraLinks)) {
            for (const extra of project.extraLinks) {
                if (!extra || !extra.url || !extra.icon) continue;

                links.push({
                    type: extra.type || "extra",
                    url: extra.url,
                    icon: `${basePath}${extra.icon}`,
                    alt: extra.alt || "",
                    target: "_blank"
                });
            }
        }

        // Render the icon links
        for (const link of links) {
            const linkEl = linkTemplate.cloneNode(true);
            const imgEl = linkEl.querySelector("img");

            linkEl.href = link.url;
            linkEl.target = link.target || "_blank";

            if (imgEl) {
                imgEl.src = link.icon;
                if (link.alt) {
                    imgEl.alt = link.alt;
                }
            }

            if (link.type) {
                linkEl.classList.add(`card-link-${link.type}`);
            }

            iconContainer.appendChild(linkEl);
        }

        container.appendChild(clone);
    }
}

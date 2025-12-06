async function ensureDetailTemplateLoaded() {
    if (document.getElementById('project-detail-template')) return;

    const res = await fetch(`${basePath}static/templates/project-detail-template.html`);
    const html = await res.text();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();

    const tpl = wrapper.firstElementChild;
    if (tpl && tpl.tagName.toLowerCase() === 'template') {
        document.body.appendChild(tpl);
    }
}


function getProjectDetailKey() {
    const container = document.getElementById("project-detail-container");
    if (!container) return null;

    const attr = container.getAttribute("data-project-detail-key");
    if (!attr) return null;

    return attr.trim();
}


async function loadProjectDetail() {
    const container = document.getElementById("project-detail-container");
    if (!container) return;

    const detailKey = getProjectDetailKey()
    if (!detailKey) return;

    await ensureDetailTemplateLoaded();
    const tpl = document.getElementById("project-detail-template");
    if (!tpl) return;

    const res = await fetch(`${basePath}data/projects-detail.json`);
    const details = await res.json();
    const detail = details[detailKey];
    if (!detail) return;

    const clone = tpl.content.cloneNode(true);

    const descriptionTitleEl = clone.querySelector('[data-role="description-title"]');
    const descriptionContentEl = clone.querySelector('[data-role="description-content"]');
    const learnedTitleEl = clone.querySelector('[data-role="what-i-learned-title"]');
    const learnedContentEl = clone.querySelector('[data-role="what-i-learned-content"]');
    const imageContainer = clone.querySelector('[data-role="images-container"]');
    const techStackContainer = clone.querySelector('[data-role="tech-stack"]');

    descriptionTitleEl.dataset.translate = detail.descriptionTitleKey
    descriptionContentEl.dataset.translateParagraphs = detail.descriptionContentKey
    learnedTitleEl.dataset.translate = detail.whatILearnedTitleKey
    learnedContentEl.dataset.translateParagraphs = detail.whatILearnedContentKey

    const list = document.createElement('ul');
    list.className = 'project-info__tech-stack__list';

    const response = await fetch(`${basePath}data/icons.json`);
    const icons = await response.json()

    detail.techStack.forEach(techName => {
        const icon = icons[techName]

        const li = document.createElement('li');
        li.className = 'project-info__tech-stack__item';

        const a = document.createElement('a');
        a.target = "_blank";
        a.className = 'project-info__tech-stack__link';
        a.href = icon.link;

        const img = document.createElement('img');
        img.className = 'project-info__tech-stack__icon';
        img.src = `${basePath}${icon.icon}`;
        img.alt = icon.label;

        const span = document.createElement('span');
        span.className = 'project-info__tech-stack__label';
        span.textContent = icon.label;

        a.appendChild(img);
        a.appendChild(span);
        li.append(a);
        list.appendChild(li);
    });

    techStackContainer.appendChild(list);

    detail.imagesSrc.forEach((src, index) => {
        const block = document.createElement('div');
        block.className = "project-info__image-block";

        const img = document.createElement('img');
        img.className = 'project-info__image-block__image';
        img.src = `${basePath}${src}`;
        img.dataset.translateImgAlt = `${detail.imageAltKey}.${index}`;

        const caption = document.createElement('span');
        caption.className = "project-info__image-block__description";
        caption.dataset.translate = `${detail.imageTextKey}.${index}`;

        block.appendChild(img);
        block.appendChild(caption);
        imageContainer.appendChild(block);
    })

    container.innerHTML = '';
    container.appendChild(clone);
}

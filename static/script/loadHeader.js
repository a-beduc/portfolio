async function loadHeader() {
    const res = await fetch (`${basePath}static/templates/header.html`);
    const html = await res.text();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();

    const header = wrapper.querySelector('header');
    if (!header) return;

    header.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (src.startsWith('static/')) {
            img.src = `${basePath}${src}`;
        }
    });

    header.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        a.href = `${basePath}${href}`;
    })

    document.body.prepend(header)
}

async function loadFooter() {
    const res = await fetch(`${basePath}static/templates/footer.html`);
    const html = await res.text();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();

    const footer = wrapper.querySelector('footer')
    if (!footer) return;

    footer.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (src.startsWith('static/')) {
            img.src = `${basePath}${src}`;
        }
    });

    document.body.appendChild(footer);
}

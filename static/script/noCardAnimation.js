document.addEventListener('init:applied', () => {
    document.querySelectorAll('.elem-hide')
        .forEach(el => el.classList.remove('elem-hide'));
});

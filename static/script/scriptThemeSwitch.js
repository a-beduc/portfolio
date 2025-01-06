
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const updateTheme = (isDarkMode) => {
    if (isDarkMode) {
        root.style.setProperty('--primary-color', '29, 36, 51');
        root.style.setProperty('--secondary-color', '53, 141, 222');
        root.style.setProperty('--filter-primary-color', 'invert(10%) sepia(60%) saturate(407%) hue-rotate(181deg) brightness(92%) contrast(91%)');
        root.style.setProperty('--filter-secondary-color', 'invert(53%) sepia(96%) saturate(2247%) hue-rotate(187deg) brightness(90%) contrast(92%)');
    } else {
        root.style.setProperty('--primary-color', '53, 141, 222');
        root.style.setProperty('--secondary-color', '29, 36, 51');
        root.style.setProperty('--filter-primary-color', 'invert(53%) sepia(96%) saturate(2247%) hue-rotate(187deg) brightness(90%) contrast(92%)');
        root.style.setProperty('--filter-secondary-color', 'invert(10%) sepia(60%) saturate(407%) hue-rotate(181deg) brightness(92%) contrast(91%)');
    }
};

updateTheme(themeToggle.checked);

themeToggle.addEventListener('change', () => {
    updateTheme(themeToggle.checked);
})

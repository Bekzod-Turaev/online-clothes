
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');
const body = document.body;
const links = document.querySelectorAll('a');
const logoes = document.querySelectorAll('.background');
const footer = document.querySelector('.site-footer');
const navbar = document.querySelector('nav');
const filterBtn = document.querySelector('.filter button');
const searchInput = document.querySelector('.search_input input');

export function themeFunction() {
    function paint(element, background, color) {
        if (!element) return;
        element.style.backgroundColor = background;
        element.style.color = color;
    }

    function applyTheme(isLight) {
        const bg = isLight ? 'white' : '#020817';
        const footerBg = isLight ? 'white' : '#0D1526';
        const text = isLight ? 'black' : 'white';

        paint(body, bg, text);
        paint(navbar, bg, text);
        paint(footer, footerBg, text);

        if (filterBtn) filterBtn.style.color = text;
        if (searchInput) searchInput.style.color = text;

        links.forEach(link => {
            link.style.color = text;
        });

        if (darkBtn) darkBtn.style.display = isLight ? 'none' : 'flex';
        if (lightBtn) lightBtn.style.display = isLight ? 'flex' : 'none';

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    logoes.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            const isLight = localStorage.getItem('theme') === 'light';
            logo.style.backgroundColor = isLight ? '#f1f5f993' : 'rgba(255, 255, 255, 0.1)';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.backgroundColor = '';
        });
    });

    function toggleTheme() {
        applyTheme(localStorage.getItem('theme') !== 'light');
    }

    if (darkBtn) darkBtn.addEventListener('click', toggleTheme);
    if (lightBtn) lightBtn.addEventListener('click', toggleTheme);

    applyTheme(localStorage.getItem('theme') === 'light');
}
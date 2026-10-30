
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');
const body = document.body;
const links = document.querySelectorAll('a');
const logoes = document.querySelectorAll('.background');
const footer = document.querySelector(".site-footer")
const navigation = document.querySelectorAll(".navigations")
const cont = document.querySelector(".continue")

export function themeFunction() {
    
    function applyTheme(isLight) {
        if (isLight) {
            body.style.backgroundColor = "white";
            body.style.color = "black";
            footer.style.backgroundColor = "white";
            footer.style.color = "black";

            links.forEach(link => {
                link.style.color = "black";
            });

            navigation.forEach(color =>{
                color.style.color = "black";    
            })

            if (darkBtn) darkBtn.style.display = "none";
            if (lightBtn) lightBtn.style.display = "flex";
            localStorage.setItem("theme", "light");
        } else {
            body.style.backgroundColor = "#020817";
            body.style.color = "white";
            footer.style.backgroundColor = "#020817";
            footer.style.color = "white";

            links.forEach(link => {
                link.style.color = "white";
            });

            if (darkBtn) darkBtn.style.display = "flex";
            if (lightBtn) lightBtn.style.display = "none";
            localStorage.setItem("theme", "dark");
        }
    }

    logoes.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            const currentTheme = localStorage.getItem("theme");
            if (currentTheme === "light") {
                logo.style.backgroundColor = "#f1f5f993";
                logo.style.color = "#020817";
            } else {
                logo.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // или ваш цвет для темной темы
            }
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.backgroundColor = "";
            logo.style.color = "";
        });
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    function toggleTheme() {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "light") {
            applyTheme(false);
        } else {
            applyTheme(true);
        }
    }

    if (darkBtn) {
        darkBtn.addEventListener("click", toggleTheme);
    }

    if (lightBtn) {
        lightBtn.addEventListener("click", toggleTheme);
    }
}



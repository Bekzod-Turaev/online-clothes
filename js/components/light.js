
// const light = document.querySelector(`.light`);
// const dark = document.querySelector(`.dark`);
// const body = document.body;
// const links = document.querySelectorAll('a');
// const logoes = document.querySelectorAll('.inline-flex');


// export function themeFunction(){
//     dark.addEventListener("click",()=>{
//     body.style.backgroundColor= "white";
//     body.style.color= "black";

//     links.forEach(link => {
//         link.style.color = "black";
//     });

//     logoes.forEach(logo => {
//         logo.style.color = "black";
//     });

// } )
// }



const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');
const body = document.body;
const links = document.querySelectorAll('a');
const logoes = document.querySelectorAll('.inline-flex');

export function themeFunction() {
    function applyTheme(isLight) {
        if (isLight) {
            body.style.backgroundColor = "white";
            body.style.color = "black";

            links.forEach(link => {
                link.style.color = "black";
            });

            logoes.forEach(logo => {
                logo.style.color = "black";
            });

            if (darkBtn) darkBtn.style.display = "none";
            if (lightBtn) lightBtn.style.display = "flex";
            localStorage.setItem("theme", "light");
        } else {
            body.style.backgroundColor = "#020817";
            body.style.color = "white";

            links.forEach(link => {
                link.style.color = "white";
            });

            logoes.forEach(logo => {
                logo.style.color = "#f8fafc";
            });

            if (darkBtn) darkBtn.style.display = "flex";
            if (lightBtn) lightBtn.style.display = "none";
            localStorage.setItem("theme", "dark");
        }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    function toggleTheme() {
        if (body.style.backgroundColor === "white") {
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
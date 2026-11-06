const STORAGE_KEY = "currentUser";

function getUser() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
        return null;
    }
}

function saveUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function removeUser() {
    localStorage.removeItem(STORAGE_KEY);
}

const loginBtn = document.querySelector(".login");
const loginText = loginBtn ? loginBtn.querySelector("span") : null;

function renderUser() {
    if (!loginText) return;
    const user = getUser();
    loginText.textContent = user ? user.name : "Login";
}

renderUser();

if (loginBtn) {
    loginBtn.style.cursor = "pointer";
    loginBtn.addEventListener("click", () => {
        const user = getUser();
        if (user && confirm(`Выйти из аккаунта ${user.name}?`)) {
            removeUser();
            renderUser();
        }
    });
}

const loginForm = document.querySelector(".login-form");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const name = email.split("@")[0];

        saveUser({ email, name });

        window.location.href = "../index.html";
    });
}
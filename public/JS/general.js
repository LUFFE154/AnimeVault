const body = document.body;

// verify last theme
const savedTheme = localStorage.getItem("theme");
if(savedTheme == "dark"){toggleTheme()};

const switchThemeIcon = document.querySelectorAll(".change-theme");
switchThemeIcon.forEach(icon => {icon.addEventListener("click", toggleTheme)});

function toggleTheme(){
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light"); // True = dark, False = light

    const lmIcon = document.querySelectorAll(".light-icon");
    const dmIcon = document.querySelectorAll(".dark-icon");

    lmIcon.forEach(icon => {icon.classList.toggle("hidden-icon")});
    dmIcon.forEach(icon => {icon.classList.toggle("hidden-icon")});
}
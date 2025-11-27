const body = document.body;

// verify last theme
const savedTheme = localStorage.getItem("theme");
if(savedTheme == "dark"){toggleTheme()};

const displayOptionsIcon = document.querySelector(".header-items-icon");
displayOptionsIcon.addEventListener("click", displayOptions);

function displayOptions(){
    const showItemsIcon     = document.querySelector(".show-items");
    const hideItemsIcon     = document.querySelector(".hide-items");
    const headerItemsBox    = document.querySelector(".header-items");
    
    showItemsIcon.classList.toggle("hidden-icon");
    hideItemsIcon.classList.toggle("hidden-icon");
    headerItemsBox.classList.toggle("hidden-div");
}

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

/* CHANGE HIGHLIGHT*/
const highlightDots = document.querySelectorAll(".highlight-container .dots .dot");
const highlightContainer = document.querySelectorAll(".highlight-container .item");

highlightDots.forEach(dot => {
    const index = Number(dot.dataset.id);
    dot.addEventListener("click", () => {slideHighlight(index)});
});

function slideHighlight(index){
    highlightContainer.forEach(item => {
        if(! item.classList.contains("hidden")){
            item.classList.add("hidden");
        }
    });
    highlightContainer[index-1].classList.remove("hidden");
}
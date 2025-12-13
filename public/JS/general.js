const body = document.body;

// default language
if(! localStorage.getItem("lang")){
    var userLang = navigator.language;
    if(userLang == "pt-BR"){
        localStorage.setItem("lang", "BR");
    }else{
        localStorage.setItem("lang", "EN");
    }
}

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


// verify last language
const savedLang = localStorage.getItem("lang");
if(savedLang == "EN"){
    loadLanguage("EN");
}else{
    loadLanguage("BR");
}

// traslate page
if(document.querySelector(".change-language")){
    const changeLangBox = document.querySelector(".change-language");
    changeLangBox.addEventListener("click", () => {
        var lang = changeLangBox.innerHTML;
        if(lang == "BR"){
            lang = "EN";
        }else{
            lang = "BR";
        }
        loadLanguage(lang);
    })
}

async function loadLanguage(lang){
    const page = document.body.dataset.page;

    // retrieve the json file that contains the selected language
    const res  = await fetch(`/lang/${lang}.json`);
    const data = await res.json();

    // find the page at json file
    const pageData = data.pages.find(p => p.name === page);
    if (! pageData) return;

    // select all the contents that needs to be translated
    const translateContent = document.querySelectorAll("[data-i18n]");

    // translate
    translateContent.forEach(element => {
        const key   = element.dataset.i18n;
        const value = pageData.content[key];

        if(value !== undefined){
            element.innerHTML = value;
        }
    })
    // save last language
    localStorage.setItem('lang', lang);
}
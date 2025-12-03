/* DISPLAY HEADER NAV(MOBILE) */
const displayOptionsIcon = document.querySelector(".header-items-icon");
displayOptionsIcon.addEventListener("click", displayOptions);

function displayOptions(){
    const showItemsIcon     = document.querySelector(".show-items");
    const hideItemsIcon     = document.querySelector(".hide-items");
    const headerItemsBox    = document.querySelector(".header .items");

    showItemsIcon.classList.toggle("active");
    hideItemsIcon.classList.toggle("active");
    headerItemsBox.classList.toggle("active");
}


/* CHANGE HIGHLIGHT */
const highlightDots      = document.querySelectorAll(".highlight-container .dots .dot");
const highlightContainer = document.querySelectorAll(".highlight-container .item");
const MAX_INDEX     = 4;
var highlightIndex  = 2;

highlightDots.forEach(dot => {
    dot.addEventListener("click", () => {
        highlightIndex = Number(dot.dataset.id);
        slideHighlight(highlightIndex);
    });
});

function slideHighlight(index){
    if(index > MAX_INDEX){
        index = 1;
        highlightIndex = index;
    }

    highlightContainer.forEach(item => {
        if(! item.classList.contains("hidden")){
            item.classList.add("hidden");
        }
    });
    highlightContainer[index-1].classList.remove("hidden");
    highlightIndex++;
}
setInterval(() => {slideHighlight(highlightIndex)}, 5000); // 5sec
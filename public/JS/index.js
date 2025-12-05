// retrieving 4 animes from the current season
const date = new Date();
const MAX_AMOUNT = 4;

const year  = date.getFullYear();
const month = date.getMonth() + 1;

var season = "winter";
if      (month > 3 && month <= 6)   season = "spring";
else if (month > 6 && month <= 9)   season = "summer";
else if (month > 9 && month <= 12)  season = "fall";

fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}`)
    .then(res => res.json())
    .then(info => {
        const data = info.data;

        console.log(data.length);

        // select 4 random animes from season top 25
        const animeList         = [];
        const alreadySelected   = []; // list of index already selected with random method

        do{
            let index = Math.floor(Math.random() * 25);
            if(! alreadySelected.includes(index)){
                alreadySelected.push(index);
            
                animeList.push({
                    title:      data[index].title,
                    imageURL:   data[index].images?.jpg?.large_image_url,
                    synopsis:   data[index].synopsis,
                    linkMAL:    data[index].url,
                    score:      data[index].score,
                    episodes:   data[index].episodes ?? "?",
                    status:     data[index].status,
                    rank:       data[index].rank ? `#${data[index].rank}` : 'N/A',
                    genre:      data[index].genres?.map(g => g.name).join(', ')
                });
            }
        }while(alreadySelected.length != MAX_AMOUNT);

        const highlightContainer = document.querySelector(".highlight-container");
        var dataId = 1;

        animeList.forEach(anime => {
            const highlightItem = document.createElement("div");
            highlightItem.classList.add("item", "flex-column");
            highlightItem.dataset.id = dataId;

            if (dataId != 1) highlightItem.classList.add("hidden");

            highlightItem.innerHTML += `
                <div class="info flex-column">
                    <div class="image"><img src="${anime.imageURL}" alt="highlight picture"></div>
                    <div class="item-text flex-column">
                        <div class="item-title flex-column">
                            <h1><abbr title="${anime.title}">${anime.title}</abbr></h1>
                            <div class="sub-info align-center">
                                <span id="star" class="align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                    ${anime.score}
                                </span>
                                <span id="rating" class="align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                    </svg>
                                    ${anime.rank}
                                </span>
                                <span id="status" class="align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    ${anime.status}
                                </span>
                            </div>
                        </div>
                        <div class="item-body flex-column">
                            <span class="attribute align-center">
                                <span class="attribute-label align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    <strong>Episódios:</strong>
                                </span>
                                <span class="attribute-content">
                                    ${anime.episodes}
                                </span>
                            </span>
                            <span class="attribute align-center">
                                <span class="attribute-label align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>
                                    <strong>Gêneros:</strong>
                                </span>
                                <span class="attribute-content">
                                    ${anime.genre}
                                </span>
                            </span>
                            <span class="attribute align-center">
                                <span class="attribute-label align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    <strong>Temporada:</strong>
                                </span>
                                <span class="attribute-content">
                                    Fall 2025
                                </span>
                            </span>
                            <span class="attribute align-center synopsis">
                                <span class="attribute-label align-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    <strong>Sinopse:</strong>
                                </span>
                                <span class="attribute-content">
                                    <abbr title="${anime.synopsis}">${anime.synopsis}</abbr>
                                </span>
                            </span>
                        </div>
                        <span class="item-link">
                            <a href="${anime.linkMAL}" target="_blank">MAL Link</a>
                        </span>
                    </div>
                </div>
            `;

            const dotsContainer = document.createElement("div");
            dotsContainer.classList.add("dots", "align-center");
            for(let i = 0; i < 4; i++){
                const dot = document.createElement("span");
                dot.classList.add("dot");

                dot.dataset.id = i+1;
                if(i+1 == dataId){
                    dot.classList.add("selected");
                }
                dotsContainer.insertAdjacentElement("beforeend", dot);
            }
            highlightItem.insertAdjacentElement("beforeend", dotsContainer);
            highlightContainer.insertAdjacentElement("beforeend", highlightItem);
            dataId++;
        });


    /* CHANGE HIGHLIGHT */
    const highlightDots  = document.querySelectorAll(".highlight-container .dots .dot");
    const highlightItems = document.querySelectorAll(".highlight-container .item");

    const MAX_INDEX     = 4;
    var highlightIndex  = 2; // starts at 2 when slide automatically 

    highlightDots.forEach(dot => {
        dot.addEventListener("click", () => {
            highlightIndex = Number(dot.dataset.id);
            slideHighlight(highlightIndex);
        });
    });

    function slideHighlight(index){
        if(index > MAX_INDEX){ // return to first highlight - case last one was the fourth
            index = 1;
            highlightIndex = index;
        }

        highlightItems.forEach(item => {
            if(! item.classList.contains("hidden")){
                item.classList.add("hidden");
            }
        });
        highlightItems[index-1].classList.remove("hidden");
        highlightIndex++;
    }
    setInterval(() => {slideHighlight(highlightIndex)}, 5000); // 5sec
    });


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

if(localStorage.getItem("tournamentData")){
    localStorage.removeItem("tournamentData");
}
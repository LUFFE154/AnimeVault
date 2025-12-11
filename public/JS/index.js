// retrieving 4 animes from the current season
const date = new Date();
const MAX_AMOUNT = 4;

const year  = date.getFullYear();
const month = date.getMonth() + 1;

var season = "winter";
if      (month > 3 && month <= 6)   season = "spring";
else if (month > 6 && month <= 9)   season = "summer";
else if (month > 9 && month <= 12)  season = "fall";

var seasonText = `${season.slice(0,1).toUpperCase()}${season.slice(1)} ${year}`

fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}`)
    .then(res  => res.json())
    .then(info => {
        // hidden highlight skeleton
        const highlightSkeleton = document.querySelector(".highlight.skeleton");
        const highlightSkeletonDots = document.querySelector(".highlight-dots.skeleton");
        highlightSkeleton.classList.add("hidden");
        highlightSkeletonDots.classList.add("hidden");

        const data = info.data;
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
                    genre:      data[index].genres?.map(g => g.name).join(', '),
                    studios:    data[index].studios?.map(g => g.name).join(', '),
                });
            }
        }while(alreadySelected.length != MAX_AMOUNT);
        
        const highlightContainer = document.querySelector(".highlight-container");
        var dataId = 1;

        animeList.forEach(anime => {
            const highlightItem = document.createElement("div");
            highlightItem.classList.add("highlight", "regular");
            highlightItem.dataset.id = dataId;

            if (dataId != 1) highlightItem.classList.add("hidden");

            highlightItem.innerHTML += `
                <div class="highlight-image"><img src="${anime.imageURL}" alt="highlight anime picture"></div>
                <div class="text flex-column">
                    <div class="highlight-title flex-column">
                        <p>${anime.studios}</p>
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
                    <div class="highlight-body flex-column">
                        <span class="attribute align-center">
                            <span class="attribute-label align-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                                </svg>
                                <strong>Episódios:</strong>
                            </span>
                            <span class="attribute-content">
                                ${anime.episodes}
                            </span>
                        </span>
                        <span class="attribute align-center">
                            <span class="attribute-label align-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
                                </svg>
                                <strong>Gêneros:</strong>
                            </span>
                            <span class="attribute-content">
                                ${anime.genre}
                            </span>
                        </span>
                        <span class="attribute align-center">
                            <span class="attribute-label align-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                                </svg>
                                <strong>Temporada:</strong>
                            </span>
                            <span class="attribute-content">
                                ${seasonText}
                            </span>
                        </span>
                        <span class="attribute align-center big">
                            <span class="attribute-label align-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
                                    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                </svg>
                                <strong>Sinopse:</strong>
                            </span>
                            <span class="attribute-content">
                                <abbr title="${anime.synopsis}">${anime.synopsis}</abbr>
                            </span>
                        </span>
                        <span class="attribute item-link"><a href="${anime.linkMAL}" target="_blank">MAL Link</a></span>
                    </div>
                </div>
            `;
            highlightContainer.insertAdjacentElement("beforeend", highlightItem);
            dataId++;
        });
        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("dots", "align-center");

        dotsContainer.innerHTML = `
            <div class="highlight-dots align-center">
                <span class="dot selected" data-id="1"></span>
                <span class="dot" data-id="2"></span>
                <span class="dot" data-id="3"></span>
                <span class="dot" data-id="4"></span>
            </div>
        `;
        highlightContainer.insertAdjacentElement("beforeend", dotsContainer);
   
    // CHANGE HIGHLIGHT
    const highlightDots  = document.querySelectorAll(".highlight-container .highlight-dots .dot");
    const highlightItems = document.querySelectorAll(".highlight-container .highlight.regular");

    const MAX_INDEX = 4;
     var highlightIndex  = 2; // starts at 2 when slide automatically

    highlightDots.forEach(dot => {
        dot.addEventListener("click", () => {
            highlightIndex = Number(dot.dataset.id);
            slideHighlight(highlightIndex);
        });
    })

    function slideHighlight(index){
        if(index > MAX_INDEX){ // return to first highlight -> last one was the fourth
            index = 1;
            highlightIndex = index;
        }

        highlightItems.forEach(item => {
            if(! item.classList.contains("hidden")){
                item.classList.add("hidden");
            }
        });
        highlightDots.forEach(dot => {
            if(dot.classList.contains("selected")){
                dot.classList.remove("selected");
            }
            if(dot.dataset.id == index){
                dot.classList.add("selected");
            }
        })
        highlightItems[index-1].classList.remove("hidden");
        highlightIndex++;
    }
    setInterval(() => {slideHighlight(highlightIndex)}, 5000); // 5sec
    });

// DISPLAY HEADER NAV (MOBILE)
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

// remove last tournament session
if(localStorage.getItem("tournamentData")){
    localStorage.removeItem("tournamentData");
}
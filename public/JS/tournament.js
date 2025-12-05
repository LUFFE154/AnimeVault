 if(localStorage.getItem("tournamentData")){
    window.location.href ="tournamentMatch.html";
}

/* Controll the input values at tournament setup */
const minMaxInputs = document.querySelectorAll(".minMaxInputs");

minMaxInputs.forEach(item => {
    const minInput = item.querySelector(".minInput");
    const minRange = item.querySelector(".minRange");
    const maxInput = item.querySelector(".maxInput");
    const maxRange = item.querySelector(".maxRange");

    minInput.addEventListener("input", () => {
        minRange.value = minInput.value;

        if(minInput.value > maxInput.value){
            maxInput.value = minInput.value;
            maxRange.value = minInput.value;
        }
    });

    minRange.addEventListener("input", () => {
        minInput.value = minRange.value;

        if(minRange.value > maxRange.value){
            maxInput.value = minRange.value;
            maxRange.value = minRange.value;
        }
    });

    maxInput.addEventListener("input", () => {
        maxRange.value = maxInput.value;

        if(maxInput.value < minInput.value){
            minInput.value = maxInput.value;
            minRange.value = maxInput.value;
        }
    });

    maxRange.addEventListener("input", () => {
        maxInput.value = maxRange.value;

        if(maxRange.value < minRange.value){
            minInput.value = maxRange.value;
            minRange.value = maxRange.value;
        }
    });
});


/* Retrieve the inputs data  + redirect to tournament page */
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", verifyData);

function verifyData(){
    const titleInput = document.querySelector("#ititle");
    if(titleInput.value === ""){
        alert("Erro: Título do torneio não pode ser em branco");
        return;
    }

    const formattedTitle = `${titleInput.value.slice(0,1).toUpperCase()}${titleInput.value.slice(1)}`;     

    tournamentMap = {
        title:      formattedTitle,
        amount:     document.querySelector("#iamount").value,
        minYear:    document.querySelector("#numberMinYear").value,
        maxYear:    document.querySelector("#numberMaxYear").value,
        minScore:   document.querySelector("#numberMinScore").value,
        maxScore:   document.querySelector("#numberMaxScore").value,
    };

    localStorage.setItem("tournamentData", JSON.stringify(tournamentMap));
    window.location.href = "tournamentMatch.html";
}





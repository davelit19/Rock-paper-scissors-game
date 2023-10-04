"use strict"
const main = document.querySelector(".main");
const closeImg = document.querySelector(".close");
const iconCont = document.querySelector(".icon-cont");
const btnRules = document.getElementById("btn-rules");
const gamePiece = document.getElementsByClassName("piece");
const pickedCont = document.querySelector(".picked-cont");
const picked = document.querySelector(".picked");
const closeCont = document.getElementById("rules");
const header = document.getElementById("header");
const housePreview = document.getElementById("housePreview");
const housePiece = document.getElementById("housePiece");
const outcome = document.querySelector(".outcome");
const result = document.querySelector(".result");
const score = document.querySelector(".score");

//change the opacity of the main element before all external files are loaded
document.addEventListener("DOMContentLoaded", function () {
    main.style.opacity = "0.5";
});

//Remove display by clicking the close img
closeImg.addEventListener("click", function () {
    closeCont.style.display = "none";
    main.style.opacity = "1";
    pickedCont.style.opacity = "1";
})

//Display the rules component
btnRules.addEventListener("click", function () {
    main.style.opacity = "0.5";
    pickedCont.style.opacity = "0.5";
    closeCont.style.display = "flex";

});

for (let i = 0; i < gamePiece.length; i++) {
    gamePiece[i].addEventListener("click", function () {
        setTimeout(() => {
            iconCont.style.display = "none";
            pickedCont.style.display = "flex";
        }, 1000)
        picked.style.boxShadow = window.getComputedStyle(gamePiece[i]).boxShadow;

        picked.style.backgroundColor = window.getComputedStyle(gamePiece[i]).backgroundColor;
        //Reduce the botton margin for the header when the max-width is 455px
        picked.querySelector(".img-d").src = gamePiece[i].querySelector(".img-d").src;
        if (window.getComputedStyle(document.body).width <= "455px") {
            header.style.marginBottom = "60px";
        }

        setTimeout(() => {
            housePreview.style.display = "none";
            housePiece.style.display = "flex";
        }, 2000);

        let num = randomNumber(gamePiece.length)
        housePiece.style.boxShadow = window.getComputedStyle(gamePiece[num]).boxShadow;
        housePiece.style.backgroundColor = window.getComputedStyle(gamePiece[num]).backgroundColor;
        housePiece.querySelector(".img-h").src = gamePiece[num].querySelector(".img-d").src;
        // I arranged the links according to their indexes from the rules into an array. Starting from scissors and ending at glove.
        const arr = ["http://127.0.0.1:5500/images/icon-scissors.svg", "http://127.0.0.1:5500/images/icon-paper.svg", "http://127.0.0.1:5500/images/icon-rock.svg", "http://127.0.0.1:5500/images/icon-lizard.svg", "http://127.0.0.1:5500/images/icon-spock.svg"];
        // Got the index of both the user picked and house picked
        let indexYou = arr.indexOf(picked.querySelector(".img-d").src);
        let indexHouse = arr.indexOf(housePiece.querySelector(".img-h").src);
        setTimeout(() => {
            /*   if ((indexYou - indexHouse === -1) || (indexYou - indexHouse === 2) || (indexYou === 1 && indexHouse === 4) || (indexYou === 4 && indexHouse === 0) || (indexYou === 0 && indexHouse === 3)) {
                   outcome.textContent = "you win";
               } else if (indexYou === indexHouse) {
                   outcome.textContent = "a tie";
               } else {
                   outcome.textContent = "you lose";
               } */
            //made it shorter with switch case.
            switch (indexYou - indexHouse) {
                case -1:
                case 2:
                case -3:
                case 4:
                    outcome.textContent = "you win";
                    break;
                case 0:
                    outcome.textContent = "a tie";
                    break;
                default:
                    outcome.textContent = "you lose";
                    break;
            }
            result.style.display = "flex";
            //
            let numScore = Number(score.textContent);
            if (outcome.textContent === "you win") {
                numScore += 1;
                score.textContent = numScore
            } else if (outcome.textContent === "you lose") {
                numScore -= 1;
                score.textContent = numScore;
            } else {
                score.textContent = numScore;
            }
        }, 2500)
    })

}
//get random number
function randomNumber(n) {
    return Math.floor(Math.random() * n)
}

//Takes you back to the selection page
document.getElementById("rePlay").addEventListener("click", function () {
    setTimeout(() => {
        iconCont.style.display = "block";
        pickedCont.style.display = "none";
        result.style.display = "none";
    }, 1000)
})

let cardsList = [
    {"name" : "ferragni", "img_src" : "Ferragni.png"},
    {"name" : "fedez", "img_src" : "Fedez.png"},
    {"name" : "amadeus", "img_src" : "Amadeus.png"},
    {"name" : "morandi", "img_src" : "Morandi.png"},
    {"name" : "fagnani", "img_src" : "Fagnani.png"},
    {"name" : "francini", "img_src" : "Francini.png"},
    {"name" : "mengoni", "img_src" : "Mengoni.png"}, 
    {"name" : "giorgia", "img_src" : "Giorgia.png"}, 
    {"name" : "iezzi", "img_src" : "Iezzi.png"}, 
    {"name" : "elodie", "img_src" : "Elodie.png"}
];

let count = 0;
let firstCardGuess = "";
let secondCardGuess = "";
let cardBoard = document.getElementById('card-board');
let grid = document.createElement('div');
grid.setAttribute('class', 'grid');
cardBoard.appendChild(grid);

let cardGrid = cardsList.concat(cardsList);
function shuffleArray(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let shuffledCards = shuffleArray(cardGrid);

function showCardBoard(){
    shuffledCards.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;
        card.innerHTML = `<img src = "${item.img_src}">`;
        grid.appendChild(card);
    })
}

showCardBoard();

grid.addEventListener('click', function(e){
    let selectedCard = e.target.parentElement;
    if(e.target.classList.contains('grid')){
        return;
    }

    if(count < 2){
        count++;
        if(count == 1){
            firstCardGuess = selectedCard.dataset.name;
            selectedCard.classList.add('selected', 'is-clicked');
        } else {
            if(!selectedCard.classList.contains('is-clicked')){
                secondCardGuess = selectedCard.dataset.name;
                console.log(secondCardGuess);
                selectedCard.classList.add('selected');
                checkCardMatch(firstCardGuess, secondCardGuess);
                document.querySelectorAll('.card').forEach((card) => {
                    card.classList.remove('is-clicked');
                });
            } else {
                count--;
            }
        }
    }
});

function checkCardMatch(guess1, guess2){
    if(guess1 == guess2) match();
    else unmatch();
}

let match = function(){
    let selectedCards = document.querySelectorAll('.selected');
    selectedCards.forEach(card => {
        card.classList.add('matched');
        card.querySelector('img').style.opacity = "1";
        card.style.pointerEvents = "none";
        card.style.opacity = "0.8";
        card.classList.remove('selected');
    });
    count = 0;
};

let unmatch = function(){
    let selectedCards = document.querySelectorAll('.selected');
    setTimeout(() => {
        selectedCards.forEach((card) => {
            card.classList.remove('selected');
        });
    }, 500);
    count = 0;
}

/* Timer */ 

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function StopCount() {
    clearTimeout(timer);
}

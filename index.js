let cards = document.querySelectorAll(".memory-card");
let lockBoard = false

let hasFlippeddcard = false;

let firstCard, secondCard;

function flipcard() {
    if (lockBoard) return;
    if(this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippeddcard) {
    //first click flipped 1st card
    hasFlippeddcard = true;
    firstCard = this;
    return;
  } 
    hasFlippeddcard = false;
    //second card has flipped
    secondCard = this;
    checkforMatch();

}

function checkforMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unflipCards();
  }
}
//lock cards once a match is found 
function disableCards() {
  firstCard.removeEventListener("click", flipcard);
  secondCard.removeEventListener("click", flipcard);
  restBoards();
}
//unflipping cards if not matched
function unflipCards() {
    lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
restBoards();
  }, 1000);
}
function restBoards(){
    [hasFlippeddcard, lockBoard]= [false,false];
    [firstCard,secondCard] = [null,null];
}
//IIFE Imediatly invoked function to shuffle the cards
(function shuffleCards(){
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach((card) => card.addEventListener("click", flipcard));

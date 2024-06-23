//create an array with all the card information
const cardArr = [
  { id: 1, letter: "A" },
  { id: 2, letter: "B" },
  { id: 3, letter: "C" },
  { id: 4, letter: "D" },
  { id: 5, letter: "E" },
  { id: 6, letter: "F" },
  { id: 7, letter: "G" },
  { id: 8, letter: "H" },
  { id: 9, letter: "A" },
  { id: 10, letter: "B" },
  { id: 11, letter: "C" },
  { id: 12, letter: "D" },
  { id: 13, letter: "E" },
  { id: 14, letter: "F" },
  { id: 15, letter: "G" },
  { id: 16, letter: "H" },
];

//create 16 divs(cards) inside container
const container = document.querySelector(".container");

for (let i = 0; i < 16; i++) {
  //create card container
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  //create card, with front and back
  const card = document.createElement("div");
  card.classList.add("card");

  const front = document.createElement("div");
  front.classList.add("front");

  const back = document.createElement("div");
  back.classList.add("back");
  back.innerText = cardArr[i].letter;

  //back.innerText = "hshs";

  //assign each card an id from the cardArr
  const id = cardArr[i].id;
  card.setAttribute("id", id);

  cardContainer.appendChild(front);
  cardContainer.appendChild(back);
  card.appendChild(cardContainer);

  container.appendChild(card);
}

//loop through all cards and add event listener to each card
let clickArr = [];
let roundCount = 1;

function round() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.currentTarget);
      if (clickArr.length >= 2) {
        return;
      }

      //get the card
      const card = e.currentTarget;

      //get the clicked card's id
      const id = Number(card.id);
      //find the card's letter in the array
      const letter = cardArr[id - 1].letter;

      //check if clicked card exists in array, if not add it
      const cardExists = clickArr.filter((arr) => arr[0] === id);
      if (cardExists.length === 0) {
        clickArr.push([id, letter]);
      }

      const cardContainer = card.querySelector(".card-container");
      cardContainer.classList.add("flipped");

      //add back class to card and remove front class
      //card.classList.add("flipped");
      //card.classList.add("back");
      //card.classList.remove("front");

      //update the card with the letter
      //card.innerText = letter;

      //select all cards with the class back
      const flippedCards = document.querySelectorAll(".flipped");

      if (clickArr.length === 2) {
        if (clickArr[0][1] == letter) {
          console.log("same");
          clickArr = [];
        } else {
          console.log("not");

          setTimeout(() => {
            const prevId = clickArr[0][0] - 1;
            //cards[prevId].querySelector(".back").innerText = "";
            //cards[prevId].classList.remove("back");
            cards[prevId]
              .querySelector(".card-container")
              .classList.remove("flipped");
            //cards[prevId].classList.add("front");
            //cards[id].innerText = "";
            //back.innerText = "";
            //card.classList.remove("back");
            cardContainer.classList.remove("flipped");
            //card.classList.add("front");
            clickArr = [];
            /*flippedCards.forEach((card) => {
              card.classList.remove("back");
              card.classList.remove("flipped");
              card.classList.add("front");
            });*/
          }, 1000);
        }
      }
      console.log(clickArr);
    });
  });
}

round();

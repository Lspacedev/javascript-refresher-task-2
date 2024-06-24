//random number generator
function randomIndex(min, max) {
  let arr = [];
  while (arr.length < 16) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    }
  }

  return arr;
}

//create an array with all the card text
const cardArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];

const container = document.querySelector(".container");

function gameSetup(array) {
  //create header div
  const header = document.createElement("div");
  header.classList.add("header");

  header.innerHTML = `<div class="logo">Memory Game</div>
                    <div class="score-board">
                    <p>Score:</p>
                    <p class="score"></p>
                    </div>
                    <button class="reset-btn">Reset</button>
                    `;

  //create cards div container
  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards");

  //create 16 divs inside container
  for (let i = 0; i < 16; i++) {
    //create card container and card, with front and back
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");

    //get random index from index array
    let index = array[i];

    //assign letter from the cardArr to backdiv innerText, using index
    back.innerText = cardArr[index];

    //assign each card an id using i
    card.setAttribute("id", i);

    cardContainer.appendChild(front);
    cardContainer.appendChild(back);

    card.appendChild(cardContainer);
    cardsContainer.appendChild(card);
  }

  container.appendChild(header);
  container.appendChild(cardsContainer);
}

function Game() {
  //loop through all cards and add event listener to each card
  let clickArr = [];

  //create score
  let score = 0;
  const scoreDiv = document.querySelector(".score");
  scoreDiv.innerText = score;

  //loop through all cards and add event listener
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      //if 2 or more divs are clicked at time return
      if (clickArr.length === 2) {
        return;
      }

      //find the card's id and letter
      const card = e.currentTarget;

      const id = Number(card.id);

      const letter = card.querySelector(".back").innerText;

      //check if clicked card exists in array, if not add it
      const cardExists = clickArr.filter((arr) => arr[0] === id);

      if (cardExists.length === 0) {
        clickArr.push([id, letter]);
      }

      //select card container and add flipped class to create flipped effect
      const cardContainer = card.querySelector(".card-container");
      cardContainer.classList.add("flipped");

      //if two cards are clicked, check if the letters match
      //if the first card clicked is equal to the current letter, clear array

      if (clickArr.length === 2) {
        if (clickArr[0][1] == letter) {
          clickArr = [];
          //update score
          scoreDiv.innerText = ++score;
        } else {
          //if cards'letters don't match, remove flipped class from the card container after 1 second
          setTimeout(() => {
            //select first card's id from the clickArr
            const prevId = clickArr[0][0];

            //remove flipped class from the first card
            cards[prevId]
              .querySelector(".card-container")
              .classList.remove("flipped");

            //remove flipped class from the current card
            cardContainer.classList.remove("flipped");

            //clear the clickArr to resume clicking
            clickArr = [];
          }, 1000);
        }
      }
    });
  });

  //reset button

  const resetBtn = document.querySelector(".reset-btn");
  resetBtn.addEventListener("click", () => {
    const scoreDiv = document.querySelector(".score");
    scoreDiv.innerText = 0;

    const cards = document.querySelectorAll(".card");

    //loop through all cards
    cards.forEach((card) => {
      //remove flipped class to remove flip effect, leaving the cards face down
      card.querySelector(".card-container").classList.remove("flipped");
      //prevent clicking before reset
      card.style.pointerEvents = "none";
    });

    //clear container after 1 second so that flip effect is visible when cards become face down
    setTimeout(() => {
      //clear container div
      while (container.firstChild) {
        container.firstChild.remove();
      }

      //create new random indexes array
      let indexArr = randomIndex(0, 15);
      //setup the game with new indexes
      gameSetup(indexArr);
      //restart game
      Game();
    }, 500);
  });
}

//create random indexes array
let indexArr = randomIndex(0, 15);

//setup and start game
gameSetup(indexArr);
Game();

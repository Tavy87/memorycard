
const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let remainingTime = 90;
let timerId;

document.querySelector(".score").textContent = score;

cards = [
  {
    image: "https://m.media-amazon.com/images/I/418YfJYWH4L.AC.jpg",
    name: "Snorlax"
  },
  {
    image: "https://m.media-amazon.com/images/I/41B8Q48D3BL.AC.jpg",
    name: "Jigglypuff"
  },
  {
    image: "https://m.media-amazon.com/images/I/51Gp9wiumLL._AC_SX300_SY300_QL70_FMwebp.jpg",
    name: "Caterpie"
  },
  {
    image: "https://m.media-amazon.com/images/I/51X-K4L806L.AC.jpg",
    name: "Magikarp"
  },
  {
    image: "https://m.media-amazon.com/images/I/51nx-OkjMnL.AC.jpg",
    name: "Pikachu"
  },
  {
    image: "https://m.media-amazon.com/images/I/51TxlvrsoBL.AC.jpg",
    name: "Squirtle"
  },
  {
    image: "https://m.media-amazon.com/images/I/410qBt1e7LL.AC.jpg",
    name: "Bulbasaur"
  },
  {
    image: "https://m.media-amazon.com/images/I/418SGYtjRmL.AC.jpg",
    name: "Charmander"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX10/EX10_EN_65.png",
    name: "Onix"
  },
  {
    image: "https://m.media-amazon.com/images/I/61Vl2DZHwXL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    name: "Oddish"
  },
  {
    image: "https://m.media-amazon.com/images/I/41bnwpc9hDL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    name: "Horsea"
  },
  {
    image: "https://m.media-amazon.com/images/I/41DWXNXIPVL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    name: "Eevee"
  },
  {
    image: "https://m.media-amazon.com/images/I/418YfJYWH4L.AC.jpg",
    name: "Snorlax"
  },
  {
    image: "https://m.media-amazon.com/images/I/41B8Q48D3BL.AC.jpg",
    name: "Jigglypuff"
  },
  {
    image: "https://m.media-amazon.com/images/I/51Gp9wiumLL._AC_SX300_SY300_QL70_FMwebp.jpg",
    name: "Caterpie"
  },
  {
    image: "https://m.media-amazon.com/images/I/51X-K4L806L.AC.jpg",
    name: "Magikarp"
  },
  {
    image: "https://m.media-amazon.com/images/I/51nx-OkjMnL.AC.jpg",
    name: "Pikachu"
  },
  {
    image: "https://m.media-amazon.com/images/I/51TxlvrsoBL.AC.jpg",
    name: "Squirtle"
  },
  {
    image: "https://m.media-amazon.com/images/I/410qBt1e7LL.AC.jpg",
    name: "Bulbasaur"
  },
  {
    image: "https://m.media-amazon.com/images/I/418SGYtjRmL.AC.jpg",
    name: "Charmander"
  },
  {
    image: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX10/EX10_EN_65.png",
    name: "Onix"
  },
    {
    image: "https://m.media-amazon.com/images/I/61Vl2DZHwXL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    name: "Oddish"
  },
  {
    image: "https://m.media-amazon.com/images/I/41bnwpc9hDL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    name: "Horsea"
  },
  {
    image: "https://m.media-amazon.com/images/I/41DWXNXIPVL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    name: "Eevee"
  }
];

shuffleCards();
generateCards();

function startTimer() {
  timerId = setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) {
      clearInterval(timerId);
      endGame();
    }
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const timerElement = document.querySelector(".timer");
  timerElement.textContent = remainingTime;
}

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
  remainingTime = 90;
  startTimer();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  document.querySelector(".score").textContent = score;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score += 1;
  document.querySelector(".score").textContent = score;
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
  }, 750);
  setTimeout(() => {
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 750);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  document.querySelector(".title").textContent = "Gotta Match Em All!";
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  clearInterval(timerId);
  generateCards();
}

function endGame() {
  lockBoard = true;
  document.querySelector(".title").textContent = "Game over!";
}
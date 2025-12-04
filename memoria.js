const emojis = ['🍎','🍌','🍇','🍓','🍉','🍒','🍋','🥝'];
let cardsArray = [...emojis, ...emojis];
let firstCard, secondCard;
let lockBoard = false;
let attempts = 0;

const gameContainer = document.getElementById('memory-game');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restart-btn');

// Embaralha as cartas
function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

// Cria o tabuleiro
function createBoard() {
  gameContainer.innerHTML = '';
  shuffle(cardsArray);
  cardsArray.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.innerHTML = `
      <div class="front-face">${emoji}</div>
      <div class="back-face"></div>
    `;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
  });
}

// Lógica de virar carta
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Verifica se deu match
function checkForMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;
  isMatch ? disableCards() : unflipCards();
  attempts++;
  attemptsDisplay.textContent = attempts;
}

// Desabilita as cartas certas
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();

  // Verifica vitória
  if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
    setTimeout(() => alert(`🎉 Parabéns! Você venceu em ${attempts} tentativas.`), 500);
  }
}

// Desvira cartas erradas
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// Reseta variáveis
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Reiniciar
restartBtn.addEventListener('click', () => {
  attempts = 0;
  attemptsDisplay.textContent = 0;
  resetBoard();
  createBoard();
});

createBoard();

// ======= Tudo só inicia depois do DOM carregar =======
document.addEventListener('DOMContentLoaded', () => {
  // ======= MENSAGEM INICIAL =======
  const startBtn       = document.getElementById('start-btn');
  const introContainer = document.getElementById('intro-container');
  const gameSection    = document.querySelector('main .game-section');

  if (startBtn && introContainer && gameSection) {
    startBtn.addEventListener('click', () => {
      introContainer.classList.add('hidden');   // esconde a mensagem
      gameSection.classList.remove('hidden');   // mostra o jogo
    });
  }

  // ======= JOGO DA MEMÓRIA =======
  const emojis        = ['🍎','🍌','🍇','🍓','🍉','🍒','🍋','🥝'];
  let cardsArray      = [...emojis, ...emojis];
  let firstCard, secondCard;
  let lockBoard       = false;
  let attempts        = 0;

  const gameContainer   = document.getElementById('memory-game');
  const attemptsDisplay = document.getElementById('attempts');
  const restartBtn      = document.getElementById('restart-btn');

  // Embaralha as cartas
  function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
  }

  // Cria o tabuleiro
  function createBoard() {
    if (!gameContainer) return;
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
    if (attemptsDisplay) attemptsDisplay.textContent = attempts;
  }

  // Desabilita as cartas certas
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    // Verifica vitória
    const remaining = document.querySelectorAll('.memory-card:not(.flip)').length;
    if (remaining === 0) {
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

  // Reseta variáveis de controle
  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  // Reiniciar jogo
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      attempts = 0;
      if (attemptsDisplay) attemptsDisplay.textContent = 0;
      resetBoard();
      createBoard();
    });
  }

  // Inicializa o jogo (mas visualmente ele só aparece depois do "Começar o Jogo")
  createBoard();

  // ===== MENU HAMBÚRGUER LATERAL =====
  const toggle   = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      // anima botão (vira X)
      toggle.classList.toggle('open');

      // remove menus/backdrops antigos
      document.querySelectorAll('.navbar-menu-mobile, .menu-backdrop')
        .forEach(e => e.remove());

      // se abriu, cria menu + backdrop
      if (toggle.classList.contains('open')) {
        const menu = document.createElement('ul');
        menu.className = 'navbar-menu-mobile';
        menu.innerHTML = navLinks.innerHTML;
        document.body.appendChild(menu);

        const backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        backdrop.onclick = () => {
          menu.remove();
          backdrop.remove();
          toggle.classList.remove('open');
        };
        document.body.appendChild(backdrop);

        // fecha ao clicar em link
        menu.querySelectorAll('a').forEach(link => {
          link.onclick = () => {
            menu.remove();
            backdrop.remove();
            toggle.classList.remove('open');
          };
        });
      }
    });
  } else {
    console.warn('Navbar toggle ou nav-links não encontrados na página.');
  }
});

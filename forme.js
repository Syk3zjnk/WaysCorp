const words = [
  { word: "banana", img: "ImgJogo/banana.jpg" },
  { word: "gato",   img: "ImgJogo/gato.png" },
  { word: "peixe",  img: "ImgJogo/peixe.jpg" },
  { word: "foca",   img: "ImgJogo/foca.jpg" },
  { word: "bola",   img: "ImgJogo/bola.jpg" },
  { word: "nuvem",  img: "nuvem.png" },
  { word: "leao",   img: "ImgJogo/leao.jpg" },
  { word: "sol",    img: "ImgJogo/sol.jpg" },
  { word: "uva",    img: "ImgJogo/uva.jpg" },
  { word: "pato",   img: "ImgJogo/pato.jpg" },
  { word: "flor",   img: "ImgJogo/flor.jpg" },
  { word: "casa",   img: "ImgJogo/casa.jpg" },
  { word: "lobo",   img: "ImgJogo/lobo.jpg" },
  { word: "vaca",   img: "ImgJogo/vaca.jpg" },
  { word: "rato",   img: "ImgJogo/rato.jpg" },
  { word: "coco",   img: "ImgJogo/coco.jpg" },
  { word: "panda",  img: "ImgJogo/panda.jpg" },
  { word: "sapo",   img: "ImgJogo/sapo.jpg" },
  { word: "mel",    img: "ImgJogo/mel.jpg" },
  { word: "cubo",   img: "ImgJogo/cubo.jpg" }
];

let currentIndex = 0;
let selectedWord = "";
let formedWord = "";

const wordImage          = document.getElementById("word-image");
const scrambledContainer = document.getElementById("scrambled");
const answerContainer    = document.getElementById("answer");
const message            = document.getElementById("message");
const nextBtn            = document.getElementById("next-btn");

/* ===== FUNÇÃO DE EMBARALHAR ===== */
function shuffle(word) {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

/* ===== CARREGAR NOVA PALAVRA ===== */
function loadWord() {
  message.textContent = "";
  message.className = "";
  formedWord = "";
  answerContainer.innerHTML = "";

  const { word, img } = words[currentIndex];
  selectedWord = word;
  wordImage.src = img;

  scrambledContainer.innerHTML = "";
  const scrambled = shuffle(word);

  scrambled.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;

    span.addEventListener("click", () => selectLetter(span));

    scrambledContainer.appendChild(span);
  });
}

/* ===== SELECIONAR LETRA ===== */
function selectLetter(span) {
  formedWord += span.textContent;

  answerContainer.innerHTML = formedWord
    .split("")
    .map((l) => `<span class="added">${l}</span>`)
    .join("");

  span.classList.add("hidden");

  setTimeout(() => {
    const lastSpan = answerContainer.lastElementChild;
    if (lastSpan) lastSpan.classList.remove("added");
  }, 200);

  if (formedWord.length === selectedWord.length) {
    checkWord();
  }
}

/* ===== CHECAR RESPOSTA ===== */
function checkWord() {
  if (formedWord === selectedWord) {
    message.textContent = `🎉 Parabéns! Você acertou: "${selectedWord}"`;
    message.className = "";
    void message.offsetWidth;
    message.classList.add("success");

    // revela letras restantes (para próxima rodada)
    scrambledContainer.querySelectorAll("span").forEach((s) => {
      s.classList.remove("hidden");
    });
  } else {
    message.textContent = "😵 Ops! Tente novamente!";
    message.className = "";
    void message.offsetWidth;
    message.classList.add("error");

    resetWord();
  }
}

/* ===== RESETAR APENAS LETRAS ===== */
function resetWord() {
  formedWord = "";
  answerContainer.innerHTML = "";

  scrambledContainer.querySelectorAll("span").forEach((s) => {
    s.classList.remove("hidden");
  });
}

/* ===== PRÓXIMO ===== */
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % words.length;
  loadWord();
});

/* ===== TELA INICIAL E INICIAR JOGO ===== */
const introContainer = document.getElementById("intro-container");
const gameSection    = document.querySelector(".game-section");
const startBtn       = document.getElementById("start-btn");

// esconder jogo no começo
gameSection.style.display = "none";

startBtn.addEventListener("click", () => {
  introContainer.style.display = "none";
  gameSection.style.display = "flex";
  loadWord();
});

/* ===== MENU HAMBÚRGUER LATERAL ===== */
const toggle   = document.querySelector('.navbar-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
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
}

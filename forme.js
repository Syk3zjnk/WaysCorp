const words = [
  { word: "banana", img: "imagens/banana.jpg" },
  { word: "gato", img: "imagens/gato.png" },
  { word: "peixe", img: "https://i.ibb.co/hZsdYzF/fish.png" },
  { word: "foca", img: "imagens/foca.jpg" },
  { word: "bola", img: "https://i.ibb.co/x7nYyLt/ball.png" },
  { word: "nuvem", img: "https://i.ibb.co/sHpgJpZ/cloud.png" },
  { word: "leao", img: "https://i.ibb.co/pw5VG9h/lion.png" },
  { word: "sol", img: "https://i.ibb.co/L6tX0VR/sun.png" },
  { word: "uva", img: "https://i.ibb.co/sKMGXv2/grape.png" },
  { word: "pato", img: "https://i.ibb.co/FhJc7Cy/duck.png" },
  { word: "flor", img: "https://i.ibb.co/31qVSDc/flower.png" },
  { word: "casa", img: "https://i.ibb.co/fCd6mgL/house.png" },
  { word: "lobo", img: "https://i.ibb.co/9TwN9H8/wolf.png" },
  { word: "vaca", img: "https://i.ibb.co/F3LpvW4/cow.png" },
  { word: "rato", img: "https://i.ibb.co/Fb0ns9s/mouse.png" },
  { word: "coco", img: "https://i.ibb.co/X7WhxDy/coconut.png" },
  { word: "panda", img: "https://i.ibb.co/HN8mBQ1/panda.png" },
  { word: "sapo", img: "https://i.ibb.co/4FDFVq7/frog.png" },
  { word: "mel", img: "https://i.ibb.co/3yXrYmC/honey.png" },
  { word: "cubo", img: "https://i.ibb.co/Kjmr6kQ/cube.png" }
];

let currentIndex = 0;
let selectedWord = "";
let formedWord = "";

const wordImage = document.getElementById("word-image");
const scrambledContainer = document.getElementById("scrambled");
const answerContainer = document.getElementById("answer");
const message = document.getElementById("message");
const nextBtn = document.getElementById("next-btn");

function shuffle(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function loadWord() {
  message.textContent = "";
  formedWord = "";
  answerContainer.textContent = "";
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

function selectLetter(span) {
  formedWord += span.textContent;
  answerContainer.textContent = formedWord;
  span.style.visibility = "hidden";

  if (formedWord.length === selectedWord.length) {
    if (formedWord === selectedWord) {
      message.textContent = "🎉 Parabéns! Você acertou!";
      scrambledContainer.querySelectorAll("span").forEach(s => s.style.visibility = "visible");
    } else {
      message.textContent = "Ops! Tente novamente!";
      resetWord();
    }
  }
}

function resetWord() {
  formedWord = "";
  answerContainer.textContent = "";
  scrambledContainer.querySelectorAll("span").forEach(s => s.style.visibility = "visible");
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % words.length;
  loadWord();
});

loadWord();

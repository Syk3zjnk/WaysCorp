const animals = [
  {
    name: "koala",
    img: "imagens/koala.jpg",
    hint: "Eles dormem até 20 horas por dia e só se alimentam de folhas de eucalipto — que são tóxicas para a maioria dos animais!"
  },
  {
    name: "girafa",
    img: "imagens/girafa.jpg",
    hint: "A girafa é o animal terrestre mais alto do mundo — sua língua pode medir até 50 cm e é azulada!"
  },
  {
    name: "pinguim",
    img: "imagens/pinguim.jpg",
    hint: "Os pinguins são aves que não voam, mas nadam com tanta agilidade que parecem 'voar' debaixo d'água."
  },
  {
    name: "elefante",
    img: "imagens/elefante.jpg",
    hint: "Os elefantes são os maiores animais terrestres e podem reconhecer a própria imagem no espelho."
  },
  {
    name: "tartaruga",
    img: "imagens/tartaruga.jpg",
    hint: "Algumas tartarugas podem viver mais de 150 anos! Elas respiram ar, mesmo quando passam muito tempo na água."
  }
];

let current = 0;

const imgEl = document.getElementById("animal-img");
const wordDisplay = document.getElementById("word-display");
const input = document.getElementById("guess-input");
const checkBtn = document.getElementById("check-btn");
const feedback = document.getElementById("feedback");
const hintBtn = document.getElementById("hint-btn");
const hintEl = document.getElementById("hint");
const nextBtn = document.getElementById("next-btn");

function showAnimal(index) {
  const animal = animals[index];
  imgEl.src = animal.img;
  wordDisplay.textContent = "_ ".repeat(animal.name.length);
  input.value = "";
  feedback.textContent = "";
  hintEl.textContent = "";
}

checkBtn.addEventListener("click", () => {
  const guess = input.value.trim().toLowerCase();
  const animal = animals[current];
  if (guess === animal.name) {
    feedback.textContent = "✅ Acertou!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Tente novamente!";
    feedback.style.color = "red";
  }
});

hintBtn.addEventListener("click", () => {
  hintEl.textContent = "💡 " + animals[current].hint;
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % animals.length;
  showAnimal(current);
});

showAnimal(current);

const todasPalavras = [
  "internet", "computador", "teclado", "mouse", "software", "hardware", "rede",
  "navegador", "servidor", "programa", "memoria", "monitor", "dados", "tecnologia",
  "login", "senha", "criptografia", "impressora", "codigo", "algoritmo"
];

const gridSize = 12;
const gridContainer = document.getElementById("wordsearch");
const wordListContainer = document.getElementById("word-list");
const restartButton = document.getElementById("restart-btn");

let palavras = [];
let selectedCells = [];
let foundWords = [];
let grid = [];

function sortearPalavras() {
  const quantidade = 7;
  const palavrasSorteadas = [];
  while (palavrasSorteadas.length < quantidade) {
    const aleatoria = todasPalavras[Math.floor(Math.random() * todasPalavras.length)];
    if (!palavrasSorteadas.includes(aleatoria)) {
      palavrasSorteadas.push(aleatoria);
    }
  }
  return palavrasSorteadas;
}

function generateGrid() {
  palavras = sortearPalavras();
  grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
  selectedCells = [];
  foundWords = [];
  gridContainer.innerHTML = "";

  palavras.forEach(word => placeWord(word));
  fillEmptySpaces();
  renderGrid();
  renderWordList();
}

function placeWord(word) {
  const directions = [
    { dr: 0, dc: 1 }, { dr: 0, dc: -1 },
    { dr: 1, dc: 0 }, { dr: -1, dc: 0 },
    { dr: 1, dc: 1 }, { dr: -1, dc: -1 },
    { dr: 1, dc: -1 }, { dr: -1, dc: 1 }
  ];

  let placed = false;
  let attempts = 0;

  while (!placed && attempts < 500) {
    attempts++;
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);

    if (
      row + dir.dr * (word.length - 1) >= 0 &&
      row + dir.dr * (word.length - 1) < gridSize &&
      col + dir.dc * (word.length - 1) >= 0 &&
      col + dir.dc * (word.length - 1) < gridSize
    ) {
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dir.dr * i;
        const c = col + dir.dc * i;
        if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const r = row + dir.dr * i;
          const c = col + dir.dc * i;
          grid[r][c] = word[i];
        }
        placed = true;
      }
    }
  }
}

function fillEmptySpaces() {
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
}

function renderGrid() {
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement("div");
      cell.textContent = grid[r][c];
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      gridContainer.appendChild(cell);
    }
  }
}

// === SELEÇÃO ===
gridContainer.addEventListener("click", e => {
  const cell = e.target;
  if (!cell.classList.contains("cell") || cell.classList.contains("found")) return;

  // Seleção inicial ou sequência
  if (selectedCells.length === 0) {
    cell.classList.add("selected");
    selectedCells.push(cell);
  } else {
    const last = selectedCells[selectedCells.length - 1];
    const dr = parseInt(cell.dataset.row) - parseInt(last.dataset.row);
    const dc = parseInt(cell.dataset.col) - parseInt(last.dataset.col);

    // Permite apenas movimentos em linha reta (8 direções)
    if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1 && !(dr === 0 && dc === 0)) {
      cell.classList.add("selected");
      selectedCells.push(cell);
    } else {
      // Se o jogador clicar fora da sequência, reinicia seleção
      selectedCells.forEach(c => c.classList.remove("selected"));
      selectedCells = [cell];
      cell.classList.add("selected");
    }
  }

  checkWord();
});

function checkWord() {
  if (selectedCells.length < 2) return; // evita verificar só 1 letra

  const word = selectedCells.map(c => c.textContent.toLowerCase()).join("");
  const reversed = word.split("").reverse().join("");

  const foundWord = palavras.find(w => w === word || w === reversed);

  if (foundWord && !foundWords.includes(foundWord)) {
    foundWords.push(foundWord);
    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("found");
    });
    selectedCells = [];
    renderWordList();

    if (foundWords.length === palavras.length) {
      setTimeout(() => alert("🎉 Parabéns! Você encontrou todas as palavras!"), 200);
    }
  }
}

function renderWordList() {
  wordListContainer.innerHTML = `
    <h3>Palavras</h3>
    <ul>
      ${palavras
        .map(
          w =>
            `<li class="${foundWords.includes(w) ? "word-found" : ""}">${w}</li>`
        )
        .join("")}
    </ul>
  `;
}

restartButton.addEventListener("click", generateGrid);
generateGrid();
// Função para mostrar o modal
function showVictoryModal() {
  const modal = document.getElementById("victoryModal");
  modal.style.display = "flex";

  document.getElementById("playAgainBtn").addEventListener("click", () => {
    modal.style.display = "none";
    generateGrid(); // reinicia o caça-palavras
  });
}

// Verifica se todas as palavras foram encontradas
function checkVictory() {
  if (foundWords.length === palavras.length) {
    setTimeout(() => {
      showVictoryModal();
    }, 300);
  }
}

// Exemplo: depois de marcar palavra encontrada
// cell.addEventListener('click', () => {
//    marcarPalavra(cell);
//    checkVictory();
// });

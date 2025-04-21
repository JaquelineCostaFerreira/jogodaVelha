const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;

// Combinações de vitória
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  gameActive = true;
  currentPlayer = 'X';
}

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    message.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    message.textContent = 'Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

restartButton.addEventListener('click', startGame);

// Inicia o jogo quando carrega
startGame();
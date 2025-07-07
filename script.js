const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const winningLine = document.getElementById('winningLine');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winConditions = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // col 1
  [1, 4, 7], // col 2
  [2, 5, 8], // col 3
  [0, 4, 8], // diag TL-BR
  [2, 4, 6]  // diag TR-BL
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const win = checkWinner();
  if (win !== null) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    showWinningLine(win);
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return i; // return index of winning condition
    }
  }
  return null;
}

function showWinningLine(lineIndex) {
  winningLine.className = 'winning-line line-' + lineIndex;
  winningLine.style.display = 'block';
}

function resetGame() {
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => (cell.textContent = ""));
  winningLine.style.display = 'none';
  winningLine.className = 'winning-line';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

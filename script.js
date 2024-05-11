const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const restartButton = document.getElementById('restart');

const player1 = {
  name: 'Vishal',
  symbol: 'X'
};

const player2 = {
  name: 'Vinay',
  symbol: 'O'
};

let currentPlayer = player1;
let startingPlayer = player1; 
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer.symbol;
  clickedCell.innerText = currentPlayer.symbol;
  clickedCell.classList.add('cell-clicked'); 
  
  if (checkWin()) {
    turnDisplay.innerText = `${currentPlayer.name} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    turnDisplay.innerText = "Please Play again!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === player1 ? player2 : player1;
  turnDisplay.innerText = `${currentPlayer.name}'s turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer.symbol;
    });
  });
}

function checkDraw() {
  return gameState.every(cell => {
    return cell !== '';
  });
}

function handleRestart() {
  currentPlayer = startingPlayer; 
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  turnDisplay.innerText = `${currentPlayer.name}'s turn`;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('cell-clicked'); 
  });
}
function toggleStartingPlayer() {
  startingPlayer = startingPlayer === player1 ? player2 : player1;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', () => {
  toggleStartingPlayer(); 
  handleRestart();
});

import {fetchCheckSolution, fetchNewGame} from './api.js';
import {
  displayValidationResults,
  getCurrentBoard,
  renderPuzzle
} from './board.js';
import {startTimer, stopTimer} from './timer.js';

/** Display an error returned by the backend in the game message element. */
function displayError(message) {
  const messageElement = document.getElementById('message');
  messageElement.style.color = '#d32f2f';
  messageElement.innerText = message;
}

/** Start a new game using the difficulty selected by the player. */
async function newGame() {
  const difficulty = document.getElementById('difficulty-select').value;
  const data = await fetchNewGame(difficulty);
  if (data.error) {
    displayError(data.error);
    return;
  }
  renderPuzzle(data.puzzle);
  document.getElementById('message').innerText = '';
  startTimer();
}

/** Check the current board and display incorrect cells or a success message. */
async function checkSolution() {
  const data = await fetchCheckSolution(getCurrentBoard());
  const messageElement = document.getElementById('message');
  if (data.error) {
    displayError(data.error);
    return;
  }
  const incorrectCount = displayValidationResults(data.incorrect);
  if (incorrectCount === 0) {
    stopTimer();
    messageElement.style.color = '#388e3c';
    messageElement.innerText = 'Congratulations! You solved it!';
  } else {
    messageElement.style.color = '#d32f2f';
    messageElement.innerText = 'Some cells are incorrect.';
  }
}

/** Apply the saved theme preference to the page without a light-mode flash. */
function applySavedDarkMode() {
  const enabled = localStorage.getItem('dark-mode') === 'enabled';
  document.body.classList.toggle('dark-mode', enabled);
  document.documentElement.classList.remove('dark-mode-preload');
  return enabled;
}

/** Toggle dark mode and persist the user's preference for future visits. */
function toggleDarkMode() {
  const enabled = document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', enabled ? 'enabled' : 'disabled');
}

/** Wire controls and initialize the first Sudoku puzzle after page load. */
window.addEventListener('load', () => {
  applySavedDarkMode();
  document.getElementById('new-game').addEventListener('click', newGame);
  document.getElementById('check-solution').addEventListener('click', checkSolution);
  document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
  newGame();
});
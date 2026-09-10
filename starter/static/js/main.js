import {fetchCheckSolution, fetchHint, fetchNewGame} from './api.js';
import {
  displayValidationResults,
  getCurrentBoard,
  applyHint,
  renderPuzzle
} from './board.js';
import {recordHint, resetHints} from './hint.js';
import {getHintsUsed} from './hint.js';
import {getElapsedSeconds, startTimer, stopTimer} from './timer.js';
import {renderLeaderboard, saveScore} from './leaderboard.js';

let gameSolved = false;

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
  resetHints();
  gameSolved = false;
  startTimer();
}

/** Request one hint, apply it to the board, and record its use. */
async function requestHint() {
  const data = await fetchHint(getCurrentBoard());
  if (data.error) {
    displayError(data.error);
    return;
  }

  if (applyHint(data.row, data.col, data.value)) {
    recordHint();
    document.getElementById('message').innerText = 'Hint applied.';
  }
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
    const elapsedSeconds = getElapsedSeconds();
    stopTimer();
    messageElement.style.color = '#388e3c';
    messageElement.innerText = `Congratulations! You solved it in ${formatTime(elapsedSeconds)} with ${getHintsUsed()} hint(s).`;
    if (!gameSolved) {
      gameSolved = true;
      const name = window.prompt('Enter your name for the leaderboard:') || 'Anonymous';
      saveScore({
        name: name.trim() || 'Anonymous',
        time: elapsedSeconds,
        difficulty: document.getElementById('difficulty-select').value,
        hints: getHintsUsed(),
        date: new Date().toISOString()
      });
      renderLeaderboard();
    }
  } else {
    messageElement.style.color = '#d32f2f';
    messageElement.innerText = 'Some cells are incorrect.';
  }
}

/** Format elapsed seconds for the solved-game congratulatory message. */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
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
  renderLeaderboard();
  document.getElementById('new-game').addEventListener('click', newGame);
  document.getElementById('check-solution').addEventListener('click', checkSolution);
  document.getElementById('hint-button').addEventListener('click', requestHint);
  document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
  newGame();
});
let elapsedSeconds = 0;
let timerId = null;

/** Format elapsed seconds as a zero-padded MM:SS value. */
function formatElapsedTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

/** Update the timer display with the current elapsed time. */
function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  if (display) {
    display.textContent = formatElapsedTime(elapsedSeconds);
  }
}

/** Start counting from zero for a newly loaded puzzle. */
export function startTimer() {
  stopTimer();
  elapsedSeconds = 0;
  updateTimerDisplay();
  timerId = window.setInterval(() => {
    elapsedSeconds += 1;
    updateTimerDisplay();
  }, 1000);
}

/** Stop counting while preserving the elapsed time for later use. */
export function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

/** Return the current elapsed time in seconds for leaderboard scoring. */
export function getElapsedSeconds() {
  return elapsedSeconds;
}
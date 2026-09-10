const LEADERBOARD_KEY = 'sudokuLeaderboard';
const MAX_ENTRIES = 10;

/** Format a number of seconds as a zero-padded MM:SS value. */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

/** Read saved scores from localStorage, returning an empty list if absent or invalid. */
export function getLeaderboard() {
  const saved = localStorage.getItem(LEADERBOARD_KEY);
  if (!saved) return [];

  try {
    const entries = JSON.parse(saved);
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    return [];
  }
}

/** Add a score, keep the ten fastest entries, and persist the result. */
export function saveScore(entry) {
  const entries = [...getLeaderboard(), {
    name: entry.name,
    time: entry.time,
    difficulty: entry.difficulty,
    hints: entry.hints,
    date: entry.date || new Date().toISOString()
  }];
  entries.sort((first, second) => first.time - second.time);
  const topEntries = entries.slice(0, MAX_ENTRIES);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topEntries));
  return topEntries;
}

/** Render saved scores as a ranked table in the leaderboard container. */
export function renderLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  if (!leaderboard) return;

  const entries = getLeaderboard();
  leaderboard.innerHTML = '<h2>Top 10 Leaderboard</h2>';
  if (entries.length === 0) {
    leaderboard.insertAdjacentHTML('beforeend', '<p>No scores yet.</p>');
    return;
  }

  const table = document.createElement('table');
  table.className = 'leaderboard-table';
  table.innerHTML = `
    <thead>
      <tr><th>Rank</th><th>Name</th><th>Time</th><th>Difficulty</th><th>Hints</th></tr>
    </thead>
    <tbody></tbody>`;
  const body = table.querySelector('tbody');
  entries.forEach((entry, index) => {
    const row = document.createElement('tr');
    [
      index + 1,
      entry.name,
      formatTime(entry.time),
      entry.difficulty,
      entry.hints
    ].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    body.appendChild(row);
  });
  leaderboard.appendChild(table);
}
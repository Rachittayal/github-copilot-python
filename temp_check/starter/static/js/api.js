/** Request a new puzzle for the selected difficulty. */
export async function fetchNewGame(difficulty) {
  const query = new URLSearchParams({difficulty});
  const response = await fetch(`/new?${query}`);
  return response.json();
}

/** Submit a board to the backend for solution checking. */
export async function fetchCheckSolution(board) {
  const response = await fetch('/check', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({board})
  });
  return response.json();
}

/** Request a hint for a board when the backend hint endpoint is available. */
export async function fetchHint(board) {
  const response = await fetch('/hint', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({board})
  });
  return response.json();
}
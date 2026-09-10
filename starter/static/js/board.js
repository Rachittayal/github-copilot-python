/** Number of rows and columns in a Sudoku board. */
export const SIZE = 9;

/** Create the editable Sudoku grid and attach input sanitization. */
export function createBoardElement() {
  const boardDiv = document.getElementById('sudoku-board');
  boardDiv.innerHTML = '';
  for (let row = 0; row < SIZE; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'sudoku-row';
    for (let col = 0; col < SIZE; col++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.className = 'sudoku-cell';
      input.dataset.row = row;
      input.dataset.col = col;
      input.addEventListener('input', (event) => {
        const value = event.target.value.replace(/[^1-9]/g, '');
        event.target.value = value;
      });
      rowDiv.appendChild(input);
    }
    boardDiv.appendChild(rowDiv);
  }
}

/** Render a puzzle into the grid and disable its prefilled cells. */
export function renderPuzzle(puzzle) {
  createBoardElement();
  const inputs = document.getElementById('sudoku-board').getElementsByTagName('input');
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const input = inputs[row * SIZE + col];
      const value = puzzle[row][col];
      if (value !== 0) {
        input.value = value;
        input.disabled = true;
        input.className += ' prefilled';
      } else {
        input.value = '';
        input.disabled = false;
      }
    }
  }
}

/** Read the current values from the Sudoku grid as a numeric board. */
export function getCurrentBoard() {
  const inputs = document.getElementById('sudoku-board').getElementsByTagName('input');
  const board = [];
  for (let row = 0; row < SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < SIZE; col++) {
      const value = inputs[row * SIZE + col].value;
      board[row][col] = value ? parseInt(value, 10) : 0;
    }
  }
  return board;
}

/** Fill and lock a hinted cell with its correct value. */
export function applyHint(row, col, value) {
  const inputs = document.getElementById('sudoku-board').getElementsByTagName('input');
  const input = inputs[row * SIZE + col];
  if (!input) return false;

  input.value = value;
  input.disabled = true;
  input.className = 'sudoku-cell hint';
  return true;
}

/** Display incorrect editable cells and the corresponding result message. */
export function displayValidationResults(incorrectCells) {
  const inputs = document.getElementById('sudoku-board').getElementsByTagName('input');
  const incorrect = new Set(incorrectCells.map(([row, col]) => row * SIZE + col));
  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    if (input.disabled) continue;
    input.className = 'sudoku-cell';
    if (incorrect.has(index)) {
      input.className = 'sudoku-cell incorrect';
    }
  }
  return incorrect.size;
}
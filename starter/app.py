from flask import Flask, jsonify, render_template, request

from difficulty import get_clues_for_difficulty
from sudoku_logic import compare_boards, generate_puzzle

app = Flask(__name__)

# Keep a simple in-memory store for current puzzle and solution
CURRENT = {
    'puzzle': None,
    'solution': None
}

@app.route('/')
def index() -> str:
    """Render the Sudoku game page."""
    return render_template('index.html')

@app.route('/new')
def new_game() -> tuple:
    """Create a puzzle and store its solution for the current game."""
    difficulty = request.args.get('difficulty', 'medium')
    try:
        clues = get_clues_for_difficulty(difficulty)
    except ValueError as error:
        return jsonify({'error': str(error)}), 400

    puzzle, solution = generate_puzzle(clues)
    CURRENT['puzzle'] = puzzle
    CURRENT['solution'] = solution
    return jsonify({'puzzle': puzzle, 'difficulty': difficulty})

@app.route('/check', methods=['POST'])
def check_solution() -> tuple:
    """Compare the submitted board with the current puzzle solution."""
    data = request.json
    board = data.get('board')
    solution = CURRENT.get('solution')
    if solution is None:
        return jsonify({'error': 'No game in progress'}), 400
    return jsonify({'incorrect': compare_boards(board, solution)})


@app.route('/hint', methods=['POST'])
def get_hint() -> tuple:
    """Return the correct value for the first empty cell on the current board."""
    solution = CURRENT.get('solution')
    puzzle = CURRENT.get('puzzle')
    if solution is None or puzzle is None:
        return jsonify({'error': 'No game in progress'}), 400

    data = request.get_json(silent=True) or {}
    board = data.get('board', puzzle)

    # Use the submitted board when available so solved-state detection is current.
    empty_cells = [
        (row, col)
        for row in range(len(solution))
        for col in range(len(solution[row]))
        if board[row][col] == 0
    ]
    if not empty_cells:
        return jsonify({'error': 'Puzzle is already solved'}), 400

    row, col = empty_cells[0]
    return jsonify({'row': row, 'col': col, 'value': solution[row][col]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
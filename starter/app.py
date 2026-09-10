from flask import Flask, jsonify, render_template, request

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
    clues = int(request.args.get('clues', 35))
    puzzle, solution = generate_puzzle(clues)
    CURRENT['puzzle'] = puzzle
    CURRENT['solution'] = solution
    return jsonify({'puzzle': puzzle})

@app.route('/check', methods=['POST'])
def check_solution() -> tuple:
    """Compare the submitted board with the current puzzle solution."""
    data = request.json
    board = data.get('board')
    solution = CURRENT.get('solution')
    if solution is None:
        return jsonify({'error': 'No game in progress'}), 400
    return jsonify({'incorrect': compare_boards(board, solution)})

if __name__ == '__main__':
    app.run(debug=True)
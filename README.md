# Refactor a Sudoku Game written in Python Flask

Use this simple Sudoku game as a starting point to practice your skills with GitHub Copilot. The goal is to refactor the code to use modern technologies, while also adding new features and improving the overall user experience.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Dependencies

```
- Modern web browser (Chrome, Firefox, Edge, etc.)
- Python 3
```

### Installation

1. Fork this repository to your GitHub account. (You can use the "Fork" button on the top right corner of the repository page.)

2. Clone your forked repository to your local machine.

3. Open a terminal window and navigate to the "github-copilot-python/starter" directory.

4. Create a Python virtual environment and activate it (optional but highly recommended).

```bash
python3 -m venv .venv
source .venv/bin/activate
```

5. Install required Python packages.

```bash
pip install -r requirements.txt
```

6. Run the Flask app.

```bash
python app.py
```

7. 7. Open http://127.0.0.1:5000 in your browser.

> ⚠️ **Important:** This app must be run through the Flask server — do NOT
> open `starter/templates/index.html` directly in a browser (e.g., by
> double-clicking the file or using a `file://` URL). The frontend uses
> JavaScript ES modules (`<script type="module">`), which browsers block
> for security reasons when loaded outside of a real web server. If any
> buttons (New Game, Check Solution, Hint, Dark Mode) appear unresponsive,
> confirm the app was accessed via **http://127.0.0.1:5000** (started with
> `python app.py`) and check the browser console (F12 → Console tab) for
> any errors.

## Project Instructions

## Running Tests

This project uses `pytest` for backend testing.

From the `starter` directory, with your virtual environment activated:

    pytest

All tests should pass before any code changes are made. If you see
`ModuleNotFoundError: No module named 'app'`, ensure a `conftest.py` (or
`pytest.ini`) exists at the `starter/` root to add it to the Python path.
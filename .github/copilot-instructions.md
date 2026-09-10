# Project Instructions for GitHub Copilot

## Project Overview
This is a Flask-based Sudoku game being refactored from legacy code into a modern,
modular, full-featured application. Features include difficulty levels, a timer,
hint/check buttons, a local Top 10 leaderboard, and dark mode.

## Code Style & Standards
- Use Python 3.10+ syntax and type hints wherever practical.
- Follow PEP 8 formatting.
- Keep functions small and single-purpose; prefer composition over large monolithic functions.
- Add docstrings to all non-trivial functions and classes.
- Use meaningful variable and function names (no single-letter vars except loop counters).
- Handle errors explicitly — no silent failures. Use try/except with clear messages.
- Comment non-obvious logic, especially Sudoku validation/generation algorithms.

## Architecture
- Separate concerns: puzzle generation/validation logic, Flask routes, and
  front-end (HTML/CSS/JS) should live in distinct modules/files.
- Backend: organize into logical modules (e.g., `sudoku_logic.py`, `app.py`, `routes/`).
- Frontend: separate CSS from JS from HTML templates; avoid inline styles/scripts.
- Store persistent data (Top 10 scores) in browser localStorage on the frontend.

## Testing
- Use `pytest` for backend logic tests.
- Every new feature should have a corresponding test where feasible.
- Tests must pass before and after every refactor step.

## Styling
- Must support both light and dark mode.
- Must be responsive (mobile and desktop).
- 3x3 Sudoku boxes must alternate background colors clearly.

## Working With Copilot
- Prefer smaller, targeted suggestions I can review before accepting.
- Explain any suggestion that uses a library, pattern, or syntax I might not recognize.
- Do not introduce new dependencies without flagging them first.
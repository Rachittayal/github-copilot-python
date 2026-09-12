"""Difficulty settings for generated Sudoku puzzles."""

from typing import Dict


DIFFICULTY_CLUES: Dict[str, int] = {
    'easy': 40,
    'medium': 32,
    'hard': 26,
}


def get_clues_for_difficulty(name: str) -> int:
    """Return the clue count for a named difficulty level.

    Raises:
        ValueError: If ``name`` is not a supported difficulty level.
    """
    try:
        return DIFFICULTY_CLUES[name]
    except KeyError as error:
        available = ', '.join(DIFFICULTY_CLUES)
        raise ValueError(
            f"Invalid difficulty '{name}'. Choose from: {available}."
        ) from error
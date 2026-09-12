"""Validation helpers for Sudoku boards and submitted solutions."""

from typing import List

SIZE = 9


def is_safe(board: List[List[int]], row: int, col: int, num: int) -> bool:
    """Return whether ``num`` can be placed at ``row``, ``col``."""
    for index in range(SIZE):
        if board[row][index] == num or board[index][col] == num:
            return False

    start_row = row - row % 3
    start_col = col - col % 3
    for box_row in range(start_row, start_row + 3):
        for box_col in range(start_col, start_col + 3):
            if board[box_row][box_col] == num:
                return False
    return True


def compare_boards(
    submitted: List[List[int]], solution: List[List[int]]
) -> List[List[int]]:
    """Return ``[row, column]`` positions differing from the solution."""
    incorrect = []
    for row in range(SIZE):
        for col in range(SIZE):
            if submitted[row][col] != solution[row][col]:
                incorrect.append([row, col])
    return incorrect
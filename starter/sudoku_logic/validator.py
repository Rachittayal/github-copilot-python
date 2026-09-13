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


# Copilot's initial suggestion for this function used a nested for-loop
# with hardcoded range(9) values and no type hints, e.g.:
#   def count_filled_cells(board):
#       count = 0
#       for row in range(9):
#           for col in range(9):
#               if board[row][col] != 0:
#                   count += 1
#       return count
# I rejected that version because it didn't match this file's existing
# style (is_safe/compare_boards use the SIZE constant and full type hints)
# and rewrote it manually as a concise generator expression instead.
def count_filled_cells(board: List[List[int]]) -> int:
    """Return the number of non-zero cells in ``board``."""
    return sum(cell != 0 for row in board for cell in row)
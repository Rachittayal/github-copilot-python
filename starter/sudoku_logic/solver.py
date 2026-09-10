"""Sudoku solving and solution-counting helpers."""

from typing import List

from .validator import is_safe

SIZE = 9
EMPTY = 0


def count_solutions(board: List[List[int]], limit: int = 2) -> int:
    """Count solutions for ``board``, stopping once ``limit`` is reached."""
    working_board = [row[:] for row in board]

    def search() -> int:
        for row in range(SIZE):
            for col in range(SIZE):
                if working_board[row][col] == EMPTY:
                    solutions = 0
                    for candidate in range(1, SIZE + 1):
                        if is_safe(working_board, row, col, candidate):
                            working_board[row][col] = candidate
                            solutions += search()
                            working_board[row][col] = EMPTY
                            if solutions >= limit:
                                return solutions
                    return solutions
        return 1

    return search()


def has_unique_solution(board: List[List[int]]) -> bool:
    """Return whether ``board`` has exactly one valid solution."""
    return count_solutions(board, limit=2) == 1
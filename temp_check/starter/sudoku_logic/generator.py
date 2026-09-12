"""Sudoku board and puzzle generation helpers."""

import copy
import random
from typing import List, Tuple

from .solver import has_unique_solution
from .validator import is_safe

SIZE = 9
EMPTY = 0
Board = List[List[int]]


def deep_copy(board: Board) -> Board:
    """Return an independent copy of a Sudoku board."""
    return copy.deepcopy(board)


def create_empty_board() -> Board:
    """Create a 9x9 board filled with empty cells."""
    return [[EMPTY for _ in range(SIZE)] for _ in range(SIZE)]


def fill_board(board: Board) -> bool:
    """Fill ``board`` with a randomized valid Sudoku solution."""
    for row in range(SIZE):
        for col in range(SIZE):
            if board[row][col] == EMPTY:
                candidates = list(range(1, SIZE + 1))
                random.shuffle(candidates)
                for candidate in candidates:
                    if is_safe(board, row, col, candidate):
                        board[row][col] = candidate
                        if fill_board(board):
                            return True
                        board[row][col] = EMPTY
                return False
    return True


def remove_cells(board: Board, clues: int) -> None:
    """Remove cells while retaining a puzzle with one unique solution."""
    if not 0 <= clues <= SIZE * SIZE:
        raise ValueError('clues must be between 0 and 81')

    cells = [(row, col) for row in range(SIZE) for col in range(SIZE)]
    random.shuffle(cells)
    removed = 0
    for row, col in cells:
        if SIZE * SIZE - removed <= clues:
            break
        value = board[row][col]
        board[row][col] = EMPTY
        if has_unique_solution(board):
            removed += 1
        else:
            board[row][col] = value


def generate_puzzle(clues: int = 35) -> Tuple[Board, Board]:
    """Generate a puzzle with ``clues`` retained cells and its solution."""
    board = create_empty_board()
    if not fill_board(board):
        raise RuntimeError('Unable to generate a solved Sudoku board')
    solution = deep_copy(board)
    remove_cells(board, clues)
    return deep_copy(board), solution
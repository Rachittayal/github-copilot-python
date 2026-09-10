let hintsUsed = 0;

/** Reset the number of hints used for the current game. */
export function resetHints() {
  hintsUsed = 0;
}

/** Record one successfully applied hint. */
export function recordHint() {
  hintsUsed += 1;
}

/** Return the number of hints used for leaderboard scoring. */
export function getHintsUsed() {
  return hintsUsed;
}
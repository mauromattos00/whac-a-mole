import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameState } from '@store/reducers/game.reducer';

const selectGame = createFeatureSelector<GameState>('game');

export const selectInProgress = createSelector(
  selectGame,
  (game: GameState) => game.inProgress,
);

export const selectCurrentScore = createSelector(
  selectGame,
  (game: GameState) => game.currentScore,
);
export const selectHighestScore = createSelector(
  selectGame,
  (game: GameState) => game.highestScore,
);
export const selectActiveHoles = createSelector(
  selectGame,
  (game: GameState) => game.activeHoles,
);

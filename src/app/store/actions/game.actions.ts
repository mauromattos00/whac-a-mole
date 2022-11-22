import { createAction, props } from '@ngrx/store';

export const startGame = createAction(
  '[Game] Start Game'
);

export const addToScore = createAction(
  '[Game] Add to Score',
  props<{ points: number }>(),
);

export const finishGame = createAction('[Game] Finish Game');

export const setNewHighestScore = createAction(
  '[Game] Set New Highest Score',
  props<{ score: number }>(),
);

export const resetScore = createAction('[Game] Reset Score');

export const removeFromScore = createAction(
  '[Game] Remove From Score',
  props<{ points: number }>(),
);

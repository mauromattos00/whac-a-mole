import { createReducer, on } from '@ngrx/store';
import * as gameActions from '../actions/game.actions';

export const gameFeatureKey = 'game';

export interface GameState {
  inProgress: boolean;
  currentScore: number;
  highestScore: number;
  activeHoles: number[];
}

export const initialState: GameState = {
  inProgress: false,
  currentScore: 0,
  highestScore: 0,
  activeHoles: [],
};

export const gameReducer = createReducer(
  initialState,
  on(gameActions.startGame, (state: GameState) => ({
    ...state,
    inProgress: true,
  })),
  on(gameActions.finishGame, (state: GameState) => ({
    ...state,
    inProgress: false,
    activeHoles: [],
  })),
);

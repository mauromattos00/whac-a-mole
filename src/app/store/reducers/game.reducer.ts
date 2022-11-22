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
  on(gameActions.showMoles, (state: GameState, { holes }) => ({
    ...state,
    activeHoles: holes,
  })),
  on(gameActions.hideMole, (state: GameState, { hole }) => {
    const holes = [...state.activeHoles].filter(item => item !== hole);
    return {
      ...state,
      activeHoles: holes,
    };
  }),
  on(gameActions.hideAllMoles, (state: GameState) => ({
    ...state,
    activeHoles: [],
  })),
  on(gameActions.addToScore, (state: GameState, { points }) => ({
    ...state,
    currentScore: state.currentScore + points,
  })),
  on(gameActions.finishGame, (state: GameState) => ({
    ...state,
    inProgress: false,
    activeHoles: [],
  })),
  on(gameActions.setNewHighestScore, (state: GameState, { score }) => ({
    ...state,
    highestScore: score,
  })),
  on(gameActions.resetScore, (state: GameState) => ({
    ...state,
    currentScore: 0,
  })),
  on(gameActions.removeFromScore, (state: GameState, { points }) => ({
    ...state,
    currentScore: state.currentScore - points,
  })),
);

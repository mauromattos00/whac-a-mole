import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gameActions from '@store/actions/game.actions';
import * as gameSelectors from '@store/selectors/game.selectors';

@Injectable({
  providedIn: 'root'
})
export class GameFacadeService {
  isGameInProgress$ = this.store.select(gameSelectors.selectInProgress);
  currentScore$ = this.store.select(gameSelectors.selectCurrentScore);
  highestScore$ = this.store.select(gameSelectors.selectHighestScore);
  activeHoles$ = this.store.select(gameSelectors.selectActiveHoles);

  constructor(private store: Store) { }

  startGame() {
    this.store.dispatch(gameActions.startGame());
  }

  finishGame() {
    this.store.dispatch(gameActions.finishGame());
  }

}

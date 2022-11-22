import {
  delay,
  tap,
  filter,
  map,
  take,
  scan,
  takeWhile,
  startWith,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, interval, of } from 'rxjs';
import * as gameActions from '@store/actions/game.actions';
import * as gameSelectors from '@store/selectors/game.selectors';
import { Randomization } from '../../utils/randomization';

@Injectable({
  providedIn: 'root'
})
export class GameFacadeService {
  isGameInProgress$ = this.store.select(gameSelectors.selectInProgress);
  currentScore$ = this.store.select(gameSelectors.selectCurrentScore);
  highestScore$ = this.store.select(gameSelectors.selectHighestScore);
  activeHoles$ = this.store.select(gameSelectors.selectActiveHoles);

  private _timerSubject = new BehaviorSubject<number>(0);
  timer$ = this._timerSubject.asObservable();

  constructor(private store: Store) { }

  startGame() {
    this.store.dispatch(gameActions.startGame());
  }

  showMoles() {
    this.isGameInProgress$.pipe(
      filter((value) => !!value),
      take(1),
    ).subscribe(() => {
      const holes = Randomization.generateNewHoles();
      this.store.dispatch(gameActions.showMoles({ holes }));
    });
  }

  hideMole(hole: number) {
    this.store.dispatch(gameActions.hideMole({ hole }));
  }

  hideAllMoles() {
    this.store.dispatch(gameActions.hideAllMoles());
  }


  setMolesDuration() {
    const duration = Randomization.generateMoleDuration();
    of(duration).pipe(
      delay(duration),
      tap(() => {
        this.checkRemainingMoles();
        this.hideAllMoles();
      })
    ).subscribe();
  }

  addToScore(points: number) {
    this.store.dispatch(gameActions.addToScore({ points }));
  }

  finishGame() {
    this.store.dispatch(gameActions.finishGame());
  }

  checkHighestScore() {
    combineLatest([
      this.currentScore$,
      this.highestScore$,
    ])
      .pipe(take(1))
      .subscribe(([score, highestScore]) => {
        if (highestScore >= score) {
          return;
        }

        this.setNewHighestScore(score);
      });
  }

  resetScore() {
    this.store.dispatch(gameActions.resetScore());
  }

  checkRemainingMoles() {
    this.activeHoles$.pipe(
      take(1),
      map((holes: number[]) => holes.length),
    ).subscribe((pointsToRemove: number) => {
      if (pointsToRemove > 0) {
        this.removeFromScore(pointsToRemove);
      }
    });
  }

  startTimer() {
    interval(1000).pipe(
      scan((acc: number) => acc - 1, 30),
      takeWhile((time: number) => time >= 0),
      startWith(30),
      map((time: number) => this._timerSubject.next(time)),
    ).subscribe();
  }

  private removeFromScore(points: number) {
    this.store.dispatch(gameActions.removeFromScore({ points }));
  }

  private setNewHighestScore(score: number) {
    this.store.dispatch(gameActions.setNewHighestScore({ score }));
  }
}

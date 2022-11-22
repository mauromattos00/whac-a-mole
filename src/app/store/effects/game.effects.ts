import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  delay,
  tap,
  debounceTime,
  map,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as gameActions from '@store/actions/game.actions';
import { GameFacadeService } from '@store/facades/game-facade.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private gameFacadeService: GameFacadeService,
  ) { }

  startGame$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.startGame),
    tap(() => {
      this.gameFacadeService.resetScore();
      this.gameFacadeService.startTimer();
      this.gameFacadeService.showMoles();
    }),
    delay(environment.gameDuration),
    tap(() => {
      this.gameFacadeService.checkHighestScore();
      this.gameFacadeService.finishGame();
    })
  ), { dispatch: false });

  hideAllMoles$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.hideAllMoles),
    tap(() => this.gameFacadeService.showMoles())
  ), { dispatch: false });

  showMoles$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.showMoles),
    debounceTime(200),
    tap(() => this.gameFacadeService.setMolesDuration())
  ), { dispatch: false });

  setMolesDuration$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.setMolesDuration),
    map(({ duration }) => duration),
    switchMap((duration: number) => of(delay(duration))),
    tap(() => this.gameFacadeService.hideAllMoles()),
  ), { dispatch: false });
}

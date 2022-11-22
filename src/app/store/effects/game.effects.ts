import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  delay,
  tap,
} from 'rxjs/operators';
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

}

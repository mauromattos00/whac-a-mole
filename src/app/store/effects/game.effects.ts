import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as gameActions from '@store/actions/game.actions';
import { GameFacadeService } from '@store/facades/game-facade.service';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private gameFacadeService: GameFacadeService,
  ) { }

}

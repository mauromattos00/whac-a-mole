import { Component, OnInit } from '@angular/core';
import { GameFacadeService } from '@store/facades/game-facade.service';
import { map, Observable, take, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activeHoles$: Observable<number[]> = of([]);
  currentScore$: Observable<number> = of(0);
  highestScore$: Observable<number> = of(0);
  isGameInProgress$: Observable<boolean> = of(false);
export class AppComponent {
  title = 'whac-a-mole';

  constructor(private gameFacadeService: GameFacadeService) { }

  ngOnInit() {
    this.getStoreData();
  }

  private getStoreData() {
    this.activeHoles$ = this.gameFacadeService.activeHoles$;
    this.currentScore$ = this.gameFacadeService.currentScore$;
    this.highestScore$ = this.gameFacadeService.highestScore$;
    this.isGameInProgress$ = this.gameFacadeService.isGameInProgress$;
    this.timer$ = this.gameFacadeService.timer$;
  }
}

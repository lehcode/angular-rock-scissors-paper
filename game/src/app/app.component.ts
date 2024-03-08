import { Component } from '@angular/core';
import { Player } from '~/app/interfaces/player';
import { GameService } from '~/app/services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  player$: Observable<Player>;

  constructor(gameService: GameService) {
    this.player$ = gameService.getPlayer$();
  }
}

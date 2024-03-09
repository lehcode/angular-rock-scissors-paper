import { Component } from '@angular/core';
import { Player } from '~/app/interfaces/player';
import { GameService } from '~/app/services/game.service';
import { Observable } from 'rxjs';

/**
 * The root component of the game.
 */
@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * The observable of the human player.
   */
  humanPlayer$: Observable<Player>;

  /**
   * Creates an instance of the app component.
   * @param gameService - The game service.
   */
  constructor(gameService: GameService) {
    this.humanPlayer$ = gameService.humanPlayer$;
  }
}

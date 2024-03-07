import { Component } from '@angular/core';
import { PlayerInterface } from '~/app/interfaces/player.interface';
import { GameService } from '~/app/services/game.service';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  player: PlayerInterface | undefined = undefined;

  constructor(gameService: GameService) {
    this.player = gameService.getPlayer();
  }
}

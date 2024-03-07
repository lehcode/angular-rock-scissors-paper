import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameService } from '~/app/services/game.service';
import { GameStatsComponent } from '~/app/game-stats/game-stats.component';
import { Player } from '~/app/interfaces/player';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'game-game',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  player: Player;

  constructor(private gameService: GameService) {
    this.player = gameService.getPlayer();
  }

  ngOnInit() {
    // this.gameService.start();
  }
}

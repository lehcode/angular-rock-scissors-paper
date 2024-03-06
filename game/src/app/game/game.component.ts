import { Component } from '@angular/core';
import { GameService } from '~/app/services/game.service';

@Component({
  selector: 'game-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    // this.gameService.start();
  }
}

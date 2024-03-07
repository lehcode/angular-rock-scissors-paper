import { Component } from '@angular/core';
import { GameService } from '~/app/services/game.service';
import { PlayerInterface } from '~/app/interfaces/player.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'game-game',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  player: PlayerInterface;

  constructor(private gameService: GameService) {
    this.player = this.gameService.getPlayer();
  }

  ngOnInit() {
    // this.gameService.start();
  }
}

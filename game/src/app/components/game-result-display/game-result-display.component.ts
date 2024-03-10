import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { GameResult } from '~/app/interfaces/game-result';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { Observable } from 'rxjs';
import { Player } from '~/app/interfaces/player';
import { JsonPipe } from '@angular/common';
import { GameService } from '~/app/services/game.service';

@Component({
  selector: 'game-result-display',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './game-result-display.component.html',
  styleUrl: './game-result-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameResultDisplayComponent {
  @Input() result: GameResult | undefined;
  protected humanWeapon: string | undefined;
  protected pcWeapon: string | undefined;
  protected playerName: string | undefined;
  protected winner: Player | undefined;

  constructor(private readonly gameService: GameService) {
    gameService.humanPlayer$.subscribe((player: Player) => {
      this.playerName = player.name;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'result':
            this.humanWeapon = changes[propName].currentValue.humanWeapon;
            this.pcWeapon = changes[propName].currentValue.pcWeapon;
            this.winner = changes[propName].currentValue.winner;
            if (changes[propName].currentValue.name) {
              this.playerName = changes[propName].currentValue.name;
            }
            break;
          default:
            break;
        }
      }
    }
  }
}

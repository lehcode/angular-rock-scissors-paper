import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { GameResult } from '~/app/interfaces/game-result';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'game-result-display',
  standalone: true,
  imports: [],
  templateUrl: './game-result-display.component.html',
  styleUrl: './game-result-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameResultDisplayComponent {
  @Input() result: GameResult | undefined;
  protected date: string | undefined;
  protected game: GameListItem | undefined;
  protected id: string | Observable<string> | undefined;
  protected humanWeapon: string | undefined;
  protected pcWeapon: string | undefined;
  protected playerName: string | undefined;
  protected winner: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'result':
            this.date = new Date(changes[propName].currentValue.date).toDateString();
            this.game = changes[propName].currentValue.game.name;
            this.id = changes[propName].currentValue.id;
            this.humanWeapon = changes[propName].currentValue.humanWeapon;
            this.pcWeapon = changes[propName].currentValue.pcWeapon;
            this.playerName = changes[propName].currentValue.name;
            this.winner = changes[propName].currentValue.winner;
            break;
          default:
            break;
        }
      }
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { GameMode } from '~/app/enums/game.mode';
import { from, map, Observable, of, tap, toArray } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { GameService } from '~/app/services/game.service';
import { AsyncPipe } from '@angular/common';

const namingMap = {
  [GameMode.RPS]: 'Rock-Paper-Scissors',
  [GameMode.RPSW]: 'Rock-Paper-Scissors-Well',
  [GameMode.RPSLS]: 'Rock-Paper-Scissors-Lizard-Spock',
};

@Component({
  selector: 'select-game',
  standalone: true,
  imports: [NgbDropdownModule, AsyncPipe],
  templateUrl: './select-game.component.html',
  styleUrl: './select-game.component.scss',
})
export class SelectGameComponent {
  selectedGame: GameListItem | undefined;
  allGames$: Observable<GameListItem[]>;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private gameService: GameService) {
    this.allGames$ = this.collectGamesList();
  }

  selectGame(selectedGame: GameListItem) {
    debugger;
    this.selectedGame = selectedGame;
    this.changeEvent.emit(JSON.stringify(selectedGame));
  }

  private collectGamesList() {
    return from(Object.keys(GameMode)).pipe(
      map((gameCode) => {
        // @ts-expect-error - In addition to creating an object with property names for
        // members, numeric enums members also get a reverse mapping from enum values to
        // enum names.
        return { id: gameCode, name: namingMap[gameCode], code: GameMode[gameCode] } as GameListItem;
      }),
      filter((item) => item.name !== undefined),
      toArray(),
    );
  }
}

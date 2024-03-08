import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { GameService, namingMap } from '~/app/services/game.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'select-game',
  standalone: true,
  imports: [NgbDropdownModule, AsyncPipe],
  templateUrl: './select-game.component.html',
  styleUrl: './select-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGameComponent {
  selectedGame: GameListItem | undefined;
  allGames$: Observable<GameListItem[]>;
  @Output() onGameSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly gameService: GameService) {
    this.allGames$ = this.gameService.collectGamesList();
  }

  changeGame(selectedGame: GameListItem) {
    this.selectedGame = selectedGame;
    this.onGameSelect.emit(JSON.stringify(selectedGame));
  }
}

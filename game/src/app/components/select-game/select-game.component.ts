import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, TemplateRef } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { GameService } from '~/app/services/game.service';
import { AsyncPipe } from '@angular/common';
import { GameRulesDisplayComponent } from '~/app/components/game-rules-display/game-rules-display.component';

/**
 * Component for selecting a game from a list of games.
 */
@Component({
  selector: 'select-game',
  standalone: true,
  imports: [NgbDropdownModule, AsyncPipe, GameRulesDisplayComponent],
  templateUrl: './select-game.component.html',
  styleUrl: './select-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGameComponent {
  /**
   * The currently selected game.
   */
  selectedGame: GameListItem | undefined;

  /**
   * The list of all games.
   */
  allGames: GameListItem[] | undefined;

  /**
   * Event emitted when a game is selected.
   */
  @Output() onGameSelect: EventEmitter<string> = new EventEmitter<string>();

  private modalService = inject(NgbModal);
  closeResult = '';

  /**
   * Creates an instance of SelectGameComponent.
   * @param gameService The game service.
   */
  constructor(private readonly gameService: GameService) {
    this.gameService.getAllGames().subscribe((games) => (this.allGames = games));
  }

  /**
   * Changes the selected game.
   * @param selectedGame The selected game.
   */
  changeGame(selectedGame: GameListItem) {
    this.selectedGame = selectedGame;
    this.onGameSelect.emit(JSON.stringify(selectedGame));
  }

  showRules(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
}

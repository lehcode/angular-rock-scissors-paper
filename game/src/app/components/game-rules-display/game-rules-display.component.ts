import { Component, Input, SimpleChanges } from '@angular/core';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { JsonPipe } from '@angular/common';
import rules from '~/app/rules.json';
import { from, map } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'game-rules-display',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './game-rules-display.component.html',
  styleUrl: './game-rules-display.component.scss',
})
export class GameRulesDisplayComponent {
  /**
   * The currently selected game.
   */
  @Input() game: GameListItem | undefined;
  protected text = {
    heading: '',
    content: '',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('game')) {
      this.game = changes['game'].currentValue;

      from(rules)
        .pipe(filter((rule) => rule.game == this.game?.id))
        .subscribe((rule) => {
          this.text.heading = rule.heading;
          this.text.content = rule.description;
        });
    }
  }
}

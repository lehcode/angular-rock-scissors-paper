import { Component, SimpleChanges } from '@angular/core';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'game-stats',
  standalone: true,
  imports: [],
  templateUrl: './game-stats.component.html',
  styleUrl: './game-stats.component.scss',
})
export class GameStatsComponent {
  constructor() {}
}

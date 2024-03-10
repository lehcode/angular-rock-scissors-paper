import { Component, Input, SimpleChanges } from '@angular/core';
import { GameResult } from '~/app/interfaces/game-result';
import { LocalStorageService } from '~/app/services/local-storage.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'game-stats',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, DatePipe],
  templateUrl: './game-stats.component.html',
  styleUrl: './game-stats.component.scss',
})
export class GameStatsComponent {
  protected history$: Observable<GameResult[]> | undefined;
  @Input() newRow: GameResult | undefined;

  constructor(private readonly storageService: LocalStorageService) {
    this.history$ = this.storageService.gamesHistory$;
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    // if (changes.newRow) {
    //   this.storageService.saveGameResult$(changes.newRow.currentValue);
    // }
  }
}

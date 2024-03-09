import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { GameResult } from '~/app/interfaces/game-result';
import { isArray } from '@angular/compiler-cli/src/ngtsc/annotations/common';

const GAMES_HISTORY = 'games_history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor() {}

  get gamesHistory(): GameResult[] {
    return JSON.parse(localStorage.getItem(GAMES_HISTORY) as string) as GameResult[];
  }

  get gamesHistory$(): Observable<GameResult[]> {
    return of(JSON.parse(localStorage.getItem(GAMES_HISTORY) as string));
  }

  private persist(key: string, data: unknown) {
    of(localStorage.setItem(key, JSON.stringify(data)));
  }

  set insert(result: GameResult) {
    this.gamesHistory$.subscribe((rows) => {
      if (rows && rows.length > 0) {
        this.persist(GAMES_HISTORY, rows.push(result));
      } else {
        this.persist(GAMES_HISTORY, [result]);
      }
    });
  }

  get lastResult() {
    throw new Error('Method not implemented.');
  }
}

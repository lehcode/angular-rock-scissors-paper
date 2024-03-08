import { Injectable } from '@angular/core';
import { Player } from '~/app/interfaces/player';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { GameResult } from '~/app/interfaces/game-result';

const PLAYER_DATA = 'player_data';
const GAMES_HISTORY = 'games_history';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  loadPlayerData$() {
    return JSON.parse(localStorage.getItem(PLAYER_DATA) as string);
  }

  persistPlayerData$(data: Player): Observable<Player> {
    return of(data).pipe(
      tap((player) => localStorage.setItem(PLAYER_DATA, JSON.stringify(player))),
      catchError((error) => {
        const message = 'Could not persist player data';
        console.log(message, error);
        return throwError(error);
      }),
    );
  }

  loadGamesHistory$() {
    return JSON.parse(localStorage.getItem(GAMES_HISTORY) as string);
  }

  persistGamesHistory$(data: GameResult[]) {
    return of(data).pipe(
      tap((results) => localStorage.setItem(GAMES_HISTORY, JSON.stringify(results))),
      catchError((error) => of(error)),
    );
  }
}

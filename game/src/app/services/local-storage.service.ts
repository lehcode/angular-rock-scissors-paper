import { Injectable } from '@angular/core';
import { Player } from '~/app/interfaces/player';
import { catchError, from, map, mergeMap, Observable, of, tap, throwError, toArray } from 'rxjs';
import { LocalStorageKeys } from '~/app/enums/local-storage-keys';
import { GameResult } from '~/app/interfaces/game-result';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get playerData$(): Observable<Player> {
    return of(JSON.parse(localStorage.getItem(LocalStorageKeys.PLAYER_DATA) as string));
  }

  persistPlayerData$(data: Player): Observable<Player> {
    return of(data).pipe(
      tap((player) => localStorage.setItem(LocalStorageKeys.PLAYER_DATA, JSON.stringify(player))),
      catchError((error) => {
        const message = 'Could not persist player data';
        console.log(message, error);
        return throwError(() => error);
      }),
    );
  }

  get gamesHistory$() {
    return of(localStorage.getItem(LocalStorageKeys.GAMES_HISTORY)).pipe(
      map((data) => {
        if (data && data.length) return JSON.parse(data) as GameResult[];
        return [] as GameResult[];
      }),
      catchError((error) => {
        const message = 'Could not load games history';
        console.log(message, error);
        return throwError(() => error);
      }),
    );
  }

  insert$(key: LocalStorageKeys, data: unknown) {
    switch (key) {
      case LocalStorageKeys.GAMES_HISTORY:
        this.updateGamesHistory(data as GameResult).subscribe();
        break;
      case LocalStorageKeys.PLAYER_DATA:
        this.savePlayerData(data as Player).subscribe();
        break;
      default:
        throw new Error('Invalid key');
    }
  }

  private updateGamesHistory(data: GameResult) {
    return this.gamesHistory$.pipe(
      map((gamesHistory) => {
        const merged = [...gamesHistory, data];
        localStorage.setItem(LocalStorageKeys.GAMES_HISTORY, JSON.stringify(merged));
        return merged;
      }),
      catchError((error) => {
        const message = 'Could not append games history';
        console.log(message, error);
        return throwError(() => error);
      }),
    );
  }

  private savePlayerData(data: Player) {
    localStorage.setItem(LocalStorageKeys.PLAYER_DATA, JSON.stringify(data));
    const updatedData = JSON.parse(localStorage.getItem(LocalStorageKeys.PLAYER_DATA) as string);

    return of(updatedData).pipe(
      map((player) => player as Player),
      catchError((error) => {
        const message = 'Could not persist player data';
        console.log(message, error);
        return throwError(() => error);
      }),
    );
  }
}

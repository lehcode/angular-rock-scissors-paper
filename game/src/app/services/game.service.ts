import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, shareReplay, tap, throwError, toArray } from 'rxjs';
import { Player } from '~/app/interfaces/player';
import { GameMode } from '~/app/enums/game.mode';
import { Weapon } from '~/app/interfaces/weapon';
import { LocalStorageService } from '~/app/services/local-storage.service';
import { GameResult } from '~/app/interfaces/game-result';
import weapons from '~/app/weapons.json';
import rules from '~/app/rules.json';

// Possible round outcomes
// 0 - player lost
// 1 - player won
// 2 - tie
const outcomes = {
  [GameMode.RPS]: {
    stone: [2, 0, 1],
    paper: [1, 2, 0],
    scissors: [0, 1, 2],
  },
  [GameMode.RPSW]: {
    stone: [2, 0, 1, 0],
    paper: [1, 2, 0, 1],
    scissors: [0, 1, 2, 0],
    well: [1, 0, 1, 2],
  },
  [GameMode.RPSLS]: {
    stone: [2, 0, 1, 0, 1],
    paper: [1, 2, 0, 1, 0],
    scissors: [0, 1, 2, 0, 1],
    lizard: [1, 0, 1, 2, 0],
    spock: [0, 1, 0, 1, 2],
  },
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  nameSpecified$: Observable<boolean>;

  private playerSubject = new BehaviorSubject<Player | null>(null);
  private gamesHistorySubject = new BehaviorSubject<GameResult[]>([]);
  player$: Observable<Player | null> = this.playerSubject.asObservable();
  gamesHistory$: Observable<GameResult[]> = this.gamesHistorySubject.asObservable();

  constructor(private storageService: LocalStorageService) {
    this.nameSpecified$ = this.player$.pipe(map((player) => !!player?.name));
    this.player$ = storageService.loadPlayerData$();
    // const gamesHistory$ = storageService.loadGamesHistory$();
  }

  savePlayer$(player: Player): Observable<Player> {
    // Emit the user object and store it in local storage
    const playerData: Player = { ...player };
    this.playerSubject.next(playerData);

    return this.storageService.persistPlayerData$(playerData).pipe(
      tap((player) => console.log(`Player: ${player.name}:\nwins: ${player.wins},\nlosses: ${player.losses}`)),
      shareReplay(),
      catchError((error) => {
        const message = 'Error saving player data';
        console.log(message, error);
        return throwError(error);
      }),
    );
  }

  getPlayer$(): Observable<Player> {
    const data = this.storageService.loadPlayerData$();
    return of(data);
  }

  loadWeapons$(mode: GameMode): Observable<Weapon[]> {
    return from(weapons).pipe(
      map((props) => {
        return props as Weapon;
      }),
      toArray(), // Convert emitted values to an array
      // tap((weapon) => {
      //   debugger;
      //   console.log(weapon);
      //   // this.weapons.push(weapon);
      // }),
      // shareReplay(),
      // catchError((error) => {
      //   const message = 'Could not load weapons';
      //   console.log(message, error);
      //   return throwError(error);
      // }),
    );
  }

  loadWeapon(weapon: string) {}

  getRules(mode: GameMode) {}

  setGameMode$(mode: GameMode) {}

  getGameMode() {
    return GameMode.RPS;
  }
}

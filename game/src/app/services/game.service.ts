import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  mergeMap,
  Observable,
  of,
  shareReplay,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import { Player } from '~/app/interfaces/player';
import { GameCode } from '~/app/enums/game-code';
import { Weapon } from '~/app/interfaces/weapon';
import { LocalStorageService } from '~/app/services/local-storage.service';
import { GameResult } from '~/app/interfaces/game-result';
import weapons from '~/app/weapons.json';
import rules from '~/app/rules.json';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { filter } from 'rxjs/operators';

// Possible round outcomes
// 0 - player lost
// 1 - player won
// 2 - tie
const outcomes = {
  [GameCode.RPS]: {
    stone: [2, 0, 1],
    paper: [1, 2, 0],
    scissors: [0, 1, 2],
  },
  [GameCode.RPSW]: {
    stone: [2, 0, 1, 0],
    paper: [1, 2, 0, 1],
    scissors: [0, 1, 2, 0],
    well: [1, 0, 1, 2],
  },
  [GameCode.RPSLS]: {
    stone: [2, 0, 1, 0, 1],
    paper: [1, 2, 0, 1, 0],
    scissors: [0, 1, 2, 0, 1],
    lizard: [1, 0, 1, 2, 0],
    spock: [0, 1, 0, 1, 2],
  },
};

export const namingMap = {
  [GameCode.RPS]: 'Rock-Paper-Scissors',
  [GameCode.RPSW]: 'Rock-Paper-Scissors-Well',
  [GameCode.RPSLS]: 'Rock-Paper-Scissors-Lizard-Spock',
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

  loadWeapons$(game: GameListItem | undefined): Observable<Weapon[]> {
    let mapped;

    if (!game) {
      mapped = from(weapons).pipe(
        map((weapon) => {
          return weapon as Weapon;
        }),
      );
    } else {
      mapped = from(weapons).pipe(
        // @ts-ignore
        filter((weapon) => weapon.games.includes(game.code)),
        map((weapon) => {
          return weapon as Weapon;
        }),
      );
    }

    return mapped.pipe(toArray());
  }

  getDefaultGame() {
    return {
      id: 1,
      name: 'Rock-Paper-Scissors',
      code: 'RPS',
    };
  }

  getDefaultGameCode() {
    return GameCode.RPS;
  }

  collectGamesList() {
    return from(Object.keys(GameCode)).pipe(
      map((gameCode) => {
        // @ts-expect-error - In addition to creating an object with property names for
        // members, numeric enums members also get a reverse mapping from enum values to
        // enum names.
        return { id: gameCode, name: namingMap[gameCode], code: GameCode[gameCode] } as GameListItem;
      }),
      filter((item) => item.name !== undefined),
      toArray(),
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, shareReplay, tap, throwError, toArray } from 'rxjs';
import { Player } from '~/app/interfaces/player';
import { GameCode } from '~/app/enums/game-code';
import { Weapon } from '~/app/interfaces/weapon';
import { LocalStorageService } from '~/app/services/local-storage.service';
import { GameResult } from '~/app/interfaces/game-result';
import weapons from '~/app/weapons.json';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { filter } from 'rxjs/operators';

// Possible round outcomes
// 0 - player lost
// 1 - player won
// 2 - tie
const outcomes = {
  [GameCode.RPS]: {
    rock: [2, 0, 1],
    paper: [1, 2, 0],
    scissors: [0, 1, 2],
  },
  [GameCode.RPSW]: {
    rock: [2, 0, 1, 0],
    paper: [1, 2, 0, 1],
    scissors: [0, 1, 2, 0],
    well: [1, 0, 1, 2],
  },
  [GameCode.RPSLS]: {
    rock: [2, 0, 1, 0, 1],
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

  private readonly playerSubject = new BehaviorSubject<Player | null>(null);
  private readonly gamesHistorySubject = new BehaviorSubject<GameResult[]>([]);
  player$: Observable<Player | null> = this.playerSubject.asObservable();
  gamesHistory$: Observable<GameResult[]> = this.gamesHistorySubject.asObservable();

  /**
   * Creates an instance of the game service.
   * @param storageService - The service for managing local storage.
   */
  constructor(private storageService: LocalStorageService) {
    this.nameSpecified$ = this.player$.pipe(map((player) => !!player?.name));
    this.player$ = storageService.loadPlayerData$();
    // const gamesHistory$ = storageService.loadGamesHistory$();
  }

  /**
   * Saves the player data to local storage.
   *
   * @param player - The player data to save.
   * @returns The saved player data.
   */
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
        return throwError(() => error);
      }),
    );
  }

  get humanPlayer$(): Observable<Player> {
    return this.storageService.loadPlayerData$();
  }

  /**
   * Returns an observable that emits an array of weapons filtered by the given game.
   * @param game - The game to filter weapons by. If not specified, all weapons are returned.
   * @returns An observable that emits an array of weapons.
   */
  loadWeapons$(game: GameListItem | undefined): Observable<Weapon[]> {
    let mapped;

    if (game) {
      // Filter weapons by the given game code
      mapped = from(weapons).pipe(
        filter((weapon) => weapon.games.includes(game.code)),
        map((weapon) => {
          return weapon as Weapon;
        }),
      );
    } else {
      // Return all weapons
      mapped = from(weapons).pipe(
        map((weapon) => {
          return weapon as Weapon;
        }),
      );
    }

    return mapped.pipe(toArray());
  }

  get defaultGameCode() {
    return GameCode.RPS;
  }

  /**
   Returns an observable that emits an array of all games items.
   */
  getAllGames() {
    return from(Object.keys(GameCode)).pipe(
      map((key) => {
        const mappedId = GameCode[key as keyof typeof GameCode];
        return { id: mappedId, name: namingMap[mappedId], code: key } as GameListItem;
      }),
      toArray(),
    );
  }

  /**
   * Get a random index for a weapon from the available weapons
   * @param weaponsAmt
   */
  getRandomWeaponIndex(weaponsAmt: number) {
    return Math.floor(Math.random() * weaponsAmt) + 1;
  }

  /**
   * Calculates the outcome of a single round of a Rock-Paper-Scissors game.
   *
   * @param game - The game configuration.
   * @param humanWeapon - The weapon selected by the human player.
   * @param pcWeapon - The weapon selected by the computer player.
   * @param pcPlayer - The computer player object.
   * @returns The game result object.
   */
  calculateRoundResult(game: GameListItem, humanWeapon: Weapon, pcWeapon: Weapon, pcPlayer: Player) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const outcome = outcomes[`${game.id}`][`${humanWeapon.name.toLowerCase()}`];
    const winLoss = outcome[pcWeapon.id - 1];
    let playerName: string | undefined;

    switch (winLoss) {
      // Human lost the game
      case 0:
        console.log(
          `Raw result value: ${winLoss}.\nHuman lost the game.\nHuman (${humanWeapon.name}) vs PC (${pcWeapon.name})`,
        );
        this.player$.subscribe((player) => {
          if (player !== null) {
            player.losses++;
            playerName = player.name;
          }
          this.playerSubject.next(player);
        });
        break;
      // Human won the game
      case 1:
        console.log(
          `Raw result value: ${winLoss}.\nHuman won the game.\nHuman (${humanWeapon.name}) vs PC (${pcWeapon.name})`,
        );
        this.player$.subscribe((player) => {
          if (player !== null) {
            player.wins++;
            playerName = player.name;
          }
          this.playerSubject.next(player);
        });
        break;
      default:
        break;
    }

    return {
      id: this.gameSessionId,
      game: game,
      date: new Date().toISOString(),
      humanWeapon: humanWeapon.name,
      pcWeapon: pcWeapon.name,
      winner: winLoss === 1 ? (playerName as string) : pcPlayer.name,
    } as GameResult;
  }

  get gameSessionId() {
    return Math.floor(Math.random() * 10000000);
  }

  storeRoundResult() {}
}

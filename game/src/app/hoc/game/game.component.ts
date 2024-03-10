import { ChangeDetectionStrategy, Component, SimpleChanges } from '@angular/core';
import { GameService } from '~/app/services/game.service';
import { Player } from '~/app/interfaces/player';
import { AsyncPipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { Weapon } from '~/app/interfaces/weapon';
import { SelectGameComponent } from '~/app/components/select-game/select-game.component';
import { SelectWeaponComponent } from '~/app/components/select-weapon/select-weapon.component';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { GameResult } from '~/app/interfaces/game-result';
import { GameResultDisplayComponent } from '~/app/components/game-result-display/game-result-display.component';
import { RouterOutlet } from '@angular/router';

// GameComponent handles the game logic
@Component({
  selector: 'game-game',
  standalone: true,
  imports: [AsyncPipe, NgIcon, SelectGameComponent, SelectWeaponComponent, GameResultDisplayComponent, RouterOutlet],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  // Track whether player data is loaded
  playerLoaded = false;
  humanPlayer: Player | undefined;
  pcPlayer: Player | undefined;
  weaponsLoaded = false;
  selectedGame: GameListItem | undefined;
  selectedWeapon: Weapon | undefined;
  allWeapons: Weapon[] | undefined;
  lastResult: GameResult | undefined;

  /**
   * Initializes player data subscriptions
   * @param gameService - the game service
   */
  constructor(private gameService: GameService) {
    this.gameService.humanPlayer$.subscribe((humanPlayer) => {
      this.humanPlayer = humanPlayer;
      this.playerLoaded = true;
    });

    this.pcPlayer = {
      name: 'PC',
      wins: 0,
      losses: 0,
    } as Player;
  }

  protected changeGame(gameData: string) {
    this.selectedGame = JSON.parse(gameData as string);
  }

  /**
   * Plays a round of the game, using the selected weapon.
   * @param weaponData - the data for the selected weapon
   */
  protected playRound(weaponData: string) {
    this.selectedWeapon = JSON.parse(weaponData) as Weapon;
    const pcWeaponIndex = this.gameService.getRandomWeaponIndex(this.allWeapons!.length);
    const pcWeapon = this.allWeapons!.find((weapon) => {
      return weapon.id === pcWeaponIndex;
    });

    let result: GameResult;

    if (pcWeapon?.id === this.selectedWeapon.id) {
      console.log(`Result: Tie (${this.selectedWeapon.name} vs ${pcWeapon.name})`);
      result = {
        id: this.gameService.gameSessionId,
        game: this.selectedGame as GameListItem,
        date: new Date().toISOString(),
        player: this.humanPlayer as Player,
        humanWeapon: this.selectedWeapon.name,
        pcWeapon: pcWeapon.name,
        winner: undefined,
      };
    } else {
      result = this.gameService.calculateRoundResult(
        this.selectedGame as GameListItem,
        this.selectedWeapon,
        pcWeapon as Weapon,
        this.pcPlayer as Player,
      );
    }

    this.lastResult = result;
    this.gameService.saveRoundResult(this.lastResult);

    if (result.winner) {
      if (result.winner.name === this.humanPlayer?.name) {
        this.humanPlayer!.wins++;
      } else if (result.winner.name === this.pcPlayer?.name) {
        this.humanPlayer!.losses++;
      }
    }

    this.gameService.savePlayer$(this.humanPlayer as Player);
  }

  /**
   * Sets the weapons in the component.
   * @param weapons - The weapons to set.
   */
  protected setWeapons(weapons: Weapon[]) {
    this.allWeapons = weapons;
    this.weaponsLoaded = true;
  }

  /**
   * Tracks changes to the component's inputs and triggers change detection.
   * @param changes - a map of the component's inputs to their previous values
   */
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        debugger;
      }
    }
  }
}

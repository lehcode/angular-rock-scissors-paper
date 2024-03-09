import { ChangeDetectionStrategy, Component, SimpleChanges } from '@angular/core';
import { GameService } from '~/app/services/game.service';
import { Player } from '~/app/interfaces/player';
import { AsyncPipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { CollapseComponent } from '~/app/components/collapse/collapse.component';
import { Weapon } from '~/app/interfaces/weapon';
import { SelectGameComponent } from '~/app/components/select-game/select-game.component';
import { SelectWeaponComponent } from '~/app/components/select-weapon/select-weapon.component';
import { GameListItem } from '~/app/interfaces/game-list-item';

// GameComponent handles the game logic
@Component({
  selector: 'game-game',
  standalone: true,
  imports: [AsyncPipe, NgIcon, CollapseComponent, SelectGameComponent, SelectWeaponComponent],
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
    debugger;
    const pcWeapon = this.allWeapons!.find((weapon) => {
      return weapon.id === pcWeaponIndex;
    });

    if (pcWeapon?.id === this.selectedWeapon.id) {
      console.log(`Result: Tie (${this.selectedWeapon.name} vs ${pcWeapon.name})`);
    } else {
      this.gameService.calculateRoundResult(
        this.selectedGame as GameListItem,
        this.selectedWeapon,
        pcWeapon as Weapon,
        this.pcPlayer as Player,
      );
    }

    this.gameService.storeRoundResult();
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

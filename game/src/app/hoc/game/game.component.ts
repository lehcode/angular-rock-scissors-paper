import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GameService } from '~/app/services/game.service';
import { Player } from '~/app/interfaces/player';
import { AsyncPipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { CollapseComponent } from '~/app/components/collapse/collapse.component';
import { GameMode } from '~/app/enums/game.mode';
import { map, Observable, tap } from 'rxjs';
import { Weapon } from '~/app/interfaces/weapon';
import { SelectGameComponent } from '~/app/components/select-game/select-game.component';
import { SelectWeaponComponent } from '~/app/components/select-weapon/select-weapon.component';
import { GameListItem } from '~/app/interfaces/game-list-item';

@Component({
  selector: 'game-game',
  standalone: true,
  imports: [AsyncPipe, NgIcon, CollapseComponent, SelectGameComponent, SelectWeaponComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  playerLoaded = false;
  player: Player | undefined;
  weaponsLoaded = false;
  selectedGame: GameListItem | undefined;
  protected gameMode: GameMode = GameMode.RPS;
  @Output() allWeapons$: Observable<Weapon[]>;
  selectedWeapon: Weapon | undefined;

  constructor(private gameService: GameService) {
    this.gameService.getPlayer$().subscribe((player) => {
      this.player = player;
      this.playerLoaded = true;
    });

    this.allWeapons$ = this.gameService.loadWeapons$(this.gameMode);
    // debugger;
  }

  protected selectGame(gameData: string) {
    debugger;
    this.selectedGame = JSON.parse(gameData as string);
  }

  protected changeWeapon(weaponData: string) {
    debugger;
    this.selectedWeapon = JSON.parse(weaponData as string);
  }
}

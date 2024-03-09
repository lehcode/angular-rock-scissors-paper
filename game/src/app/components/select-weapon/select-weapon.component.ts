import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Weapon } from '~/app/interfaces/weapon';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GameListItem } from '~/app/interfaces/game-list-item';
import { GameService } from '~/app/services/game.service';

@Component({
  selector: 'game-select-weapon',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './select-weapon.component.html',
  styleUrl: './select-weapon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWeaponComponent {
  // @ts-expect-error: Property 'allWeapons$' does not exist on type 'SelectWeaponComponent'.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allWeapons$: Observable<Weapon[]>;
  @Input() selectedGame: GameListItem | undefined;
  @Output() onWeaponSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() onWeaponsLoaded: EventEmitter<Weapon[]> = new EventEmitter<Weapon[]>();
  selectedWeapon: Weapon | undefined;
  weaponsLoaded = false;

  constructor(private readonly gameService: GameService) {}

  changeWeapon(weapon: Weapon) {
    this.selectedWeapon = weapon;
    this.onWeaponSelect.emit(JSON.stringify(weapon));
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedGame': {
            this.allWeapons$ = this.gameService.loadWeapons$(changes['selectedGame'].currentValue);
            this.allWeapons$.subscribe((weapons) => {
              this.weaponsLoaded = true;
              this.onWeaponsLoaded.emit(weapons);
            });
          }
        }
      }
    }
  }
}

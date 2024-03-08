import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Weapon } from '~/app/interfaces/weapon';
import { from, map, mergeMap, Observable, of, shareReplay, toArray } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'game-select-weapon',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './select-weapon.component.html',
  styleUrl: './select-weapon.component.scss',
})
export class SelectWeaponComponent {
  @Input() filteredWeapons$: Observable<Weapon[]> | undefined;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();
  selectedWeapon: Weapon | undefined;

  constructor() {}

  changeWeapon(weapon: Weapon) {
    this.selectedWeapon = weapon;
    this.changeEvent.emit(JSON.stringify(weapon));
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;

    const selected = this.selectedWeapon;
    if (this.filteredWeapons$) {
      this.filteredWeapons$ = this.filteredWeapons$.pipe(
        mergeMap((weapons: Weapon[]) => from(weapons)),
        map((weapon) => {
          if (weapon.id !== selected?.id) {
            return { ...weapon, selected: false };
          }
          return weapon;
        }),
        toArray(),
        shareReplay(),
      );
    }
  }
}

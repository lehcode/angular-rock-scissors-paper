import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Weapon } from '~/app/interfaces/weapon';

@Component({
  selector: 'game-select-weapon',
  standalone: true,
  imports: [],
  templateUrl: './select-weapon.component.html',
  styleUrl: './select-weapon.component.scss',
})
export class SelectWeaponComponent {
  @Input() allWeapons: Weapon[] = [];
  @Output() weaponSelectedEvent: EventEmitter<string> = new EventEmitter<string>();
  selectedWeapon: Weapon | undefined;

  constructor() {}

  onWeaponSelected() {
    debugger;
    this.weaponSelectedEvent.emit();
  }
}

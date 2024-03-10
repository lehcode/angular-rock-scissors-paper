import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '~/app/hoc/game/game.component';

/**
 * @module
 * @description
 * Entry point for the game module.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, GameComponent],
  exports: [GameComponent],
})
/**
 * @description
 * Creates an instance of the game module.
 */
export class GameModule {}

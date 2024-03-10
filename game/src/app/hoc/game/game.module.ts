import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameComponent } from '~/app/hoc/game/game.component';
import { gameRoutes } from '~/app/hoc/game/game.routes';

/**
 * @module
 * @description
 * Entry point for the game module.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(gameRoutes), GameComponent],
  exports: [GameComponent],
})
/**
 * @description
 * Creates an instance of the game module.
 */
export class GameModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from '~/app/hoc/game/game.component';
import { WelcomeComponent } from '~/app/hoc/welcome/welcome.component';

export const gameRoutes: Routes = [
  {
    path: 'game',
    component: GameComponent,
    children: [
      { path: 'stats', loadChildren: () => import('~/app/hoc/game-stats/game-stats.routes'), title: 'Game Stats'},
    ]
  },
  {
    path: '', component: WelcomeComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoutes),
    GameComponent
  ],
  exports: [GameComponent]
})
export class GameModule { }

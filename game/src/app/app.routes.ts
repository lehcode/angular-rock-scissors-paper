import { Route, Routes } from '@angular/router';
import { GameStatsComponent } from '~/app/game-stats/game-stats.component';

export const routes: Routes = [
  { path: 'stats', loadChildren: () => import('~/app/game/game.routes')},
];



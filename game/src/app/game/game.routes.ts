import { GameStatsComponent } from '~/app/game-stats/game-stats.component';
import { Route } from '@angular/router';

export default [
  { path: 'stats', component: GameStatsComponent},
  // Add more game routes here
] satisfies Route[];

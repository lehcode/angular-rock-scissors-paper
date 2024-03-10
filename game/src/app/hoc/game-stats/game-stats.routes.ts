import { GameStatsComponent } from '~/app/hoc/game-stats/game-stats.component';
import { Route } from '@angular/router';

export default [
  { path: 'game/stats', component: GameStatsComponent },
  // Add more game routes here
] satisfies Route[];

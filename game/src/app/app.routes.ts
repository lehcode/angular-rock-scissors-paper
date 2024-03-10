import { Routes } from '@angular/router';
import { WelcomeComponent } from '~/app/hoc/welcome/welcome.component';
import { GameComponent } from '~/app/hoc/game/game.component';
import { GameStatsComponent } from '~/app/hoc/game-stats/game-stats.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent, title: 'Home' },
  {
    path: 'game',
    component: GameComponent,
    title: 'Play',
    children: [{ path: 'stats', component: GameStatsComponent, title: 'Stats' }],
  },
  { path: '**', redirectTo: '/welcome' },
];

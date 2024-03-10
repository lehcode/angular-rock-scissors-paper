import { GameComponent } from '~/app/hoc/game/game.component';

export const gameRoutes = [
  {
    path: 'game',
    component: GameComponent,
    children: [
      { path: 'stats', loadChildren: () => import('~/app/hoc/game-stats/game-stats.routes'), title: 'Game Stats' },
    ],
  },
];

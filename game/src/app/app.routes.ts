import { Routes } from '@angular/router';
import { GameComponent } from '~/app/game/game.component';
import { NotFoundComponent } from '~/app/not-found/not-found.component';
import { WelcomeComponent } from '~/app/welcome/welcome.component';

export const routes: Routes = [
  { path: "welcome", component: WelcomeComponent, title: 'Game'  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent},
];



import { Routes } from '@angular/router';
import { NotFoundComponent } from '~/app/hoc/not-found/not-found.component';
import { WelcomeComponent } from '~/app/hoc/welcome/welcome.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent, title: 'Game' },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

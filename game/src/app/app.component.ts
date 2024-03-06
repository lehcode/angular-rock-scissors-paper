import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SidebarComponent } from '~/app/sidebar/sidebar.component';

@Component({
  selector: 'game-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GameComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'player';
}

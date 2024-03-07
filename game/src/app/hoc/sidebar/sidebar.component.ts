import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'game-sidebar',
  standalone: true,
  imports: [
    NgIconsModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}

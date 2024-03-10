import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'game-sidebar',
  standalone: true,
  imports: [NgIconsModule, RouterLink, RouterLinkActive, NgbTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: { class: 'd-block' },
})
export class SidebarComponent {
  activeIndex: number | undefined;

  setActive(elem: any) {}
}

import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'game-collapse',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss'
})

export class CollapseComponent {
  isCollapsed = false;
}

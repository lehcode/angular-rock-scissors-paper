import { Component } from '@angular/core';
import { GameService } from '~/app/services/game.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { GameCode } from '~/app/enums/game-code';
import { Observable } from 'rxjs';

export interface GameRule {
  heading: string;
  description: string;
}

@Component({
  selector: 'game-collapse',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss',
})
export class CollapseComponent {
  public isCollapsed = false;
  public gameCode: GameCode = GameCode.RPS;
  public gameRules$ = Observable<object[]>;

  constructor(gameService: GameService) {
    this.gameCode = gameService.defaultGameCode;
  }

  protected readonly GameMode = GameCode;
}

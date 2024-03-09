import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '~/app/services/game.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '~/app/interfaces/player';
import { tap } from 'rxjs';

/**
 * Component for the welcome page of the game.
 */
@Component({
  selector: 'game-welcome',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  providers: [GameService],
})
export class WelcomeComponent {
  /**
   * Form group for the player name input.
   */
  form: FormGroup;

  /**
   * Player object with the current player's name and game stats.
   */
  player: Player;

  /**
   * Creates an instance of the WelcomeComponent.
   * @param fb FormBuilder service for creating form groups.
   * @param router Router service for navigating between pages.
   * @param gameService GameService service for managing game data.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gameService: GameService,
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
    });

    this.player = {
      id: undefined,
      weapon: undefined,
      name: 'Human',
      wins: 0,
      losses: 0,
    } as Player;
  }

  /**
   * Sets the player name and saves it to the game service.
   */
  setName() {
    const val = this.form.value;
    this.player = { ...this.player, name: val.name };

    this.gameService
      .savePlayer$(this.player)
      .pipe(tap((player) => console.log(`Player: ${player.name}:\nwins: ${player.wins},\nlosses: ${player.losses}`)))
      .subscribe(
        () => this.router.navigate(['/game']),
        (err) => {
          console.error(err);
        },
      );
  }
}

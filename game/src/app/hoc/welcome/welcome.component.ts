import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '~/app/services/game.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '~/app/interfaces/player';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'game-welcome',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  providers: [GameService],
})
export class WelcomeComponent {
  form: FormGroup;
  player: Player | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gameService: GameService,
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
    });
    this.player = {
      name: 'Human',
      wins: 0,
      losses: 0,
    };
  }

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

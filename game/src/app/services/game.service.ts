import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  shareReplay, tap
} from 'rxjs';
import { PlayerInterface } from '~/app/interfaces/player.interface';

const PLAYER_DATA = 'player_data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private subject = new BehaviorSubject<PlayerInterface | null>(null);
  player$: Observable<PlayerInterface | null> = this.subject.asObservable();
  nameSpecified$: Observable<boolean>;

  constructor() {
    this.nameSpecified$ = this.player$.pipe(map((player) => !!player?.name));

    const data = JSON.parse(localStorage.getItem(PLAYER_DATA) as string);
    this.player$ = of(data);
    this.player$.pipe(tap((data) => console.log(data)))
  }

  savePlayer(player: PlayerInterface): Observable<PlayerInterface> {
    // Simulate a successful login response with a mock user object
    const mockUser: PlayerInterface = { ...player };
    // Emit the mock user object and store it in local storage
    this.subject.next(mockUser);

    localStorage.setItem(PLAYER_DATA, JSON.stringify(mockUser));

    return of(mockUser).pipe(shareReplay());
  }

  getPlayer() {
    return JSON.parse(localStorage.getItem(PLAYER_DATA) as string);
  }
}

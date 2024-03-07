import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, shareReplay, tap } from 'rxjs';
import { Player } from '~/app/interfaces/player';

const PLAYER_DATA = "player_data";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private subject = new BehaviorSubject<Player | null>(null);
  player$ : Observable<Player | null> = this.subject.asObservable();
  nameSpecified$ : Observable<boolean>;

  constructor() {
    this.nameSpecified$ = this.player$.pipe(
      map(player => !!player?.name)
    );

    const data = JSON.parse(localStorage.getItem(PLAYER_DATA) as string);
    this.player$ = of(data);
  }

  savePlayer(player: Player): Observable<Player> {
    // Simulate a successful login response with a mock user object
    const mockUser: Player = {...player};
    // Emit the mock user object and store it in local storage
    this.subject.next(mockUser);

    localStorage.setItem(PLAYER_DATA, JSON.stringify(mockUser));

    return of(mockUser)
    .pipe(
      shareReplay()
    );
  }

  getPlayer() {
    return JSON.parse(localStorage.getItem(PLAYER_DATA) as string);
  }
}

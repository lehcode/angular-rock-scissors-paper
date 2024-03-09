import { GameListItem } from '~/app/interfaces/game-list-item';
import { Observable } from 'rxjs';
import { Player } from '~/app/interfaces/player';

export interface GameResult {
  id: string | Observable<string>;
  date: string;
  game: GameListItem;
  player: Player;
  humanWeapon: string;
  pcWeapon: string;
  winner: string;
}

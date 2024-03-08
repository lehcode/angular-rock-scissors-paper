import { Weapon } from '~/app/interfaces/weapon';
import { Player } from '~/app/interfaces/player';
import { GameCode } from '~/app/enums/game-code';

export interface GameResult {
  id: number;
  date: number;
  game: GameCode;
  playerItem: Weapon;
  computerItem: Weapon;
  winner: Player;
}

import { Weapon } from '~/app/interfaces/weapon';
import { Player } from '~/app/interfaces/player';
import { GameMode } from '~/app/enums/game.mode';

export interface GameResult {
  id: number;
  date: number;
  game: GameMode;
  playerItem: Weapon;
  computerItem: Weapon;
  winner: Player;
}

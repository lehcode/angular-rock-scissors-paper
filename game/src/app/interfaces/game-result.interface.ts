import { ItemInterface } from '~/app/interfaces/item.interface';
import { PlayerInterface } from '~/app/interfaces/player.interface';

export interface GameResult {
  playerItem: ItemInterface;
  computerItem: ItemInterface;
  winner: PlayerInterface;
}

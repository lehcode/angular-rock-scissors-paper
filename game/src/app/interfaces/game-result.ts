import { GameListItem } from '~/app/interfaces/game-list-item';

export interface GameResult {
  id: number | null;
  date: string;
  game: GameListItem;
  humanWeapon: string;
  pcWeapon: string;
  winner: string;
}

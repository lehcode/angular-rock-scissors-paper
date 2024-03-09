import { Weapon } from '~/app/interfaces/weapon';

export interface Player {
  id: string | undefined;
  name: string | '';
  wins: number | 0;
  losses: number | 0;
  weapon: Weapon | undefined;
}

import { ITeam } from './team';

export interface ITeamActivePaginated {
  items: ITeam[];
  totalCount: number;
}

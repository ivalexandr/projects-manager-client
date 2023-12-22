import { ITeam } from './team';

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  teams: ITeam[];
}

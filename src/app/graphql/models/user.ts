import { ITeamAccess } from './team-access';

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  teamAccesses: ITeamAccess[];
}

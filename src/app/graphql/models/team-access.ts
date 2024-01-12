import { TeamAccessStatus } from '../enums/team-access-status.enum';
import { TeamRole } from '../enums/team-role.enum';
import { ITeam } from './team';
import { IUser } from './user';

export interface ITeamAccess {
  id: string;
  team: ITeam;
  user: IUser;
  teamRole: TeamRole;
  status: TeamAccessStatus;
}

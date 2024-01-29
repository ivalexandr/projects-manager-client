import { TeamRole } from '../enums/team-role.enum';

export interface ICreateTeamAccessInput {
  username: string;
  teamId: string;
  teamRole: TeamRole;
}

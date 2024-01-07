import { TeamStatus } from '../enums/team-status.enum';
import { IProjectInTeam } from './project-in-team';
import { ITeamChat } from './team-chat';
import { IUser } from './user';

export interface ITeam {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  leader: IUser;
  members: IUser[];
  status: TeamStatus;
  projects: IProjectInTeam[];
  isPublic: boolean;
  createdAt: Date;
  teamChat: ITeamChat;
}

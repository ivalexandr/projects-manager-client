import { ITeam } from './team';
import { ITeamChatMessage } from './team-chat-message';

export interface ITeamChat {
  id: string;
  team: ITeam;
  messages: ITeamChatMessage[];
}

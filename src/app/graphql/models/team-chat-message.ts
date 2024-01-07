import { ITeamChat } from './team-chat';
import { IUser } from './user';

export interface ITeamChatMessage {
  id: string;
  createdAt: Date;
  teamChat: ITeamChat;
  sender: IUser;
  message: string;
}

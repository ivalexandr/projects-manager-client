import { createAction, props } from '@ngrx/store';
import { ITeamChatMessage } from '../../graphql/models/team-chat-message';

export const getTeamChatMessages = createAction(
  '[TeamChat]: Get team chat messages',
  props<{ chatId: string; lastMessageId?: string; limit?: number }>()
);
export const getTeamChatMessagesSuccess = createAction(
  '[TeamChat]: Get team chat messages success',
  props<{ messages: ITeamChatMessage[] }>()
);
export const getTeamChatMessagesFailure = createAction(
  '[TeamChat]: Get team chat messages failure',
  props<{ error: string }>()
);
export const resetTeamChatMessages = createAction('[TeamChat]: Reset team chat messages');
export const addTeamChatMessage = createAction(
  '[TeamChat]: Add team-chat-message',
  props<{ message: ITeamChatMessage }>()
);

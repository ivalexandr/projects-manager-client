import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { teamChatMessagesAdapter } from './team-chat-messages.reducer';

const { selectAll } = teamChatMessagesAdapter.getSelectors();

export const teamChatMessagesSelector = (store: TAppStore) => store.teamChatMessages;

export const selectTeamChatMessagesError = createSelector(
  teamChatMessagesSelector,
  state => state.error
);
export const selectTeamChatMessagesIsLoading = createSelector(
  teamChatMessagesSelector,
  state => state.isLoading
);
export const selectAllTeamChatMessages = createSelector(teamChatMessagesSelector, selectAll);

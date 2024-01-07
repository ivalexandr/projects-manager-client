import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ITeamChatMessage } from '../../graphql/models/team-chat-message';
import { createReducer, on } from '@ngrx/store';
import * as teamChatMessagesActions from './team-chat-messages.actions';
import { totalResetErrors } from '../common/common.actions';

export interface ITeamChatMessagesReducer extends EntityState<ITeamChatMessage> {
  isLoading: boolean;
  error: string | null;
}

export const sortByDate = (a: ITeamChatMessage, b: ITeamChatMessage) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

export const teamChatMessagesAdapter: EntityAdapter<ITeamChatMessage> =
  createEntityAdapter<ITeamChatMessage>({
    sortComparer: sortByDate,
  });

export const initialState: ITeamChatMessagesReducer = teamChatMessagesAdapter.getInitialState({
  error: null,
  isLoading: false,
});

export const teamChatMessagesReducer = createReducer(
  initialState,
  on(teamChatMessagesActions.getTeamChatMessages, state => ({ ...state, isLoading: true })),
  on(teamChatMessagesActions.getTeamChatMessagesSuccess, (state, { messages }) =>
    teamChatMessagesAdapter.addMany(messages, { ...state, isLoading: false, error: null })
  ),
  on(teamChatMessagesActions.getTeamChatMessagesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(teamChatMessagesActions.resetTeamChatMessages, state =>
    teamChatMessagesAdapter.removeAll(state)
  ),
  on(teamChatMessagesActions.addTeamChatMessage, (state, { message }) =>
    teamChatMessagesAdapter.addOne(message, state)
  ),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

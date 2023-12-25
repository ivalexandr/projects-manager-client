import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ITeam } from '../../graphql/models/team';
import { createReducer, on } from '@ngrx/store';
import * as userTeamsActions from './user-teams.actions';
import { totalResetErrors } from '../common/common.actions';

export interface IUserTeamsReducer extends EntityState<ITeam> {
  error: string | null;
  isLoading: boolean;
}

export const userTeamsAdapter: EntityAdapter<ITeam> = createEntityAdapter<ITeam>();

export const initialState: IUserTeamsReducer = userTeamsAdapter.getInitialState({
  error: null,
  isLoading: false,
});

export const userTeamsReducer = createReducer(
  initialState,
  on(userTeamsActions.addTeams, (state, { teams }) =>
    userTeamsAdapter.addMany(teams, { ...state, error: null, isLoading: false })
  ),
  on(userTeamsActions.addTeam, (state, { team }) =>
    userTeamsAdapter.addOne(team, { ...state, error: null, isLoading: false })
  ),
  on(userTeamsActions.getUserTeams, state => ({ ...state, isLoading: true })),
  on(userTeamsActions.getUserTeamsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(userTeamsActions.resetErrorUserTeams, state => ({ ...state, error: null, isLoading: false })),
  on(userTeamsActions.resetUserTeams, state => userTeamsAdapter.removeAll(state)),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ITeam } from '../../graphql/models/team';
import { createReducer, on } from '@ngrx/store';
import * as userTeamsActions from './user-teams.actions';
import { totalResetErrors } from '../common/common.actions';

export interface IUserTeamsReducer extends EntityState<ITeam> {
  error: string | null;
}

export const userTeamsAdapter: EntityAdapter<ITeam> = createEntityAdapter<ITeam>();

export const initialState: IUserTeamsReducer = userTeamsAdapter.getInitialState({ error: null });

export const userTeamsReducer = createReducer(
  initialState,
  on(userTeamsActions.addTeams, (state, { teams }) =>
    userTeamsAdapter.addMany(teams, { ...state, error: null })
  ),
  on(userTeamsActions.addTeam, (state, { team }) =>
    userTeamsAdapter.addOne(team, { ...state, error: null })
  ),
  on(userTeamsActions.getUserTeamsFailure, (state, { error }) => ({ ...state, error })),
  on(userTeamsActions.resetErrorUserTeams, state => ({ ...state, error: null })),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

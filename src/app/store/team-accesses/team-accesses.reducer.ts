import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as teamAccessesActions from './team-accesses.actions';
import { totalResetErrors } from '../common/common.actions';
import { ITeamAccess } from '../../graphql/models/team-access';

export interface ITeamAccessReducer extends EntityState<ITeamAccess> {
  error: string | null;
  isLoading: boolean;
  activeTeamAccess: ITeamAccess | null;
  isActiveTeamAccessLoading: boolean;
}

export const teamAccessAdapter: EntityAdapter<ITeamAccess> = createEntityAdapter<ITeamAccess>();

export const initialState: ITeamAccessReducer = teamAccessAdapter.getInitialState({
  error: null,
  isLoading: false,
  activeTeamAccess: null,
  isActiveTeamAccessLoading: false,
});

export const teamAccessesReducer = createReducer(
  initialState,
  on(teamAccessesActions.addTeamAccesses, (state, { teamAccesses }) =>
    teamAccessAdapter.addMany(teamAccesses, state)
  ),
  on(teamAccessesActions.addTeamAccess, (state, { teamAccess }) =>
    teamAccessAdapter.addOne(teamAccess, state)
  ),
  on(teamAccessesActions.getTeamAccesses, state => ({ ...state, isLoading: true })),
  on(teamAccessesActions.getTeamAccessesSuccess, (state, { teamAccesses }) =>
    teamAccessAdapter.addMany(teamAccesses, { ...state, isLoading: false, error: null })
  ),
  on(teamAccessesActions.getTeamAccessesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(teamAccessesActions.resetErrorTeamAccesses, state => ({
    ...state,
    error: null,
    isLoading: false,
  })),
  on(teamAccessesActions.getTeamAccess, state => ({
    ...state,
    error: null,
    isActiveTeamAccessLoading: true,
  })),
  on(teamAccessesActions.getTeamAccsessSuccess, (state, { teamAccess }) => ({
    ...state,
    error: null,
    isActiveTeamAccessLoading: false,
    activeTeamAccess: teamAccess,
  })),
  on(teamAccessesActions.getTeamAccessFailure, (state, { error }) => ({
    ...state,
    isActiveTeamAccessLoading: false,
    error,
  })),
  on(teamAccessesActions.resetTeamAccesses, state => teamAccessAdapter.removeAll(state)),
  on(teamAccessesActions.acceptingInvitationSuccess, (state, { teamAccess }) =>
    teamAccessAdapter.updateOne(teamAccess, state)
  ),
  on(teamAccessesActions.acceptingInvitationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(teamAccessesActions.decliningInvitationSuccess, (state, { teamAccess }) =>
    teamAccessAdapter.removeOne(teamAccess.id, state)
  ),
  on(teamAccessesActions.decliningInvitationFailure, (state, { error }) => ({ ...state, error })),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

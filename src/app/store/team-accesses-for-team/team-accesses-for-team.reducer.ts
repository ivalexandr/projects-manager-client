import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ITeamAccess } from '../../graphql/models/team-access';
import { createReducer, on } from '@ngrx/store';
import * as teamAccessForTeamActions from './team-accesses-for-team.actions';
import { totalResetErrors } from '../common/common.actions';

export interface IteamAccessesForTeamReducer extends EntityState<ITeamAccess> {
  isLoading: boolean;
  error: string | null;
}

export const teamAccessForTeamAdapter: EntityAdapter<ITeamAccess> =
  createEntityAdapter<ITeamAccess>({
    selectId: (teamAccess: ITeamAccess) => teamAccess.id,
  });

export const initialState: IteamAccessesForTeamReducer = teamAccessForTeamAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const teamAccessesForTeamReducer = createReducer(
  initialState,
  on(teamAccessForTeamActions.getTeamAccessesForTeam, state => ({ ...state, isLoading: true })),
  on(teamAccessForTeamActions.getTeamAccessesForTeamSuccess, (state, { teamAccesses }) =>
    teamAccessForTeamAdapter.addMany(teamAccesses, { ...state, isLoading: false, error: null })
  ),
  on(teamAccessForTeamActions.getTeamAccessesForTeamFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(teamAccessForTeamActions.inviteUserToTeamSuccess, (state, { teamAccess }) =>
    teamAccessForTeamAdapter.upsertOne(teamAccess, state)
  ),
  on(teamAccessForTeamActions.inviteUserToTeamFailure, (state, { error }) => ({ ...state, error })),
  on(teamAccessForTeamActions.reseteamAccessesForTeam, state =>
    teamAccessForTeamAdapter.removeAll(state)
  ),
  on(teamAccessForTeamActions.removeTeamAccessSuccess, (state, { teamAccessId }) =>
    teamAccessForTeamAdapter.removeOne(teamAccessId, state)
  ),
  on(teamAccessForTeamActions.removeTeamAccessFailure, (state, { error }) => ({ ...state, error })),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

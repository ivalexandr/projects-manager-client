import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { teamAccessForTeamAdapter } from './team-accesses-for-team.reducer';

const { selectAll } = teamAccessForTeamAdapter.getSelectors();

export const selectorTeamAccessForTeam = (store: TAppStore) => store.teamAccessesForTeam;

export const selectAllTeamAccessesForTeam = createSelector(selectorTeamAccessForTeam, selectAll);
export const selectIsLoadingTeamAccessesForTeam = createSelector(
  selectorTeamAccessForTeam,
  state => state.isLoading
);
export const selectTeamAccessesForTeamError = createSelector(
  selectorTeamAccessForTeam,
  state => state.error
);

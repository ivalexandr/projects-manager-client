import { createSelector } from '@ngrx/store';
import { userTeamsAdapter } from './user-teams.reducer';
import { TAppStore } from '../../app.config';

const { selectAll, selectTotal } = userTeamsAdapter.getSelectors();

export const selectTeamState = (store: TAppStore) => store.userTeams;

export const selectAllUserTeams = createSelector(selectTeamState, selectAll);
export const selectTotalUserTeams = createSelector(selectTeamState, selectTotal);
export const selectErrorUserTeams = createSelector(selectTeamState, state => state.error);

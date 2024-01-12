import { createSelector } from '@ngrx/store';
import { teamAccessAdapter } from './team-accesses.reducer';
import { TAppStore } from '../../app.config';

const { selectAll, selectTotal } = teamAccessAdapter.getSelectors();

export const selectTeamState = (store: TAppStore) => store.teamAccesses;

export const selectAllTeamAccsesses = createSelector(selectTeamState, selectAll);
export const selectTotalTeamAccesses = createSelector(selectTeamState, selectTotal);
export const selectErrorTeamAccesses = createSelector(selectTeamState, state => state.error);
export const selectIsLoadingTeamAccesses = createSelector(
  selectTeamState,
  state => state.isLoading
);

export const selectActiveTeamAccess = createSelector(
  selectTeamState,
  state => state.activeTeamAccess
);
export const selectIsActiveTeamAccessLoading = createSelector(
  selectTeamState,
  state => state.isActiveTeamAccessLoading
);

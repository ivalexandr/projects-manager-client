import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../app.config';

const selectTeamsPaginated = (store: TAppStore) => store.teamsPaginated;

export const selectPageAndPageSize = createSelector(selectTeamsPaginated, state => state.pageInfo);
export const selectActiveTeamsPaginated = createSelector(
  selectTeamsPaginated,
  state => state.teamsPaginated
);
export const selectActiveTeamsIsLoading = createSelector(
  selectTeamsPaginated,
  state => state.isLoading
);

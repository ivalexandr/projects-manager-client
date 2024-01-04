import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { projectsInTeamAdapter } from './projects-in-team.reducer';

const { selectAll } = projectsInTeamAdapter.getSelectors();

export const selectorProjectsInTeam = (store: TAppStore) => store.projectsInTeam;

export const selectProjectsInTeamError = createSelector(
  selectorProjectsInTeam,
  state => state.error
);
export const selectProjectsInTeamIsLoading = createSelector(
  selectorProjectsInTeam,
  state => state.isLoading
);
export const selectAllProjectsInTeam = createSelector(selectorProjectsInTeam, selectAll);

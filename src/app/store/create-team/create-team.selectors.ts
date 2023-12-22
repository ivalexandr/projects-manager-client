import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../app.config';

export const selectCreateTeam = (store: TAppStore) => store.createTeam;

export const selectCreateTeamFromForm = createSelector(
  selectCreateTeam,
  state => state.createTeamForm
);
export const selectErrorCreateTeam = createSelector(selectCreateTeam, state => state.error);

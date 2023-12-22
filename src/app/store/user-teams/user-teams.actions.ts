import { createAction, props } from '@ngrx/store';
import { ITeam } from '../../graphql/models/team';

export const getUserTeams = createAction('[Team]: Get user teams');
export const getUserTeamsFailure = createAction(
  '[Team]: Get user teams failure',
  props<{ error: string }>()
);

export const addTeam = createAction('[Team]: Add team', props<{ team: ITeam }>());
export const addTeams = createAction('[Team]: Add teams', props<{ teams: ITeam[] }>());
export const resetErrorUserTeams = createAction('[Team]: Reset error user teams');

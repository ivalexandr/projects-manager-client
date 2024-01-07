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
export const resetUserTeams = createAction('[Team]: Reset user teams');

export const getUserTeam = createAction('[Team]: Get user team', props<{ teamId: string }>());
export const getUserTeamSuccess = createAction(
  '[Team]: Get user team success',
  props<{ team: ITeam }>()
);
export const getUserTeamFailure = createAction(
  '[Team]: Get user team failure',
  props<{ error: string }>()
);

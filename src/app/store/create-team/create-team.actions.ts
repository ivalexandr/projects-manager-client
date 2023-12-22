import { createAction, props } from '@ngrx/store';
import { ICreateTeamInput } from '../../graphql/inputs/create-team.input';

export const createTeam = createAction('[Team]: Create team');
export const setCreateTeamData = createAction(
  '[Team]: Set create team data',
  props<{ team: ICreateTeamInput }>()
);
export const createTeamSuccess = createAction('[Team]: Create team success');
export const createTeamFailure = createAction(
  '[Team]: Create team failure',
  props<{ error: string }>()
);

export const resetCreateTeamError = createAction('[Team]: Reset create team error');

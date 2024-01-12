import { createAction, props } from '@ngrx/store';
import { ITeamAccess } from '../../graphql/models/team-access';

export const getTeamAccesses = createAction('[Team]: Get team-accesses');
export const getTeamAccessesSuccess = createAction(
  '[Team]: Get team-accesses success',
  props<{ teamAccesses: ITeamAccess[] }>()
);
export const getTeamAccessesFailure = createAction(
  '[Team]: Get team-accesses failure',
  props<{ error: string }>()
);

export const addTeamAccess = createAction(
  '[Team]: Add team-access',
  props<{ teamAccess: ITeamAccess }>()
);
export const addTeamAccesses = createAction(
  '[Team]: Add team-accesses',
  props<{ teamAccesses: ITeamAccess[] }>()
);

export const resetErrorTeamAccesses = createAction('[Team]: Reset error team-accesses');
export const resetTeamAccesses = createAction('[Team]: Reset team-accesses');

export const getTeamAccess = createAction('[Team]: Get team-access', props<{ teamId: string }>());
export const getTeamAccsessSuccess = createAction(
  '[Team]: Get team-access success',
  props<{ teamAccess: ITeamAccess }>()
);
export const getTeamAccessFailure = createAction(
  '[Team]: Get team-access failure',
  props<{ error: string }>()
);

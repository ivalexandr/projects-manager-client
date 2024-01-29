import { createAction, props } from '@ngrx/store';
import { ITeamAccess } from '../../graphql/models/team-access';
import { ICreateTeamAccessInput } from '../../graphql/inputs/create-team-access.input';

export const getTeamAccessesForTeam = createAction(
  '[TeamAccesesForTeam]: Get team accesses for team',
  props<{ teamId: string }>()
);
export const getTeamAccessesForTeamSuccess = createAction(
  '[TeamAccesesForTeam]: Get team accesses for team success',
  props<{ teamAccesses: ITeamAccess[] }>()
);
export const getTeamAccessesForTeamFailure = createAction(
  '[TeamAccesesForTeam]: Get team accesses for team failure',
  props<{ error: string }>()
);

export const inviteUserToTeam = createAction(
  '[TeamAccesesForTeam]: Invite user to team',
  props<{ create: ICreateTeamAccessInput }>()
);
export const inviteUserToTeamSuccess = createAction(
  '[TeamAccesesForTeam]: Invite user to team success',
  props<{ teamAccess: ITeamAccess }>()
);
export const inviteUserToTeamFailure = createAction(
  '[TeamAccesesForTeam]: Invite user to team failure',
  props<{ error: string }>()
);

export const removeTeamAccess = createAction(
  '[TeamAccesesForTeam]: remove team-access',
  props<{ teamAccessId: string }>()
);
export const removeTeamAccessSuccess = createAction(
  '[TeamAccesesForTeam]: remove team-access sucess',
  props<{ teamAccessId: string }>()
);
export const removeTeamAccessFailure = createAction(
  '[TeamAccesesForTeam]: remove team-access failure',
  props<{ error: string }>()
);

export const reseteamAccessesForTeam = createAction(
  '[TeamAccesesForTeam]: Reset team accesses for team'
);

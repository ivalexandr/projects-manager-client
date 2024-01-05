import { createAction, props } from '@ngrx/store';
import { IProjectInTeam } from '../../graphql/models/project-in-team';
import { ICreateProjectInput } from '../../graphql/inputs/create-project.input';

export const getProjectsInTeam = createAction(
  '[Projects in team]: Get projects in team',
  props<{ teamId: string }>()
);
export const getProjectsInTeamSuccess = createAction(
  '[Projects in team]: Get projects in team success',
  props<{ projects: IProjectInTeam[] }>()
);
export const getProjectsInteamFailure = createAction(
  '[Projects in team]: Get projects in team failure',
  props<{ error: string }>()
);

export const createProjectInTeam = createAction(
  '[Projects in team]: Create project in team',
  props<{ input: ICreateProjectInput }>()
);
export const createProjectInTeamSuccess = createAction(
  '[Projects in team]: Create project in team success',
  props<{ project: IProjectInTeam }>()
);
export const createProjectInTeamFailure = createAction(
  '[Projects in team]: Create project in team failure',
  props<{ error: string }>()
);

export const resetProjectsInTeams = createAction('[Projects in team]: Get projects in team reset');

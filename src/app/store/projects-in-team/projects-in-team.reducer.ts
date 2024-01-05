import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IProjectInTeam } from '../../graphql/models/project-in-team';
import { createReducer, on } from '@ngrx/store';
import * as projectsInTeamActions from './projects-in-team.actions';
import { totalResetErrors } from '../common/common.actions';

export interface IProjectsInTeamReducer extends EntityState<IProjectInTeam> {
  isLoading: boolean;
  error: string | null;
}

export const projectsInTeamAdapter: EntityAdapter<IProjectInTeam> =
  createEntityAdapter<IProjectInTeam>();

export const initialState: IProjectsInTeamReducer = projectsInTeamAdapter.getInitialState({
  error: null,
  isLoading: false,
});

export const projectsInTeamReducer = createReducer(
  initialState,
  on(projectsInTeamActions.getProjectsInTeam, state => ({ ...state, isLoading: true })),
  on(projectsInTeamActions.getProjectsInTeamSuccess, (state, { projects }) =>
    projectsInTeamAdapter.addMany(projects, { ...state, isLoading: false, error: null })
  ),
  on(projectsInTeamActions.getProjectsInteamFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(projectsInTeamActions.createProjectInTeamSuccess, (state, { project }) =>
    projectsInTeamAdapter.addOne(project, state)
  ),
  on(projectsInTeamActions.createProjectInTeamFailure, (state, { error }) => ({ ...state, error })),
  on(projectsInTeamActions.resetProjectsInTeams, state => projectsInTeamAdapter.removeAll(state)),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../../graphql/services/project.service';
import * as projectsInTeamActions from './projects-in-team.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ProjectsInTeamEffects {
  getProjectsInTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsInTeamActions.getProjectsInTeam),
      switchMap(action =>
        this.projectService.getProjectsInTeam(action.teamId).pipe(
          map(({ data }) =>
            projectsInTeamActions.getProjectsInTeamSuccess({
              projects: data.getProjectsForTeam,
            })
          ),
          catchError(err =>
            of(projectsInTeamActions.getProjectsInteamFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createProjectInTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsInTeamActions.createProjectInTeam),
      switchMap(action =>
        this.projectService.createProjectInTeam(action.input).pipe(
          map(({ data }) =>
            projectsInTeamActions.createProjectInTeamSuccess({ project: data!.createProject })
          ),
          catchError(err =>
            of(projectsInTeamActions.createProjectInTeamFailure({ error: err.message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly projectService: ProjectService
  ) {}
}

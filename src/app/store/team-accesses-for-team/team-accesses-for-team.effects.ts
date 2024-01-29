import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamAccessService } from '../../graphql/services/team-access.service';
import * as teamAccessesForTeamActions from './team-accesses-for-team.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TeamAccessesForTeamEffects {
  teamAccessesForTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamAccessesForTeamActions.getTeamAccessesForTeam),
      switchMap(action =>
        this.teamAccessService.getTeamAccessesForTeam(action.teamId).pipe(
          map(({ data }) =>
            teamAccessesForTeamActions.getTeamAccessesForTeamSuccess({
              teamAccesses: data.getTeamAccessesForTeam,
            })
          ),
          catchError(error =>
            of(teamAccessesForTeamActions.getTeamAccessesForTeamFailure({ error: error.message }))
          )
        )
      )
    )
  );

  inviteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamAccessesForTeamActions.inviteUserToTeam),
      switchMap(action =>
        this.teamAccessService.inviteUserToTeam(action.create).pipe(
          map(({ data }) =>
            teamAccessesForTeamActions.inviteUserToTeamSuccess({
              teamAccess: data!.inviteUserToTeam,
            })
          ),
          catchError(error =>
            of(teamAccessesForTeamActions.inviteUserToTeamFailure({ error: error.message }))
          )
        )
      )
    )
  );

  removeTeamAccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamAccessesForTeamActions.removeTeamAccess),
      switchMap(action =>
        this.teamAccessService.removeTeamAccess(action.teamAccessId).pipe(
          map(({ data }) =>
            teamAccessesForTeamActions.removeTeamAccessSuccess({
              teamAccessId: data!.removeTeamAccess.id,
            })
          ),
          catchError(error =>
            of(teamAccessesForTeamActions.removeTeamAccessFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly teamAccessService: TeamAccessService
  ) {}
}

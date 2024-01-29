import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userTeamsActions from './team-accesses.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { TeamAccessService } from '../../graphql/services/team-access.service';

@Injectable()
export class UserTeamsEffects {
  userTeams$ = createEffect(() =>
    this.actions.pipe(
      ofType(userTeamsActions.getTeamAccesses),
      switchMap(() =>
        this.teamAccessService.getTeamAccesses().pipe(
          switchMap(result => {
            if (result.data) {
              const teamAccesses = result.data.getTeamAccesses;
              return of(userTeamsActions.getTeamAccessesSuccess({ teamAccesses }));
            }
            return of(
              userTeamsActions.getTeamAccessesFailure({ error: 'Неожиданный ответ от сервера' })
            );
          }),
          catchError(err => of(userTeamsActions.getTeamAccessesFailure({ error: err.message })))
        )
      )
    )
  );

  userTeam$ = createEffect(() =>
    this.actions.pipe(
      ofType(userTeamsActions.getTeamAccess),
      switchMap(action =>
        this.teamAccessService.getTeamAccess(action.teamId).pipe(
          map(result =>
            userTeamsActions.getTeamAccsessSuccess({ teamAccess: result.data.getTeamAccess })
          ),
          catchError(err => of(userTeamsActions.getTeamAccessFailure({ error: err.message })))
        )
      )
    )
  );

  acceptingInvitation$ = createEffect(() =>
    this.actions.pipe(
      ofType(userTeamsActions.acceptingInvitation),
      switchMap(action =>
        this.teamAccessService.acceptingInvitation(action.teamId, action.isAnswer).pipe(
          map(({ data }) =>
            userTeamsActions.acceptingInvitationSuccess({
              teamAccess: { id: data!.acceptingInvitation.id, changes: data!.acceptingInvitation },
            })
          ),
          catchError(err => of(userTeamsActions.acceptingInvitationFailure({ error: err.message })))
        )
      )
    )
  );

  decliningInvitation$ = createEffect(() =>
    this.actions.pipe(
      ofType(userTeamsActions.decliningInvitation),
      switchMap(action =>
        this.teamAccessService.acceptingInvitation(action.teamId, action.isAnswer).pipe(
          map(({ data }) =>
            userTeamsActions.decliningInvitationSuccess({ teamAccess: data!.acceptingInvitation })
          ),
          catchError(err => of(userTeamsActions.decliningInvitationFailure({ error: err.message })))
        )
      )
    )
  );

  constructor(
    private readonly actions: Actions,
    private readonly teamAccessService: TeamAccessService
  ) {}
}

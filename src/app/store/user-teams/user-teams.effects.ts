import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamService } from '../../graphql/serivces/team.service';
import * as userTeamsActions from './user-teams.actions';
import { catchError, of, switchMap } from 'rxjs';

@Injectable()
export class UserTeamsEffects {
  userTeams$ = createEffect(() =>
    this.actions.pipe(
      ofType(userTeamsActions.getUserTeams),
      switchMap(() =>
        this.teamService.getTeamsForUsers().pipe(
          switchMap(result => {
            if (result.data) {
              const teams = result.data.getTeamForUser;
              return of(userTeamsActions.addTeams({ teams }));
            }
            return of(
              userTeamsActions.getUserTeamsFailure({ error: 'Неожиданный ответ от сервера' })
            );
          }),
          catchError(err => of(userTeamsActions.getUserTeamsFailure({ error: err.message })))
        )
      )
    )
  );

  constructor(
    private readonly actions: Actions,
    private readonly teamService: TeamService
  ) {}
}

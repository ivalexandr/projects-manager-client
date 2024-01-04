import { Injectable } from '@angular/core';
import { TeamService } from '../../graphql/services/team.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import * as createTeamActions from './create-team.actions';
import * as userTeamsActions from '../user-teams/user-teams.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectCreateTeamFromForm } from './create-team.selectors';

@Injectable()
export class CraeteTeamEffects {
  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTeamActions.createTeam),
      withLatestFrom(this.store.pipe(select(selectCreateTeamFromForm))),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_, createTeamData]) =>
        this.teamService.createTeam(createTeamData).pipe(
          tap(result => {
            if (result.data) {
              const team = result.data.createTeam;
              this.store.dispatch(userTeamsActions.addTeam({ team }));
            }
          }),
          map(() => createTeamActions.createTeamSuccess()),
          catchError(err => {
            return of(createTeamActions.createTeamFailure({ error: err.message }));
          })
        )
      )
    )
  );
  constructor(
    private readonly actions$: Actions,
    private readonly teamService: TeamService,
    private readonly store: Store<TAppStore>
  ) {}
}

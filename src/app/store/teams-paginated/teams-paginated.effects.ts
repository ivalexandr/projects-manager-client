import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import * as teamsPaginatedActions from './teams-paginated.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectPageAndPageSize } from './teams-paginated.selectors';
import { TeamService } from '../../graphql/services/team.service';

@Injectable()
export class TeamsPaginatedEffects {
  teamsPaginated$ = createEffect(() =>
    this.actions.pipe(
      ofType(teamsPaginatedActions.getTeamPaginated),
      withLatestFrom(this.store.select(selectPageAndPageSize)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_, pageInfo]) =>
        this.teamService.getActiveTeamPaginated(pageInfo.page, pageInfo.pageSize).pipe(
          map(teamsPaginated =>
            teamsPaginatedActions.getTeamPaginatedSuccess({
              teamsPaginated: teamsPaginated.data.getActivePublicTeam,
            })
          ),
          catchError(error =>
            of(teamsPaginatedActions.getTeamPaginatedFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions: Actions,
    private readonly store: Store<TAppStore>,
    private readonly teamService: TeamService
  ) {}
}

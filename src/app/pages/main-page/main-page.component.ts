import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import * as teamsPaginatedActions from '../../store/teams-paginated/teams-paginated.actions';
import {
  selectActiveTeamsIsLoading,
  selectActiveTeamsPaginated,
} from '../../store/teams-paginated/teams-paginated.selectors';
import { filter, first, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { pageAnimations } from '../../common/animations';
import { TeamCardComponent } from '../../components/team-card/team-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatPaginatorModule, AsyncPipe, TeamCardComponent, MatProgressSpinnerModule, NgIf],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  animations: [pageAnimations],
})
export class MainPageComponent implements OnInit {
  teamsPaginated$ = this.store.pipe(select(selectActiveTeamsPaginated));
  teamsPaginatedItems$ = this.store.pipe(select(selectActiveTeamsPaginated)).pipe(
    filter(v => !!v),
    map(teamsPaginated => teamsPaginated!.items)
  );
  teamsPaginatedIsLoading$ = this.store.pipe(select(selectActiveTeamsIsLoading));

  length = 0;

  constructor(private readonly store: Store<TAppStore>) {}

  ngOnInit(): void {
    this.store.dispatch(teamsPaginatedActions.setPageAndPageSize({ page: 1, pageSize: 6 }));
    this.store.dispatch(teamsPaginatedActions.getTeamPaginated());
    this.teamsPaginated$.pipe(first(v => !!v)).subscribe(teamsPaginated => {
      if (teamsPaginated) {
        this.length = Math.ceil(teamsPaginated.totalCount / teamsPaginated.items.length);
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(
      teamsPaginatedActions.setPageAndPageSize({ page: event.pageIndex + 1, pageSize: 6 })
    );
    this.store.dispatch(teamsPaginatedActions.getTeamPaginated());
  }
}

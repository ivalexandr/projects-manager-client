import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import * as teamsPaginatedActions from '../../store/teams-paginated/teams-paginated.actions';
import { selectActiveTeamsPaginated } from '../../store/teams-paginated/teams-paginated.selectors';
import { filter, first, map } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { pageAnimations } from '../../common/animations';
import { TeamCardComponent } from '../../components/team-card/team-card.component';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatPaginatorModule, JsonPipe, AsyncPipe, TeamCardComponent, NgIf],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  animations: [pageAnimations],
})
export class MainPageComponent implements OnInit {
  teamsPaginated$ = this.store.select(selectActiveTeamsPaginated);
  teamsPaginatedItems$ = this.store.select(selectActiveTeamsPaginated).pipe(
    filter(v => !!v),
    map(teamsPaginated => teamsPaginated!.items)
  );
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

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Store, select } from '@ngrx/store';
import { selectErrorAuth } from './store/auth/auth.selectors';
import { TAppStore } from './app.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectErrorTeamAccesses } from './store/team-accesses/team-accesses.selectors';
import { selectErrorCreateTeam } from './store/create-team/create-team.selectors';
import { merge } from 'rxjs';
import { totalResetErrors } from './store/common/common.actions';
import { selectProjectsInTeamError } from './store/projects-in-team/projects-in-team.selectors';
import { selectTeamChatMessagesError } from './store/team-chat-mesasges/team-chat-messages.selectors';
import { selectTeamAccessesForTeamError } from './store/team-accesses-for-team/team-accesses-for-team.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  title = 'projects-manager-client';

  authError$ = this.store.pipe(select(selectErrorAuth));
  teamAccessesError$ = this.store.pipe(select(selectErrorTeamAccesses));
  createTeamError$ = this.store.pipe(select(selectErrorCreateTeam));
  projectsInTeamError$ = this.store.pipe(select(selectProjectsInTeamError));
  teamChatMessagesError$ = this.store.pipe(select(selectTeamChatMessagesError));
  teamAccessesForTeamError$ = this.store.pipe(select(selectTeamAccessesForTeamError));

  constructor(
    private readonly store: Store<TAppStore>,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    merge(
      this.authError$,
      this.teamAccessesError$,
      this.createTeamError$,
      this.projectsInTeamError$,
      this.teamChatMessagesError$,
      this.teamAccessesForTeamError$
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        if (error) {
          this.snackBar.open(error, 'Закрыть', { duration: 5000 });
          this.store.dispatch(totalResetErrors());
        }
      });
  }
}

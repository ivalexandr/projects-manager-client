import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Store, select } from '@ngrx/store';
import { selectErrorAuth } from './store/auth/auth.selectors';
import { TAppStore } from './app.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectErrorUserTeams } from './store/user-teams/user-teams.selectors';
import { selectErrorCreateTeam } from './store/create-team/create-team.selectors';
import { merge } from 'rxjs';
import { totalResetErrors } from './store/common/common.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  title = 'projects-manager-client';

  authError$ = this.store.pipe(select(selectErrorAuth));
  userTeamsError$ = this.store.pipe(select(selectErrorUserTeams));
  createTeamError$ = this.store.pipe(select(selectErrorCreateTeam));

  constructor(
    private readonly store: Store<TAppStore>,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    merge(this.authError$, this.userTeamsError$, this.createTeamError$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        if (error) {
          this.snackBar.open(error, 'Закрыть', { duration: 5000 });
          this.store.dispatch(totalResetErrors());
        }
      });
  }
}

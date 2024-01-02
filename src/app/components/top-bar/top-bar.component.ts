import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { AuthDialogService } from '../auth-dialog/auth-dialog.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import * as authActions from '../../store/auth/auth.actions';
import { resetUserTeams } from '../../store/user-teams/user-teams.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    UpperCasePipe,
    AsyncPipe,
    MatMenuModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  authUser$ = this.store.pipe(select(selectAuthUser));

  componentText = {
    button: 'Войти',
    title: 'Projects-manager',
    menu: {
      profile: 'Профиль',
      settings: 'Настройки',
      exit: 'Выход',
    },
  };

  constructor(
    private readonly authDialogService: AuthDialogService,
    private readonly store: Store<TAppStore>
  ) {}

  clickButtonHandler() {
    this.authDialogService.openDialog();
  }

  logoutHandler() {
    this.store.dispatch(authActions.logout());
    this.store.dispatch(resetUserTeams());
  }
}

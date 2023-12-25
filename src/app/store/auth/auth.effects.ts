import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../api/services';
import * as authActions from './auth.actions';
import { catchError, map, of, switchMap, tap, timer, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAuthUser, selectUserFromForm } from './auth.selectors';
import { TAppStore } from '../../app.config';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      withLatestFrom(this.store.pipe(select(selectUserFromForm))),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_, registerData]) =>
        this.authService
          .authControllerRegister({
            body: {
              email: registerData?.email || '',
              password: registerData?.password || '',
            },
          })
          .pipe(
            map(user => {
              this.localStorageService.setItem('authUser', user);
              return authActions.registerSuccess({ user });
            }),
            catchError((error: HttpErrorResponse) => of(authActions.registerFailure(error.error)))
          )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      withLatestFrom(this.store.pipe(select(selectUserFromForm))),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_, loginData]) =>
        this.authService
          .authControllerLogin({
            body: {
              email: loginData?.email || '',
              password: loginData?.password || '',
            },
          })
          .pipe(
            tap(user => this.localStorageService.setItem('authUser', user)),
            map(user => authActions.loginSuccess({ user })),
            catchError((error: HttpErrorResponse) => of(authActions.loginFailure(error.error)))
          )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshToken),
      withLatestFrom(this.store.pipe(select(selectAuthUser))),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_, user]) =>
        this.authService
          .authControllerRefresh({
            body: {
              email: user?.email || '',
              refresh_token: user?.refresh_token || '',
            },
          })
          .pipe(
            map(user => {
              this.localStorageService.setItem('authUser', user);
              return authActions.refreshTokenSuccess({ user });
            }),
            catchError((error: HttpErrorResponse) => {
              this.localStorageService.removeItem('authUser');
              return of(authActions.refreshTokenFailure(error.error));
            })
          )
      )
    )
  );

  refreshTokenTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshTokenSuccess),
      switchMap(() => timer(3300000).pipe(map(() => authActions.refreshToken())))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        this.localStorageService.removeItem('authUser');
        return authActions.logoutClean();
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly store: Store<TAppStore>,
    private readonly localStorageService: LocalStorageService
  ) {}
}

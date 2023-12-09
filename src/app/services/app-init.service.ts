import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TAppStore } from '../app.config';
import { Store } from '@ngrx/store';
import { ResponseUserDto } from '../api/models/response-user-dto';
import * as authActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store<TAppStore>
  ) {}

  init(): Promise<unknown> {
    return new Promise<void>((resolve) => {
      const localStoragedUser =
        this.localStorageService.getItem<ResponseUserDto>('authUser');

      if (localStoragedUser) {
        this.store.dispatch(
          authActions.loginSuccess({ user: localStoragedUser })
        );
        this.store.dispatch(authActions.refreshToken());
      }

      resolve();
    });
  }
}

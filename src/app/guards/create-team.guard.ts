import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { TAppStore } from '../app.config';
import { selectAuthUser } from '../store/auth/auth.selectors';

export const createTeamGuard: CanActivateFn = () => {
  const store = inject(Store<TAppStore>);

  const user = store.selectSignal(selectAuthUser)();

  return user ? true : false;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../app.config';
import { selectAuthUser } from '../store/auth/auth.selectors';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<TAppStore>);
  const router = inject(Router);

  const user$ = store.pipe(select(selectAuthUser));

  return user$.pipe(map(u => (u ? true : router.createUrlTree(['/']))));
};

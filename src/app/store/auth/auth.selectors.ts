import { createSelector } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { TAuthReducer } from './auth.reducer';

export const selectAuth = (state: TAppStore) => state.auth;

export const selectUserFromForm = createSelector(
  selectAuth,
  (state: TAuthReducer) => state.userFromForm
);

export const selectErrorAuth = createSelector(selectAuth, (state: TAuthReducer) => state.error);

export const selectAuthUser = createSelector(selectAuth, (state: TAuthReducer) => state.user);

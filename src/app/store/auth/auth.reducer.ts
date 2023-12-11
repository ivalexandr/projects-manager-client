import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { CreateUserDto, LoginUserDto, ResponseUserDto } from '../../api/models';

export type TAuthReducer = {
  user: ResponseUserDto | null;
  userFromForm: CreateUserDto | LoginUserDto | null;
  error: string | null;
};

export const initialState: TAuthReducer = {
  user: null,
  userFromForm: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    userFromForm: null,
    error: null,
  })),
  on(authActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    userFromForm: null,
    error: null,
  })),
  on(authActions.setRegisterData, (state, { email, password }) => ({
    ...state,
    userFromForm: { email, password },
  })),
  on(authActions.setLoginData, (state, { email, password }) => ({
    ...state,
    userFromForm: { email, password },
  })),
  on(authActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    userFromForm: null,
  })),
  on(authActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    userFromForm: null,
  })),
  on(authActions.resetError, state => ({ ...state, error: null })),
  on(authActions.refreshTokenSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(authActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(authActions.logoutClean, state => ({
    ...state,
    error: null,
    user: null,
    userFromForm: null,
  }))
);

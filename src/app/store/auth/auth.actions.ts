import { createAction, props } from '@ngrx/store';
import { CreateUserDto, LoginUserDto, ResponseUserDto } from '../../api/models';

export const register = createAction('[Auth]: Register');
export const setRegisterData = createAction(
  '[Auth]: Set register data',
  props<CreateUserDto>()
);
export const registerSuccess = createAction(
  '[Auth]: Register success',
  props<{ user: ResponseUserDto }>()
);
export const registerFailure = createAction(
  '[Auth]: Register failure',
  props<{ error: string }>()
);

export const login = createAction('[Auth]: Login');
export const setLoginData = createAction(
  '[Auth]: Set login data',
  props<LoginUserDto>()
);
export const loginSuccess = createAction(
  '[Auth]: Login success',
  props<{ user: ResponseUserDto }>()
);
export const loginFailure = createAction(
  '[Auth]: Login failure',
  props<{ error: string }>()
);

export const refreshToken = createAction('[Auth]: refresh roken');
export const refreshTokenSuccess = createAction(
  '[Auth]: refresh token success',
  props<{ user: ResponseUserDto }>()
);
export const refreshTokenFailure = createAction(
  '[Auth]: refresh token failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth]: logout');
export const logoutClean = createAction('[Auth]: logout clean');

export const resetError = createAction('[Auth]: Reset Error');

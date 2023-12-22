import { createReducer, on } from '@ngrx/store';
import { ICreateTeamInput } from '../../graphql/inputs/create-team.input';
import * as createTeamActions from './create-team.actions';
import { totalResetErrors } from '../common/common.actions';

export type TCreateTeamReducer = {
  createTeamForm: ICreateTeamInput | null;
  error: string | null;
};

const initialState: TCreateTeamReducer = {
  createTeamForm: null,
  error: null,
};

export const createTeamReducer = createReducer(
  initialState,
  on(createTeamActions.setCreateTeamData, (state, { team }) => ({
    ...state,
    createTeamForm: team,
  })),
  on(createTeamActions.createTeamSuccess, state => ({ ...state })),
  on(createTeamActions.createTeamFailure, (state, { error }) => ({ ...state, error })),
  on(totalResetErrors, state => ({ ...state, error: null }))
);

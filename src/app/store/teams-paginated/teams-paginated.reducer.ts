import { createReducer, on } from '@ngrx/store';
import { totalResetErrors } from '../common/common.actions';
import * as teamPaginatedActions from './teams-paginated.actions';
import { ITeamActivePaginated } from '../../graphql/models/teams-active-paginated';

export interface ITeamsPaginatedReducer {
  error: string | null;
  teamsPaginated: ITeamActivePaginated | null;
  pageInfo: {
    page: number;
    pageSize: number;
  };
}

export const initialState: ITeamsPaginatedReducer = {
  error: null,
  teamsPaginated: null,
  pageInfo: {
    page: 0,
    pageSize: 0,
  },
};

export const teamPaginatedReducer = createReducer(
  initialState,
  on(totalResetErrors, state => ({ ...state, error: null })),
  on(teamPaginatedActions.getTeamPaginatedSuccess, (state, { teamsPaginated }) => ({
    ...state,
    teamsPaginated,
  })),
  on(teamPaginatedActions.getTeamPaginatedFailure, (state, { error }) => ({ ...state, error })),
  on(teamPaginatedActions.setPageAndPageSize, (state, { page, pageSize }) => ({
    ...state,
    pageInfo: { page, pageSize },
  }))
);

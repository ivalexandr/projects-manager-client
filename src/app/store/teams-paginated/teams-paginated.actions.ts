import { createAction, props } from '@ngrx/store';
import { ITeamActivePaginated } from '../../graphql/models/teams-active-paginated';

export const getTeamPaginated = createAction('[Team]: Get team paginated');
export const getTeamPaginatedSuccess = createAction(
  '[Team]: Get team paginated success',
  props<{ teamsPaginated: ITeamActivePaginated }>()
);
export const getTeamPaginatedFailure = createAction(
  '[Team]: Get team paginated failuire',
  props<{ error: string }>()
);

export const setPageAndPageSize = createAction(
  '[Team]: Set Page and PageSize',
  props<{ page: number; pageSize: number }>()
);

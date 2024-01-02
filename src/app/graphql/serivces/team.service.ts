import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ICreateTeamInput } from '../inputs/create-team.input';
import { CREATE_TEAM } from '../mutations/create-team';
import { EMPTY } from 'rxjs';
import { GET_TEAMS_FOR_USER } from '../queries/get-teams-for-user';
import { ITeam } from '../models/team';
import { ITeamActivePaginated } from '../models/teams-active-paginated';
import { GET_ACTIVE_TEAMS_PAGINATED } from '../queries/get-active-teams-paginated';
import { GET_USER_TEAM } from '../queries/get-user-team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private readonly apollo: Apollo) {}

  createTeam(createTeam: ICreateTeamInput | null) {
    if (!createTeam) {
      return EMPTY;
    }
    return this.apollo.mutate<{ createTeam: ITeam }>({
      mutation: CREATE_TEAM,
      variables: { input: createTeam },
    });
  }

  getTeamsForUsers() {
    return this.apollo.query<{ getTeamForUser: ITeam[] }>({
      query: GET_TEAMS_FOR_USER,
      fetchPolicy: 'network-only',
    });
  }

  getActiveTeamPaginated(page: number, pageSize: number) {
    return this.apollo.query<{ getActivePublicTeam: ITeamActivePaginated }>({
      query: GET_ACTIVE_TEAMS_PAGINATED,
      variables: { page, pageSize },
      fetchPolicy: 'network-only',
    });
  }

  getUserTeam(id: string) {
    return this.apollo.query<{ getTeam: ITeam }>({
      query: GET_USER_TEAM,
      variables: { id },
      fetchPolicy: 'network-only',
    });
  }
}

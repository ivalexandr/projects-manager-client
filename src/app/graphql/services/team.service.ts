import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ICreateTeamInput } from '../inputs/create-team.input';
import { CREATE_TEAM } from '../mutations/create-team';
import { EMPTY } from 'rxjs';
import { ITeamActivePaginated } from '../models/teams-active-paginated';
import { GET_ACTIVE_TEAMS_PAGINATED } from '../queries/get-active-teams-paginated';
import { ITeamAccess } from '../models/team-access';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private readonly apollo: Apollo) {}

  createTeam(createTeam: ICreateTeamInput | null) {
    if (!createTeam) {
      return EMPTY;
    }
    return this.apollo.mutate<{ createTeam: ITeamAccess }>({
      mutation: CREATE_TEAM,
      variables: { input: createTeam },
    });
  }

  getActiveTeamPaginated(page: number, pageSize: number) {
    return this.apollo.query<{ getActivePublicTeam: ITeamActivePaginated }>({
      query: GET_ACTIVE_TEAMS_PAGINATED,
      variables: { page, pageSize },
      fetchPolicy: 'network-only',
    });
  }
}

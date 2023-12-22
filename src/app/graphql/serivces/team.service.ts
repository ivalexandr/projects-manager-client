import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ICreateTeamInput } from '../inputs/create-team.input';
import { CREATE_TEAM } from '../mutations/create-team';
import { EMPTY } from 'rxjs';
import { GET_TEAMS_FOR_USER } from '../queries/get-teams-for-user';
import { ITeam } from '../models/team';

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
    });
  }
}

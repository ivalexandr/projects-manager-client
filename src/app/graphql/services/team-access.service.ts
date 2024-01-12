import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ITeamAccess } from '../models/team-access';
import { GET_TEAM_ACCESSES } from '../queries/get-team-accesses';
import { GET_TEAM_ACCESS } from '../queries/get-team-access';

@Injectable({
  providedIn: 'root',
})
export class TeamAccessService {
  constructor(private readonly apollo: Apollo) {}

  getTeamAccesses() {
    return this.apollo.query<{ getTeamAccesses: ITeamAccess[] }>({
      query: GET_TEAM_ACCESSES,
      fetchPolicy: 'network-only',
    });
  }

  getTeamAccess(teamId: string) {
    return this.apollo.query<{ getTeamAccess: ITeamAccess }>({
      query: GET_TEAM_ACCESS,
      variables: { id: teamId },
      fetchPolicy: 'network-only',
    });
  }
}

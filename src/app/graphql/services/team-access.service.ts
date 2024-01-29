import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ITeamAccess } from '../models/team-access';
import { GET_TEAM_ACCESSES } from '../queries/get-team-accesses';
import { GET_TEAM_ACCESS } from '../queries/get-team-access';
import { GET_TEAM_ACCESSES_FOR_TEAM } from '../queries/get-team-accesses-for-team';
import { ICreateTeamAccessInput } from '../inputs/create-team-access.input';
import { INVITE_USER_TO_TEAM } from '../mutations/invite-user-to-team';
import { ACCEPTING_INVITAION } from '../mutations/accepting-invitation';
import { REMOVE_TEAM_ACCESS } from '../mutations/remove-team-access';

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

  getTeamAccessesForTeam(teamId: string) {
    return this.apollo.query<{ getTeamAccessesForTeam: ITeamAccess[] }>({
      query: GET_TEAM_ACCESSES_FOR_TEAM,
      variables: { teamId },
      fetchPolicy: 'network-only',
    });
  }

  inviteUserToTeam(createTeamAccess: ICreateTeamAccessInput) {
    return this.apollo.mutate<{ inviteUserToTeam: ITeamAccess }>({
      mutation: INVITE_USER_TO_TEAM,
      variables: { create: createTeamAccess },
      fetchPolicy: 'network-only',
    });
  }

  acceptingInvitation(teamId: string, isAnswer: boolean) {
    return this.apollo.mutate<{ acceptingInvitation: ITeamAccess }>({
      mutation: ACCEPTING_INVITAION,
      variables: { teamId, isAnswer },
      fetchPolicy: 'network-only',
    });
  }

  removeTeamAccess(teamAccessId: string) {
    return this.apollo.mutate<{ removeTeamAccess: ITeamAccess }>({
      mutation: REMOVE_TEAM_ACCESS,
      variables: { teamAccessId },
      fetchPolicy: 'network-only',
    });
  }
}

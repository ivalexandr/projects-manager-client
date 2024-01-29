import { gql } from 'apollo-angular';

export const INVITE_USER_TO_TEAM = gql`
  mutation inviteUserToTeam($create: CreateTeamAcceessInput!) {
    inviteUserToTeam(create: $create) {
      id
      user {
        username
        email
      }
      status
      teamRole
    }
  }
`;

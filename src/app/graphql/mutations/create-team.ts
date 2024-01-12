import { gql } from 'apollo-angular';

export const CREATE_TEAM = gql`
  mutation createTeamMutation($input: CreateTeamInput!) {
    createTeam(create: $input) {
      id
      team {
        id
        name
        avatar
        banner
      }
      teamRole
      status
    }
  }
`;

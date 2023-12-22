import { gql } from 'apollo-angular';

export const CREATE_TEAM = gql`
  mutation createTeamMutation($input: CreateTeamInput!) {
    createTeam(create: $input) {
      id
      name
      description
      avatar
      banner
    }
  }
`;
